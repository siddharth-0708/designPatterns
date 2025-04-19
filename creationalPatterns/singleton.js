/*
1. A component which is instantiated only once.
Singleton design pattern is a pattern that implements it.

2. We return the same instance whenever that class is getting called.
this.constructor.instance. 
Constructor can have behavior of its own.

3. Monostate: to achieve singleton without constructor manupulation - Not recomended
4. In what cases singleton can be wrongly used?
*/

//Method1
class SingleTon {
    constructor(name){
        if(this.constructor.instance){
            return this.constructor.instance;
        }
        this.constructor.instance = this;
        this.name = name;
    }
}
const a = new SingleTon("sidd");
// when a instance is created, a.__proto__ === SingleTon.prototype, so a.constructor.instance becomes a. When b instance is created, then b.__proto__ === SingleTon.prototype. Now when be see b.constructor.instance it will exist.
const b = new SingleTon("roh");
//IT IS same as b = a;

console.log(a, b);


//METHOD2 - static variable

class Name {
    static instance;
    constructor(name){
        if(Name.instance){
            return Name.instance;
        }
        this.name = name;
        Name.instance = this;
    }
}

const c = new Name("vvv");
const d = new Name("vsqsqqvv");
console.log(c, d);

//PROTOTYPES:

function Age(age){
    if(this.constructor.instance){
        return this.constructor.instance;
    }
    this.age = age;
    this.constructor.instance = this;
}
const y = new Age(99);
const z = new Age(10000);

console.log(y,z);
