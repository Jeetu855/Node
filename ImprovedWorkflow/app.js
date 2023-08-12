const http = require('http');
const fs = require('fs');

const rqListener = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');

        res.write(`<body><form action='/message' method='POST'><input type='text' name='message'>
        <button type='submit'>Send</button>
        </form></body>`);
        res.write('</html>');
        res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);

            body.push(chunk);
        }); //!on() allows us to listen to certain event(here we listen to data event)

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();

            //!'end' fired after completing entire request
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                console.error(`${err}`);
            });
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    }
    // res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My Server</title></head>');
    res.write('<body><h1>My first Server</h1></body>');
    res.write('</html>');
    res.end();
};

const server = http.createServer(rqListener);

server.listen(3000);

// in package.json, add script "start":"node app.js"
// now instead of typing node app.js to start server we can instead do
// npm start which will execute start script from package.json and 'run node app.js'
// others can run this so they dont have to guess which is main js file
// start is special script name and can just be run with npm start
// for other script do: npm run server-begin

// npm install nodemon --save-dev
// only use package in development cause in production we dont need nodemon, we will have a proper server

// can delete node modules folder if not using project, but when using it again, run:npm install to get all packages

// errors: syntax, runtime, logical
