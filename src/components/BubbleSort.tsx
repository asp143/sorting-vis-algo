import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BubbleSort.css';

const BubbleSort = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sorting, setSorting] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [timerRunning, setTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  // Format time in seconds with 2 decimal places
  const formatTime = (timeMs: number): string => {
    const seconds = Math.floor(timeMs / 1000);
    const milliseconds = Math.floor((timeMs % 1000) / 10);
    return `${seconds}.${milliseconds.toString().padStart(2, '0')}s`;
  };
  
  // Generate random array
  const generateArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
    setSorted(false);
    setCurrentStep(-1);
    setTimerRunning(false);
    setElapsedTime(0);
  };
  
  // Bubble sort algorithm
  const bubbleSort = async () => {
    if (sorting || sorted) return;
    
    setSorting(true);
    setSorted(false);
    
    // Start the timer
    setStartTime(Date.now());
    setTimerRunning(true);
    
    const arr = [...array];
    const n = arr.length;
    
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setCurrentStep(j);
        
        // Highlight current comparison
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (arr[j] > arr[j + 1]) {
          // Swap elements
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          
          // Pause to visualize the swap
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    }
    
    setCurrentStep(-1);
    setSorting(false);
    setSorted(true);
    
    // Stop the timer
    setTimerRunning(false);
  };
  
  // Timer effect
  useEffect(() => {
    let intervalId: number | null = null;
    
    if (timerRunning && startTime !== null) {
      intervalId = window.setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10); // Update every 10ms for smooth display
    }
    
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [timerRunning, startTime]);
  
  // Initialize with random array
  useEffect(() => {
    generateArray();
  }, []);
  
  return (
    <div className="bubble-sort-container">
      <h1>Bubble Sort Visualization</h1>
      
      <div className="array-container">
        {array.map((value, idx) => (
          <div 
            key={idx}
            className={`array-bar ${idx === currentStep || idx === currentStep + 1 ? 'comparing' : ''} ${sorted ? 'sorted' : ''}`}
            style={{ height: `${value * 3}px` }}
          >
            {value}
          </div>
        ))}
      </div>
      
      <div className="controls">
        <button onClick={generateArray} disabled={sorting}>
          Generate New Array
        </button>
        <button onClick={bubbleSort} disabled={sorting || sorted}>
          Sort
        </button>
        <Link to="/">
          <button className="return-button">
            Return to Main Menu
          </button>
        </Link>
      </div>
      
      <div className="info">
        <p className="timer">Time: {formatTime(elapsedTime)}</p>
        {sorted && <p>Array is sorted!</p>}
        {sorting && <p>Sorting in progress...</p>}
      </div>
    </div>
  );
};

export default BubbleSort;
