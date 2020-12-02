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