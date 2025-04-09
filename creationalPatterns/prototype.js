/* 
prototype - A partially or fully initialized object that you copy (clone) and make use of it.

1. Shallow copy: A shallow copy creates a new object, but it only copies the references of nested objects instead of duplicating them. This means that if the nested object is modified in the copy, the original object is also affected.

2. Deep copy: A deep copy creates a completely independent duplicate of the object, including all nested objects. Changes in the copy do not affect the original.

task: 
1. Implement deep and shallow copy.
2. why JSONPARSE did not have greet methpd?
*/

/*
Prototype design pattern:

"Instead of creating new objects from scratch, create new objects by copying (cloning) existing ones."
*/

/*
OBSERVATIONS:

1. Everthing in Js is an Object. Be in functions, arrays, set, map etc. --The start Point (global class).
2. const a = {} and const b = new Object is same. Js internally do new Object() for {}. And Object is a class (functional).
3. Js will differentiate between normal function and class function by seeing new keyword on instance creation. If instance is created then function constructor is invoked and becomes an object. 
*/

function PrototypeDemo(name, age){
    this.name = name;
    this.age = age;

    /*
     When you define method inside constructor:
     Every time you create a new instance, a new copy of setName function is created in memory.
     Downside: Memory inefficient if you create many instances, because methods are duplicated.
     No Inheritance

     When you define method on prototype:
     Now, both instances share the same function from the prototype.
💡   Advantage: Memory efficient and good practice. Only one copy of the method exists, no matter how many instances you create.
     you can now extend this with inheritance.
    */
    this.setName = function(name){
        this.name = name;
    }
}
PrototypeDemo.prototype.setAge = function(age){
    this.age = age;
}

const a = new PrototypeDemo("sid", 31);
console.log(a.age, a.name);

a.setAge(22);
a.setName("kkk");
console.log(a.age, a.name);

//To do:
//1. write pollyfills for bind call and apply methods
//2. arrow functions and normal functions 'this' investigation
//3. deep copy logic
