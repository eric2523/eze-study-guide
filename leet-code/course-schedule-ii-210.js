// https://leetcode.com/problems/course-schedule-ii/
// There are a total of n courses you have to take labelled from 0 to n - 1.

// Some courses may have prerequisites, for example, if prerequisites[i] = [ai, bi] this means you must take the course bi before the course ai.

// Given the total number of courses numCourses and a list of the prerequisite pairs, return the ordering of courses you should take to finish all courses.

// If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.

// Example 1:
// Input: numCourses = 2, prerequisites = [[1,0]]
// Output: [0,1]
// Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].

// Example 2:
// Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
// Output: [0,2,1,3]
// Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
// So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].

// Example 3:
// Input: numCourses = 1, prerequisites = []
// Output: [0]

// /**
//  * @param {number} numCourses
//  * @param {number[][]} prerequisites
//  * @return {number[]}
//  */

// Total space and time: O(V + E) where V = num of vertices (courses) and E = num of edges (prereqs)
var findOrder = function(numCourses, prerequisites) {
  let indegrees = new Array(numCourses).fill(0)

  // O(E) edges
  for(const [course, prereq] of prerequisites){
    indegrees[course]++
  }

  let queue = [];
  // O(V) vertices 
  for(let i = 0; i < indegrees.length; i++){
    if(indegrees[i] === 0){
      queue.push(i)
    }
  }

  let output = [];
  // O(V)
  while(queue.length){
    let node = queue.pop();
    output.push(node)
    // O(E)
    for(const [course, prereq] of prerequisites) {
      if (node === prereq){
        indegrees[course]--
        if (indegrees[course] === 0){
          queue.push(course)
        }
      }
    }
  }

  return (output.length === numCourses ) ? output : []
};

console.log(findOrder(2, [[1,0]])) // [0, 1]
console.log(findOrder(4, [[1,0],[2,0],[3,1],[3,2]]))  // [0,2,1,3] or [0,1,2,3]
console.log(findOrder(3, [[1,0],[1,2],[0,1]])) // []