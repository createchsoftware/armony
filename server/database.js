import mysql from'mysql';
import {config} from 'dotenv';


config();


const connection = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD
})

connection.connect(function(error){
    if(error)
       throw error;
    else
        console.log("Conexion exitosa");
})


export default connection;