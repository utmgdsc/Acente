""" Api for Acente backend """
import base64
import json
import os
import random
from datetime import timedelta

import firebase_admin
import pyrebase
from firebase_admin import credentials, firestore
from flask import Flask, jsonify, make_response, request, session
from flask_cors import CORS, cross_origin
from google.cloud import speech_v1p1beta1 as speech

from flask_session import Session

# App configuration
app = Flask(__name__)
app.config["SESSION_PERMANENT"] = True
app.config["SESSION_TYPE"] = "filesystem"
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=5)
app.config['SESSION_FILE_THRESHOLD'] = 100
app.secret_key = "Acente DSC Group 3"
Session(app)

# # #Enable CORs
cors = CORS(app)

# Connect to firebase
firebase = pyrebase.initialize_app(json.load(open('secrets.json')))
auth = firebase.auth()
# Authenticate Firebase tables
db = firebase.database()

PERFECT = 0
ALMOST_THERE = 1
POOR = 2

cors = CORS(app)
# service key required to access google cloud services
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "service-account-key.json"
speech_client = speech.SpeechClient()


def parse_output(sentence_arr, gcp_output_words, gcp_output_confidence):
    """The confidence of word at index i in gcp_output_words is
        located at index i in gcp_output_confidence
    """
    confidence_arr = []
    confidence_levels = []
    index = 0
    for word in sentence_arr:
        if word in gcp_output_words[index:]:
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

@app.route("/messages", methods=["POST"])
@cross_origin()
def messages():
    byte_data = base64.b64decode(request.json['message'])
    audio_mp3 = speech.RecognitionAudio(content=byte_data)
    config_mp3 = speech.RecognitionConfig(
        encoding='MP3',
        sample_rate_hertz=16000,
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
    sentence_arr = request.json['sentence'].lower().split(" ")
    sentence_id = request.json['id']
    user_id = request.json['uid']
    sen_confidence = 0
    for result in response.results:
        sen_confidence = result.alternatives[0].confidence
        for pair in result.alternatives[0].words:
            words.append(pair.word.lower())
            confidence.append(pair.confidence)
    arr1, arr2 = parse_output(sentence_arr, words, confidence)
    if not request.json.get('sandbox', None):
        def find_avg(x, y): 
            return (x*5+y*2)/7
        prev = db.child('voice-data').child(user_id).child(sentence_id).get()
        if prev.val():
            sen_confidence = find_avg(prev.val(), sen_confidence)
        db.child(
            'voice-data').child(user_id).update({sentence_id: sen_confidence})
        data = {}
        for i, word_confidence in enumerate(arr1):
            prev = db.child('words').child(user_id).child(sentence_id).get()
            if prev.val():
                word_confidence = find_avg(prev.val(), word_confidence)
            data[sentence_arr[i].strip('.')] = word_confidence
        db.child('words').child(user_id).update(data)
    return make_response(jsonify(confidence=arr2, sentence_arr=sentence_arr))

# Api route to get user data


@app.route('/api/userinfo', methods=["POST"])
def userinfo():
    if (request.form.get('uid', None) and request.form.get('token', None)):
        try:
            auth.current_user = session.get("email", auth.current_user)
            user = db.child("users").child(request.form['uid']).get(request.form['token'])
            words = db.child("words").child(request.form['uid']).get().val().items()
            words = list(words)
            words.sort(key=lambda x: x[1])
            weakWords, strongWords = [], []
            if(len(words) >= 10):
                weakWords = words[:5]
                strongWords = words[-1:-6:-1]
            recentSentences = recent_sentence_grabber(request.form['uid'])
            return jsonify(uid={user.key(): user.val()}, weakWords=weakWords, 
                           strongWords=strongWords, recentSentences=recentSentences)
        except:
            pass
    # invalid uid or token
    return make_response(jsonify(message='Error cannot retrieve user information'), 400)

# Api route to sign up a new user
@app.route('/api/signup', methods=["POST"])
def signup():
    data = {
        "email": request.form.get('email'),
        "name": request.form.get('name', ""),
        "language": request.form.get('language', "English")
    }
    password = request.form.get('password')
    if not (data['email'] and password):
        return make_response(jsonify(message='Error missing required user information'), 400)
    try:
        user = auth.create_user_with_email_and_password(
            email=data['email'], password=password)
        db.child('users').child(user['localId']).set(data, user['idToken'])
        session["email"] = user
        # auth.send_email_verification(user['idToken'])
        return jsonify(user)
    except:
        return make_response(jsonify(message='Error creating user'), 401)

# Api to refresh user token (Note token expire every hour)


@app.route('/api/login', methods=["POST"])
def login():
    email = request.form.get('email')
    password = request.form.get('password')
    try:
        user = auth.sign_in_with_email_and_password(email, password)
        session["email"] = user
        return jsonify(user)
    except:
        return make_response(jsonify(message='Error authenticating user'), 401)

# take refresh token and get new token

    
@app.route('/api/token', methods=["POST"])
def token():
    # if request.form.get('refreshToken', None):
    try:  # Review sign_in_with_custom_token(self, token) function
        auth.current_user = session.setdefault("email", auth.current_user)
        user = auth.refresh(request.form['refreshToken'])
        session["email"].update(user)
        return jsonify(user)
    except:
        pass
    return make_response(jsonify(message='Error invalid refresh token'), 400)


# Firestore Setup

# Use a service account
cred = credentials.Certificate('fireStoreKey.json')
firebase_admin.initialize_app(cred)
firestore_db = firestore.client()

# create dict of sentences
ls = {}
sentences_ref = firestore_db.collection(u'sentences').stream()
for sentence in sentences_ref:
    dt = sentence.to_dict()
    dt['id'] = sentence.id
    ls[sentence.id] = dt


@app.route('/api/randomSentenceGenerator', methods=["GET"])
def random_sentence_generator():
    """ Returns a random senctence from collection of sentences
    """
    try:
        return jsonify(sentence=ls[random.choice(list(ls))])
    except:
        return make_response(jsonify(message='Cannot fetch a sentence'), 400)

# grab user's recent sentences
# helper function for user_info()
def recent_sentence_grabber(uid):
    sentences = db.child("voice-data").child(uid).get().val().items()
    sentence_ids = list(sentences)
    if len(sentences) >= 5:
        recent_sentence_ids = random.sample(sentence_ids, 5)
    recent_sentences = []
    for [id, score] in recent_sentence_ids:
        recent_sentences.append(ls[id])
    return recent_sentences



@app.route('/api/logout', methods=["POST"])
def logout():
    if session.get("email"):
        session.pop("email", None)
    auth.current_user = None
    return jsonify("Logged out user successfully")


if __name__ == '__main__':
    app.run()  # add debug=True for dev