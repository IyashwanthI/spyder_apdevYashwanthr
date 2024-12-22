import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import Home from './Home.jsx';
import JoinRoom from './Chat/joinroom.jsx';
import './index.css'
import Nav from "./Nav/Nav.jsx";
function App() {
  const [showChat, setShowChat] = useState(false);
  const toggleChat = () => setShowChat(prev => !prev);
  return (
    <>
        <Nav onChatToggle={toggleChat}/>
        <Home showChat={showChat}/> 
    </>
  );
}

export default App;
