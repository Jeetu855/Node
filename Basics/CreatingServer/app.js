// core modules that come with node -> http, https, fs, path, os

const http = require('http');
const fs = require('fs');

const rqListener = (req, res) => {
    // this method is going to listen every request and also will be sending response
    // console.log(req);
    // console.log(req.url, req.method, req.headers);
    // url is everything after host (or the path)
    // process.exit(); //to stop listening after the data has been logged
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        // *we send this generated request to /message
        // *at /message, we copy the input data to a file and save it in the file
        // *then we again redirect back to /
        // * so / -> /message -> /  (path of requests)
        // action='/message' generated request should be send to url provided inside action
        // or redirect to provided url after successful authorization if requested
        // message data we send in POST added in HTTP request body
        // so action  attribute specifies where to send the form-data when a form is submitted
        res.write(`<body><form action='/message' method='POST'><input type='text' name='message'>
        <button type='submit'>Send</button>
        </form></body>`);
        res.write('</html>');
        // form arranges data in key:value pairs ,
        // input has property message and its value is what we type in and send
        return res.end(); //cannot change response after this //return so we get out of function
        // and not write anything after res.end()
    } //now we execute code below coz after submitting form we are
    // sent to /message so we dont enter first 'if' block
    if (url === '/message' && method === 'POST') {
        //form request forwarded to this path since written in action property
        const body = [];
        req.on('data', (chunk) => {
            //execute this function on receiving data chunks
            console.log(chunk);
            //can use const coz we never reassign a new value ut can push and shift
            body.push(chunk);
        }); //!on() allows us to listen to certain event(here we listen to data event)
        // data event fired whenever there is data available to be read
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            // Buffer object available globally in node, concat all chunks with buffer
            //!'end' fired after completing entire request
            console.log(parsedBody);
            const message = parsedBody.split('=')[1]; //split parsed body into parts for every = encountered and store in an array
            fs.writeFile('message.txt', message, (err) => {
                console.error(`${err}`);
            }); //write user data to file then redirect back to home page(/)
            // above method writes data in url encoded format so special characters are present in encoded format in the file
            res.statusCode = 302; //redirect
            res.setHeader('Location', '/'); //set the location of redirection
            // *can see redirection in network tab
            return res.end();
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My Server</title></head>');
    res.write('<body><h1>My first Server</h1></body>');
    res.write('</html>');
    res.end(); //cannot change response after this
};
// nodejs gives automatically gives us an object 'req' that represents the request and access its data
// and an object 'res' related to the response we wish to send

const server = http.createServer(rqListener); //createServer() method returns server
// createServer() method takes request listener as an argument
//* request listener is a function that will execute for every incoming request

server.listen(3000);
// keep listening for incoming request
