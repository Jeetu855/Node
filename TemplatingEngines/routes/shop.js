const express = require('express');
const path = require('path');

const router = express.Router();

const rootDir = require('../util/path');

const adminData = require('./admin');

router.get('/', (req, res, next) => {
    console.log(`shop.js`, adminData.products); //this data shared between all requests and all users
    // if user A edits it, user B will be able to see it as well
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
    const products = adminData.products; //products array sent from admin.js
    // ?pug
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0, //pass either true or false for hbs
        activeShop: true,
        productCSS: true,
    }); //defined templating engine as pug so dont need shop.pug
    // render() uses default templating engine
    // we also defined the path to views
    // pass products from this file as prods to .pug file
});

module.exports = router;
