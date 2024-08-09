const app           = require('./app');
const dotenv        = require('dotenv');
const DB_CONN       = require('./db');
const fetchFoodMenu = require('./db_models/food_menu');

//setting up config file to access env variables
dotenv.config({path:'./config/.env'});

//Fetch env Variables
const port          = process.env.PORT || 5000;
const env           = process.env.NODE_ENV || 'DEVELOPMENT';
const db_url        = process.env.DB_URL;


app.listen(port, (err) => {
    if(err){
        console.log(err);
    }else{
        DB_CONN(db_url);
        console.log(`Server listening on port ${port} in ${env} mode.`);
    }
});

// Fetch Apis
fetchFoodMenu();

app.get("/messages", (req, res) => {
    res.send("Hello World");
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
