import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HeapSort.css';

const HeapSort = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sorting, setSorting] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [heapifyIndex, setHeapifyIndex] = useState<number | null>(null);
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
    setComparingIndices([]);
    setHeapifyIndex(null);
    setTimerRunning(false);
    setElapsedTime(0);
  };
  
  // Heap sort algorithm
  const heapSort = async () => {
    if (sorting || sorted) return;
    
    setSorting(true);
    setSorted(false);
    
    // Start the timer
    setStartTime(Date.now());
    setTimerRunning(true);
    
    const arr = [...array];
    const n = arr.length;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      // Move current root to end
      setComparingIndices([0, i]);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setArray([...arr]);
      
      // Pause to visualize the swap
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Call max heapify on the reduced heap
      await heapify(arr, i, 0);
    }
    
    setComparingIndices([]);
    setHeapifyIndex(null);
    setSorting(false);
    setSorted(true);
    
    // Stop the timer
    setTimerRunning(false);
  };
  
  // To heapify a subtree rooted with node i
  const heapify = async (arr: number[], n: number, i: number) => {
    setHeapifyIndex(i);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let largest = i; // Initialize largest as root
    const left = 2 * i + 1; // left child
    const right = 2 * i + 2; // right child
    
    // If left child is larger than root
    if (left < n) {
      setComparingIndices([largest, left]);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }
    
    // If right child is larger than largest so far
    if (right < n) {
      setComparingIndices([largest, right]);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }
    
    // If largest is not root
    if (largest !== i) {
      setComparingIndices([i, largest]);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Swap
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArray([...arr]);
      
      // Pause to visualize the swap
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Recursively heapify the affected sub-tree
      await heapify(arr, n, largest);
    }
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
    <div className="heap-sort-container">
      <h1>Heap Sort Visualization</h1>
      
      <div className="array-container">
        {array.map((value, idx) => (
          <div 
            key={idx}
            className={`array-bar 
              ${comparingIndices.includes(idx) ? 'comparing' : ''} 
              ${heapifyIndex === idx ? 'heapify' : ''}
              ${sorted ? 'sorted' : ''}`}
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
        <button onClick={heapSort} disabled={sorting || sorted}>
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

export default HeapSort;
