import express from "express";
export const routerCitas = express.Router();
import { addCita,
      upCita,
      searchEmpleadobyCita,
      getAllCitaById,
      getCitasPendById,
      delCita} from "../db/query/queryCitas.js";
import { enableConnect } from "../db/connection.js";


routerCitas.use(express.json()); 


//funcional
//crear un cita
routerCitas.post("/adCita", async (req, res) => {
try{
const data= req.body;
   const connection = await enableConnect();
     addCita(connection,data)
   res.status(201).json({ message: 'Se creó con éxito la cita'});
}catch(err){
      console.error(err);
     res.status(500).json({ error: 'Hubo un problema',err});
}
  });

//funcional
//actualizar una cita
routerCitas.post("/upCita", async (req, res) => {
      try{
            const Data= req.body;
         const connection = await enableConnect();
      await upCita(connection,Data) /*el idventa no debe cambiar pero asi esta el procedura,si esto se cambiara no seria seguro*/
res.status(201).send({message:'se actualizo con exito la cita'})
      }catch(err){
            res.status(500).json('ocurrio un problema',err)
      }
        });

//funcional 
//se cambiara para que regrese la  disponibilidad de horario
routerCitas.get('/searchEmpleadoByEsp/especialidad/:esp', async (req,res)=>{
      try{
      const {esp}= req.params   
      const connection = await enableConnect();
      const resultado= await searchEmpleadobyCita(connection,{ espe:esp })
      res.send(JSON.stringify(resultado));
      }catch(err){
            res.status(500).json('ocurrio un problema con la busqueda',err)

      }
      
})

//funcional
//regresa todas las citas de cierta id
routerCitas.get("/getCitaById/:id", async (req, res) => {
      try {
            const {id}=req.params
        const connection = await enableConnect();
        const resultado = await getAllCitaById(connection,{ids:id});
        res.send(JSON.stringify(resultado));
      } catch (err) {
        console.error("Ha ocurrido un error: ", err);
        res.status(500).send("Ha ocurrido un error al procesar tu solicitud");
      }
    });

    //funcional
    //regresa las citas pendientes por id
    routerCitas.get("/CitasPendById/:id/:fecha", async (req, res) => {
      try {
            const {id,fecha}=req.params
            const connection = await enableConnect();
            const resultado = await getCitasPendById(connection,{ids:id,fechas:fecha});
            res.send(JSON.stringify(resultado));   

      } catch (err) {
        console.error("Ha ocurrido un error: ", err);
        res.status(500).send("Ha ocurrido un error al procesar tu solicitud");
      }
    });


//funcional
    routerCitas.get("/delCitas/:id", async (req, res) => {
      try {
            const {id}=req.params
   const connection = await enableConnect();
          delCita(connection,{id});
            res.status(201).send({message:'se elimino con exito la cita'})
      } catch (err) {
        console.error("Ha ocurrido un error: ", err);
        res.status(500).send("Ha ocurrido un error al procesar tu solicitud");
      }
    });
    
    