/*Bridge Pattern means splitting your code into two connected parts so you can change one part without breaking the other.

This pattern is a composition ('has a relationship' rather than inheritance 'is a relation').

All compositions(when a object recieves object as argument) are not bridge pattern but all bridge patterns are compositions.
*/

class App {
    //This is the functionality (implementation method)
    showMessage(){
        throw new Error("Implement this message");
    }
}
class Instagram extends App {
    showMessage(){
        console.log("This is instagram message");
    }
}
class WhatsApp extends App {
    showMessage() {
        console.log("This is whatsApp message"); 
    }
}

class Phone {
    chat(){
        throw new Error("Implement this message");
    } 
}

class AndroidPhone extends Phone {
    constructor(message){ //expects message of type phone --> important
        super();
        this.message = message; // This is the bridge
    }

    chat(){
        this.message.showMessage();
    }
}

class IPhone extends Phone {
    constructor(message){
        super();
        this.message = message; //This is the bridge
    }

    chat(){
        this.message.showMessage();
    }
}

const a = new AndroidPhone(new Instagram()); // Type will be of phone and always have show message implementation.
a.chat();

//Not case:

class Instagram1  {
    showMessage(){
        console.log("This is instagram message");
    }
}
class AndroidPhone1  {
    constructor(message){
        this.message = message; // This is the bridge
    }

    chat(){
        this.message.showMessage();
    }
}

const a1 = new AndroidPhone1(new Instagram1());
a1.chat();

/* is this bridge? if not WHY when compared to previous one :

Because in Bridge Pattern,
both sides — the controller side (Phone) and the working side (App) — should be based on abstractions/interfaces,
not concrete classes directly.

Missing Part:
In your new example, Instagram is a direct concrete class.

It doesn't inherit from any common App interface (like App class in previous example).

So:

AndroidPhone is tightly coupled to Instagram's structure.

There's no flexibility to swap different types of Apps (WhatsApp, Telegram, etc.) easily.

Previous Example	New Example
App was a parent class	No parent class — only Instagram
AndroidPhone depends on App type (general)	AndroidPhone depends directly on Instagram (specific)
Flexible: You can easily swap WhatsApp, Instagram, etc.	Harder to swap different types of Apps cleanly
True Bridge	Not a true Bridge

Q) AndroidPhone depends directly on Instagram (specific)? how? I can create another whatsApp concrete class and pass as arguement ryt? it is not tightly coupled.

YES, you can pass a different class — because composition allows flexibility.

There is still a hidden tightness.
Not because of passing — but because AndroidPhone is expecting some object with .showMessage() —
no contract is officially defined.

AndroidPhone just "trusts" that message has showMessage().

There’s no guarantee at all.

You, the developer, must remember to always create classes having showMessage() — otherwise, it will crash at runtime.

 In real Bridge pattern, you have a formal contract —
(Abstract class or Interface) that clearly says:

"Any app you give me must have a showMessage()."
*/




