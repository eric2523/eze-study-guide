// https://leetcode.com/problems/course-schedule/

//* Example 1:
//* Input: numCourses = 2, prerequisites = [[1,0]]
//* Output: true
//* Explanation: There are a total of 2 courses to take. 
//*              To take course 1 you should have finished course 0. So it is possible.

//* Example 2:
//* Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
//* Output: false
//* Explanation: There are a total of 2 courses to take. 
//*              To take course 1 you should have finished course 0, and to take course 0 you should
//*              also have finished course 1. So it is impossible.

// /**
//  * @param {number} numCourses
//  * @param {number[][]} prerequisites
//  * @return {boolean}
//  */

const canFinish = function(numCourses, prerequisites) {
  // initiate an array to store the number of prereqs we need to take for each course
  let indegrees = new Array(numCourses).fill(0)
  // everytime we see a [course, prereq] pair, we increment the number of prereqs needed to take a course
  // # of prereqs === # of indegrees 
  for(const [course, prereq] of prerequisites){
    indegrees[course]++
  }

  let queue = [];
  // iterate through all courses and check if we can take any courses without any prereqs
  for(let i = 0; i < indegrees.length; i++){
    // i corresponds to the course
    // if the value at i === 0, we don't have any prereqs to take
    if (indegrees[i] === 0){
      queue.push(i)
    }
  }

  // count keeps track of how many classes we've taken
  let count = 0;
  while(queue.length){
    // pop off a node also means we took a course with 0 prereqs left so we increment our count
    let node = queue.pop();
    count++
    // iterate through all our prequisites pairs and find the corresponding course to the node we just popped off
    for(const [course, prereq] of prerequisites){
      if (node === prereq){
        indegrees[course]--
        // we only push into the queue if we are able to take the class
        // we are able to take the class if we taken all the prereqs 
        // we've taken all the preqs if indegree === 0
        if(indegrees[course] === 0){
          queue.push(course)
        }
      }
    }
  }
  // boolean that checks if we've taken all the courses
  return count === numCourses
};

console.log(canFinish(2, [[1,0]])) // true
console.log(canFinish(2, [[1,0], [0,1]])) // false