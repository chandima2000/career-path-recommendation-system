import { useState } from "react";
import { useDispatch } from "react-redux";
import { feedbackState } from "../../features/feedback/feedbackSlice";
import { TypeAnimation } from "react-type-animation";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [sentiment, setSentiment] = useState(null);
  const dispatch = useDispatch();

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

    setSentiment(data.prediction);

    dispatch(feedbackState(sentiment));
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
        <div>
          <TypeAnimation
            sequence={[
              "It seems like you are satisfied with the prediction.If you want more clarifications? Please get help from our personal Assistants.",
            ]}
            speed={50}
            repeat={0}
            className="mt-4 text-center font-semibold text-2xl bg-slate-500"
            style={{
              height: 'auto',
              width: '700px',
              display: 'block',
              
            }}
          />
        </div>
      ) : 
      sentiment == 0 ? (
        <div className="items-center">
          <TypeAnimation
            sequence={[
              "It seems like you are not satisfied with the prediction.Plz Get help from our personal Assistants.",
            ]}
            speed={50}
            repeat={0}
            className="mt-4 text-center font-semibold text-2xl bg-slate-500"
            style={{
              height: 'auto',
              width: '700px',
              display: 'block',
            }}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default FeedbackForm;
