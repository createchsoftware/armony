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


export async function delFavorito(conexion,data){
   
            try{
                conexion.query('CALL delFav(?,?)',[
                    data.idCliente,data.IdProducto])
                 
                }catch(err){
                    console.log("Ha ocurrido un error al ejecutar el query: ",err)
                    throw err;
                    }
}

export async function FavoritosbyId(conexion,data){
try{

    const call='select*from prodServ where pkIdPS in(select fkProd from carritoYFavoritos where fkCliente = ?)'
    const query=mysql.format(call,data.ids)
const [rows,fieds]= await conexion.query(query)
return rows

}catch(err){
    console.log("Ha ocurrido un error al ejecutar el query: ",err)
    throw err;
}
}


export async function Favoritosbyname(conexion,data){
try{
    const query='select*from '

}catch(err){
    console.log("Ha ocurrido un error al ejecutar el query: ",err)
    throw err;
}
}
