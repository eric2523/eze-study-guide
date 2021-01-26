// https://leetcode.com/problems/path-with-minimum-effort/

// You are a hiker preparing for an upcoming hike. You are given heights, a 2D array of size rows x columns, where heights[row][col] represents the height of cell (row, col). You are situated in the top-left cell, (0, 0), and you hope to travel to the bottom-right cell, (rows-1, columns-1) (i.e., 0-indexed). You can move up, down, left, or right, and you wish to find a route that requires the minimum effort.

// A route's effort is the maximum absolute difference in heights between two consecutive cells of the route.

// Return the minimum effort required to travel from the top-left cell to the bottom-right cell.

// Pseudo-code
// Given: 
  // - 2D array representation of a grid 
  // height[row][col] = effort to travel to that cell 
  // startPos = 0,0 
  // endPos = row.length - 1, col.length - 1

// Return:
  // - Integer representing the min effort required to travel 

// What we know:
  // - Possible movements: row + 1, row - 1, col - 1, col + 1 (down, up, left, right)
  // - Need to make our way to bottom right of Grid
  // - Border constraints: 
  //   - (row >= 0 && row <= row.length - 1) 
  //   - (col >= 0 && col <= col.length - 1)

// Djikstra 

const minimumEffortPath = function (heights) {
  
}

const heights1 = [[1,2,2],[3,8,2],[5,3,5]]
minimumEffortPath(heights1) // => 2 
// The route of [1,3,5,3,5] has a maximum absolute difference of 2 in consecutive cells.
// This is better than the route of [1,2,2,2,5], where the maximum absolute difference is 3.

const heights2 = [[1,2,3],[3,8,4],[5,3,5]]
minimumEffortPath(heights2) // => 1
// The route of [1,2,3,4,5] has a maximum absolute difference of 1 in consecutive cells, which is better than route [1,3,5,3,5].

const heights3 = [[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]] // => 0
// This route does not require any effort