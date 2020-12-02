# Reservoir Sampling
Reservoir sampling is a family of algorithms that chooses a sample of size *k* over *n* possibilities/samples. If we knew what *n* is ahead of time then the solution is easy. All we need to do is select the indices of the sample based off a random number from 0-9. But the problem arises when we do not know what *n* is or it is ever-changing. This algorithm is useful because it allows for sampling over one pass in O(n) time and adapts probabilities based off an ever-changing *n* size. 

## Algorithm R by Alan Waterman
General approach:
1. Store the first *k* elements in a reservoir of size *k* 
2. For *i* > *k*, let *j* be the probability that the element gets into the reservoir by replacing a random spot in the reservoir. 