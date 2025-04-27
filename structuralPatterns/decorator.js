/*Decorator: Facilitates the addition of behaviours to individual objects without inheriting from them.
Decorator Pattern uses composition specifically to add new functionality at runtime.
👉 It wraps the original object inside another object.
👉 It doesn’t change the original class — just adds new behavior "from the outside."
*/

class Coffee {
    cost(){
        return 100;
    }
}
class Chocolate {
    cost(){
        return 500;
    }
}
class ProductAndMilk { // This is decorator
    constructor(product){
        this.product = product;
    }
    cost(){
        return this.product.cost() + 200;
    }
}

const a = new Coffee();
const b = new ProductAndMilk(a);

const c = new Chocolate();
const d = new ProductAndMilk(c);


console.log(b.cost(), " ", d.cost());