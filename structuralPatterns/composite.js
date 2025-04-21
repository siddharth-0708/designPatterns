/*The Composite Design Pattern lets you build tree-like structures where individual objects (like Circle) and groups of objects (like Group) are treated the same way.*/

class Circle {
  constructor(radius) {
    this.radius = radius;
  }
  draw() {
    console.log("circle is drawn with radius ", this.radius);
  }
}
class Group {
  constructor(name) {
    this.name = name;
    this.children = [];
  }
  add(data) {
    this.children.push(data);
  }
  draw() {
    console.log("drawing for: ", this.name);
    this.children.forEach((data) => data.draw());
  }
}
const circle1 = new Circle(10);
const circle2 = new Circle(20);
const group1 = new Group("GROUP1");
group1.add(circle1);
group1.add(circle2);
// group1.draw();
const circle3 = new Circle(50);
const mainGroup = new Group("MAIN GROUP");
mainGroup.add(group1);
mainGroup.add(circle3);
mainGroup.draw();