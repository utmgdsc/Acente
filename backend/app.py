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
    print("email is: " + str(data['email']))
    print("password is: " + str(password))
    if not (data['email'] and password):
        return make_response(jsonify(message='Error missing email or password'), 400)
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