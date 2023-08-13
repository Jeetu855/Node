// express is a framework built with helper functions
// npm i --save express:means we are going to use it in production as well
// npm i --save-dev nodemon:used only in development, not needed in production

const express = require('express');
const bp = require('body-parser');
const path = require('path');
const rootDir = require('./util/path');

const adminRoutes = require('./routes/admin'); //need to provide relative path since local file
// importing router object that has routes registered
// and it is a valid middleware

const userRoutes = require('./routes/shop');

// ctrl + leftClick on express to view its code and at the bottom we see:
// export e(e is the function being exported)
const app = express(); //executing express() function initialises new object

app.use(express.static(path.join(rootDir, 'public')));
// Middleware:incoming request sent through multiple functions before sending response
// A function that executes between the time that server gets the
// request and the time server sends out the response
// so the function (req,res)=>{res.send()} is a middleware
// app.METHOD accepts path and bunch of middlewares so if we want
// to write middleware for specific path, specify it inside the request
// next() is a function we call to execute next middleware in line for execution
// so next() function allows the request to travel onto the next middleware in line for execution
// middlewares run in the order we define them
// use method allows us to add new middleware function:use() acceptes requestHandlers

app.use(bp.urlencoded({ extended: true })); //this middleware automatically calls next middleware
// only parses urlEcoded bodies

// app.use('/', (req, res, next) => {
// console.log('Global middleware, always runs');
// next();
// });

app.use('/admin', adminRoutes);

app.use(userRoutes);

app.use((req, res) => {
    // res.status(404).send(`<h1>Page not found</h1>`);
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

// requests pass through funnel of middlewares

// app.use() :also accepts a path:if we want to execute a certain middleware
// for only some paths we can provide it

// !if we are sending a response(res.send()) we should not call next()
// !because we can only send 1 response for a request
// !app.use() works for all http methods
// !path in middleware is the path for which middleware is invoked('/' path is default path)
// !and is similar to /*(wildcard)
// !can chain things like .status() .setHeader() but .send() or .sendFile() has to be the last one
