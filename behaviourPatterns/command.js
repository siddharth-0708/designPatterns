//Command: An object which represents an instruction to perform a particular action. Contains all the information necessary for the action to be taken.

class BankAccount {
    constructor(balance){
        this.balance = balance;
    }
    addBalance(amount){
        this.balance = this.balance + amount;
    }
    withdrawBalance(amount){
        this.balance = this.balance - amount;
    }
}
class BankAccountCommand {
    constructor(bankAccount){
        this.bankAccount = bankAccount;
        this.lastOperation = null;
        this.lastAmount = 0;
    }
    call(type, amount){
        if(type === "add"){
            this.bankAccount.addBalance(amount);
            this.lastOperation = "add";
            this.lastAmount = amount;
        }else if (type === "withdraw"){
            if(this.bankAccount.balance - amount >= 0){
                this.bankAccount.withdrawBalance(amount);
                this.lastOperation = "withdraw";
                this.lastAmount = amount;
            }
        }
    }
    undo(){
        if(this.lastOperation === "add"){
            this.bankAccount.withdrawBalance(this.lastAmount);
        }else if(this.lastOperation === "withdraw"){            
            this.bankAccount.addBalance(this.lastAmount);
        }
    }
}
const bank = new BankAccount(100);
const bankCommand = new BankAccountCommand(bank);

bankCommand.call("add", 100);
console.log("balance is ", bank.balance);

bankCommand.call("withdraw", 250);
console.log("balance is ", bank.balance);

bankCommand.undo();
console.log("balance is ", bank.balance);