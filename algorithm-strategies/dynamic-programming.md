# Dynamic Programming 
Dynamic programming was very intimidating to me. Most of the problems that involved DP were very long and difficult which made me set-aside learning DP. This article will hopefully make it easier on myself to gain a better grasp of what DP is. To start, it is important to understand that dynamic programming is a tool for **optimization** of problems. 

The motivation behind DP is to systematically search all possibilities **without redundant recomputation**. In general, DP stores previously computated data so that the algorithm does not have to recompute but reference the previously computed data. 

## Fibonacci Numbers
Take a look at fib numbers. The formula is F<sub>*n*</sub> = F<sub>*n - 1*</sub> + F<sub>*n - 2*</sub>, F<sub>0</sub> = 0, F<sub>1</sub> = 1. Implementing this using recursion is simple but inefficient. Why? Because we need to make redudant calculations of prior numbers. To get Fib of N = 4, we need to compute Fib of N = 3, Fib of N = 2, etc. 