import pyrebase
import json
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS


#App configuration
app = Flask(__name__)

# # #Enable CORs
cors = CORS(app)

#Connect to firebase
firebase = pyrebase.initialize_app(json.load(open('secrets.json')))
auth = firebase.auth()
# Authenticate Firebase tables
db = firebase.database()
from flask_cors import CORS, cross_origin
import base64
import os
from google.cloud import speech_v1p1beta1 as speech
PERFECT = 0
ALMOST_THERE = 1
POOR = 2

cors = CORS(app)
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "service-account-key.json" # service key required to access google cloud services
speech_client = speech.SpeechClient() 

# The confidence of word at index i in gcp_output_words is located at index i in gcp_output_confidence
def parseGCPOutput(sentence, gcp_output_words, gcp_output_confidence):
    sentence_arr = sentence.lower().split(" ")
    confidence_arr = []
    confidence_levels = []
    print(sentence)
    index = 0
    for word in sentence_arr:
        if word in gcp_output_words:
            index = gcp_output_words.index(word, index)
            confidence_arr.append(gcp_output_confidence[index])
            if gcp_output_confidence[index] >= 0.97:
                confidence_levels.append(PERFECT)
            elif gcp_output_confidence[index] >= 0.90:
                confidence_levels.append(ALMOST_THERE)
            else:
                confidence_levels.append(POOR)
            index += 1
        else:
            confidence_arr.append(0)
            confidence_levels.append(POOR)
    
    return confidence_arr, confidence_levels

@app.route("/messages", methods = ["POST"])
@cross_origin()
def user():
    byte_data = base64.b64decode(request.json['message'])
    audio_mp3 = speech.RecognitionAudio(content=byte_data)
    config_mp3 = speech.RecognitionConfig(
    encoding='MP3',
    sample_rate_hertz= 16000,
    enable_automatic_punctuation=True,
    language_code='en-US',
    enable_word_confidence=True
    )

    # Transcribing the audio into text
    response = speech_client.recognize(
        config=config_mp3,
        audio=audio_mp3
    )
    words = []
    confidence = []
    for result in response.results:
        for pair in result.alternatives[0].words:
            words.append(pair.word.lower().replace(".", ""))
            confidence.append(pair.confidence)
    arr1, arr2 = parseGCPOutput("peter piper picked pickled peppers", words, confidence)
    return {}


#Api route to get user data
@app.route('/api/userinfo', methods=["POST"])
def userinfo():
    if (request.form.get('uid', None) and request.form.get('token', None)):
        try:
            user = db.child("users").child(request.form['uid']).get(request.form['token'])
            return jsonify(uid={user.key():user.val()})
        except:
            pass
    return make_response(jsonify(message='Error cannot retrieve user information'), 400) # invalid uid or token

#Api route to sign up a new user
@app.route('/api/signup', methods=["POST"])
def signup():
    data = {
            "email":request.form.get('email'),
            "name": request.form.get('name', ""),
            "language": request.form.get('language', "English")
            }
    password = request.form.get('password')
    if not (data['email'] and password):
        return make_response(jsonify(message=''), 400)
    try:
        user = auth.create_user_with_email_and_password(email=data['email'], password=password)
        db.child('users').child(user['localId']).set(data, user['idToken'])
        # auth.send_email_verification(user['idToken'])
        return jsonify(user)
    except:
        return make_response(jsonify(message='Error creating user'), 400)

# Api to refresh user token (Note token expire every hour)
@app.route('/api/login', methods=["POST"])
def login():
    email = request.form.get('email')
    password = request.form.get('password')
    try:
        user = auth.sign_in_with_email_and_password(email, password)
        return jsonify(user)
    except:
        return make_response(jsonify(message='Error authenticating user'), 400)

# take refresh token and get new token
@app.route('/api/token', methods=["POST"])
def token():
    if request.form.get('refreshToken', None):
        try:
            return jsonify(auth.refresh(request.form['refreshToken']))
        except:
            pass
    return make_response(jsonify(message='Error invalid refresh token'), 400)
    
if __name__ == '__main__':
    app.run() # add debug=True for dev