import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BubbleSort from './components/BubbleSort'

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sorting Algorithm Visualizer</h1>
        <p>
          Welcome to the Sorting Algorithm Visualizer! This interactive tool helps you understand how different sorting algorithms work through visual demonstrations.
        </p>
        <div className="features-section">
          <h2>What You Can Do Here:</h2>
          <ul className="feature-list">
            <li>Watch step-by-step visualizations of popular sorting algorithms</li>
            <li>Compare algorithm efficiency and behavior with different data sets</li>
            <li>Learn about the time and space complexity of each algorithm</li>
            <li>Control the visualization speed to better understand each step</li>
          </ul>
        </div>
        <div className="algorithms-section">
          <h2>Available Algorithms:</h2>
          <div className="algorithm-links">
            <Link to="/bubble-sort" className="nav-link">Bubble Sort</Link>
            {/* Add more algorithm links as they become available */}
          </div>
        </div>
      </header>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bubble-sort" element={<BubbleSort />} />
      </Routes>
    </Router>
  )
}

export default App
