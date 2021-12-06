import json
from app import app
import os

user_id = ""
token = ""
refreshToken = ""

def test_signup():
    response = app.test_client().post(
        '/singup',
        data=json.dumps({'email': "test_user@acente.com", "name": "Test User", 
            'password': os.environ.get("testingCred", "")}),
        content_type='application/form-data',
    )
    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 200
    assert all(key in data for key in ["uid", "token", "refreshToken"])
    user_id, token, refreshToken = data["uid"], data["token"], data["refreshToken"]

def test_login():
    response = app.test_client().post(
        '/login',
        data=json.dumps({'email': "test_user@acente.com", 'password': os.environ.get("testingCred", "")}),
        content_type='application/form-data',
    )
    data = json.loads(response.get_data(as_text=True))
    assert response.status_code == 200
    assert all(key in data for key in ["uid", "token", "refreshToken"])
    user_id, token, refreshToken = data["uid"], data["token"], data["refreshToken"]

def test_logout():
    response = app.test_client().post(
        '/logout',
        data=json.dumps({'uid': user_id, 'token': token}),
        content_type='application/form-data',
    )
    assert response.status_code == 200

def test_userinfo():
    response = app.test_client().post(
        '/userinfo',
        data=json.dumps({'uid': user_id, 'token': token}),
        content_type='application/form-data',
    )
    data = json.loads(response.get_data(as_text=True))
    assert response.status_code == 200
    assert all(key in data for key in ["uid", "weakWords", "strongWords", "recentSentences"])

def test_random_sentence():
    response = app.test_client().get('/api/random_sentence_generator')
    assert response.status_code == 200

def test_userinfo_fail():
    response = app.test_client().post(
        '/userinfo',
        data=json.dumps({'uid': "", 'token': ""}),
        content_type='application/form-data',
    )
    assert response.status_code == 400


def test_token():
    response = app.test_client().post(
        '/token',
        data=json.dumps({'refreshToken': refreshToken}),
        content_type='application/form-data',
    )
    data = json.loads(response.get_data(as_text=True))
    assert response.status_code == 200
    assert all(key in data for key in ["uid", "token", "refreshToken"])

def test_helper_parsing():

    sentence_arr, gcp_output_words, gcp_output_confidence = ["Are", "you", "taking", "the", "car"], ["I", "like", "apples", "taking", "car"], [0.97, 0.86, 0.78, 0.92, 0.86]
    expected_confidence, expected_levels = [0, 0, 0.92, 0, 0.86], [2, 2, 1, 2, 2]
    confidence_arr, confidence_levels = app.parse_output(sentence_arr, gcp_output_words, gcp_output_confidence)
    assert confidence_arr == expected_confidence
    assert expected_levels == confidence_levels
    
    sentence_arr, gcp_output_words, gcp_output_confidence = ["I", "am", "a", "coffee", "addict"], ["I", "am", "a", "coffee", "lover"], [0.97, 0.92, 0.78, 0.94, 0.99]
    expected_confidence, expected_levels = [0.97, 0.92, 0.78, 0.94, 0], [0, 1, 2, 1, 2]
    confidence_arr, confidence_levels = app.parse_output(sentence_arr, gcp_output_words, gcp_output_confidence)
    assert confidence_arr == expected_confidence
    assert expected_levels == confidence_levels

    sentence_arr, gcp_output_words, gcp_output_confidence = ["You", "are", "great"], ["great", "or", "ya"], [0.97, 0.99, 0.90]
    expected_confidence, expected_levels = [0.97, 0, 0.90], [0, 0, 0]
    confidence_arr, confidence_levels = app.parse_output(sentence_arr, gcp_output_words, gcp_output_confidence)
    assert confidence_arr == expected_confidence
    assert expected_levels == confidence_levels

def test_helper_sentence_grabber():
    for _ in range(5):
        assert app.recent_sentence_grabber(user_id, token) != ""