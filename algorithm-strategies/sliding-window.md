# Sliding Window Technique 
There are two types of sliding windows, **Fixed Window Length** and **Two Pointers**. This document will focus on two pointers. Sliding windows are useful for solving problems that finds substrings or subarrays. This technique can reduce runtime by converting nested O(N<sup>2</sup>) loops into single O(N) loops. 

## Two Pointers
**Overview:**
- Start with 2 pointers, left and right (*a* and *b*) that both initially point to the first element of string or array. 
- Increment right (*a*) to expand the window 
- Increment left (*b*) to find a smaller window 