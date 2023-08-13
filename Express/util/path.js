const path = require('path');

module.exports = path.dirname(require.main.filename);
// this gives us the path of the main file of our project which is app.js
// so this gives path of d/node/express
