import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./layout/Navbar";
import Contact from "./components/Contact"; // Make sure the uppercase/lowercase matches your actual file name!

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<h1 className="text-center mt-20 text-3xl font-bold">Welcome to the University Portal</h1>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact/enquiry" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;