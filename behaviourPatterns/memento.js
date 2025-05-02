//A memento is a snapshot of the system (array of objects). Whatever we did with command js, it is easier with memento.
//Not ideal for larger data sets since memory allocation is there because memento stores every single state as snapshot and is a seperate class.

class BankAccount {
    constructor(balance){
        this.balance = balance;
    }
    showBalance(){
        console.log(this.balance);
    }
    addBalance(balance){
        this.balance = this.balance + balance;
        return this.balance;
    }
    removeBalance(balance){
        this.balance = this.balance - balance;
        return this.balance;
    }
    setBalance(balance){
        this.balance = balance;
        return this.balance;
    }
}

class MementoBank {
    constructor(balance){
        this.balanceMemory = balance;
    }
    setBalance(balance){
        this.balanceMemory = balance;
    }
}
class BankCommand {
    constructor(bankAccount){
        this.bankAccount = bankAccount;
        this.mementoBalance = [new MementoBank(bankAccount.balance)];
    }
    call(type, balance){
        this.mementoBalance.push(new MementoBank(this.bankAccount.balance))
        if(type === "add"){
            this.bankAccount.addBalance(balance);
        }else if(type === "withdraw"){
            if(this.bankAccount.balance - balance >= 0){
                this.bankAccount.removeBalance(balance);
            }
        }
    }
    undo(){
        if(this.mementoBalance.length > 1){
            const b = this.mementoBalance.pop();
            this.bankAccount.setBalance(b.balanceMemory);
        }
    }
}

const a = new BankAccount(100);
const b = new BankCommand(a);

b.call("add", 100);
a.showBalance();

b.call("add", 100);
a.showBalance();

b.call("add", 100);
a.showBalance();

b.undo();
a.showBalance();

b.undo();
a.showBalance();

b.undo();
a.showBalance();

b.undo();
a.showBalance();