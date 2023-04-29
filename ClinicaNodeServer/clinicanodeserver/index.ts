const express = require("express");
//const db = require("postgres");
//const { routes } = require("./src/routes");
const app = express();


const cors = require('cors');

app.use(cors({
    //origin: 'http://localhost:3000',
    origin:"*",
}));

app.use(express.json());

app.get("/", (req:any, res:any)=>{
    res.send("hello world");
});

/*
app.use(function (req:any, res:any, next:any) {
    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.setHeader('Access-Control-Allow-Origin', req.header('origin') 
|| req.header('x-forwarded-host') || req.header('referer') || req.header('host'));
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    // Pass to next layer of middleware
    res.setHeader("content-type")
    next();
});*/





//app.use(routes);

app.listen(3001, ()=>{
    console.log("rodando servidor");
});