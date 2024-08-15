import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import FeedbackForm from "../feedbackForm/Feedback";
import { useSelector } from 'react-redux'

import "regenerator-runtime/runtime";


const Predict = () => {

  const location = useLocation();
  const { prediction } = location.state || {};
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const feedback = useSelector((state) => state.feedbacks)

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
        <div className="relative w-full overflow-hidden">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            autoPlay
            loop
            muted
          >
            <source src="../../../public/bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
            <h1 className="text-7xl my-16 text-center text-white">
              Your Future Career Path
            </h1>

            {prediction !== undefined ? (
              <div>
                <div className="shadow-md rounded-lg p-6 max-w-3xl w-full text-center bg-opacity-70 bg-white">
                  <p className="text-4xl text-black mb-4">
                    Most Probably You will be a{" "}
                    <span className="font-semibold text-5xl">{role}</span>.
                  </p>
                  <p className="text-2xl text-slate-600">Be Strong & Work Hard</p>
                </div>

                <div className="mt-10">
                  <p className="text-4xl font-semibold text-center my-10 text-red-600">
                    What is your thought? Are you satisfied <br /> with the result?
                    Tell Us.
                  </p>

                  <FeedbackForm />
                </div>
              </div>
            ) : (
              <p className="text-2xl text-red-500">No prediction available.</p>
            )}

            {prediction !== undefined && feedback !== ''  &&(
              <div className="flex flex-row items-center mt-10">
                <button
                  className="py-3 px-8 rounded-xl bg-sky-600 text-white font-bold shadow-md hover:bg-sky-800"
                  onClick={goToChat}
                >
                  Chat Agent
                </button>
                <button
                  className="ml-10 py-3 px-8 rounded-xl bg-green-600 text-white font-bold shadow-md hover:bg-green-800"
                  onClick={goToVoice}
                >
                  Voice Agent
                </button>
              </div>
            )}

            <button
              className="mt-10 py-3 px-8 rounded-xl bg-red-600 text-black font-bold shadow-md hover:bg-red-400"
              onClick={goToQuiz}
            >
              Retake Quiz
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Predict;
