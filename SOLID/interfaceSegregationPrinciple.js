/*
Interface Segregation principle:
PART1: 
Clients should not be forced to depend on interfaces they do not use.

PART2:
1. ISP violations often lead to LSP violations, but not always.
2. If violating ISP causes incorrect behavior when substituting a class, then LSP is also violated.
3. If the class can still function as a valid substitute, LSP might not be violated, even though ISP is.
*/

class Bird {
    eat(){

    }
    sleep(){

    }
    fly(){

    }
}

class penguine extends Bird {
    eat(){
        //yes
    }
    sleep(){
        //yes
    }
    fly(){
        throw new Error("I dont fly");
        
    }
}
/*
Here the penguine class unnessary extends bird class because it has unused or not required method called fly. -Violates ISP
Here penguine class cannot replace its parent class Bird because fly will throw error (unexpected behaviour) - violates LSP
eventhough square contains the methods of rectange it will still violate LSP because we cannot substitute square class for a rectangle because rectangle assume width and height as independent entities, but in square we make them equal.
*/
/* SOLUTION */

class Bird1 {
    eat(){
        console.log(">>> eat");
    }
    sleep(){
        console.log(">>> sleep");
    }
}
class FlyingBird extends Bird1 {
    fly(){
        console.log(">>> fly");
    }
}

class Sparrow extends FlyingBird {
    constructor(){
        super();
        this.bird = new FlyingBird();
    }
    eat(){
        this.bird.eat();
    }
    sleep(){
        this.bird.sleep();
    }
    fly(){
        this.bird.fly();
    }
}
class Penguine1 extends Bird {
    constructor(){
        super();
        this.bird = new Bird1();
    }
    eat(){
        this.bird.eat();
    }
    sleep(){
        this.bird.sleep();
    }
}
const s = new Sparrow();
console.log(">>> sparrpw ", s.fly());
console.log(">>> sparrpw ", s.sleep());

const p = new Penguine1();
console.log(">>>> pengune", p.eat());

/*
    so the rectangle square example in LSP. Does that violate ISP?


The Rectangle-Square problem is a classic Liskov Substitution Principle (LSP) violation, but it does not necessarily violate the Interface Segregation Principle (ISP). Let’s break it down.

Here’s the issue:

If a function expects a Rectangle, it assumes width and height can change independently.

But Square overrides that behavior, making width and height always equal.

This violates LSP because a Square cannot truly replace a Rectangle without breaking expected behavior.

No, this does NOT necessarily violate ISP because:

The Rectangle class does not have too many unrelated methods.

Square is not forced to implement any unused or unnecessary methods.

The issue is with incorrect behavior, not an oversized interface.
*/

