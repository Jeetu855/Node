const { resolve } = require('path');

const arr1 = ['Programming', 'Chess', 'Swimming'];

const arr2 = [...arr1]; // spread operator : pull out all the values
// out of the array and put them inside whatever the data structure is
// so elements of arr1 pulled out and put inside [] data structure
const person = {
    name: 'Max',
    age: 30,
    greet() {
        console.log('Greetings');
    }, // can write methods for objects in both ways with and without :
    hello: () => {
        console.log('Hello');
    },
};

const person2 = { ...person };

// console.log(arr1);
// console.log(arr2);

// console.log(person);
// console.log(person2);
// console.log(person.greet());
// console.log(person.hello());

const toArray = (...args) => {
    return args; // rest operaor
};
// rest operator

//console.log(toArray(1, 2, 3)); //creates array of arguments

// spread : pull elements outside of array or object
// rest : merge multiple arguments into an array and use
// it in the argument list of the function

// Destructuring arrays and objects

const printName = ({ name }) => {
    // passing an object to the function
    // and only taking out the name property of that object and
    // storing it in variable 'name' rest of the properties are dropped
    console.log(name);
};
printName(person);

const { name, age } = person;
console.log(name, age);

let [hobby1, hobby2] = arr1;
console.log(hobby1, hobby2); //logging first 2 values of array

// for array destructuring we can use any name since array
// elements dont have any names
// but objects name while destructuring must be the name of
// the property of the object

//Async and Promises

const fetchData = () => {
    const promise = new Promise((resolve, rejects) => {
        // resolve and reject are 2 functions
        // resolve:completes promise succesfully
        // reject:thorws error
        setTimeout(() => {
            resolve('Callback done');
        }, 1500);
        return promise;
    });
};
// new keyword to create new object based on a constructor function
setTimeout(() => {
    console.log('Timer is done');
    fetchData.then((text) => {
        //then() is called on a promise
        console.log(text);
    });
}, 3000); //callback function

console.log('Hello');
console.log('Hi');
//above is example of asynchronous code
