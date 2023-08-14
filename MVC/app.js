const express = require('express');
const bp = require('body-parser');
const path = require('path');
const rootDir = require('./util/path');

const adminRoutes = require('./routes/admin');
const errorController = require('./controllers/error');
const userRoutes = require('./routes/shop');

const app = express();
// !ctrl+space :for options

app.set('view engine', 'ejs');
app.set('views', 'views'); //what is the name of views folder in our directory

app.use(express.static(path.join(rootDir, 'public')));

app.use(bp.urlencoded({ extended: true }));

app.use('/admin', adminRoutes);

app.use(userRoutes);

app.use(errorController.get404);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
