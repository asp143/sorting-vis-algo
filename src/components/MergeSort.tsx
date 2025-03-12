import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MergeSort.css';

const MergeSort = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sorting, setSorting] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [currentIndices, setCurrentIndices] = useState<number[]>([]);
  const [timerRunning, setTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  // Generate random array
  const generateArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
    setSorted(false);
    setCurrentIndices([]);
    setTimerRunning(false);
    setElapsedTime(0);
  };
  
  // Format time in seconds with 2 decimal places
  const formatTime = (timeMs: number): string => {
    const seconds = Math.floor(timeMs / 1000);
    const milliseconds = Math.floor((timeMs % 1000) / 10);
    return `${seconds}.${milliseconds.toString().padStart(2, '0')}s`;
  };
  
  // Merge sort algorithm
  const mergeSort = async () => {
    if (sorting || sorted) return;
    
    setSorting(true);
    setSorted(false);
    
    // Start the timer
    setStartTime(Date.now());
    setTimerRunning(true);
    
    const animations = getMergeSortAnimations([...array]);
    
    for (let i = 0; i < animations.length; i++) {
      const [type, indices, values] = animations[i];
      
      // Highlight current elements
      setCurrentIndices(indices);
      
      // Pause to visualize
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (type === 'update') {
        // Update array with new values
        setArray(prevArray => {
          const newArray = [...prevArray];
          for (let j = 0; j < indices.length; j++) {
            newArray[indices[j]] = values[j];
          }
          return newArray;
        });
        
        // Pause to visualize the update
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    setCurrentIndices([]);
    setSorting(false);
    setSorted(true);
    
    // Stop the timer
    setTimerRunning(false);
  };
  
  // Generate merge sort animations
  const getMergeSortAnimations = (array: number[]) => {
    const animations: [string, number[], number[]][] = [];
    if (array.length <= 1) return animations;
    
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  };
  
  const mergeSortHelper = (
    mainArray: number[],
    startIdx: number,
    endIdx: number,
    auxiliaryArray: number[],
    animations: [string, number[], number[]][]
  ) => {
    if (startIdx === endIdx) return;
    
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    
    // Sort left half
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    // Sort right half
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    // Merge the sorted halves
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  };
  
  const doMerge = (
    mainArray: number[],
    startIdx: number,
    middleIdx: number,
    endIdx: number,
    auxiliaryArray: number[],
    animations: [string, number[], number[]][]
  ) => {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    
    while (i <= middleIdx && j <= endIdx) {
      // Compare values at i and j
      animations.push(['compare', [i, j], []]);
      
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // Value from left half is smaller
        animations.push(['update', [k], [auxiliaryArray[i]]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // Value from right half is smaller
        animations.push(['update', [k], [auxiliaryArray[j]]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    
    // Copy remaining elements from left half
    while (i <= middleIdx) {
      animations.push(['compare', [i], []]);
      animations.push(['update', [k], [auxiliaryArray[i]]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    
    // Copy remaining elements from right half
    while (j <= endIdx) {
      animations.push(['compare', [j], []]);
      animations.push(['update', [k], [auxiliaryArray[j]]]);
      mainArray[k++] = auxiliaryArray[j++];
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
    <div className="merge-sort-container">
      <h1>Merge Sort Visualization</h1>
      
      <div className="array-container">
        {array.map((value, idx) => (
          <div 
            key={idx}
            className={`array-bar ${currentIndices.includes(idx) ? 'comparing' : ''} ${sorted ? 'sorted' : ''}`}
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
        <button onClick={mergeSort} disabled={sorting || sorted}>
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

export default MergeSort;
