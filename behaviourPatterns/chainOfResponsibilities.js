// Chain of responsibility:
/*
The Chain of Responsibility pattern is a behavioral design pattern.
In this pattern, a request is passed along a chain of handlers (objects) until it is handled by one of them. Each handler in the chain either processes the request or passes it along to the next handler in the chain. The pattern helps to decouple the sender of a request from the receivers by allowing multiple objects to handle the request.
*/

class Handler {
    setNext(handler){
        this.nextHandler = handler;
    }
    handle(issue) {
        if(this.nextHandler){
            this.nextHandler.handle(issue);
        }else {
            console.log("cannot be handled by anyone");
        }
    }
}
class ManagerHandler extends Handler {
    handle(issue){
        if(issue === "low"){
            console.log("Manager will handle");
        }else{
            super.handle(issue);
        }
    }
}
class HRHandler extends Handler {
    handle(issue){
        if(issue === "medium"){
            console.log("HR will handle");
        }else{
            super.handle(issue);
        }
    }
}
class CEOHandler extends Handler {
    handle(issue){
        if(issue === "high"){
            console.log("CEO will handle");
        }else{
            super.handle(issue);
        }
    }
}

const manager = new ManagerHandler();
const hr = new HRHandler();
const ceo = new CEOHandler();

//chaining
manager.setNext(hr);
hr.setNext(ceo);

manager.handle("extra high");

/*
A broken chain in the context of the Chain of Responsibility pattern happens when: 

A handler forgets or fails to call the next handler in the chain.
OR the chain is not fully connected, so some requests might be lost or never handled
*/
class LazyManager extends Handler {
    handle(request) {
        if (request === "low") {
            console.log("LazyManager handled the low-level request.");
        }
        // Forgot to call `super.handle(request)`
    }
}
