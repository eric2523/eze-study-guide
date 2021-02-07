# Public vs Private vs Protected
Ruby is as class-based OOP language: every object is an instance of a class, and a class defines the state(variables) and behaviors(methods) of an object. 

Access control: way of protecting behaviors defined in a class from being called by other objects not in same class, or inherited from same class. 

## Public Methods
By default all methods are public. Public methods are called with the object as the explicit receiver (receiver.method). 
```ruby
class Person 
    def speak
        puts "Hi I like turtles" 
    end
end

john_wall = Person.new 
john_wall.speak # => "Hi I like turtles"
```

## Private Methods
Can only be used withiin the class definition; they're for internal usage. Only way to have outside access is to call the private method within a public method. Private methods can not be called with an explicit receiver, receiver is always implicity *self*. Think of private methods as internal helper methods. 
```ruby
class Person
    def speak
        puts "Hi I like turtles"
    end 

    def whisper_louder
        whisper
        # self.whisper 
    end

    private 
    def whisper
        puts "shhh"
    end
end

steph_curry = Person.new

steph_curry.speak # "Hi I like turtles"
steph_curry.whisper # NoMethodError
steph_curry.whisper_louder # "shhh"
```

## Protected Methods
Similar to private methods with addition that is can be called with, or without, and explicit receiver, but that receiver is always *self* (it's defining class) or an object that inherits from *self*. 

Private and protected methods are for internal usage, and can only be called externally within a public method. 
```ruby
class Person
    protected 

    def protected_greet
        puts "I'm protected"
    end
end 

class Me < Person 
    def greet
        protected_greet 
    end
end

eric = Me.new
eric.greet # "I'm protected"
eric.protected_greet # NoMethodError: protected method 'greet' called 
```

Defining a protected method as *self.method_name* is useful when we want the bulk of our non-response logic in our Models, as opposed to Controllers. 

## Summary

Use private methods for internal usage without a receiver, and protected methods defined as *self.method_name* for internal usage in other classes whenever inheritance isn't set up. 