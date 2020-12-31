// https://leetcode.com/problems/clone-graph/
// Some personal Notes: a Map object holds key value pairs but unlike a regular hash table it remembers the order of insertions
// A Map object iterates its elements in insertion order
// Some key differences between an Map and an Object
//  - Map's keys can be any value (including functions, objects, or any primitives)
//  - Keys of an object must either be a String or an Symbol

function Node(val, neighbors) {
   this.val = val === undefined ? 0 : val;
   this.neighbors = neighbors === undefined ? [] : neighbors;
};

const cloneGraph = function (node) {
  if (!node) return node;
  let map = new Map();

  const deepClone = (v) => {
    if (!map.has(v.val)){
      map.set(v.val, new Node(v.val) )
      map.get(v.val).neighbors = v.neighbors.map(deepClone)
    }
    return map.get(v.val)
  }
  return map.get(node.val)
};
