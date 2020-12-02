# Reservoir Sampling
Reservoir sampling is a family of algorithms that chooses a sample of size *k* over *n* possibilities/samples. If we knew what *n* is ahead of time then the solution is easy. All we need to do is select the indices of the sample based off a random number from 0-9. But the problem arises when we do not know what *n* is or it is ever-changing. This algorithm is useful because it allows for sampling over one pass in O(n) time and adapts probabilities based off an ever-changing *n* size. 

## Algorithm R by Alan Waterman
General approach:
1. Store the first *k* elements in a reservoir of size *k* 
2. For *i* > *k*, let *j* be the probability that the element gets into the reservoir by replacing a random spot in the reservoir. 

### How do we compute *j*?
The probability of being in the reservoir is 1/*k* and the probability that an element gets selected when i > k is *k*/*i*. Math is hard for me so I had to walk through the entire equation to understand how the math worked. Multiplying these two probabilities gives us the ultimate probability for an element to be selected AND put in the reservoir. 
```js
k = 3
i = 4

j = ( 1/4 * 3/4 )
j = 3 /12
// chance of being selected in reservoir
j = 1 /4 

// Second part gives a random number from (0..2)
// if thats less than k than we replace that index with ele 
j = ( 1/k * k/i ) * Math.floor(Math.random() * k)
```