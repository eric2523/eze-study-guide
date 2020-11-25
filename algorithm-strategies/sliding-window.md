# Sliding Window Technique 
There are two types of sliding windows, **Fixed Window Length** and **Two Pointers**. This document will focus on two pointers. Sliding windows are useful for solving problems that finds substrings or subarrays. This technique can reduce runtime by converting nested O(N<sup>2</sup>) loops into single O(N) loops. 

## Two Pointers
**Overview:**
- Start with 2 pointers, left and right (*a* and *b*) that both initially point to the first element of string or array. 
- Increment right (*a*) to expand the window 
- Increment left (*b*) to find a smaller window

## Examples
### Longest Substring Without Repeating Characters
Given a string **s**, find the length of the **longest substring** without repeating characters

First keyword that I see is "substring" which immediately makes me think about whether or not a sliding window technique is appropriate. Another key line that I see is "without repeating characters". In other words, no consecutive characters. 

My brute force approach would be to populate all possible substrings and check two conditionals:
1. Whether or not the substring has consecutive characters
2. Whether or not the current substring is the longest

This approach would take O(N<sup>2</sup>) time to generate the substrings and possibly another O(S) time to check for whether the substring has consecutive characters. 

