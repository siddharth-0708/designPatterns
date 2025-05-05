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
const a = new Dummy1();
console.log(a.name);


