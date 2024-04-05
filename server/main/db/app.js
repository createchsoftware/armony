import mysql from 'mysql2'

var conexion = mysql.createConnection({   /*buscare como poner los datos de la BD 
                                            en variables de entorno*/
    host :process.env.DB_HOst,
    database:process.env.DB_database,
    user:process.env.DB_user,
    password:process.env.DB_password
})

conexion.connect(function(error){
if(error){
    throw error;
}else{
   console.log('conexion exitosa') 
}
});

conexion.end();

module.exports=conexion;