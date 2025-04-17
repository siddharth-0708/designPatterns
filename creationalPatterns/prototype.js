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
//4. How classes are implementing prototypes underneath?

/* WHAT IS PROTOTYPE?
In javascript all functions can work as classes when we call with 'new' keyword instance. Now if we write all methods in the function itself it will become too difficult to expand and also we cannot inherit those methods. (since only inside the function we can call them). So, inorder to achieve them, whenever we create a instance of functional class, js creates a prototype (in the constructor so that we can do Object.prototype) and assign all the methods in that. This is for all instances. .prototype = new Object() or {} (both are same).

lets look into this new Object.

Object is a function.

Object.prototype has all written object methods.
but Object.prototype is again a instance of object ryt. so what does Object.prototype.__proto__ has? It will be null. Because Object is the root.
Note: Javascript engine has written all the utils methods like static methods so that we can utilize them without creating the instance. For example Object.freeze or Array.isArray etc.

--> Difference between Function and function.
Function - A real object in memory, used to create functions dynamically
const sum = new Function('a', 'b', 'return a + b');
console.log(sum(2, 3)); // 5

function - A syntax keyword to define a function

A function in JavaScript is a special kind of object — it’s callable (you can invoke it), but it also has properties and behaves like an object.

typeof a function is "function" (but it’s still an object internally)

const a = new Object();
Object.prototype
a.__proto__ === Object.prototype //true

Object.__proto__ -- > ƒ () { [native code] } This is for all class functions (Object.__proto__ === Function.prototype
)
function Name(name) {
    this.name = name;
}

Name.prototype -- > {} or new Object

Now think Name.prototype as instance because Name.prototype = new Object();

Name.prototype.__proto__ == all the Object methods. (Object.prototype)

same for Array or set or map.

const a = new Array();

Array.prototype has all the methods of the array. so a.__proto__ == Array.prototype.

Array is a method so Array.prototype.__proto__ will point to Object.prototype. (same logic as above).

IMPORTANT:

When we do const a = new Array(); a.name or a.methodName js will internally go and look at the __proto__ object of a. if it finds then it returns else it will go to another level (inheritance). In this case it will go to Array.prototype.__proto__.
This is prototype pattern and difference from class based implementation.

//Todo:
1. write pollyfill for this __proto__ search behavior
2. what object.create does? - Done
3. Pollyfill for bind call and apply?
4. 'this' concept
5. deep copy
6. How classes work - Done

Object.create - 

This method is used for inheritance in js.
const b = Object.create(a);
So: b.__proto__ === a;

It creates a new object, and sets its prototype to exactly what you pass in.

If you set b.__proto__ = a.__proto__, then b will not inherit the instance-specific properties of a.

constructors:

All functions that are invoked with new keyword are constructors. So here function act as a constructor(since it also initializes the variables), and also class in class based.
when js assigns object to the .prototype, it also sets a constructor that points to the function(class). For inheritance, we need to set constructor explcitly because Object.create do not assign a constructor and it just creates a empty object and points the prototype to its proto. So we will not have .constructor directly and it will fetch .constructor through prototype chaining. Thats why we set the constructor.

*********************

    function Name(name){
        this.name = name;
    }
    undefined
    Name.prototype.constructor
    ƒ Name(name){
        this.name = name;
    }
    Name.prototype
    {}constructor: ƒ Name(name)[[Prototype]]: Object
    Name.prototype.setName = function (name) {
        this.name = name;
    }
    ƒ (name) {
        this.name = name;
    }
    function Age(age) {
        this.age = age;
    }
    undefined
    Age.prototype.setAge = function (age) {
        this.age = age;
    }
    ƒ (age) {
        this.age = age;
    }
    function Inher(){
        this.job = "IT";
    }
    undefined
    Inher.prototype = Object.create(Name.prototype);
    Name {}
    Inher.prototype.__proto__
    {setName: ƒ}
    Inher.prototype.__proto__.__proto__
    {__defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, __lookupSetter__: ƒ, …}
    Inher.prototype
    Name {}[[Prototype]]: ObjectsetName: ƒ (name)constructor: ƒ Name(name)[[Prototype]]: Object
    Inher.prototype.constructor
    ƒ Name(name){
        this.name = name;
    }
    Inher.prototype.constructor = Inher;
    ƒ Inher(){
        this.job = "IT";
    }
    Inher.prototype
    Name {}constructor: ƒ Inher()[[Prototype]]: ObjectsetName: ƒ (name)constructor: ƒ Name(name)[[Prototype]]: Object
    Inher.prototype.constructor
    ƒ Inher(){
        this.job = "IT";
    }

*********************

Consequence #1: Wrong constructor reference

const obj = new Inher();

console.log(obj.constructor === Inher); // ❌ false
console.log(obj.constructor === Name);  // ✅ true (but wrong logically!)

Meaning:

obj is supposed to be an instance of Inher.

But obj.constructor points to Name, not Inher.

If someone relies on obj.constructor to know what type it is, they will get confused.


Consequence #2: Issues in instance type checking

function createNew(obj) {
    return new obj.constructor("something");
}

const instance = new Inher();
const another = createNew(instance);

Here, instance.constructor is wrongly pointing to Name, so createNew(instance) will create a Name object, not an Inher object!


CALL method:

When you inherit properties (not methods), you can just call the parent constructor inside the child.

If you want to inherit methods too, you have to manually setup prototype chain (Object.create or extends).

function Parent(name) {
    this.name = name;
}
Parent.prototype.sayHi = function() {
    console.log("Hi, I'm " + this.name);
};

function Child(name, age) {
    Parent.call(this, name); // ✅ Inherit variables
    this.age = age;
}

// ✅ Inherit methods (prototype chain)
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child; // 🛠 Important: Fix the constructor

Child.prototype.sayAge = function() {
    console.log("I'm " + this.age + " years old");
};

const c = new Child("Sid", 30);

console.log(c.name);    // Sid (inherited via .call)
c.sayHi();              // Hi, I'm Sid (inherited via Object.create)
c.sayAge();             // I'm 30 years old (Child's own method)



It immediately calls the function you specify.

It forces the this inside that function to point to the object you pass.

It assigns whatever properties or actions happen inside the function — to that object.

It does NOT touch or mess with the prototype chain at all.

.call just assigns, doesn't inherit. .create inherits, doesn't assign.

*/
