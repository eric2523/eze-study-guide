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

# Strings
### Flexible quotes can handle long-complicated strings. Can use almost any non-alphabetic & non-whitespace char. 
```rb
  a = %(flexible quotes can handle both ' and ")
  b = %!flexible quotes can handle both ' and " characters!
  c = %{flexible quotes can handle both ' and " characters}

  a == b # => true
  a == c # => true 
```

### Flexible quotes can also handle multiple lines. Using the ```.lines``` method splits string into an array based off \n. 

```rb
  long_str = %{
    It was the best of times,
    It was the worse of times
    }

  long_str.lines # => ["\n", "It was the best of times,\n", "It was the worse of times\n"]
  long_str.lines.count # => 3
```

### String Concatenation 
We prefer using << operations instead of += when building strings because we avoid creating multiple objects. This can reduce the number of bugs by keeping our responsibilites onto one object. 
```rb
  # Plus operations will leave the string unmodified/unmutated 
  first = "Hello "
  second = "World!"
  string = first + second # => "Hello World!"
  first # => "Hello " 
  second # => "World!"

  # += and << will append to end of string
  first = "My "
  second = "Name:" 
  first += second 
  first # => "My Name:"
  first << second 
  first # => "My Name:Name:"

  # += will leave original string unmodified, << will not 
  original = "Hello "
  first = original
  second = "World" 
  first += second # => "Hello World"
  original # => "Hello "
  first << second 
  original # => "Hello World"
```

| Double quotes ""          | Single quotes ''                 |
|---------------------------|----------------------------------|
| Interpret escape chars \n | Do not interpret escape chars \n |
| Interpolate variables     | Do not interpolate               |
|                           | Sometimes interpret escape chars |

```rb
  word = "im in there"
  good_interpolation = "This #{word} will be interpolated" # => "This im in there will be interpolated"
  bad_interpolation = 'This #{word} will not be interpolated' #=> 'This #{word} will not be interpolated'

  # Any Ruby expression can be interpolated
  good_interpolation = "The square root of 6 is #{Math.sqrt(6)}"
```

Strings are unique objects
```rb
  a = "a string"
  b = "b string"
  a == b # => true
  a.object_id == b.object_id # => false 
```
# Symbols
```rb
  # Symbols are Symbols
  some_symbol = :ruby
  some_symbol.is_a?(Symbol) # => true 

  # Symbols can be compared
  sym1 = :a_symbol
  sym2 = :a_symbol
  sym3 = :b_symbol
  sym1 == sym2 # => true 
  sym1 == sym3 # => false 

  # Identical symbols share one object_id 
  sym1.object_id == sym2.object_id # => true 
```

Method names become symbols. This is why we use can use methods in Rails for associations. 

```rb
def some_method_name 
  symbols_as_strings = Symbol.all_symbols.map{ |x| x.to_s }
  return symbols_as_strings.include?("some_method_name")
end

some_method_name #=> true 
```

Symbols can be built with spaces
```rb
  "space space space".to_sym #=> :"space space space"
```
Symbols can built with interpolation
```rb
  word = "soup"
  my_symbol = :"chicken noodle #{word}"
  my_symbol # => :"chicken noodle soup"
```
Interpolated symbols are turned into strings (.to_s)
```rb
  my_sym = :bang
  str = "Fireworks go #{my_sym}"
  str # => "Fireworks go bang"
```

String methods do not work on symbols. Symbols are not "immutable strings", though they are immutable. Symbols can be dynamically created. 

```rb
  ("cats" + "dogs").to_sym # => :catsdogs
```

# RegEx ): 
Created using /.../ and %r{...} literals, and by Regexp::new constructor. 