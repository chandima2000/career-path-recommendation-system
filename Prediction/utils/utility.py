import os
import string
from nltk.corpus import stopwords
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
import nltk

nltk.download('vader_lexicon')
nltk.download('punkt')
nltk.download('wordnet')
nltk.download('stopwords')

import json

def predict_sentiment(text_input):
    
    try:
        lower_case = text_input.lower()
        cleaned_text = lower_case.translate(str.maketrans('', '', string.punctuation))
        tokenized_words = word_tokenize(cleaned_text, "english")

        final_words = [word for word in tokenized_words if word not in stopwords.words('english')]

        lemma_words = [WordNetLemmatizer().lemmatize(word) for word in final_words]

        emotion_file_path = os.path.join(os.path.dirname(__file__), '../datasets/emotions.txt')
        emotion_list = []
        try:
            with open(emotion_file_path, 'r') as file:
                for line in file:
                    clear_line = line.replace("\n", '').replace(",", '').replace("'", '').strip()
                    word, emotion = clear_line.split(':')
                    if word in lemma_words:
                        emotion_list.append(emotion)
        except FileNotFoundError:
                return {"error": "emotions.txt file not found"}


        score = SentimentIntensityAnalyzer().polarity_scores(cleaned_text)
        if score['neg'] > score['pos']:
            return 0
        else:
            return 1
    
    except Exception as e:
        return {"error": str(e)}
    
    

def load_career_data():
    file_path=os.path.join(os.path.dirname(__file__),'../datasets/jobs.json')
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data
