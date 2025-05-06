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