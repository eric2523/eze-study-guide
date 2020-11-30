class MaxHeap {
  constructor() {
    this.array = [null];
  }

  getParent(idx) {
    return Math.floor(idx / 2);
  }

  getLeftChild(idx) {
    return idx * 2;
  }

  getRightChild(idx) {
    return idx * 2 + 1;
  }

  siftUp(idx) {
    // base case if the node is at the root
    if (idx === 1) return;

    let parentIdx = this.getParent(idx);

    if (this.array[parentIdx] < this.array[idx]) {
      [this.array[parentIdx], this.array[idx]] = [this.array[idx],this.array[parentIdx]];
      this.siftUp(parentIdx);
    }
  }

  insert(val) {
    this.array.push(val);
    let idx = this.array.length - 1;
    if (val > this.array[this.getParent(idx)]) {
      this.siftUp(idx);
    }
  }

  siftDown(idx) {
    let ary = this.array 
    let leftChildIdx = this.getLeftChild(idx)
    let rightChildIdx = this.getRightChild(idx)
    let leftChildVal = ary[leftChildIdx]
    let rightChildVal = ary[rightChildIdx]

    if (leftChildVal === undefined) leftChildVal = -Infinity
    if (rightChildVal === undefined) rightChildVal = - Infinity

    if (ary[idx] > leftChildVal && ary[idx] > rightChildVal) return;

    let swapIdx;
    if (leftChildVal > rightChildVal){
        swapIdx = leftChildIdx
    } else {
        swapIdx = rightChildIdx
    }

    [ary[idx], ary[swapIdx]] = [ary[swapIdx], ary[idx]]
    this.siftDown(swapIdx)
  }

  deleteMax(){
    if (this.array.length === 2) return this.array.pop();
    if (this.array.length === 1) return null;

    let max = this.array[1]
    this.array[1] = this.array.pop(); 

    this.siftDown(1);
    return max;
  }
}
