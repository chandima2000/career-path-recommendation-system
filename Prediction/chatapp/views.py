from django.shortcuts import render

# Create your views here.
import os
# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import google.generativeai as genai
from dotenv import load_dotenv


from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.chains.question_answering import load_qa_chain


# Load environment variables
#load_dotenv()
API_KEY = os.environ("GOOGLE_API_KEY")
genai.configure(api_key = API_KEY)



## chatbot view
class ChatbotView(APIView):

    def post(self, request):
        user_message = request.data.get('message')
        if not user_message:
            return Response({'error': 'Message not provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Function to handle LangChain and Google Gemini Pro interaction
        response = ChatbotResponse.get_chatbot_response(user_message)  
        return Response({'response': response})
    


# Handle the Chatbot logic
class ChatbotResponse() :
     
     ## Get the Data from the pdf
    def get_pdf_text():
        file_path = os.path.join(os.path.dirname(__file__), "../datasets/docs/Job_Roles.pdf")
        text=""
        with open(file_path, 'rb') as pdf_docs:
            pdf_reader= PdfReader(pdf_docs)
            for page in pdf_reader.pages:
                text+= page.extract_text()
        return  text


    ## returns the list of text chunks
    def get_text_chunks(text):
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
        chunks = text_splitter.split_text(text)
        return chunks
    
    ## Handle text embeddings and Vector database
    def get_vector_store(text_chunks):
        embeddings = GoogleGenerativeAIEmbeddings(model = "models/embedding-001")
        vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
        vector_store.save_local("vector_db")
    

    ## Get the Conversation
    def get_conversational_chain():

        prompt_template = """
        Answer the question as detailed as possible from the provided context, make sure to provide all the details, if the answer is not in
        provided context just say, "answer is not available in the context", don't provide the wrong answer\n\n
        Context:\n {context}?\n
        Question: \n{question}\n

        Answer:
        """

        model = ChatGoogleGenerativeAI(model="gemini-pro",temperature=0.3)

        prompt = PromptTemplate(template = prompt_template, input_variables = ["context", "question"])

        chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)

        return chain


    def get_chatbot_response(user_message):

        text = ChatbotResponse.get_pdf_text()

        chunks = ChatbotResponse.get_text_chunks(text)

        ChatbotResponse.get_vector_store(chunks)

        embeddings = GoogleGenerativeAIEmbeddings(model = "models/embedding-001")

        new_db = FAISS.load_local("vector_db", embeddings,allow_dangerous_deserialization=True)
        
        docs = new_db.similarity_search(user_message)

        chain = ChatbotResponse.get_conversational_chain()

        reply_response = chain.invoke(
            {"input_documents":docs, "question": user_message}
            , return_only_outputs=True)

        return reply_response


