//The iterator pattern is a way to access the items in a collection one at a time, without exposing how the collection works internally.

class UserName {
    constructor(name, number, address, company){
        this.elements = Array(4);
        this.elements[0] = name;
        this.elements[1] = number;
        this.elements[2] = address;
        this.elements[3] = company;
    }
    [Symbol.iterator](){
        //variables declare and it has this accesss as its a normal method declaration in a class
        return {
            next(){
                //logic that returns a object {value: '', done: boolean}
            }
        }
    }
    [Symbol.iterator](){
        let index = 0;
        const elements = this.elements;

       return {
            next(){
                if(index < elements.length){
                    return {value: elements[index++], done: false}
                }else{
                    return {done:true} // done is for the iteration has completed or not
                }
            }
       } 
    }
}

const a = new UserName("siddhath", 1234, "304 shubham sqaure", "PP");

for (const element of a) {
    console.log(element);
}


//Yes, you can use for...in to loop over a class instance’s properties.

/*
Iterates over enumerable properties, including inherited ones.

So if the class prototype or object inherits anything, it will include that too (which you might not want).

Thats why we write hasOwnProperty
*/
for (const key in a) {
    if (Object.prototype.hasOwnProperty.call(a, key)) {
        const element = a[key];
        
    }
}

/*
Difference between forin and forof loop

A) The for...in loop in JavaScript is used to iterate over the keys (property names) of an object. It works on both objects and arrays, though it's best suited for objects. One important caution is that for...in can also pick up inherited properties from the prototype chain, which may not always be desired. It's mainly used for looping over the property names of objects.

B) On the other hand, for...of is designed to iterate over the values of an iterable. It works on data structures that implement the Symbol.iterator method, such as arrays, strings, maps, sets, and other built-in iterables. It does not work on plain objects unless you explicitly define an iterator. for...of is the preferred choice for looping over the values in arrays, strings, or other iterable collections.

for of will work every data structure

The enumeration protocol is the set of rules JavaScript uses when looping over an object's properties using for...in.

It tells JavaScript how to list properties of an object.

It applies to all objects, even if they don’t implement Symbol.iterator.

🔹 What is an Enumerable Property?
An enumerable property is a property that will show up during property enumeration — like in a for...in loop or Object.keys().

In simple terms:

If a property is enumerable, it means JavaScript will see it when looping.

*/