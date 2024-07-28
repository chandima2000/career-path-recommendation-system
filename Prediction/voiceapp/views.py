from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os
import logging

import google.generativeai as genai
from dotenv import load_dotenv

import pyttsx3

from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.chains.question_answering import load_qa_chain

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
# load_dotenv()
API_KEY = os.environ("GOOGLE_API_KEY")
genai.configure(api_key = API_KEY)

# Initialize TTS Engine
engine = pyttsx3.init()
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[0].id)

class VoiceBotView(APIView):

    def post(self, request):
        user_message = request.data.get('query')
        

        try:
            #VoiceBotFunction.speak("searching")
            response_text = VoiceBotFunction.get_voice_response(user_message)
            logger.info(response_text)
            #VoiceBotFunction.speak(response_text)
            return Response({'query': user_message, 'response': response_text})

        except Exception as e:
            logger.error(f"Exception occurred: {e}")
            return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class VoiceBotFunction:

    def speak(text, rate=120):
        try:
            engine.setProperty('rate', rate)
            engine.say(text)
 
            if not engine._inLoop:
                engine.runAndWait()

        except Exception as e:
            logger.error(f"Error in text-to-speech: {e}")

    @staticmethod
    def get_conversational_chain():
        prompt_template = """
        Answer the question as detailed as possible from the provided context, make sure to provide all the details, if the answer is not in
        provided context just say, "Answer is not available in the Database", don't provide the wrong answer\n\n
        Context:\n {context}?\n
        Question: \n{question}\n

        Answer:
        """
        model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)
        prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
        chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
        return chain

    @staticmethod
    def get_voice_response(user_message):
        try:
            embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
            new_db = FAISS.load_local("vector_db", embeddings, allow_dangerous_deserialization=True)
            docs = new_db.similarity_search(user_message)
            chain = VoiceBotFunction.get_conversational_chain()
            reply_response = chain.invoke({"input_documents": docs, "question": user_message}, return_only_outputs=True)
            logger.info(f"Reply response: {reply_response}")
            return reply_response.get('output_text', 'No response available.')

        except Exception as e:
            logger.error(f"Error in get_voice_response: {e}")
            raise

class VoiceCommand(APIView) :
    def get(self,request):
        VoiceBotFunction.speak("Voice Assistant is Activated")
        return Response({"message": "Voice activated"}, status=status.HTTP_200_OK)