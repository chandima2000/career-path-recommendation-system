import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "regenerator-runtime/runtime";
import microphoneAnimation from "../../assets/mic.webm";
import { TypeAnimation } from "react-type-animation";

const VoiceBot = () => {
  const [userQuestion, setUserQuestion] = useState("");
  const [response, setResponse] = useState("");
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [Listening, setListening] = useState(false);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div>Your browser does not support speech recognition.</div>;
  }

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true }, setListening(true));

  const stopListening = () => {
    SpeechRecognition.stopListening();
    sendTranscript(transcript);
    resetTranscript();
    setListening(false);
  };

  const sendTranscript = async (text) => {
    try {
      const response = await fetch("http://localhost:8000/api/voice/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: text }),
      });

      const data = await response.json();

      setUserQuestion(data.query);
      setResponse(data.response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const voiceCommand = async () => {
    const response = await fetch("http://localhost:8000/api/bot/cmd/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data.message);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-6xl font-semibold mb-4 text-center my-16 text-green-500">
        Voice Assistant
      </h2>
      <video
        className="mx-auto mb-2 cursor-pointer"
        src={microphoneAnimation}
        autoPlay
        loop
        muted
        width="120"
        height="140"
        onClick={voiceCommand}
      ></video>
      <h3 className="text-center text-4xl font-semibold my-10">
        Ask anything about your career goals...
      </h3>
      <div className="text-center my-10">
        <TypeAnimation
          sequence={[
            "Press the Start Button to start the recording . . . ",
            1000,
            "",
          ]}
          speed={50}
          repeat={Infinity}
          className="text-lg text-white font-semibold"
        />
      </div>

      <div className="flex flex-row my-4 justify-center">
        <button
          className="bg-green-500 text-black font-semibold px-4 py-2 rounded mr-5 hover:bg-green-700"
          onClick={startListening}
          disabled={listening}
        >
          {Listening ? "Listening..." : "Start Recording"}
        </button>
        <button
          className="bg-red-500 text-white font-semibold px-4 py-2 rounded hover:bg-red-700"
          onClick={stopListening}
          disabled={!listening}
        >
          Stop Recording
        </button>
      </div>

      <div className="flex flex-col justify-between lg:ml-96 ">
        <div className="transcript pb-10 p-5 border border-gray-300 rounded mb-4 max-w-3xl">
          <h3 className="text-xl font-bold">Transcript:</h3>
          <p>{transcript}</p>
        </div>

        <div className="response pb-10 p-4 border border-gray-300 rounded max-w-3xl mt-16 my-5">
          <h3 className="text-xl font-bold">User: </h3>
          {userQuestion ? <p>{userQuestion} ?</p> : ""}
        </div>

        <div className="response pb-10 p-4 border border-gray-300 rounded max-w-3xl">
          <h3 className="text-xl font-bold">Assistant:</h3>
          <p>{response}</p>
        </div>
      </div>
    </div>
  );
};

export default VoiceBot;
