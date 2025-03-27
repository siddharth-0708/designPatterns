/*
Dependency Inversion Principle:
Dependency Injection (DI) is a design pattern where a class receives its dependencies from an external source rather than creating them inside the class itself. This helps achieve loose coupling, making the class more modular, flexible, and testable.
CHECK CHAT GPT AND UDEMY EXAMPLES
*/
class Man {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    getAge(){
        console.log(">>> user name ", this.name, "age is ", this.age);
    }
}
class UserInfo {
    constructor(name, age){
        this.userInfo = new Man(name, 30); //violates DIP - tight coupling. If woman user gets added, we need to change userInfo
    }
    getAgeInfo(){
        console.log(this.userInfo.getAge());
    }
}

const u = new UserInfo("siddharth", 30);
u.getAgeInfo();

/*SOLUTION*/

class UserInfo1 {
    constructor(user){
        this.userInfo = user;
    }
    getAgeInfo(){
        console.log(this.userInfo.getAge());
    }
}

const u1 = new UserInfo1(new Man("siddharth", 30));
u1.getAgeInfo();


class Woman {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    getAge(){
        console.log(">>> user name ", this.name, "age is ", this.age);
    }
}

const w1 = new UserInfo1(new Woman("Chaitanya", 10));
w1.getAgeInfo();

/*ANOTHER EXAMPLE*/

class Man1 {
    constructor(name, age){
        this.name = name;
        this.age = age;
        this.listOfCompanies = [];
    }
    getAge(){
        console.log(">>> user name ", this.name, "age is ", this.age);
    }
    setCompany(company){
        this.listOfCompanies.push(company);
    }
    /*
    CORRECT WAY: Even if the data structure changes, the logic will change in this class itself
    */
    getCompany(company){
        for (let index = 0; index < this.listOfCompanies.length; index++) {
            if(this.listOfCompanies[index] === company){
                console.log("correct company found for ", company);
            }            
        }
    }
}
class UserInfo2 {
    constructor(user){
        this.userInfo = user;
    }
    getAgeInfo(){
        console.log(this.userInfo.getAge());
    }
    findCompanyByname(name){
        /* THIS IS WRONG BECAUSE WE ARE CHECKING DATA HERE AND WHAT IF TOMORROW THE DATA STRUCTURE OF LIST OF COMPANIES BECOMES A MAP OR SET. WE NEED TO CHANGE LOGIC IN THIS CLASS ALSO. CORRECT WAY WILL BE TO WRITE SEARCH IN THE CLASS ITSELF SO THAT EVEN IF IT CHANGES WE WILL CHANGE THE CLASS NOT HERE. */
        const data = this.userInfo.listOfCompanies;
        for (let index = 0; index < data.length; index++) {
            if(data[index] === name){
                console.log("company found for ", name);
            }            
        }
        /*CORRECT WAY */
        this.userInfo.getCompany(name);
    }
}

const t = new Man1("siddharth", 30);
t.setCompany("cognizant");
t.setCompany("pragmatic");
const u2 = new UserInfo2(t);
u2.getAgeInfo();
u2.findCompanyByname("pragmatic");