import mysql from "mysql2";


export async function addfavorito(conexion,data){
    
    conexion.query('CALL addFavorito(?,?)',[
        data.idCliente,
        data.IdProducto],(err,result)=>{
            if(err){
           callback(err,null)
           return
            }
            callback(null,result)
        })
}

