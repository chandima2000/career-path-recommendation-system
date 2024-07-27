#from django.shortcuts import render

# Create your views here.
import joblib
import os
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .serializers import PredictionSerializer, SignInSerializer, SignUpSerializer, UserSerializer
from django.contrib.auth import authenticate

from utils.utility import predict_sentiment

class PredictionView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PredictionSerializer(data=request.data)
        if serializer.is_valid():
            # Load the model
            model_path = os.path.join(os.path.dirname(__file__), '../ml_models/dtmodel.pkl')
            model = joblib.load(model_path)

            # Extract and encode data
            data = [
                serializer.validated_data['question1'],
                serializer.validated_data['question2'],
                serializer.validated_data['question3'],
                serializer.validated_data['question4'],
                serializer.validated_data['question5'],
                serializer.validated_data['question6'],
                serializer.validated_data['question7'],
                serializer.validated_data['question8'],
                serializer.validated_data['question9'],
                serializer.validated_data['question10'],
                serializer.validated_data['question11'],
                serializer.validated_data['question12'],
                serializer.validated_data['question13'],
                serializer.validated_data['question14'],
                serializer.validated_data['question15'],
                serializer.validated_data['question16'],
                serializer.validated_data['question17'],
                serializer.validated_data['question18'],
                serializer.validated_data['question19'],
            ]

            # Encode categorical data (example encoding)
            encoding_question7 = {
                'R Programming': 0,
                'Information Security': 1,
                'Shell Programming': 2,
                'Machine Learning': 3,
                'Full Stack':4,
                'Hadoop':5,
                'Python':6,
                'Distro Making':7,
                'App Development':8

            }

            encoding_question8 = {
                'Database Security': 0,
                'System Designing': 1,
                'Web Technologies': 2,
                'Machine Learning': 3,
                'Hacking':4,
                'Testing':5,
                'Data Science':6,
                'Game Development':7,
                'Cloud Computing':8

            }


            encoded_data = [
                int(data[0]),  # Assuming question1 is already numeric
                int(data[1]),  # Assuming question2 is already numeric
                int(data[2]),  # Assuming question3 is already numeric
                int(data[3]),  # Assuming question4 is already numeric
                int(data[4]),  # Assuming question5 is already numeric
                int(data[5]),   # Assuming question6 is already numeric
                encoding_question7[data[6]],
                encoding_question8[data[7]],
                int(data[8]),  # Assuming question1 is already numeric
                int(data[9]),  # Assuming question2 is already numeric
                int(data[10]),  # Assuming question3 is already numeric
                int(data[11]),  # Assuming question4 is already numeric
                int(data[12]),  # Assuming question5 is already numeric
                int(data[13]),   # Assuming question6 is already numeric
                int(data[14]),  # Assuming question1 is already numeric
                int(data[15]),  # Assuming question2 is already numeric
                int(data[16]),  # Assuming question3 is already numeric
                int(data[17]),  # Assuming question4 is already numeric
                int(data[18]),  # Assuming question5 is already numeric
            ]

            # Make prediction
            prediction = model.predict([encoded_data])

            #Get the probability
            prediction_probability = model.predict_proba([encoded_data])

            # Get the probability of the predicted class
            predicted_class = prediction[0]
            predicted_proba = prediction_probability[0][predicted_class]

            return Response({
                'prediction': predicted_class,
                'probability': predicted_proba
                }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class SignUpView(APIView):
    def post(self, request, *args, **kwargs):
         serializer = SignUpSerializer(data=request.data)
         if(serializer.is_valid()):
             serializer.save()
             return Response({'success': True}, status=status.HTTP_201_CREATED)
         else:
             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignInView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = SignInSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, username=email, password=password)
            
            if user is not None:
                return Response({'success': True, 'message': 'Login successful'}, status=status.HTTP_200_OK)
            else:
                return Response({'success': False, 'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetailsView(APIView) :
    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SentimentAnalysisView(APIView):
    def post(self, request, *args, **kwargs):
        try:

            if "text" in request.data:
                 
                  # Get the text input
                 text_input = request.data["text"]

                 predicted_sentiment = predict_sentiment(text_input)

                 return Response({"prediction": predicted_sentiment}, status=status.HTTP_200_OK)
            
            else:
                return Response({"error": "No text provided"}, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)