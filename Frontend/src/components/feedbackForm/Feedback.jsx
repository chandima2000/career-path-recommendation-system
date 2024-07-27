import React, { useState } from "react";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [sentiment, setSentiment] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8000/api/get/sentiment/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: feedback }),
    });
    const data = await response.json();
    console.log(data);
    setSentiment(data.prediction);
  };

  return (
    <div className="">
      <div className="max-w-3xl mx-auto p-4 bg-black shadow-md rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Leave your feedback here"
            className="w-full p-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            rows="5"
          />
          <button
            type="submit"
            className="w-full bg-red-800 text-white py-2 px-4 rounded-md hover:bg-red-900 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>

      {sentiment == 1 ? (
        <p className="mt-4 text-center font-semibold text-2xl">
          It seems like you are satisfied with the prediction. <br /> If you
          want more clarifications?<br/> Please get help from our personal Assistants.
        </p>
      ) : sentiment == 0 ? (
        <div className="items-center">
          <p className="mt-4 text-center font-semibold text-2xl">
            It seems like you are not  satisfied with the prediction. <br/>Plz Get 
            help from our personal Assistants.
          </p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default FeedbackForm;
