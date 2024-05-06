import express from "express";
export const routerFavoritos = express.Router();
import { addfavorito,delFavorito,FavoritosbyId } from "../db/query/queryfavoritos.js";
import { enableConnect } from "../db/connection.js";


routerFavoritos.use(express.json()); 



//funcional
routerFavoritos.post('/addfavorito',async (req,res)=>{
try{
const data=req.body
    const conexion= await enableConnect()
    await addfavorito(conexion,data)
    res.status(202).send({message:'Se anadio con exito'})
    conexion.end()
}catch(err){
res.status(500).send({error: 'Hubo un problema',err})
}

})

//funcional
routerFavoritos.post('/delFavorito',async(req,res)=>{
    try{
    const data=req.body
    const conexion=await enableConnect()
     delFavorito(conexion,data)
    res.status(201).send({message:'Se elimino con exito'})

    }catch(err){
        res.status(500).send({error: 'Hubo un problema',err})
    }
})


routerFavoritos.get('/FavoritosbyId/:id',async(req,res)=>{
    try{
    const {id} =req.params
    const conexion=await enableConnect()
    const resultado=await FavoritosbyId(conexion,{ids:id})
    res.send(JSON.stringify(resultado));
    
    }catch(err){
        res.status(500).send({error: 'Hubo un problema',err})
    }
})

