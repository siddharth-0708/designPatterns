/*
Liskov Substitution Principle: 
Defination 1: If you have a function that works with a parent class, it should also work with its child classes without breaking or behaving unexpectedly.

Defination 2: Subtypes must be substitutable for their base types without altering the correctness of the program.

Defination 3: If class B is a subclass of class A, then you should be able to replace A with B anywhere in the code, without breaking the program's expected behavior.
*/

/* This violates LSP because subclass is not functioning as baseclass and is breaking program behaviour*/
class Bird {
    eat(){
        console.log(">>> bird can eat");
        
    }
    fly(){
        console.log(">>> bird can fly");
    }
    sleep(){
        console.log(">>> bird can sleep");
    }
}
class Sparrow extends Bird {
}
class Penguine extends Bird {
    fly(){
        throw new Error("penguine cannot fly");
    }
}
function checkBird(bird){
    console.log(">> ", bird.eat());
    console.log(">> ", bird.sleep());
    if(bird instanceof FlyingBird){
        const fly = bird.fly();
        console.log(">> ", fly);
    }
    
}
// const sp = new sparrow();
// const pw = new penguine();
// checkBird(sp);
// checkBird(pw);

/*SOLUTION:  */
class Bird1 {
    eat(){
        console.log(">>> bird can eat");
        
    }
    sleep(){
        console.log(">>> bird can sleep");
    }
}
class FlyingBird extends Bird {
    fly(){
        console.log(">>> bird can fly");
    }
}
class Sparrow1 extends FlyingBird {
}
class Penguine1 extends Bird1{

}

const sp = new Sparrow1();
const pw = new Penguine1();
checkBird(sp);
checkBird(pw);

/*EXAMPLE2*/

class Rectangle {
    constructor(width, height){
        this.width = width;
        this.height = height;
    }
    setWidth(width){
        this.width = width;
    }
    setHeight(height){
        this.height = height;
    }
    area(){
        return this.width * this.height;
    }
}
class Sqaure extends Rectangle {
    constructor(side){
         super(side, side);
    }
    setWidth(side){
        this.width = side;
        this.height = side;
    }
    setHeight(side){
        this.width = side;
        this.height = side;
    }
}

function IsRectangle(rectangle) {
    rectangle.setWidth(2);
    rectangle.setHeight(8);
    console.log(">>> area is ", rectangle.area());
    
}
const rec = new Rectangle(5,10);
IsRectangle(rec);

const sq = new Sqaure(5);
IsRectangle(sq);

/**
 Eventhough the output is correct, it violates LSP:

 The key issue is expectation vs reality:

A function that expects a Rectangle assumes width and height are independent.

A Square forces width = height, which breaks that assumption.

This means Square is not a true Rectangle in object-oriented programming (OOP), even if it is mathematically.

KEY RULES OF LSP:
A subclass should extend the behavior of the parent class without changing its original behavior.

A subclass should not remove or override functionalities in a way that alters expected behavior.

A function expecting an instance of the parent class should work correctly when given a subclass.
 */

/*SOLUTION*/

class Shape {
    getArea() {
      throw new Error("Method must be implemented");
    }
  }
  
  class Rectangle1 extends Shape {
    constructor(width, height) {
      super();
      this.width = width;
      this.height = height;
    }
  
    setWidth(width) {
      this.width = width;
    }
  
    setHeight(height) {
      this.height = height;
    }
  
    getArea() {
      return this.width * this.height;
    }
  }
  
  class Square1 extends Shape {
    constructor(side) {
      super();
      this.side = side;
    }
  
    setSide(side) {
      this.side = side;
    }
  
    getArea() {
      return this.side * this.side;
    }
  }
  
  // Now, testRectangle only works with Rectangle objects
  function testRectangle(rect) {
    rect.setWidth(5);
    rect.setHeight(10);
    console.log(`Expected Area: 5 * 10 = 50, Got: ${rect.getArea()}`);
  }
  
  const rect = new Rectangle1(2, 3);
  testRectangle(rect); // ✅ Works fine
  
  const square = new Square1(4);
  console.log(`Square Area: ${square.getArea()}`); // ✅ Works fine separately

  /*
  A Square is NOT a Rectangle in object-oriented programming because the behaviors are different.

    LSP states that a subclass must work as a true substitute for its parent without changing expected behavior.

    Correct Design: Instead of forcing inheritance, use a common base class (Shape) to avoid forcing incorrect assumptions.
  */

    /*
    If u dont extend methods of parent class, then changing width and height by different numbers will make square a rectangle which again vilates LSP.
    */
  

