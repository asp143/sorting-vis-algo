import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BubbleSort.css'; // Reusing the same CSS for now

const QuickSort = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sorting, setSorting] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [currentPivot, setCurrentPivot] = useState(-1);
  const [comparing, setComparing] = useState<number[]>([]);
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
    setCurrentPivot(-1);
    setComparing([]);
    setTimerRunning(false);
    setElapsedTime(0);
  };
  
  // Quick sort algorithm
  const quickSort = async () => {
    if (sorting || sorted) return;
    
    setSorting(true);
    setSorted(false);
    
    // Start the timer
    setStartTime(Date.now());
    setTimerRunning(true);
    
    const arr = [...array];
    await quickSortHelper(arr, 0, arr.length - 1);
    
    setCurrentPivot(-1);
    setComparing([]);
    setSorting(false);
    setSorted(true);
    
    // Stop the timer
    setTimerRunning(false);
  };
  
  const quickSortHelper = async (arr: number[], low: number, high: number) => {
    if (low < high) {
      const pivotIndex = await partition(arr, low, high);
      await quickSortHelper(arr, low, pivotIndex - 1);
      await quickSortHelper(arr, pivotIndex + 1, high);
    }
    return arr;
  };
  
  const partition = async (arr: number[], low: number, high: number) => {
    const pivot = arr[high];
    setCurrentPivot(high);
    
    // Pause to visualize the pivot selection
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      setComparing([j, high]);
      
      // Pause to visualize the comparison
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (arr[j] <= pivot) {
        i++;
        
        // Swap elements
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        
        // Pause to visualize the swap
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    // Swap pivot to its final position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    
    // Pause to visualize the final swap
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return i + 1;
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
      <h1>Quick Sort Visualization</h1>
      
      <div className="array-container">
        {array.map((value, idx) => (
          <div 
            key={idx}
            className={`array-bar ${idx === currentPivot ? 'comparing' : ''} ${comparing.includes(idx) ? 'comparing' : ''} ${sorted ? 'sorted' : ''}`}
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
        <button onClick={quickSort} disabled={sorting || sorted}>
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
        {currentPivot !== -1 && <p>Current Pivot: {array[currentPivot]}</p>}
      </div>
    </div>
  );
};

export default QuickSort;
