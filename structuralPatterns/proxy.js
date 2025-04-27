// Proxy object is a wrapper around the original object that act as a middleware.

//Value proxy
class Percentage {
    constructor(value){
        this.value = value;
    }
    getPercentage(){
        return this.value / 100;
    }
    //By default js call this method for non-primitive calculations - this is also like value proxy
    valueOf(){
        return this.value / 100;
    }
}

class PercentageProxy {
    constructor(value, percentageValue){
        this.value = value;
        this.Percentage = new Percentage(percentageValue);
    }
    calculatePercentage(){
        return this.value * this.Percentage.getPercentage();
    }
}
const a = new PercentageProxy(100, 5);
console.log(a.calculatePercentage());

console.log(100 * new Percentage(5));

//Property proxy

//Not exactly a proxy but get and set methods stimulate the proxy behaviour
class UserName1 {
    constructor(name, phone) {
        this._name = name;  // notice _name, private-like
        this._phone = phone;
    }

    get name() { // getter
        console.log("getting name");
        return this._name;
    }

    set name(name) { // setter
        console.log("setting name");
        this._name = name;
    }

    get phone() {
        console.log("getting phone");
        return this._phone;
    }

    set phone(phone) {
        console.log("setting phone");
        this._phone = phone;
    }
}

const b1 = new UserName1("siddharth", 9890);
console.log(b1.name); // now triggers console "getting name"
b1.name = "sid";      // now triggers console "setting name"
console.log(b1.name);


//Below is both property proxy and protection proxy. 
//"Property Proxy controls access behavior. Protection Proxy guards the object against invalid access."
class UserName{
    constructor(name, phone){
        this.name = name;
        this.phone = phone;
    }
    getName(){
        return this.name;
    }
    setName(name){
        this.name = name;
    }
    getPhone(){
        return this.phone;
    }
    setPhone(phone){
        this.phone = phone;
    }
}
class UserNameProxy {
    constructor(name, phone){
        this.user = new UserName(name, phone);
    }
    getName(){
        console.log("getting name");
        return this.user.getName();
    }
    setName(name){
        if(name.length < 5){
            console.log("cannot set small name");
            return;
        }
        console.log("setting name");
        this.user.setName(name);
    }
    getPhone(){
        console.log("getting age");
        return this.user.getPhone();
    }
    setPhone(phone){
        console.log("setting age");
        if(phone.toString().length > 10){
            console.log("wrong number more than 10");
            return;
        }
        this.user.setPhone(phone);
    }
}
console.log(">>>>>>");

const b = new UserNameProxy("siddharth", 9890);
console.log(b.getName());

b.setName("loalhosqjoqssq");
console.log(b.getName());

b.setPhone("29782820380282302323");

/*
Term	Meaning
Property Proxy	When you intercept access to properties (getting/setting) and maybe modify behavior.
Protection Proxy	When you restrict or validate access to the real object's properties or methods. (e.g., permissions, validations, rules.)
In your case:

You did NOT expose user.name and user.phone directly.

You validated that name.length >= 5.

You validated that phone.length <= 10.

If validation fails, you deny the operation.


Proxy and Decorator patterns can look very similar!
They both involve wrapping an object and adding behavior. However, there's a subtle but important distinction between them. Let's break it down!

1. Proxy Design Pattern:
A Proxy controls access to the real object.

It can be used for things like:

Lazy loading: Delay instantiation of an object.

Access control: Restrict access based on conditions (e.g., only allow access to the real object if the user is authenticated).

Logging: Log method calls before passing them to the real object.

Caching: Cache results to avoid expensive operations.

2. Decorator Design Pattern:
A Decorator enhances the behavior of the object without changing its structure.

It’s like wrapping the object with additional functionality.
*/

//Js proxy object
/*
The Proxy object allows you to define traps that intercept basic operations (such as getting or setting properties) on an object. The handler is the object where you define these traps.
You have two traps in your example:
get trap: Intercepts property access on the Proxy.
set trap: Intercepts property assignments on the Proxy.

traps in js:
1. get(target, prop):
Customizes the behavior of property access.
In this example, when you access the age property, we append "years old" to the value.
You can add custom logic to modify the result or format it before returning it.

2. set(target, prop, value):
Customizes the behavior of property setting.
Here, we enforce a rule that the name property must be at least 5 characters long. If the user tries to set a shorter name, the operation is rejected (returns false).

3. deleteProperty(target, prop):
Customizes the behavior of deleting a property from the object.
We log the action before actually deleting the property.

4. has(target, prop):
Customizes the behavior of the in operator.
Whenever you check if a property exists (e.g., prop in proxyUser), it logs the check before returning true or false.

5. apply(target, thisArg, argumentsList):
Customizes the behavior of calling a function (if the target is a function).
In this case, the trap logs the arguments passed to the function before actually executing it.

6. construct(target, args):
Customizes the behavior when creating a new instance using new.
We log the arguments passed to the constructor before creating the instance.
*/

//example1:
const a1 = {name: "siddharth", "age": 30};
const handler = {
    get(target, prop){
        console.log("I am getter trap ", target, " ", prop);
        return target[prop]; //u need to return 
    },
    set(target, prop, value){
       console.log("I am setter trap ", target, " ", prop);
       target[prop] = value;
       return true; //--> tell js it it was successful or not
    }
}
const pr = new Proxy(a1, handler);
console.log(pr.name);
pr.name = "zzz"; // u are playing witth proxy object not real. so the change has to be done in the handler.

console.log(pr.name);

//example2: 

class Name {
    constructor(name){
        this.name = name;
    }
    printName(){
        console.log("name printed is ", this.name);
    }
}

const handler2 = {
    get(target, prop){
        console.log("I am getter trap ", target, " ", prop);
        return target[prop];
    },
    set(target, prop, value){
       console.log("I am setter trap ", target, " ", prop);
        target[prop] = value;
        return true;
    },

    /*
    construct trap only triggers when you do new Proxy(...), and the Proxy itself wraps a class or constructor function — NOT an instance.
    const ProxyName = new Proxy(Name, handler2);
    const pr1 = new ProxyName("siddharth");  // <-- Here, construct trap triggers
    pr1.printName(); 
    */
    construct(target, args){
        console.log("I am construct trap ", target, " ", args);
    }
}

const t = new Name("siddharth");
const pr1 = new Proxy(t, handler2);
pr1.printName(); // --> get method will be called with prop as printName. Then target the instance object will call the printName that is present in its proptotype.

/*
Output:

I am getter trap  { name: 'siddharth', age: 30 }   name
siddharth
I am setter trap  { name: 'siddharth', age: 30 }   name
I am getter trap  { name: 'zzz', age: 30 }   name
zzz
I am getter trap  Name { name: 'siddharth' }   printName
I am getter trap  Name { name: 'siddharth' }   name
name printed is  siddharth
*/

/*
A) If you proxy an instance (object):

When you create a proxy around an instance, like an object created from a class (const t = new Name("siddharth")), you can only trap property accesses (get), property settings (set), or things like deleteProperty. The construct trap will never fire in this case, because the object is already constructed before you applied the proxy. Basically, you are guarding an already built object. You can intercept actions like reading a property or setting a property, but you cannot control how the object was created or validate the constructor arguments. You are only influencing behavior after the instance is made.

B) If you proxy a class (constructor):

When you create a proxy around a class or constructor function (like new Proxy(Name, handler)), you can trap everything, including get and set, plus you can trap object construction itself with the construct trap. Here, the proxy can intervene before the object even exists. This way, you can validate constructor parameters, prevent certain objects from being created, log constructor calls, or even modify the way instances are built. You have full control over both how objects are created and how they behave after creation. It’s like guarding the construction site, not just the finished building.
*/

//Virtual proxy:
/*
A Virtual Proxy is a proxy that delays or controls access to an object until it's actually needed.

It does not create or load the real object immediately —
It waits until the first time you try to use it.

It's useful when:

The real object is heavy, slow to create, or not always needed.

You want to optimize memory or performance.

✅ It's like a "lazy initialization"!

This also has single instance.
*/
class HeavyImage {
    constructor(filename) {
        console.log(`Loading image from disk: ${filename}`);
        this.filename = filename;
    }
    display() {
        console.log(`Displaying image: ${this.filename}`);
    }
}

class ImageProxy {
    constructor(filename) {
        this.filename = filename;
        this.realImage = null; // No HeavyImage yet
    }

    display() {
        if (!this.realImage) {
            console.log("Creating real HeavyImage now...");
            this.realImage = new HeavyImage(this.filename); //single instance
        }
        this.realImage.display();
    }
}

const proxyImage = new ImageProxy("photo.jpg");

console.log("Proxy created. Not loading image yet...");

proxyImage.display(); // Now the real image is loaded and displayed
proxyImage.display(); // Already loaded, just displayed

