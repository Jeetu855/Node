const express = require('express');
const router = express.Router();
const path = require('path');

const rootDir = require('../util/path');

const products = [];

// /admin/add-product -> GET
router.get('/add-product', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    res.render('add-product', {
        pageTitle: 'Add-Prodcut',
        path: '/admin/add-product',
        activeAddProduct: true,
        formsCSS: true,
        productCSS: true,
        //pass the path to main layout
    });
});

// /admin/add-product -> POST
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    products.push({ title: req.body.title }); //adding an object inside products array
    // input has name title so in key:value
    // pair of object ,input name becomes key and our input becomes value
    res.redirect('/');
});

exports.routes = router;
exports.products = products;
