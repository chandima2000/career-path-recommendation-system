import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import FeedbackForm from "../feedbackForm/Feedback";
import "regenerator-runtime/runtime";

const Predict = () => {
  const location = useLocation();
  const { prediction, probability } = location.state || {};
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const roleMapping = {
    0: "Network Security Engineer",
    1: "Software Engineer",
    2: "UI/UX Engineer",
    3: "Software Developer",
    4: "Database Developer",
    5: "QA Engineer",
    6: "Web Developer",
    7: "CRM Technical Developer",
    8: "Technical Supporter",
    9: "Systems Security Administrator",
    10: "Applications Developer",
    11: "Mobile Applications Developer",
  };

  const goToQuiz = () => {
    navigate("/quiz");
  };

  const goToChat = () => {
    navigate("/chat");
  };

  const goToVoice = () => {
    navigate("/voice");
  };

  const role = roleMapping[prediction] || "Unknown Role!";

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="predict-bg-img flex flex-col items-center min-h-screen">
          <h1 className="text-7xl font-semibold  my-16 text-center text-violet-800">
            Your Future Career Path
          </h1>
          {prediction !== undefined ? (
            <div>
              <div className="shadow-md rounded-lg p-6 max-w-3xl w-full text-center ">
                <p className="text-5xl text-white mb-4">
                  Most Probably You will be a{" "}
                  <span className="font-semibold">{role}</span>.
                </p>
                <p className="text-2xl">Be Strong & Work Hard</p>
                {/* <p className="text-lg text-gray-700"><span className="font-semibold">Probability:</span> {(probability * 100).toFixed(2)}%</p> */}
              </div>

              <div className="">
                <p className="text-4xl font-semibold text-center my-10 text-rose-900">
                  What is your thought? Do you satisfied <br /> with the result?
                  Tell Us.
                </p>

                <FeedbackForm />
              </div>
            </div>
          ) : (
            <p className="text-2xl text-red-500">No prediction available.</p>
          )}
          {prediction && 
          prediction !== undefined &&

          <div className="flex flex-row items-center">
          <button
            className="my-10 py-3 px-8 rounded-xl bg-sky-600 w-fit text-white font-bold shadow-md shadow-primary hover:bg-sky-800"
            onClick={goToChat}
          >
            Chat Agent
          </button>
          <button
            className="my-10 ml-10 py-3 px-8 rounded-xl bg-green-600 w-fit text-white font-bold shadow-md shadow-primary hover:bg-green-800"
            onClick={goToVoice}
          >
            Voice Agent
          </button>
        </div>
          }
          

          <button
            className="my-10 py-3 px-8 rounded-xl bg-red-600 w-fit text-black font-bold shadow-md shadow-primary hover:bg-red-400"
            onClick={goToQuiz}
          >
            Retake Quiz
          </button>
        </div>
      )}
    </>
  );
};

export default Predict;
