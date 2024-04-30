import mysql from "mysql2";

//se cambiara por un prodedure
export const addCita=(conexion,Data,callback)=>{
   
    conexion.query('insert into cita(fkVenta,fkEmpleado,fkSucursal,fecha,horaIn'+
        +'horaFin,Descripcion,estado) values(?,?,?,?,?,?,?,?)',
            [Data.idVenta,
            Data.IdEmpleado,
            Data.idSucursal,
            Data.fecha,
            Data.horaIn,
            Data.horaFin,
            Data.descripcion,
            Data.estado],(err,result)=>{
            if(err){
           callback(err,null)
           return
            }
            callback(null,result)
        })
        }
    
    
        export async function upCita(conexion,Data){
            try{
            const call='CALL updCita(?,?,?,?,?,?,?)'
            const query = mysql.format(call,[
                Data.idVenta,
                Data.IdEmpleado,
                Data.idSucursal,
                Data.nuevaFecha,
                Data.horaIn,
                Data.descripcion,
                Data.estado]);
                
            const [rows,fields]=await conexion.query(query);
                    return rows;
                    
            }catch(err){
            console.log("Ha ocurrido un error al ejecutar el query: ",err)
            throw err;
            }
          
        }

//query para buscar empleados de determinada especialidad 
//se cambiara por un prodedure
export async function searchEmpleadobyCita(conexion,Data){
try{

    const call=`SELECT * FROM  empleado where fkusuario in(select 
        fkEmpleado from empEspecialidad where fkEspecialidad in
        (select pkidEspecialidad from especialidades where nombre =?))`
    const query = mysql.format(call,[
        Data.espe])

const [rows,fields]=await conexion.query(query)
return rows;
}catch(err){
console.log("Ha ocurrido un error al ejecutar el query: ",err)
}
         }   

//se cambiara por un prodedure
export async function getAllCitaById (conexion,data,res){
            try{
                const call=`SELECT *FROM  cita where fkVenta in(
                    select pkIdVenta from venta where fkCliente in (
                    select fkUsuario from cliente where fkUsuario =?))`

                    const query = mysql.format(call,[data.ids])
                const [rows,fields]=await conexion.query(query);
                    return rows;
            }catch(err){
            console.log("Ha ocurrido un error al ejecutar el query: ",err)
            throw err;
            }
               
                }

                //se cambiara por un prodedure
                export async function getCitasPendById(conexion,data,res){
                    try{
                        const call=`SELECT *FROM  cita where fkVenta in(
                            select pkIdVenta from venta where fkCliente in (
                            select fkUsuario from cliente where fkUsuario =?))and estado=0 and fecha=?`
        
                            const query = mysql.format(call,[
                                data.ids,data.fechas])
                        const [rows,fields]=await conexion.query(query);
                            return rows;
                    }catch(err){
                    console.log("Ha ocurrido un error al ejecutar el query: ",err)
                    throw err;
                    }
                       
                        }

                        
//se cambiara por un procedure
export function delCita(conexion,data,res){
    try{
const call='delete from cita where fkVenta =?'
const query = mysql.format(call,[data.id])
 conexion.query(query)
}catch(err){
    console.log("Ha ocurrido un error al ejecutar el query: ",err)
    throw err;
    }
       
}


                
    
          