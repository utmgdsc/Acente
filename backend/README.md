# Backend

This is the backend logic for Acente

## Installing dependencies
 ```sh
 source venv/bin/activate
 pip install -r requirements.txt
 ```

## Running the server

The server can be run by doing the following commands
```sh
source venv/bin/activate
flask run
```
or for development mode,
```sh
source venv/bin/activate
FLASK_ENV=development flask run
```

## Endpoints
### POST /messages
Returns the confidence levels and the corresponding confidence metric for each word in the provided sentence

In the post body, this endpoint requires:

`uid` - the user identification number, used for grabbing information about the user from Firebase

`token` - the current session token, used for validating live sessions

`message` - the blob url of the transcribed audio message

`sentence` - the sentence pronounced 

`id` - the corresponding sentence id in the database, if it's a pre-defined sentence

This endpoint returns the following information:

```
{
confidence: [Number],
sentence_arr: [Number]
}
```

### POST /api/userinfo
Returns information about the user

In the post body, it requires:

`uid` - the user identification number, used for grabbing information about the user from Firebase

`token` - the current session token, used for validating live sessions

This endpoint returns the following information:

```
uid: {key: value}
weakWorks: [(String, Number)]
strongWords: [(String, Number)]
recentSentences: [String]
```

### POST /api/signup
Signup for a new user

In the form body, it requires:

`email` - The user's email

`name` - The user's name

`language` - The user's most comfortable language

`password` - The user's password

This endpoint returns the firebase user json

### POST /api/login
Logins in a user

In the form body, it requires:

`email` - The user's email

`password` - The user's password

This endpoint returns the firebase user json

### POST /api/token
Used to get a new token for a user's session.

`refreshToken` - The user's old refresh token

This endpoint returns the firebase user json

### GET /api/randomSentenceGenerator
This endpoint returns a random sentence

This endpoint returns the following information:

```
{
sentence: String
}
```

### POST /api/logout
This endpoint logs a user out

## Tests
The tests were built using pytest, and can be found in the `tests/` directory
