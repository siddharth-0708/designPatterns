/*
This principle states that a class should be open for EXTENSION and closed for MODIFICATION. This means that instead of modifying a class every time a new feature (like a filtering criterion) is added, we should extend the class by creating new classes.
*/

//A) WRONG APPROCH

class Product {
    constructor(name, color, size){
        this.name = name;
        this.color = color;
        this.size = size;
    }
}
class ProductFilter {
    filterByColor(products, color){
       return products.filter((data)=> data.color === color);
    }
    filterBySize(products, size){
        return products.filter((data)=> data.size === size);
    }
    filterByColorAndSize(products, color, size){
        return products.filter((data)=> data.color === color && data.size === size);
    }
}
const data1 = new Product("pen", "pink", "small");
const data2 = new Product("shirt", "orange", "medium");
const data3 = new Product("phone", "pink", "large");

const ProductFilterObj = new ProductFilter();
const fil = ProductFilterObj.filterByColor([data1, data2, data3], "pink");
const fil1 = ProductFilterObj.filterByColorAndSize([data1, data2, data3], "pink", "large");

console.log(">>>filterByColor", fil);
console.log(">>>filterByColorAndSize", fil1);

/*
1. The problem is for each filter criteria we need to add a method in the ProductFilter class. Hence it does not follow the OCP because we are modifying the class.
2. Another problem is the filter can be based on several criteria, so the functions written can go to infinite. Like if we use combinations also color and size etc.
*/

//B) SOLUTION that follows OCP

class Filter { //This is Js Interface
    applyFilter(){
        throw new Error("Please provide filter class");
    }
}
class SizeFilter extends Filter {
    constructor(size){
        super();
        this.size = size;
    }
    applyFilter(products){
        return products.filter((data)=> data.size === this.size)
    }
}
class colorFilter extends Filter {
    constructor(color){
        super();
        this.color = color;
    }
    applyFilter(products){
        return products.filter((data)=> data.color === this.color)
    }
}
const sFil = new SizeFilter("large");
const sFilData = sFil.applyFilter([data1, data2, data3]);
console.log(">>>SizeFilter Solution", sFilData);

/*
1. This follows OCP because if a new filter criteria is added we will not modify the existing class rather we add a new class (extension and not modification).
2. Here also we have risk of classes going infinite, but we don't modify the existing class and follow OCP.
*/

//3. COMMON

class CommonFilter {
    applyFilter(products, ...criteria){
        return products.filter((product)=> criteria.every((data)=> data(product)))
    }
}

const byColor = (color) => (product) => product.color === color;
const bySize = (size) => (product) => product.size === size;

const fFil = new CommonFilter();
const result = fFil.applyFilter([data1, data2, data3], byColor("pink"), bySize("large"));
console.log(">>> CommonFilter ", result);

// In above we have just one functiob that will work for all

/*
1. Map modifies the array and returns the array
2. every returns boolean and is true only when all satisfy the condition
3. each returns nothing
*/

// COMMON SOLUTION FOR THE FIRST(WRONG) APPROACH

class ProductFilterSolved {
    applyFilter(products, ...criteria){
        return products.filter((product)=> criteria.every((data)=> data(product)))
    }
}

const fFil1 = new ProductFilterSolved();
const result1 = fFil1.applyFilter([data1, data2, data3], byColor("pink"), bySize("large"));
console.log(">>> ProductFilterSolved ", result1);

/*
1. This solves the problem because we will not touch ProductFilterSolved class and it will follow OCP.
2. We create and pass compare functions 
*/