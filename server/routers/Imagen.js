//import multer from 'multer'
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { enableConnect } from "../db/connection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const routerImagenes = express.Router();

// Define la ruta base del proyecto
const basePath = path.resolve(__dirname, '../');

// Configuración de la ruta para servir archivos estáticos desde '../client/img'
routerImagenes.use('/img', express.static(path.join(basePath, 'client', 'img')));

routerImagenes.get('/imgProdServ/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const conexion = await enableConnect();
        const [rows, fields] = await conexion.query('SELECT img FROM prodServ WHERE pkIDPS = ?', [id])
            // if (err) {
            //     console.error('Error al obtener producto', err);
            //     return res.json({ err: "Error al obtener producto" });
            // }

            // if (result.length === 0) {
            //     return res.json({ msg: "Producto no encontrado" });
            // }
            
            const { img } = rows[0];
console.log(img)
            const imageUrl = `${req.protocol}://${req.get('host')}/img/${img}.jpg`;

        //     res.json({
        //         msg: 'Producto obtenido correctamente',
        //         data: {
        //             name: prodServ.nombre,
        //             precio: prodServ.precio,
        //             image: imageUrl
        //         }
        // });
    } catch (error) {
        console.error('Error en la conexión a la base de datos', error);
        return res.json({ err: "Error en la conexión a la base de datos" });
    }
});