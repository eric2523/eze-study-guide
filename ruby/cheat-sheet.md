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

# Hashes

```rb
hash = { :one => "uno" }
hash[:doesnt_exist] # nil
hash.fetch(:doesnt_exist) # KeyError: key not found: :doesnt_exist

# Hash is unordered
hash1 = { :one => "uno", :two => "two" }
hash2 = { :two => "two", :one => "uno" }
hash1 == hash2 # true 

# Modifying a Hash key while its still in use damages hash's index

# Before modification 
arr0 = [ :foo, :bar ]
h1 = { arr0 => 0 }
h1.include?(arr0) # => true

# modification 
arr0[0] # => :foo
arr0.hash # => 1100
arr0[0] = :baz # => [ :baz, :bar ]
arr0.hash # => 1101

# after modification
h1.include?(arr0) # => false 
h1[arr0] # => nil 

# Repair hash index
h1.rehash # => { [:baz, :bar] => 0 } 
h1.include?(arr0) # => true 
h1[arr0] # => 0 
```