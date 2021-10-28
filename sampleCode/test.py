import os
from google.cloud import speech_v1p1beta1 as speech

# Test out with different pronounciations for the audio

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "service-account-key.json" # service key required to access google cloud services

speech_client = speech.SpeechClient() 

# Load media Files
media_file_name = "test1-bad.mp3"

with open(media_file_name, 'rb') as f1:
    byte_data = f1.read()
audio_mp3 = speech.RecognitionAudio(content=byte_data) #convert media file into recognition audio format 

# Configure media files output
config_mp3 = speech.RecognitionConfig(
    sample_rate_hertz=48000,
    enable_automatic_punctuation=True,
    language_code='en-US',
    enable_word_confidence=True
)

# Transcribing the audio into text
response = speech_client.recognize(
    config=config_mp3,
    audio=audio_mp3
)

print(response)