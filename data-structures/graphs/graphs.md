# Graphs
A **graph** is **any** collection of nodes and edges 
* an **edge** is anything that connects a node 

A graph is much more relaxed than other types of trees such that it may:
* lack a root node
* have cycles (e.g. child points back to root node)
  * i.e. can be a multidirectional tree
* have any number edges leaving a node (i.e. one node can point to 0..Inifnity other nodes)
![graphs-img](./sample-graph.png)

## Adjacency Matrix Implementation 
Using a 2D array we can map out each node and and their direct edges. The values of the array will be a boolean indicating whether we can traverse from one node directly to the other. 

Here's an example: 
![adjacency-graph](./adjacency-graph.png)

```js
let matrix = [
/*          A       B       C       D       E       F   */
/*A*/    [true,  true,   true,   false,  true,   false],
/*B*/    [false, true,   false,  false,  false,  false],
/*C*/    [false, true,   true,   true,   false,  false],
/*D*/    [false, false,  false,  true,   false,  false],
/*E*/    [true,  false,  false,  false,  true,   false],
/*F*/    [false, false,  false,  false,  true,   true]
]
```
Let's say we wanted to find if C has an edge connecting B. We can just refer to slot in matrix[2][1] to see if we have an edge connecting C to B. IT IS IMPORTANT to understand that matrix[2][1] is FROM C TO B. Not the other way around!! If we look at matrix[1][2] we get false. 

Pros:
* Can refer to the entire graph just from the matrix

Cons:
* Dang does it take up space. For *N* nodes we need *N<sup>2</sup>* space. 
* If we have very few edges, most of the matrix would be filled with false values. 

## Adjacency List Implementation
We can also use an object that stores nodes as keys and an array of adjacent nodes as values. The space required is going to be the number of edges in the graph. Worse case there will be N<sup>2</sup> edges where every node points to all other nodes.

```js
let graph = {
  'a': ['b', 'c', 'e'],
  'b': [],
  'c': ['b', 'd'],
  'd': [],
  'e': ['a'],
  'f': ['e']
};
```

Pros:
* Can refer to entire graph through just an object

Cons:
* Space is still pretty big. The space required is the number of edges in the graph. Worst case: every node is connected to each other and thus n<sup>2</sup> edges

## GraphNode Class Implementation
Implementation is similar to binary trees. We have an node class that has references to the value and the node's neighbors. Con is that we have no easy way to refer to the entire graph. We only have a rough idea of what ONE node MIGHT look like. How will we pass this to a function if we might not have a root node? More on this below.

```js
class GraphNode{
  constructor(val){
    this.val = val
    this.neighbors = []
  }
}
```

## Graph Traversals
Let's start with Depth-First search on our GraphNode class. We can go through every neighbor and use a Set to store previously seen nodes. 

![graph-1](./graph-1.png)

### Recursive DFS

```js
function dfsRecur(node){
  let seen = new Set();
  // base case: if we've already seen the node, return early
  if (seen.has(node)) return;

  // else we process the node (in this case we console log it)
  console.log(node.val)
  // then add it to the seen Set 
  seen.add(node)

  // recurse on the node's neighbor 
  node.neighbors.forEach( neighbor => 
    dfsRecur(neighbor)
  )
}
```

### Iterative DFS

```js
function dfsIterative(node){
  let stack = [node];
  let seen = new Set();

  while (stack.length){
    let n = stack.pop();

    // if we already processed the node, continue to next node
    if (seen.has(n)) continue;

    // else we process the node and push it's neighbors onto the stack
    console.log(n.val)
    stack.push(...node.neighbors)
  }
}
```

There is a problem with this implementation. What node do we pick to start our DFS? If we look at the img its clear that node F is the root but how will the ClassNode know? Also, if we chose a bad starting node we might not be able to search through all nodes. An advantage of using an Adjacency List is that we can pass the entire graph representation as a parameter. The above implementation is also known as DFS-Visit.

### Recursive DFS with Adjancency List
```js
function dfs(graph){
  let visited = new Set();

  for(const node in graph){
    _dfs(node, graph, visited)
  }
}

function _dfs(node, graph, visited){
  if (visited.has(node)) return;

  console.log(node)
  visited.add(node);

  graph[node].forEach(neighbor =>
    _dfs(neighbor, graph, visited)
  )
}
```

Imagine if we have a graph like this. This is actually a single graph but called a "forest" because it consists of x "trees". 

![forest-graph](./forest.png)

Our adjancecy list will look like:
```js
let graph = {
  h: [i, j],
  i: [],
  j: [k],
  k: [],
  l: [m],
  m: []
}
```

We start at node *h* which will recurse to *i*, *j*, and *k*. After our initial recursion, we go back to the for loop to visit all other keys in the adjacency list object. 

### BFS with Adjacency List
Let's first consider a connected graph where we assume that all nodes are reachable from a starting node *s*. 

![bfs-ex1](./bfs-adj-1.png)

### Frontier/Level Implementation
The frontier variable is a array that stores all the nodes in a level. In this example, Node 1 is on level 0, Node 2 and 3 is on level 1, and so forth. The frontier variable is the queue in a normal bfs. In this case, we don't pop off elements off the queue but instead replace it with a new layer/level.
```js
let graph = {
  1: [2, 3],
  2: [5],
  3: [4],
  4: [],
  5: [3]
}

function bfs(s, graph){
// we will store two hashTables that references each node's level and parent element
  let level = {};
  let parent = {};
  let i = 1;
  level[s] = 0;

  let frontier = [ s ]
  while(frontier.length){
    let next = [];
    // iterate through current layer
    // we look at all nodes in the frontier (current layer)
    for(const u of frontier){
      // explore all neighbors that we can reach from the nodes in the frontier
      // nested for loop indicates that there is an edge from u -> v 
      for(const v in graph[u]){
        // level hash-table is our visited checker. If it is not undefined that we have already explored this node
        if (level[v] === undefined){
          level[v] = i;
          parent[v] = u;
          next.push(v)
        }
      }
    }
    // set next layer
    frontier = next;
    // increment i as we moved layers 
    i++
  }
}
```

The cool thing about BFS is that the parent paths actually gives us the shortest paths from starting node to a destination node. BFS gives us the fastest way to get to every where by exploring layer by layer. BFS is generally used when determining a part reachable from starting node *s* unlike DFS which is generally used for problems that need the whole graph. 

### DFS Edge Classifications

![edge-classification](./edge-classification.jpg)

**Tree Edge**: an edge that is present after applying DFS on the graph. All green edges in the pic above 
* visit a new vertex via an edge 

**Forward Edge**: an edge (u, v) that connects an ancestor of *u* that is not part of the graph
* there is a path from *u* to *v* going forward
* Edge from 1 to 8 is a forward edge

**Backward Edge**: if *v* is an ancestor of *u*

**Cross Edge**: if *v* is neither an ancestor or descendant of *u*
* between two non-ancestor related subtrees 

### Cycle Detention 
Graph has a cycle if the graph has a backedge. 

![back-edge](./back-edge.png)