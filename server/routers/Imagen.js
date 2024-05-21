//import multer from 'multer'
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { conexion, endConnection } from "../db/connection.js";
import { API_IMG } from "../data/datos.js";
import * as mysql from "mysql2";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const routerImagenes = express.Router();

// Define la ruta base del proyecto
const basePath = path.resolve(__dirname, "../");

// Configuración de la ruta para servir archivos estáticos desde '../client/img'
routerImagenes.use(
  "/img",
  express.static(path.join(basePath, "client", "img"))
);

routerImagenes.get("/imgProdServ/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows, fields] = await conexion.query(
      "SELECT img FROM prodServ WHERE pkIDPS = ?",
      [id]
    );
    // if (err) {
    //     console.error('Error al obtener producto', err);
    //     return res.json({ err: "Error al obtener producto" });
    // }

    // if (result.length === 0) {
    //     return res.json({ msg: "Producto no encontrado" });
    // }

    const { img } = rows[0];
    console.log(img);
    const imageUrl = `${req.protocol}://${req.get("host")}/img/${img}.jpg`;

    //     res.json({
    //         msg: 'Producto obtenido correctamente',
    //         data: {
    //             name: prodServ.nombre,
    //             precio: prodServ.precio,
    //             image: imageUrl
    //         }
    // });
  } catch (error) {
    console.error("Error en la conexión a la base de datos", error);
    return res.json({ err: "Error en la conexión a la base de datos" });
  }
});

export async function uploadImage(conexion, img, idCliente) {
  const imageFile = img.target.files[0]; // Obtenemos el archivo cargado
  const url = `https://api.imgbb.com/1/upload?key=${API_IMG}&name=${imageFile.name}`; //Url compuesta con API y nombre de archivo
  const data = new FormData(); // Creamos estructura llave/valor
  data.append("image", imageFile); // Insertamos la imagen con la llave image

  try {
    const response = await fetch(url, {
      method: "POST",
      body: data,
    }); // Cargamos la imagen al host
    const responseData = await response.json(); // Transformamos el resultado en JSON
    const urlImg = responseData.data.url_viewer; // Obtenemos la referencia de la imagen
    const uploadImage = "CALL updUsuarioImg(?, ?)"; // Procedimiento para actualizar la img del usuario
    const query = mysql.format(uploadImage, [idCliente, urlImg]); // Parametros necesarios para el procedimiento
    await conexion.query(query); // Ejecutamos el query
    endConnection(); // Cerramos la conexion con la base de datos
  } catch (err) {
    console.error(err);
  }
}
