/*
 A space optimization technique that lets us use less memory by storing externally the data associated with similar objects.

 The difference between flyweight and singleton is singleton has only one instance of the class, whatever parameter is passed. But in flyweight only the instance with same parameter is returned. The other instances will have seperate instance of that class. The check of the instance exists is done using a static property that is a object or a map.

 // we have a candy that can be made with different flavours and color. But for each flavour and color we return the same instance.
*/

class CandyMaker {
    constructor(color, flavour){
        this.color = color;
        this.flavour = flavour;
    }
}

class CandyFactory {
    static storeCandy = {};

    static getCandy(color, flavour) {
        const key = color + '_' + flavour;
        if (CandyFactory.storeCandy[key]) {
            return CandyFactory.storeCandy[key];
        } else {
            const candy = new CandyMaker(color, flavour);
            CandyFactory.storeCandy[key] = candy;
            return candy;
        }
    }
}
// CandyMaker.storeCandy = {};

class CandySeller {
    constructor(candy, person, address){
        this.candy = CandyFactory.getCandy(candy.color, candy.flavour);
        this.person = person;
        this.address = address;
    }
    // getCandyInstance(){
    //     const data = this.candy.color + '_' + this.candy.flavour;
    //     if(CandyMaker.storeCandy[data]){
    //         this.candy = CandyMaker.storeCandy[data];
    //         return CandyMaker.storeCandy[data];
    //     }else{
    //         CandyMaker.storeCandy[data] = this.candy;
    //         return this.candy;
    //     }
    // }
    sellCandy(){
        // const candy = this.getCandyInstance();

        console.log("I am selling candy of color ", this.candy.color, " ", " flavour of ", this.candy.flavour, " to person ", this.person, " with address ", this.address);
    }

    checkInstance(){
        return this.candy;
    }
}

const candy1 = new CandySeller(new CandyMaker("orange", "butterscotch"), "siddharth", "304 shubham square");
candy1.sellCandy();

const candy3 = new CandySeller(new CandyMaker("orange", "butterscotch"), "cashew", "102 sri dhanush");
candy3.sellCandy();

console.log("Insctance check of candy1 and candy3 ", candy1.checkInstance() === candy3.checkInstance());

const candy2 = new CandySeller(new CandyMaker("mango", "straberry"), "chaitanya", "304 shubham square");
candy2.sellCandy();

console.log("Insctance check of candy1 and candy2 ", candy1.checkInstance() === candy2.checkInstance());

//Mistake: we need a factory to give the instance.
