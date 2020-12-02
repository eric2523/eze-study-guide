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