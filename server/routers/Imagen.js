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

export async function ultimoID(conexion) {
  try {
    let query = "CALL maximoIdUser()"; // Procedimiento almacenado que obtiene el ultimo id insertado en la tabla usuario
    const [rows, fields] = await conexion.query(query); // Ejecutamos el procedimiento y almacenamos el resultado
    endConnection(); // Cerramos la conexion con la base de datos
    return rows[0]; // Retornamos el valor almacenado
  } catch (err) {
    console.error("Ha ocurrido un error al ejecutar el query: " + err);
  }
}

/* NOTA IMPORTANTE */
/* Si el proceso de carga se esta realizando mediante el perfil del usuario, es decir, se encuentra logueado se pasaria su id por parametro directamente al igual
   que la imagen, pero en caso que sea durante la creacion de una nueva cuenta se debera almacenar la imagen cargada en una variable para usarse posteriormente
   ya que el usuario se hay dado de alta y su informacion se encuentre en la base de datos para asi poder obtener su id (Esto puede realizarse con la funcion ultimoID) */
export async function uploadImage(conexion, img, idUser) {
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
    const query = mysql.format(uploadImage, [idUser, urlImg]); // Parametros necesarios para el procedimiento
    await conexion.query(query); // Ejecutamos el query
    endConnection(); // Cerramos la conexion con la base de datos
  } catch (err) {
    console.error(err);
  }
}
