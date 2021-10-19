import pyrebase
import json
from flask import Flask, request, jsonify, make_response

#App configuration
app = Flask(__name__)
#Connect to firebase
firebase = pyrebase.initialize_app(json.load(open('secrets.json')))
auth = firebase.auth()
# Authenticate Firebase tables
db = firebase.database()

#Api route to get user data
@app.route('/api/userinfo', methods=["POST"])
def userinfo():
    try:
        if not request.form.get('uid', None):
            return make_response(jsonify(message='Error invalid uid provided'), 400)
        user = db.child("users").child(request.form['uid']).get()
        return jsonify(uid=user.val(), values=user.key())
    except:
        return make_response(jsonify(message='Error cannot retrieve user information'), 400)

#Api route to sign up a new user
@app.route('/api/signup', methods=["POST"])
def signup():
    data = {
            "email":request.form.get('email'),
            "name": request.form.get('name', ""),
            "language": request.form.get('language', "English")
            }
    password = request.form.get('password')
    if not (data["email"] and password):
        return {'message': 'Error missing email or password'},400
    try:
        user = auth.create_user_with_email_and_password(email=data["email"], password=password)
        db.child("users").child(user['localId']).set(data) #test set(data, 'localId' too
        # auth.send_email_verification(user['idToken'])
        return {'token': user["idToken"], 'uid':user["localId"]},200
    except:
        return {'message': 'Error creating user'},400

# Api to refresh user token (Note token expire every hour)
@app.route('/api/login', methods=["POST"])
@app.route('/api/token', methods=["POST"])
def token():
    email = request.form.get('email')
    password = request.form.get('password')
    try:
        user = auth.sign_in_with_email_and_password(email, password)
        return {'token': user["idToken"], 'uid':user["localId"]},200
    except:
        return {'message': 'There was an error authenticating user.'},400

if __name__ == '__main__':
    app.run(debug=True)