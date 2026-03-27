const sumhandler = require('./handler')

const sum =((req , res)=>{
    if(req.url === '/'){
        res.setHeader('Context-type' , 'html/text');
        res.write(`
            <html>
            <head><title>Caluculator</title></head>
            <body><h1>Welcome</h1>
            <a href="/sum">Caluculator</a>
            </body>
            </html>
            `)
        res.end();
    }
    else if(req.url === '/sum'){
        res.setHeader('Context-type' , 'html/text');
        res.write(`
            <html>
            <head><title>Caluculator</title></head>
            <body><h1>You can caluculate the sum here</h1>
            <form action="/caluculate-details" method="post">
            <input type="number" name="num1" placeholder = "Enter the number">
            <input type="number" name="num2" placeholder = "Enter the number">
            <input type="submit" value="Submit">
            </body>
            </html>
            `)
            res.end();
    }
    else if(req.url === '/caluculate-details'){
        sumhandler(req,res);
    }
    else if (req.url === '/go-back' && req.method === 'GET') {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    }
});


module.exports = sum;