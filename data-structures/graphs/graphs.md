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
```
