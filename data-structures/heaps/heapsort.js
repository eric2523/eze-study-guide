// regular HeapSort
// MaxHeap is from implementation in this file
function heapSort(array){
  // 1: Construction
  let heap = new MaxHeap()
  array.forEach(ele => {
    heap.insert(ele)
  });

// 2: sortdown 
  let sorted = []
  while (heap.array.length > 1){
    sorted.push(heap.deleteMax())
  }
  return sorted
}
// Time Complexity Analysis: O(n log (n))
// 1: O(n) as we go through each ele in the array. log(n) for each insert
//  - But true time of heapify is actually amortized O(n)
// 2: Loop requires n steps. Each n step requires a log(n) delete max operation.
//  - Total time for step 2 is O(n log(n))
// Space Complexity Analysis: O(n)
//  - O(n) for the heap that is constructed 

// In-place Heap Sort
function swap(array, i, j){
  [array[i], array[j]] = [array[j], array[i]]
}

function heapify(array, n, i){
  let leftIdx = 2 * i + 1;
  let rightIdx = 2 * i + 2;

  let leftVal = array[leftIdx]
  let rightVal = array[rightIdx]

  if (leftIdx >= n) leftVal = -Infinity
  if (rightIdx >= n) rightVal = - Infinity

  if (array[i] > leftVal && array[i] > rightVal) return;

  let swapIdx;
  if (leftVal < rightVal){
    swapIdx = rightIdx
  } else {
    swapIdx = leftIdx
  }

  swap(array, i, swapIdx)
  heapify(array, n, swapIdx)
}

function heapSort(array){
  for(let i = array.length - 1; i >= 0; i--){
    heapify(array, array.length, i)
  }
  
  for(let endOfHeap = array.length -1; endOfHeap >= 0; endOfHeap--){
    swap(array, endOfHeap, 0)
    heapify(array, endOfHeap, 0)
  }
  
  return array
}