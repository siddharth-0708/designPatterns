/*
In technical terms, the Facade Design Pattern:

Provides a unified, higher-level interface to a set of interfaces in a subsystem.

Simplifies interactions with complex systems by exposing a single entry point.

Decouples clients from the internal workings of the subsystem, promoting loose coupling.

It does not add new functionality — it just makes existing functionality easier to use.

Client ---> Facade ---> Subsystems (ClassA, ClassB, ClassC)
Client talks to Facade, and Facade talks to Subsystem classes internally.

Real-world technical analogy:
When you make an online payment, you use a simple payment API.
Behind the scenes, it’s dealing with authentication, transaction verification, database updates, security, etc.
You don’t need to worry about all that — the API (facade) handles it.
*/

//payment gateway
class CardValidator {
    validateCard(){
        console.log("card is validated");
    }
}

class BalanceChecker {
    balanceCheck(){
        console.log("balance is validated");
    }
}

class PaymentProcess {
    processPayment() {
        console.log("payment is processed");
    }
}

class MessageNotification {
    sendMessage() {
        console.log("message is send");
    }
}

class PaymentFacade {
    constructor(cardValidator, balanceCheck, paymentProcess, messageNotification){
        this.cardValidator = cardValidator;
        this.balanceCheck = balanceCheck;
        this.paymentProcess = paymentProcess;
        this.messageNotification = messageNotification;
    }
    makePayment(cardnumber, amount){
        console.log("making payment for ", cardnumber, " ", amount);
        this.cardValidator.validateCard();
        this.balanceCheck.balanceCheck();
        this.paymentProcess.processPayment();
        this.messageNotification.sendMessage();        
    }
}

const a = new PaymentFacade(new CardValidator(), new BalanceChecker(), new PaymentProcess(), new MessageNotification());
a.makePayment("12234432222", 5000);
