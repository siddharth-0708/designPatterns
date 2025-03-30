/* 
The Builder Pattern is a creational design pattern that helps construct complex objects step by step. It allows the creation of different representations of an object using the same building process.

Key Features of Builder Pattern:
1. Separates object construction from its representation.

2. Provides a clear and readable way to build complex objects.

3. Allows step-by-step construction of an object.
*/

//PROBLEM

class Burger {
    constructor(size, isTomato, isCheese, isWhiteSauce, isParcel){
        this.size = size;
        this.isTomato = isTomato;
        this.isCheese = isCheese;
        this.isWhiteSauce = isWhiteSauce;
        this.isParcel = isParcel;
    }
    showBurgerDetails(){
        console.log(`burger is of size ${this.size} and tomato is ${this.isTomato} and cheese is ${this.isCheese} and white sauce is ${this.isWhiteSauce} and parcel is ${this.isParcel}`);
    }
}
//Problem is it is difficult to understand these variables. Hard to read what is given true for what. This can be error prone and hard to debug when arguments become very large.
const myBurger = new Burger('small', true, true, false, false);
myBurger.showBurgerDetails();

//SOLUTION

class Burger1 {
    constructor(burgerBuilder){
        this.size = burgerBuilder.size;
        this.isTomato = burgerBuilder.isTomato || false;
        this.isCheese = burgerBuilder.isCheese || false;
        this.isWhiteSauce = burgerBuilder.isWhiteSauce || false;
        this.isParcel = burgerBuilder.isParcel || false;
        this.extraInfo = burgerBuilder.extraInfo || '';
    }
    showBurgerDetails(){
        console.log(`burder is of size ${this.size} and tomato is ${this.isTomato} and cheese is ${this.isCheese} and white sauce is ${this.isWhiteSauce} and parcel is ${this.isParcel} ${this.extraInfo}`);
    }
}

class BurgerBuilder {
    constructor(size){
        this.size = size;
    }
    addCheese() {
        this.isCheese = true;
        return this; // For chaining 
    }
    addTomato(){
        this.isTomato = true;
        return this; // For chaining 
    }
    addWhiteSauce(){
        this.isWhiteSauce = true;
        return this; // For chaining   
    }
    addParcel(){
        this.isParcel = true;
        return this; // For chaining  
    }
    build(burger){
        return new burger(this);
        // burger.showBurgerDetails();
    }
}

console.log("SOLUTION >>");
const burgerBuild = new BurgerBuilder('medium');
const bg = burgerBuild.addCheese().addParcel().addWhiteSauce().build(Burger1);
bg.showBurgerDetails();

class VegBurger extends Burger1 {
    constructor(builder){
        super(builder);
        this.isVeg = true;
        this.extraInfo = ` and this is a veg burger`;
    }
    showBurgerDetails(){
        console.log(`burder is of size ${this.size} and tomato is ${this.isTomato} and cheese is ${this.isCheese} and white sauce is ${this.isWhiteSauce} and parcel is ${this.isParcel} and this is a veg burger`);
    }
}

const burgerBuild1 = new BurgerBuilder('Large');
const bg1 = burgerBuild1.addTomato().addParcel().addCheese().build(VegBurger);
bg1.showBurgerDetails();

const burgerBuild2 = new BurgerBuilder('small');
const bg2 = burgerBuild2.addCheese().build(VegBurger);
bg2.showBurgerDetails();