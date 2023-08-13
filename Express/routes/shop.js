const express = require('express');
const path = require('path');

const router = express.Router();

const rootDir = require('../util/path');

router.get('/', (req, res, next) => {
    // console.log('In another  middleware');
    // res.send(`<h1>Hello from express</h1>`);
    // res.send():allows us to attach a body of type any and automatically sets
    // the http header for proper content type
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
    // __dirname gives us path to the file in which we use it so __dirname=routes
    // to get to views= ../views/shop.html
    // sendFile() requirs absolute path
});

module.exports = router;
