//Factory Method - deals with creation of class when multiple arguments are there or different type of arguments are there.

class UserDetails {

    //IMPLEMENT ENCAPSULATION
    //The problem is still i can create a instance of user class eventhough there is a static method because its made public

    //Private variables
    #namePrivate;
    #agePrivate;
    static #isCreateInstance = false;

    constructor(name, age){
        //Implementing encapsulation
        if(!UserDetails.#isCreateInstance){
            throw new Error("cannot manupulate directly");
        }
        this.name = name;
        this.age = age;
        this.#agePrivate = age;
        this.#namePrivate = name;
        UserDetails.#isCreateInstance = false;
        console.log("ppp", this.#agePrivate, this.#namePrivate );        
    }
    //What if this user can be invoked either by new UserDetails("sid", 30) and new UserDetails(userObj.name, userObj.age). How to do this? Js do not support constructor overloading, so here factory method will come handy.

    static userFactoryMethod(obj, age = 1){ //Factory method
        //Static methods can access 
        if(!obj || !age){
            throw new Error("provide valid arguments");
        }
        if(obj instanceof Object){
            //below console log wont work because static methods can access static variables since they belong to class and not the instance
            // console.log(".... ", this.age);
            
            UserDetails.#isCreateInstance = true;
            return new UserDetails(obj.name, obj.age);
        }else{
            UserDetails.#isCreateInstance = true;
            return new UserDetails(obj, age);
        }
    }
}

const a = UserDetails.userFactoryMethod({name: "sid", age: 30});
console.log(">> ", a.name, a.age, a);

const b = UserDetails.userFactoryMethod("roh", 19);
console.log(">> 1", b.name, b.age, b);

// const c = UserDetails.userFactoryMethod();

//encapsulation - PARTIAL because still be have created userDetails instance and then it throws an error
// const d = new UserDetails("kkk", 222); 

/*
Advantages of this method:
✅ Encapsulated Object Creation – Users can't directly modify object creation logic.
✅ Easier Maintenance – If the creation logic changes, update only createUser().
✅ Can Include Validation – We check if name and role are provided before creating an instance.
FULL ENCAPSULATION CAN BE ACHIEVED USING CLOSURES
*/

//ABSTRACT FACTORY:
// An Abstract Factory is a design pattern that provides an interface (or base class) for creating families of related objects without specifying their concrete classes.

//In Abstract Factory Pattern, abstraction refers to hiding the implementation of object creation.
//Instead of directly calling new Car() or new Bike(), the factory hides the object creation logic and provides a simple interface.

class CarFactory {

    //Abstraction
    createCar(carType){
        if(carType === "electric"){
            return new ElectricCar();

        }else if(carType === "CNG"){
            return new CngCar();
        }else {
            throw new Error("car type not found");
        }
    }
}

class BikeFactory {

    //Abstraction
    createBike(carType){
        if(carType === "electric"){
            return new ElectricBike();

        }else if(carType === "CNG"){
            return new CngBike();
        }else {
            throw new Error("car type not found");
        }
    }
}

class ElectricCar{
    createVehicle(){
        console.log("electric vehicle created");
    }
}
class CngCar{
    createVehicle(){
        console.log("CNG vehicle created");
    }
}

class ElectricBike{
    createVehicle(){
        console.log("electric bike created");
    }
}
class CngBike{
    createVehicle(){
        console.log("CNG bike created");
    }
}

function createVehicle(type){
    //This is an Abstract Factory Function because it returns different factories (CarFactory or BikeFactory) instead of directly creating objects.

    if(type === "car"){
        return new CarFactory();
    }else if (type === "bike"){
        return new BikeFactory();
    }
}

const t = createVehicle("car").createCar("electric"); //No direct instance of class created - This is abstract pattern
console.log(">>> car is ", t.createVehicle());

/*
🔹 Why is This Now an Abstract Factory?
Your code follows the Abstract Factory Pattern because:
1️⃣ You have multiple factories (CarFactory & BikeFactory) instead of one.
2️⃣ A factory (createVehicle()) returns different factories (CarFactory or BikeFactory).
3️⃣ Each factory creates different but related objects (ElectricCar, CngCar, ElectricBike, CngBike).
4️⃣ The object creation logic is hidden, so users only interact with createVehicle().
*/

//PENDING- CREATE ENCAPSULATION USING CLOSURES

