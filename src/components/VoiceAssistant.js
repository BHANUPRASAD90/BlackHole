import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Button } from "@mui/material";

const VoiceAssistant = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [response, setResponse] = useState("");

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>AI Voice Assistant</h2>
      <p>{listening ? "Listening..." : "Click Start to Speak"}</p>
      <Button variant="contained" color="primary" onClick={SpeechRecognition.startListening}>
        Start
      </Button>
      <Button variant="contained" color="secondary" onClick={resetTranscript} style={{ marginLeft: "10px" }}>
        Reset
      </Button>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default VoiceAssistant;
