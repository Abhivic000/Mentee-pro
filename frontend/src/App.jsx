import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import About from './pages/about/About'
import MoodJournal from './pages/moodjr/Moodjr'
import Contact from './pages/contact/Contact'
import Anachat from './pages/Chatskl/Chatskl'
import Footer from './components/Footer'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mood-journal" element={<MoodJournal />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/anachat" element={<Anachat />} />
      </Routes>
    </Router>
  );
}

export default App
