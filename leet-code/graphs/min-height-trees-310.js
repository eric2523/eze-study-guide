// https://leetcode.com/problems/minimum-height-trees/
// /**
//  * @param {number} n
//  * @param {number[][]} edges
//  * @return {number[]}
//  */
var findMinHeightTrees = function (n, edges) {
  let leaves = [];
  // base case if nodes is <= 2 then those are the centroids
  if (n <= 2) {
    for (let i = 0; i < n; i++) {
      leaves.push(i);
    }
    return leaves;
  }

  // populate our adj list. I'm going to use a combo of an array and set
  let adj = new Array(n).fill().map((el) => new Set());
  // populate or set. Each index points to a node and the value is a set of neighbors
  for (const [v, e] of edges) {
    adj[v].add(e);
    adj[e].add(v);
  }

  for (let i = 0; i < adj.length; i++) {
    if (adj[i].size === 1) {
      leaves.push(i);
    }
  }

  while (n > 2) {
    n -= leaves.length;
    let next = [];

    for(const leaf of leaves){
      let j = adj[leaf][Symbol.iterator]().next().value
      adj[j].delete(leaf)
      if (adj[j].size === 1){
        next.push(j)
      }
    }
    leaves = next;
  }
  return leaves; 
};

console.log(findMinHeightTrees(4, [[1,0],[1,2],[1,3]])) // [1]
console.log(findMinHeightTrees(6, [[3,0],[3,1],[3,2],[3,4],[5,4]])) // [3, 4]
console.log(findMinHeightTrees(1, [])) // [3, 4]
