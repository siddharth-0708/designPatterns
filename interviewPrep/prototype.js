/*
1. prototypes - rather than creating functions on each instance(memory inefficient), create in prototype so instances share them.
2. prototypes works through chaining/links.
3. classes also internally uses prototypes.
4. Js internally search through _proto_ of the instance created to get the method name if it exists. And it searches untill it reaches null.
5. We reach null when we are at object. because object has no links. Its the father of js and everything is derived from object.
*/

/*
------------------------------------------------------------------------------------------------------

Q) so in prototype design pattern, all methods act as static methods?
A)Short answer: no — but it’s a very common (and reasonable) way to think about it at first.

Why it feels like “static methods”

When you do this:
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {
  console.log(`Hi, I'm ${this.name}`);
};
All instances share one sayHi function:

const a = new Person("A");
const b = new Person("B");

a.sayHi === b.sayHi; // true

That looks like a static method:

One function

Shared by all instances

But behavior-wise, it’s not static.
------------------------------------------------------------------------------------------------------

The key difference: this

STATIC METHODS:

class Person {
  static sayHi() {
    console.log("Hi");
  }
}

Person.sayHi();   // works
new Person().sayHi(); // ❌

- Called on the class
- Has no instance context

Prototype method

Person.prototype.sayHi = function () {
  console.log(this.name);
};

a.sayHi(); // "A"
b.sayHi(); // "B"

Called on the instance

this is the calling object

The method is borrowed, not owned
------------------------------------------------------------------------------------------------------

So prototype methods are:

1. shared functions with dynamic instance contex
2. That’s the crucial distinction.
------------------------------------------------------------------------------------------------------
What’s really happening under the hood

When you call:
a.sayHi()

JavaScript does:
Look for sayHi on a

Not found → go to a.__proto__ (i.e. Person.prototype)

Find sayHi

Call it with this = a

So it’s more like:
Person.prototype.sayHi.call(a);

--------------------------------------------------------------
Better analogy than “static”. Think of prototype methods as:

1. Shared method implementations
2. Late-bound to the instance
*/

/*
EXAMPLE:

// 1. Constructor function
function Name(name) {
  // instance property (unique per object)
  this.name = name;
}

// 2. Prototype method (shared by all instances)
Name.prototype.convertNameToNumber = function () {
  if (this.name === "siddharth") {
    return 0;
  }
  return 1;
};

// 3. Another prototype method
Name.prototype.displayNumber = function (num) {
  console.log("this:", this, "| num:", num);
};

// --------------------------------------------------
// 4. Calling prototype methods DIRECTLY
// --------------------------------------------------

// `this` === Name.prototype
Name.prototype.displayNumber(23);
// → this: Name.prototype object | num: 23

// `this` === Name.prototype
Name.prototype.convertNameToNumber();
// → 1 (because prototype.name is undefined)

// --------------------------------------------------
// 5. Adding a property to the prototype (shared state)
// --------------------------------------------------

Name.prototype.name = "siddharth";

// Now `this.name` exists on the prototype
Name.prototype.convertNameToNumber();
// → 0

// --------------------------------------------------
// 6. Creating an instance
// --------------------------------------------------

const c = new Name("rohit");

// Instance has its OWN name
c.name; // "rohit"

// Instance method call
// `this` === c
c.convertNameToNumber();
// → 1 (instance property shadows prototype property)

// --------------------------------------------------
// 7. Prototype lookup demonstration
// --------------------------------------------------

c.__proto__.name; // "siddharth"
c.name;           // "rohit"

// --------------------------------------------------
// 8. Key rule demonstration
// --------------------------------------------------

// Same function, different `this`
c.displayNumber(99);              // this === c
Name.prototype.displayNumber(99); // this === Name.prototype

-----------------------------------------------------
Core Rules Captured in This One File

1.Prototype methods are shared
2.this depends on the call site
3.Prototype properties are shared state
4.Instance properties shadow prototype properties
5.Never store per-instance data on prototypes

SIMPLE FUNDA:
IN JS WHEN A CLASS FUNCTION IS CALLED, IT TAKES INSTANCE OF THE OBJECT THAT CALLED IT (THIS).
*/

/*
OBJECT.CREATE

Object.create does not copy.

/************************************************************
 * OBJECT.CREATE — COMPLETE NOTES (WITH EXPLANATION)
 ************************************************************/

/*
------------------------------------------------------------
1. What Object.create does
------------------------------------------------------------

Object.create(proto) creates a NEW object whose internal
[[Prototype]] is set to `proto`.

It does:
  - NO constructor call
  - NO property copying
  - ONLY prototype linking

const base = {
    greet() {
      console.log("hello");
    }
  };
  
  const obj = Object.create(base);
  
  obj.greet(); // "hello"
  
  // Prototype chain:
  // obj → base → Object.prototype → null
  
    ------------------------------------------------------------
  2. Object.create(null) — object with NO prototype
  ------------------------------------------------------------
  
  Useful for dictionaries / maps (no collisions)
  
  const dict = Object.create(null);
  
  dict.key = "value";
  
  dict.toString; // undefined
  dict.hasOwnProperty; // undefined
  
    ------------------------------------------------------------
  3. Correct inheritance with Object.create
  ------------------------------------------------------------
  
  Instances must inherit from Parent.prototype,
  NOT from the constructor function itself.
  
  function Name(name) {
    this.name = name;
  }
  
  Name.prototype.convertNameToNumber = function () {
    return this.name === "siddharth" ? 0 : 1;
  };
  
  function Age(age) {
    this.age = age;
  }
  
  IMPORTANT:
  Age.prototype must delegate to Name.prototype
  
  Age.prototype = Object.create(Name.prototype);
  
  Object.create DOES NOT add constructor.
  So constructor is inherited from Name.prototype
  (which is WRONG).
  
  Age.prototype.constructor = Age;
  
  ------------------------------------------------------------
  4. Prototype chain after correct setup
  ------------------------------------------------------------
  
  instance → Age.prototype → Name.prototype → Object.prototype
  
  const a = new Age(20);
  a.name = "rohit";
  
  a.convertNameToNumber(); // 1
  
  ------------------------------------------------------------
  5. Why Object.create(Name) is WRONG
  ------------------------------------------------------------
  
  Name is a FUNCTION, not a prototype object.
  
  Doing this:
  
  function WrongAge() {}
  
  WrongAge.prototype = Object.create(Name);
  
  Prototype chain becomes:
  
  instance → WrongAge.prototype → Name → Function.prototype
  
  So instance methods are NOT found.
  
  const w = new WrongAge();
  
  // w.convertNameToNumber(); ❌ TypeError
  
  ------------------------------------------------------------
  6. Proof: where methods live
  ------------------------------------------------------------
  
  Methods meant for instances live on:
    Constructor.prototype
  
  Name.prototype.sayHi = function () {
    console.log("Hi");
  };
  
  a.sayHi(); // works
  
  ------------------------------------------------------------
  7. Object.create does NOT copy properties
  ------------------------------------------------------------  
  const parent = { x: 10 };
  const child = Object.create(parent);
  
  child.hasOwnProperty("x"); // false
  child.x; // 10 (via prototype)
  
  ------------------------------------------------------------
  8. Shadowing prototype properties
  ------------------------------------------------------------

  child.x = 20;
  
  child.x; // 20 (own property)
  parent.x; // 10
   
  ------------------------------------------------------------
  9. constructor is NOT special
  ------------------------------------------------------------
  
  It's just a normal property.
  JS does NOT fix it automatically.
  
  a.constructor === Age; // true (after manual fix)
  
  ------------------------------------------------------------
  10. What class extends does internally
  ------------------------------------------------------------
  
  class Age extends Name {}
  
  Is roughly equivalent to:
  
  Age.prototype = Object.create(Name.prototype);
  Age.prototype.constructor = Age;

  ------------------------------------------------------------
  11. Mental model (IMPORTANT)
  ------------------------------------------------------------
  
  Object.create(proto):
    → creates a blank object
    → links it to proto
    → nothing else
  
  Objects inherit from OBJECTS.
  Functions are objects, but instance behavior lives on:
    function.prototype
  
    ************************************************************
   * END OF NOTES
   ************************************************************

   FUNDAAAAAAA:
   function myArray(data) {
    this.myArray = data;
    }

    js will attach a proptype object to this class, and that will be empty with constructor set as myArray and link this to object
*/

/*
/****************************************************************
 * NOTES: Custom Array-like Constructor + Array Inheritance
 ****************************************************************/

/*
---------------------------------------------------------------
1. Constructor function
---------------------------------------------------------------

function MyArray(data) {
// You store the actual array INSIDE the object
    this.myArray = data;
  }
  
  At this point:
  - Instances will have a property `myArray`
  - But they are NOT arrays yet
  */
  
  
  /*
  ---------------------------------------------------------------
  2. Inheriting from Array.prototype
  ---------------------------------------------------------------
  
  MyArray.prototype = Object.create(Array.prototype);
  
  What this does:
  - MyArray.prototype → Array.prototype
  - Instances inherit array METHODS (push, pop, etc.)
  - But the Array constructor itself is NOT called
  
  MyArray.prototype.constructor = MyArray;
  
  ---------------------------------------------------------------
  3. Adding custom prototype method
  ---------------------------------------------------------------
  
  MyArray.prototype.firstElementOfArray = function () {
    return this.myArray[0];
  };
  
  ---------------------------------------------------------------
  4. Creating an instance
  ---------------------------------------------------------------
  
  const a = new MyArray([1, 2, 3, 4, 5]);
  
  a.firstElementOfArray(); // 1
  
  
  ---------------------------------------------------------------
  5. Calling Array methods on the instance
  ---------------------------------------------------------------
  
  a.push(2);
  
  /*
  IMPORTANT:
  `push` operates on `this`, NOT on `this.myArray`
  
  So it treats `a` itself like an array object.
  
  ---------------------------------------------------------------
  VALUE / KEY EXPLANATION:
  ---------------------------------------------------------------
  - Array methods (like push) assign numeric keys starting from 0
    directly on the object (`a[0] = 2`)
  - The `length` property of `a` is updated automatically
  - Meanwhile, your internal array (`a.myArray`) is untouched by this push
  
  a;
  /*
  MyArray {
    0: 2,               // numeric key created by push
    length: 1,           // length updated by push
    myArray: [1, 2, 3, 4, 5] // internal data remains unchanged
  }
  */
  
  
  /*
  ---------------------------------------------------------------
  6. Modifying the inner array
  ---------------------------------------------------------------
  
  a.myArray.push(34);
  
  a;
  /*
  MyArray {
    0: 2,
    length: 1,
    myArray: [1, 2, 3, 4, 5, 34] // internal array modified
  }
  */
  
  
  /*
  ---------------------------------------------------------------
  7. CRITICAL INSIGHT (why this looks broken)
  ---------------------------------------------------------------
  
  You now have TWO ARRAYS:
  
  1️⃣ The object itself (acting like an array)
     - modified by a.push()
     - numeric keys and length stored directly on `a`
  
  2️⃣ The internal array stored in `a.myArray`
     - modified by a.myArray.push()
  
  These two are completely independent.
  */
  
  
  /*
  ---------------------------------------------------------------
  8. Why this design is flawed
  ---------------------------------------------------------------
  
  - Array methods expect array data to live on `this`
  - But your data lives on `this.myArray`
  - So Array methods and your custom logic operate
    on DIFFERENT data stores
  */
  
  
  /*
  ---------------------------------------------------------------
  9. What NOT to do (anti-pattern)
  ---------------------------------------------------------------
  
  ❌ Inheriting from Array.prototype
  ❌ While storing data in a separate property
  */
  
  
  /*
  ---------------------------------------------------------------
  10. Correct approaches (choose one)
  ---------------------------------------------------------------
  
  OPTION A: Wrap an array (composition) ✅
  --------------------------------------
  class MyArray {
    constructor(data) {
      this.data = data;
    }
    first() {
      return this.data[0];
    }
  }
  
  OPTION B: Truly extend Array (ES6) ✅
  ------------------------------------
  class MyArray extends Array {
    first() {
      return this[0];
    }
  }
  
  OPTION C: Factory with Array.create (advanced)
  -----------------------------------------------
  Object.setPrototypeOf(arr, MyArray.prototype)
  */
  
  
  /*
  ---------------------------------------------------------------
  11. Mental model (lock this in)
  ---------------------------------------------------------------
  
  - Inheriting from Array means:
    → the object ITSELF must behave like an array (numeric keys + length)
  
  - Wrapping an array means:
    → Array methods act on the inner array only
  
  DO NOT MIX BOTH.
  
  /****************************************************************
   * END OF NOTES
   ****************************************************************  
*/

/*
/****************************************************************
 * ENCAPSULATION USING CLOSURE (Constructor Function Pattern)
 ****************************************************************/

/*
---------------------------------------------------------------
1. The code
---------------------------------------------------------------

function MyArray(arr) {
    let data = arr; // PRIVATE variable (NOT on this)
  
    this.first = function() {
      return this._getData()[0];
    };
  
    this.push = function(value) {
      this._getData().push(value);
    };
  
    this.getAll = function() {
      return this._getData().slice();
    };
  
    this._getData = function() {
      return data;
    };
  }
  
  
  /*
  ---------------------------------------------------------------
  2. What is encapsulation here?
  ---------------------------------------------------------------
  
  Encapsulation means:
  - Internal data is hidden
  - Access is allowed only through controlled methods
  
  In this code:
  - `data` is PRIVATE
  - It cannot be accessed directly from outside
  - Only methods inside MyArray can access it
  */
  
  
  /*
  ---------------------------------------------------------------
  3. Why `data` is truly private
  ---------------------------------------------------------------
  
  `data` is:
  - A local variable
  - NOT attached to `this`
  - NOT accessible as a property
  
  Example:
  
  const a = new MyArray([1,2,3]);
  
  a.data        // ❌ undefined
  a.arr         // ❌ undefined
  
  The object has NO direct reference to `data`
  */
  
  
  /*
  ---------------------------------------------------------------
  4. How closure makes this work (MOST IMPORTANT)
  ---------------------------------------------------------------
  
  A closure is formed when:
  - An inner function uses a variable
  - From its outer function's scope
  
  Here, `_getData` uses `data`:
  
  this._getData = function() {
    return data;
  };
  
  Because of this:
  - JavaScript keeps `data` alive
  - Even after MyArray finishes execution
  */
  
  
  /*
  ---------------------------------------------------------------
  5. What exactly is a closure here?
  ---------------------------------------------------------------
  
  Closure = Function + Lexical Environment
  
  So this function:
  
  function() {
    return data;
  }
  
  Carries a hidden reference to:
  
  { data: arr }
  
  This reference is NOT visible in the object,
  but it exists in memory.
  */
  
  
  /*
  ---------------------------------------------------------------
  6. How methods access private data
  ---------------------------------------------------------------
  
  Call:
  
  a.push(4);
  
  Execution steps:
  1. `push` is called on `a`
  2. `this` refers to `a`
  3. `this._getData()` executes
  4. `_getData` returns the CLOSED-OVER `data`
  5. `data.push(4)` modifies private array
  
  At no point is `data` exposed.
  */
  
  
  /*
  ---------------------------------------------------------------
  7. Memory model (mental picture)
  ---------------------------------------------------------------
  
  a
   ├─ first() ─┐
   ├─ push()  ├──► Closure Scope ──► data = [1,2,3]
   ├─ getAll()│
   └─ _getData┘
  
  `data` is NOT on `a`
  It lives in a hidden lexical environment
  */
  
  
  /*
  ---------------------------------------------------------------
  8. Each instance has its own private data
  ---------------------------------------------------------------
  
  const a = new MyArray([1,2,3]);
  const b = new MyArray([9,9,9]);
  
  a → closure → data = [1,2,3]
  b → closure → data = [9,9,9]
  
  No shared state
  Full isolation
  */
  
  
  /*
  ---------------------------------------------------------------
  9. Why this is strong encapsulation
  ---------------------------------------------------------------
  
  ✔ Cannot read data directly
  ✔ Cannot overwrite data
  ✔ Only allowed operations via methods
  ✔ Stronger privacy than prototype properties
  
  This is TRUE encapsulation in JavaScript
  */
  
  
  /*
  ---------------------------------------------------------------
  10. Trade-offs of this pattern
  ---------------------------------------------------------------
  
  ❌ Methods are recreated per instance
  ❌ No prototype method sharing
  ❌ Higher memory usage for many instances
  
  But:
  ✔ Maximum data safety
  ✔ Simple and predictable
  */
  
  
  /*
  ---------------------------------------------------------------
  11. When to use this pattern
  ---------------------------------------------------------------
  
  Use when:
  - Data privacy is critical
  - Number of instances is small
  - You want simple encapsulation
  
  Avoid when:
  - Creating thousands of objects
  - Memory optimization is required
  */
  
  
  /*
  ---------------------------------------------------------------
  12. One-line takeaway (lock this in)
  ---------------------------------------------------------------
  
  Private data is achieved because:
  Inner functions keep access to outer variables
  even after the outer function has finished execution.

  ----------------------------------------------------------------
  Efficient Solution (Encapsulation + Prototype) - NO NEWWWWWW - just NORMAL FUNCTION CALLL
    🔹 Goal

    1. Keep data private
    2. Share methods via prototype

    const MyArrayProto = {
        first() {
            return this._getData()[0];
        },

        push(value) {
            this._getData().push(value);
        },

        getAll() {
            return this._getData().slice();
        }
    };

    function MyArray(arr) {
    let data = arr; // private

    const obj = Object.create(MyArrayProto);

    obj._getData = function() {
        return data;
    };

    return obj;
    }

------------------------------------------------------------------------------------------

Rule you violated (again, very important):

Either return your own object OR use this — never both

/****************************************************************
 * NOTES: Why this MyArray implementation is WRONG
 ****************************************************************/

/*
---------------------------------------------------------------
1. Code under discussion
---------------------------------------------------------------

const MyArrayProto = {
    first() {
      return this._getData()[0];
    },
  
    push(value) {
      this._getData().push(value);
    },
  
    getAll() {
      return this._getData().slice();
    }
  };
  
  function MyArray(arr) {
    let data = arr; // private
  
    const obj = Object.create(MyArrayProto);
  
    this._getData = function() {
      return data;
    };
  }
  
  
  /*
  ---------------------------------------------------------------
  2. What this code is TRYING to achieve
  ---------------------------------------------------------------
  
  - Encapsulation using closure (`data`)
  - Method sharing using prototype (`MyArrayProto`)
  - Constructor usage (`new MyArray()`)
  
  This is a GOOD goal, but the implementation is incorrect.
  */
  
  
  /*
  ---------------------------------------------------------------
  3. What actually happens at runtime
  ---------------------------------------------------------------
  
  const a = new MyArray([1,2,3]);
  
  /*
  JavaScript steps:
  1. Creates a new object → `this`
  2. Sets `this.__proto__ = MyArray.prototype`
  3. Executes constructor
  4. Returns `this`
  */
  
  
  /*
  ---------------------------------------------------------------
  4. Critical mistake #1: `obj` is never returned
  ---------------------------------------------------------------
  
  const obj = Object.create(MyArrayProto);
  
  - `obj` is created
  - `obj` is NOT returned
  - `obj` is NOT assigned to `this`
  - `obj` becomes garbage
  
  So `a` is NOT linked to `MyArrayProto`
  */
  
  
  /*
  ---------------------------------------------------------------
  5. Prototype chain of `a`
  ---------------------------------------------------------------
  
  a → MyArray.prototype → Object.prototype
  
  ❌ MyArrayProto is NOT in the chain
  
  So:
  a.first     // undefined
  a.push      // undefined
  a.getAll    // undefined
  */
  
  
  /*
  ---------------------------------------------------------------
  6. Where `_getData` actually lives
  ---------------------------------------------------------------
  
  this._getData = function() { return data; }
  
  - `_getData` is attached to `a`
  - `data` is private via closure
  - BUT no method calls `_getData`, because no methods exist
  */
  
  
  /*
  ---------------------------------------------------------------
  7. Why prototype methods cannot work
  ---------------------------------------------------------------
  
  Prototype methods expect:
  
  this === instance
  
  But:
  - Methods live on MyArrayProto
  - Instance (`a`) does NOT inherit from MyArrayProto
  - Therefore methods are unreachable
  */
  
  
  /*
  ---------------------------------------------------------------
  8. Conceptual error (IMPORTANT)
  ---------------------------------------------------------------
  
  This code mixes THREE incompatible patterns:
  
  1. Constructor pattern (`new`, `this`)
  2. Factory pattern (`Object.create`)
  3. Prototype sharing
  
  Only ONE pattern should be used.
  
  Mixing them breaks object identity.
  */
  
  
  /*
  ---------------------------------------------------------------
  9. One-object rule (mental model)
  ---------------------------------------------------------------
  
  A correct design must satisfy:
  
  - ONE object represents the instance
  - That object must:
    - hold private access
    - inherit methods
    - be returned to the caller
  
  This code creates TWO objects and uses neither correctly.
  */
  
  
  /*
  ---------------------------------------------------------------
  10. One-line rule to remember
  ---------------------------------------------------------------
  
  If you create an object with `Object.create`,
  YOU MUST RETURN THAT OBJECT.
  
  If you use `this`,
  DO NOT CREATE ANOTHER OBJECT.
  */
  
  
  /****************************************************************
   * END OF NOTES
   ****************************************************************/
  
  /****************************************************************
   * END OF ENCAPSULATION + CLOSURE NOTES
   ****************************************************************
  
   ---------------------------------------------------------------------------------------------------------------

   ✅ Core truth
    1.The Prototype design pattern in JavaScript cannot be implemented using arrow functions as prototype methods, because arrow functions do NOT have their own this.
    2.Prototype-based OOP depends on dynamic this binding, and arrow functions break that model.
*/