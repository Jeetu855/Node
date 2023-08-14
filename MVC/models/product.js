// const products = [];
const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            console.log('error reading file <save>', err);
            cb([]);
        } else {
            let products;
            try {
                products = JSON.parse(fileContent);
            } catch {
                products = [];
            }
            cb(products);
        }
    });
};
module.exports = class Product {
    //object will have property title, whose value will be passed inside of the constructor
    // just name means this function has to be called on object
    // products.push(this);
    constructor(title) {
        this.title = title;
    }

    save() {
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
};
