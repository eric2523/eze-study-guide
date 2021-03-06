# Heaps 
A **heap** is a partially ordered data structure that can be visualized as a BST. One difference is that it is not fully ordered like BSTs and is usually implemented using an array. 

## Max Heap
Invariant (fancy word for "never changing"): Given any node, its children must be less than or equal to the node. 

Heaps are represented with complete trees because complete trees allows us to use a compact array with no explicit links. Heaps are pretty inflexible, but they give just enough wiggle room to implement logarithmic *insert* and *deleteMax/Min*. Heaps can move up and down paths without pointers through indices.

![max-heap](https://github.com/eric2523/eze-study-guide/blob/main/data-structures/heaps/max-heap.png?raw=true)

Notice that root node is absolute max. Also notice that unlike BSTs, left keys are not always smaller than right keys. This means that there are no gurantees amongst siblings or cousins. Guranteed relationship only flows down the tree from parent to child. 

When is a Heap useful?
* When we need quick access to largest/smallest item. With a Max/MinHeap, the largest or smallest item will always be at the root node. Note that O(1) access is only available to the root (only largest/smallest item). 
* Attacking problems where you need to "partially" sort data
  * Ex/ calculate largest/smallest n numbers of collection 

Pros of a Heap:
* Quick-access to nodes by index (will get into why later)
* In-place sorting (sorting is just swapping indices)

## Implementation (see [heap-implementation](https://github.com/eric2523/eze-study-guide/blob/main/data-structures/heaps/implement-heap-solution.js))

# Heapsort

Click [here](https://github.com/eric2523/eze-study-guide/blob/main/data-structures/heaps/heapsort.js) for both in-place and regular heap sort implementation

**Two Phases:**
1. *heap construction (heapify)*: reorganize given array into a heap 
2. *sortdown*: pull items out of heap in decreasing order (if working with a max heap) to create sorted result 

## Regular Heap Sort
Regular heap sort is pretty simple. We construct a new heap with the given array and continously deleteMax until the heap is empty. Checkout the [actual implementation](https://github.com/eric2523/eze-study-guide/blob/main/data-structures/heaps/heapsort.js) for the real code. Below is some psuedocode. 
```js
function heapSort(array){
  let heap = new MaxHeap()
  array.forEach(ele => heap.insert(ele))

  let sorted = []
  while(heap is not empty){
    let max = delete max from heap 
    sorted.push(max)
  }
  return sorted
}
```

## In-place Heap Sort
We are going to follow the same two steps: construction and sortdown. But construction is going to be a little different since we want to do this in-place without extra space. 

Construction:
* Have two regions:
  1. Heap region
  2. Sorted region 
* Begin by making entire region into heap
* Continuously delete max and expand sorted region
  * As heap region shrinks, sorted region grows
  * delete max will be swapping the front of the heap with the last element of the heap. This effectively grows sorted and shrinks heap by 1.  

```js
function heapSort(array){
  for(right -> left of array){
    heapify(array)
  }

  until(heap size is 0){
    swap(array, 0, endOfHeap)
    heapify(array, 0, endOfHeap)
  }

  return array
}
```