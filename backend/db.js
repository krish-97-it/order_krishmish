const mongoose      = require('mongoose');

const DB_CONN = function(conn_uri){
    mongoose.connect(conn_uri).then(
        () =>{
            console.log("Connected with mongoDB");
        }
    ).catch( 
        (error) => {
            console.log(error)
        }
    );

}

module.exports = DB_CONN;

