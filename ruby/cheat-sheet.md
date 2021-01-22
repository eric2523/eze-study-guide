# About Objects
* Everything is an object 
* Objects can be converted to strings
* Clone creates a different object

# Array Assignments
### Parallel Assignments

```rb 
first_name, last_name = ["John", "Smith"]
first_name == "John" # true
last_name == "Smith"  # true

first, second = ["Hello"]
first == "Hello" # true
second == nil # true

# Assignment with one variable
first, = ["Jordan", "Michael"]
first == "Jordan" # true 

# Swapping with parallel assignment
first = "Phineas"
last = "Ferb"
first, last = last, first
first == "Ferb" # true
last == "Phineas" # true
```