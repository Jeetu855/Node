const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const db = require('./util/database'); //this will the pool

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// line below returns a promise which is a JS object which allows us to work with async code
db.execute('SELECT * FROM products') //getting all data from table products in node-complete database
    //  a DB can have multiple tables
    //  can use promises coz in database.js we exported pool.promise()
    //  errors propogate down the promise chain so can catch them all at the end of promise chain
    .then((result) => {
        console.log(result[0], result[1]);
    })
    .catch((err) => {
        console.log(err);
    });
// db.execute : to run queries

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
