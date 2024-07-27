import React from "react";
import ai from "../../assets/ai.png";
import robotAnimation from "../../assets/robot.mp4";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import "regenerator-runtime/runtime";

const Header = () => {
  const navigate = useNavigate();

  const buttonClick = () => {
    navigate("/register");
  };

  return (
    <div
      className="flex md:flex-row-reverse min-h-screen max-h-screen"
      id="home"
    >
      <div className="flex-1 flex justify-center items-start flex-col mr-20">
        <h1 className="font-bold text-7xl leading-tight text-red-600">
          Welcome to the AI powered Career Guidance Assistant
        </h1>
        <p className="font-normal text-lg leading-relaxed mt-6">
          Welcome to our AI-powered Personal Career Path Guidance Assistant!
          <br /> Our system utilizes cutting-edge AI technology to provide
          personalized career path recommendations for IT students. Answer a few
          questions, and let our assistant guide you towards a successful career
          in the ever-evolving field of Information Technology.
        </p>

        <div className="my-10">
          <TypeAnimation
            className="text-white"
            sequence={["Let's see your future . . .", 1000, ""]}
            wrapper="span"
            cursor={false}
            repeat={Infinity}
            style={{ fontSize: "20px", display: "inline-block" }}
            deletionSpeed={40}
          />
        </div>
        <div className="w-full flex flex-row mt-8">

            <button
              type="button"
              className="animate-bounce items-center focus:animate-none hover:animate-none inline-flex text-md font-medium bg-indigo-900 mt-3 px-4 py-2 rounded-lg tracking-wide text-white h-10"
              onClick={buttonClick}
            >
              <span>Get Started</span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 16 16"
                className="ml-2"
                height="1em"
                width="1em"
                xm
                lns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                ></path>
              </svg>
            </button>

 
        </div>
      </div>

      <div className="flex-1 justify-center items-center">
        <img src={ai} alt="ai" className="w-full h-full" />
      </div>
    </div>
  );
};

export default Header;
