/*
A pattern in which the object's behavior is determinded by its state. A object transitions from one state to another (something needs to trigger a transition).

A formalized construct which manages state and transitions is called a state machine.
*/
//How react triggers re-render?

//create a abstract class - no instance can be created.

function Abs(){
    if(this.constructor === Abs){ 
        console.log("Instance NOT done");
        return new Error("This is abstract class and cannot be instantiated");
    }
    this.name = "siddharth";
    console.log("Instance done");
    
}
class DummyAbs {
    constructor(){
        console.log(this.constructor);
        
        if(this.constructor === DummyAbs){
            console.log("Instance NOT done");
            return;
        }
        this.name = "sidd";
    }
}

class Dummy1 extends DummyAbs{
    constructor(){
        super();
        this.age = 22;
    }
}
// const a = new Abs();
// const b = new Dummy1();
// console.log(b.name);


/* STATE DESIGN PATTERN:

The State Design Pattern is a behavioral design pattern that lets an object alter its behavior when its internal state changes. It appears as if the object changed its class.

Instead of using multiple if/else or switch statements to handle behavior based on the current state, the object delegates behavior to different state objects.

Each state object encapsulates the behavior associated with a particular state.

🧠 Core Concept:
Think of it like a finite state machine. An object can be in one state at a time, and based on events, it transitions to other states, changing its behavior accordingly.

*/

//option1
class FanOn {
    message(){
        console.log("fan is switched on");
        
    }
}

class FanOff {
    message(){
        console.log("fan is switched off");
    }
}

class Fan {
    constructor(){
        this.fanOn = new FanOn();
        this.fanOff = new FanOff();
        this.state = this.fanOff;
        this.state.message();
    }
    on(){
        this.state = this.fanOn;
        this.state.message();
    }
    off(){
        this.state = this.fanOff;
        this.state.message();
    }
}
// const fan = new Fan();

// fan.on();
// fan.off();

//option2 - 3 states

class LowSpeed {
    constructor(context){
        this.context = context;
    }
    toggle(){
        console.log("Fan is in low speed now");
        this.context.state = this.context.highSpeed;
        
    }
}

class HighSpeed {
    constructor(context){
        this.context = context;
    }
    toggle(){
        console.log("Fan is in high speed now");
        this.context.state = this.context.off;
        
    }
}

class Off {
    constructor(context){
        this.context = context;
    }
    toggle(){
        console.log("Fan is switched off now");        
        this.context.state = this.context.lowSpeed;
        
    }
}

class Fan1 {
    constructor(){
        this.lowSpeed = new LowSpeed(this);
        this.highSpeed = new HighSpeed(this);
        this.off = new Off(this);
        this.state = this.off;
        this.state.toggle();
    }
    press(){
        this.state.toggle();
    }
}

const b = new Fan1();
b.press();
b.press();
b.press();
b.press();
b.press();
b.press();
b.press();

//Pollyfill for promise 

function MyPromise(executor) {
  let fullfilled = false;
  let onResolve = null;
  let val = null;
  let rejected = false;
  let onReject = null;
  let error = null;
  function resolve(data) {
    fullfilled = true;
    val = data;
    if (typeof onResolve === "function") {
      onResolve(val);
    }
  }
  function reject(data) {
    rejected = true;
    error = data;
    if (typeof onReject === "function") {
      onReject(error);
    }
  }
  this.then = (callback) => {
    onResolve = callback;
    if (fullfilled) {
      callback(val);
    }
    return this; // for chaining
  };
  this.catch = (callback) => {
    onReject = callback;
    if (rejected) {
      callback(error);
    }
    return this;
  };
  try {
    executor(resolve, reject);
  } catch {
    throw new Error("error");
  }
}
const a = new MyPromise((resolve, reject) => {
  const sid = () => {
    console.log("...k sidd");
  };
  setTimeout(() => {
    resolve(sid);
  }, 2000);
});
const b = new MyPromise((resolve, reject) => {
  resolve("this is chaininggg");
});
a.then((result) => {
  result();
  return new MyPromise((resolve, reject) => {
    resolve("this is chaininggg");
  }).then((result) => {
    console.log(result);
  });
});
//TODO: CHECK then chaining code

this.then = (callback) => {
    return new MyPromise((resolve, reject) => {
        onResolve = (val) => {
          try {
            const result = callback(val); // If the result is a Promise-like object
            if (result instanceof MyPromise) {
              result.then(resolve).catch(reject);
            } else {
              resolve(result);
            }
          } catch (err) {
            reject(err);
          }
        };
        if (fullfilled) {
          onResolve(val);
        }
      });
    };
