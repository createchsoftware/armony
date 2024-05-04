// Busqueda por ID
export function encontrado(busqueda) {
  if (busqueda.length === 0) return true;
  return false;
}

// Updates
export function errorUpdate(articulo) {
  if (articulo.affectedRows === 0) return true;
  return false;
}
