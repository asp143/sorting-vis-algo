import { useState, useEffect } from 'react';
import './BubbleSort.css';

const BubbleSort = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sorting, setSorting] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  
  // Generate random array
  const generateArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
    setSorted(false);
    setCurrentStep(-1);
  };
  
  // Bubble sort algorithm
  const bubbleSort = async () => {
    if (sorting || sorted) return;
    
    setSorting(true);
    setSorted(false);
    
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
  };
  
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
      </div>
      
      <div className="info">
        {sorted && <p>Array is sorted!</p>}
        {sorting && <p>Sorting in progress...</p>}
      </div>
    </div>
  );
};

export default BubbleSort;
