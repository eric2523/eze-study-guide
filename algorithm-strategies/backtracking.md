# Backtracking
Backtracking sounded very intimidating to me but after I followed [labuladong's](https://github.com/labuladong) template (can be found [here](https://github.com/labuladong/fucking-algorithm)) on how to solve backtracking problems, N Queens problem was a breeze. In this doc, I will try to explain the pattern and template in my own words and try to add more helpful tips and tricks. 

## Template
With any backtracking problem, we need to think about 3 things before we start coding. 
1. **Path**: This is our selection, our choice that we make and have to build off of (I'll get more detail of each choice later).
2. **Selection List**: Where are our choices going to live? Typically, our path choices will be in an array since an array is able to store values and provide ordering through indices (ordering will be useful later when we get into the actual backtrack functionality). 
3. **Goal/End Condition**: What is our base case? When can we no longer make any choices? When can we no longer create any new paths? 

### Path
I think a good way of thinking about paths and choices can be thought of as going through a maze. Let's say you're walking through a maze at point A and you want to reach point Z. If you reach a fork and must either go to point B or C, what happens if you go to a wrong path? You go back or *backtrack* and go to the next path. Deciding which path to take is exactly how we think of paths when doing a problem like N Queens or Palindromic Partitioning. 