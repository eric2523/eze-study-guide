// /**
//  * @param {string[][]} tickets
//  * @return {string[]}
//  */
const buildGraph = (tickets) => {
  let graph = {}
  
  for(const [from, to] of tickets){
      if (graph[from] === undefined){
          graph[from] = [];
      }
      
      if (graph[to] === undefined){
          graph[to] = [];
      }
      
      graph[from].push(to)
  }
  return graph; 
}

var findItinerary = function(tickets) {
  const adj = buildGraph(tickets)
  let output = []

  for(const airline in adj){
    adj[airline] = adj[airline].sort()
  }

  let stack = [ "JFK" ];

  while (stack.length){
    let node = stack[stack.length - 1]

    if (!adj[node].length){
      output.push(node) 
      stack.pop() 
    } else {
      stack.push(adj[node].shift())
    }
  }
  return output.reverse()
};

// Example 1:
// Input: [["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]]
// Output: ["JFK", "MUC", "LHR", "SFO", "SJC"]

console.log(findItinerary([["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]]))

// Example 2:
// Input: [["JFK","KUL"],["JFK","NRT"],["NRT","JFK"]]
// Output: ["JFK","NRT","JFK","KUL"]

console.log(findItinerary([["JFK","KUL"],["JFK","NRT"],["NRT","JFK"]]))