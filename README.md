# Career Path Recommendation System

This project is a Career Path Recommendation System built with a React frontend and a Django backend. The system is implemented in four main steps:

1. **User Registration and Quiz**
2. **Machine Learning Prediction**
3. **Sentiment Analysis (NLP)**
4. **Chatbot Assistant**
5. **Voice Assistant**

## Features

1. **User Registration and Quiz**
   - After successful registration, the user is redirected to the quiz page.
   - The user answers 19 quizzes.
   - The user is automatically redirected to the prediction page to see their career job role based on their answers.

2. **Machine Learning Prediction**
   - The prediction is made using a machine learning model.
   - The model suggests a career path for the user based on their quiz answers.

3. **Sentiment Analysis**
   - If the user is not satisfied with the prediction, they can provide feedback.
   - An NLP model predicts whether the feedback is positive or negative using the NLTK library.
   - The sentiment (positive or negative) is displayed to the user.

4. **Chatbot and Voice Bot**
   - The chatbot responds to custom data queries.
   - Implemented using Google Gemini API, LangChain, and FAISS as the Vector-DB.
   - Google Gemini is used for word embeddings.
   - The voice bot is implemented with the React Speech Recognition library, FAISS DB, LangChain, and Gemini.

## Technologies Used

- **Frontend:**
  - React
  - React Speech Recognition

- **Backend:**
  - Django
  - DRF
  - NLTK
  - LangChain
  - FAISS
  - Google Gemini API

- **Database:**
  - FAISS (Vector-DB)
  - SQL

## Installation

### Prerequisites

- Node.js and npm
- Python 3.x and pip
- Django
- NLTK

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/chandima2000/career-path-recommendation-system.git
    cd career-path-recommendation-system/backend
    ```

2. Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    venv\Scripts\activate
    ```

3. Install the dependencies:
    ```bash
    pip install -r requirements.txt
      ```
4. Create .env file inside backend folder:

   GOOGLE_API_KEY = "YOUR_API_KEY"

5. Run the Django server:
    ```bash
    python manage.py migrate
    python manage.py runserver
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Run the React development server:
    ```bash
    npm run dev
    ```

## Usage

1. Open your browser and navigate to `http://localhost:5173`.
2. Register as a new user.
3. Complete the quiz to receive a career path recommendation.
4. Provide feedback on the prediction to see the sentiment analysis.
5. Use the chatbot for custom queries.
6. Interact with the voice bot for voice commands.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.


"# Carrer-Recommendation-System" 
