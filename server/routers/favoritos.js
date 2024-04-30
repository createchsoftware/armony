import express from "express";
export const routerFavoritos = express.Router();
import { addFavorito } from "../db/query/queryfavoritos.js";
import { enableConnect } from "../DB/connection.js";


routerFavoritos.use(express.json()); 


routerFavoritos.post('/addFavorito', async (req, res) => {
    try {
        const data=req.body
        const conexion= await enableConnect()
        addFavorito(conexion,data)
        res.status(201).send({message: 'Se anadio con exito'})
    } catch (err) {
        res.status(500).send({error: 'Hubo un problema',err})
    }
})