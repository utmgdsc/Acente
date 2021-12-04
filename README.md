# Acente

## Introduction

This project is apart of the Fall 2021 GDSC Community Projects.

Acente, a web application designed to be a personalized accent coach for users. It will use Speech Recognition to provide actionable feedback to improve a user’s accent. The web app will also store and manage a user’s practice sentences, in order to create a curated accent profile that the user can use to work on their weak spots. The user will also have access to a sandbox, to try out custom sentences that they want to improve on. The website will provide actionable feedback through the use of IPA (international Phonetic Alphabet), by breaking down the sentence.

## Tech Stack
For the Backend:
 - Google Speech to Text
 - Flask
 - Python

For the Frontend:
 - Javascript
 - React
 - Firebase Auth & Hosting

## Directory Structure
The backend code can be found in `backend/` and the frontend code can be found in `frontend/`

## Frontend Files
Dashboard.js: Displays the user's accent profile. User can view their progress, strengths, weaknesses, and custom sentences they have created.
Footer.js: Displays the Acente Footer.
NavBar.js: Adaptive Navigation bar displays login and sign-up buttons if user has not logged in. After authentication, it displays the burger menu.
Sandbox.js: User can create and practice on custom sentences.
Test.js: User can practice on predefined sentences.
