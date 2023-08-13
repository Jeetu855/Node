const express = require('express');
const bp = require('body-parser');
const path = require('path');
const rootDir = require('./util/path');
const expressHbs = require('express-handlebars');

const adminData = require('./routes/admin');

const userRoutes = require('./routes/shop');

const app = express();
// !ctrl+space :for options
// app.engine(
//     'hbs',
//     expressHbs({
//         layoutsDir: 'views/layouts',
//         defaultLayout: 'main-layout',
//         extname: 'hbs',
//     })
// ); //call expressHbs() as hbs
// app.set('view engine', 'hbs');
// app.set('view engine', 'pug');
// app.set('views', 'views');
// set any values globally on our application

app.set('view engine', 'ejs');
app.set('views', 'views'); //what is the name of views folder in our directory

app.use(express.static(path.join(rootDir, 'public')));

app.use(bp.urlencoded({ extended: true }));

app.use('/admin', adminData.routes);
// since exporting multiple objects from admin.js,
// each object accessed with . and adminData(name we gave while importing)
// is the main object inside which all exported objects of admin.js are present

app.use(userRoutes);

app.use((req, res) => {
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', { pageTitle: 'Page Not Found', path: '' });
    // passing data to engine dosent change, is same for all 3 here(pass them as objects)
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

// for multiple class, chain them with .
// indentation matters in pug
// if we just put /class it is assumed to be div
// create blocks as placeholder for dynamic content
// the dynamic content needs to be placed indented inside block BlockName
// !while inspecting page source, all templating engines convert their code to proper html

// hbs : for block statements do {{#conditional or loop but should be next to #}}, for normal values do {{}}
// indentation dosent matther for hbs
// to end a block {{/conditional}} eg: {{#if hasProducts}} ...code...{{else}}...code.. {{/if}}
// hbs only supports either true or false for conditionals(cant run any logic in hbs template)
// if has hash before it, else dosent
// to access arrays or objects sent to templates, use this keyword which always refers to objects or arrays passed
// for layout placeholder use {{{}}}
// by default, not passed vaiables are false like activeShop etc

// ejs: for values <%=%> ,always with = gets rendered as text
// for block statements <% %>:inside them we can write vanilla js
// eg : <%if (prods.length>0) { %> .. code .. <% } else { %> .. code .. <% } %>
// to add partials: <%-include(path)%>// path from the file you are in
// if for partials we use <%=%>,it renders it as text
