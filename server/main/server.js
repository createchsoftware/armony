import express from 'express';
import dotenv from 'dotenv';
import * as database from './db/database.js';

dotenv.config('./main/config/.env.local');

const app = express();
const port = process.env.SERVER_PORT;
const host = process.env.SERVER_HOST;

export async function iniciar() {
  /*
  app.get('/', async (req, res) => {
    let prod = await database.getProductos('Spa');
    console.log(prod);
    res.send(prod);
  });
  */
  app.get('/', async (req, res) => {
    let prod = await database.getServicios({servicio: "Spa", pilar: "Spa"});
    console.log(prod);
    res.send(prod);
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

}
