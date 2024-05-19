import mysql from "mysql2";

export async function addfavorito(conexion, data) {
  try {
    const call = "CALL addFavorito(?,?,?)";
    const query = mysql.format(call, [data.idCliente, data.IdProducto]);
    await conexion.query(query);
  } catch (err) {
    console.log("Ha ocurrido un error al ejecutar el query: ", err);
    throw err;
  }
}

export async function delFavorito(conexion, data) {
  try {
    const call = "CALL delFav(?,?)";
    const query = mysql.format(call, [data.idCliente, data.IdProducto]);
    await conexion.query(query);
  } catch (err) {
    console.log("Ha ocurrido un error al ejecutar el query: ", err);
    throw err;
  }
}

export async function ProductFavoritosbyId(conexion, data) {
  try {
    const call = "CALL getFavoritosProductosCliente(?)";
    const query = mysql.format(call, data.ids);
    const [rows, fieds] = await conexion.query(query);
    return rows;
  } catch (err) {
    console.log("Ha ocurrido un error al ejecutar el query: ", err);
    throw err;
  }
}

export async function ServiceFavoritosbyId(conexion, data) {
  try {
    const call = "CALL getFavoritosServiciosCliente(?)";
    const query = mysql.format(call, data.ids);
    const [rows, fieds] = await conexion.query(query);
    return rows;
  } catch (err) {
    console.log("Ha ocurrido un error al ejecutar el query: ", err);
    throw err;
  }
}
