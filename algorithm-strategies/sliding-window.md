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

This approach would take O(N<sup>2</sup>) time to generate the substrings and possibly another O(S) time to check for whether the substring has consecutive characters. That's pretty bad. Just think about trying to search through the whole alphabet with this approach just to find out the answer is 1. Yikes...

**Way Better Two Pointer Approach:**

We follow the overview template. First use two pointers (*a* and *b*) that both point to the beginning index of the string. Then we keep incrementing *a* pointer until we either 1) reach the end of the string, or 2) we run into a character that we have already seen before. 

But wait.. How can we keep track of what we've seen? We can either use hashtable or a set. I think a set would be handy here since we don't need to keep track of any pairs. We just want to know whether or not we've seen a character before. 

Bringing this all together. We use the sliding window technique to build substrings in O(N) time. Use a set to keep track of previously seen characters. 

**Pseudo Code:**
```
let [a, b] = [0, 0]
let alreadySeenChars = new Set()
let greatest = 0;
while(a < input's length){
  if (Set doesn't have char){
    add a pointer's char in set;
    increment a pointer;
  } else {
    remove b pointer's char;
    increment b pointer 
  }

  if (current Set size > previous greatest Set size){
    greatest = current Set size 
  }
}
```