//Todo:
//observerbales
//promises

//Observer:
/*
A observer is an object that wishes to be informed about events happening in the system. The entity generating the events is an observable.
*/

//Event

class Event {
    constructor(){
       this.handlers = new Map();
        this.count = 0;
    }
    subscribe(handler){
        this.handlers.set(++this.count, handler);
        return this.count;
    }
    unsubscribe(key){
        this.handlers.delete(key);
    }
    fire(source, params){        
        this.handlers.forEach((v, k) => {
            v(source, params)
        });
    }
}

class Person {
    constructor(name){
        this.name = name;
        this.fallSickEvent = new Event();
        // this.fallSickEvent = event;
    }
    fallSick(){
        this.fallSickEvent.fire(this, {suggest: "call doctor"});
    }
}

//usecase of multiple handlers on one instance class:
class HrTeam {
    constructor(person){
        /*
        why this?
        Because when the event fires the handler, it calls it like a normal function:
        If you passed this.handleHR without binding, this inside handleHR() would be undefined (or the global object in sloppy mode), not the HR instance — and you'd get errors if you tried to use this inside that method.
        */
        person.fallSickEvent.subscribe(this.handleHr.bind(this)); //using bind
    }
    handleHr(person){
        console.log("HR is notified that ", person.name, " is sick ");
        
    }
}

class Manager {
    constructor(person){
        //using arrow functions
        person.fallSickEvent.subscribe((person)=> this.handleManager(person)); 
    }
    handleManager = (person)=>{
        console.log("Manager is notified that ", person.name, " is sick ");
    }
}
/*
It is good that each class has its own event and they do not share the event. Because when u call
one instance it will loop 2 times because the handler doesn't care who created that instance, and you can see the source is same for one entire loop (whoever fires).
*/
// const e = new Event();
const sid = new Person("siddharth");
const roh = new Person("rohit");

const hr1 = new HrTeam(sid);
const manager1 = new Manager(sid);

const hr2 = new HrTeam(roh);
const manager2 = new Manager(roh);

sid.fallSickEvent.subscribe((source, params)=>{
    console.log("source is ", source.name);
    console.log("I am sickkk and now i can do anything ", params.suggest);
    
})
roh.fallSickEvent.subscribe((source, params)=>{
    console.log("source is ", source.name);
    console.log("I am sickkk and now i can do anything ", params.suggest);
    
})
sid.fallSick();
roh.fallSick();



//property observer

class RegisterOffice {

    constructor(management){
        this.management = management;
        this.management.managementEvent.subscribe(this.managementChanged.bind(this)); //option1
        //option2
        // this.management.managementEvent.subscribe((management, data)=> this.managementChanged(management, data));
    }

    managementChanged(management, data){
        console.log("Register Office says management has changed to ", management.showName(), "data is", data);
    }
}

class PayrollOffice {

    constructor(management){
        this.management = management;
        this.management.managementEvent.subscribe(this.managementChanged.bind(this));
    }

    managementChanged(management){
        console.log("Payroll Office says management has changed to ", management.showName());
    }
}

class Management {
    #name;
    constructor(name){
        this.#name = name;
        this.managementEvent = new Event();
    }
    setName(name){
        this.#name = name;
        this.managementEvent.fire(this, {name: this.#name});
    }
    showName(){
        return this.#name;
    }

}

const a = new Management("john cena");
const b = new RegisterOffice(a);
const c = new PayrollOffice(a);

a.setName("Randy orton");

a.setName("the undertaker");

a.setName("the rock");


