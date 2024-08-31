const app           = require('./app');
const express       = require('express');
const dotenv        = require('dotenv');
const DB_CONN       = require('./db');
const customApis    = require('./router');

//setting up config file to access env variables
dotenv.config({path:'./config/.env'});

//Fetch env Variables
const port          = process.env.PORT || 5000;
const env           = process.env.NODE_ENV || 'DEVELOPMENT';
const db_url        = process.env.DB_URL;

// run the server, i.e server will listen...
app.listen(port, (err) => {
    if(err){
        console.log(err);
    }else{
        // If server is litening then conect server with db
        DB_CONN(db_url);
        console.log(`Server listening on port ${port} in ${env} mode.`);
    }
});

// add/fetch routes and Apis
// fetchFoodMenu();
app.use(express.json());
app.use('/', customApis);

app.post("/messages", (req, res) => {
    res.send(req.body);
});
  
app.get("/:universalURL", (req, res) => {
    res.send("404 URL NOT FOUND");
});

// app.listen(port,function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("server is running on port "+port+" in "+env);
//     }
// });
