import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Account from "./components/Account";   // ✅ Import Account

function App() {
  const [appAlert, setAppAlert] = useState(null);                  
  const showAlert = (message, type) => {
    setAppAlert({ msg: message, type });                           
    setTimeout(() => setAppAlert(null), 1500);                     
  };

  return (
    <NoteState>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Navbar />
        <Alert alert={appAlert} />                                  
        <div className="container">
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
            <Route path="/account" element={<Account />} />  {/* ✅ New Account Route */}
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
