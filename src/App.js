import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Button from "@mui/material/Button";



const VoiceAssistant = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [response, setResponse] = useState("");

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  const handleProcessSpeech = async () => {
    setResponse("Processing speech...");
  
    const res = await fetch("https://primary-production-d1f2.up.railway.app//webhook/process-speech", {
      method: "POST",
      headers: { "Content-Type": "application/json",
        "Accept": "application/json"
       },
      body: JSON.stringify({ text: transcript })
    });
  
    const data = await res.json();
    setResponse(data.correctedText || "Error processing speech");
  };

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
      <Button variant="contained" onClick={handleProcessSpeech} style={{ marginTop: "10px" }}>
        Process Speech
      </Button>
      <p>AI Response: {response}</p>
    </div>
  );
};

export default function App() {
  return <VoiceAssistant />;
}
