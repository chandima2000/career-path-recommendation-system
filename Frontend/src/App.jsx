import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HelpToSignUp from "./components/help/HelpToSignUp";
import HelpToHome from "./components/help/HelpToHome";
import HelpToQuiz from "./components/help/HelpToQuiz";
import NotFound from "./components/pages/NotFound";
import { Predict } from "./components";
import Chat from "./components/pages/Chat";
import VoiceBot from "./components/pages/Voice";
import "regenerator-runtime/runtime";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HelpToHome />} />
        <Route path="/register" element={<HelpToSignUp />} />
        <Route path="/quiz" element={<HelpToQuiz />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/voice" element={<VoiceBot />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
