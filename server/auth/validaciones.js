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

// Validación de finalizacion de servicio dentro de horario laboral
export function dentroHorarioLaboral(finServicio, empleado) {
  return finServicio > empleado.horaSalida ? true : false;
}

// Validacion de que el servicio no entre en la hora de comida
export function fueraHoraComida(finServicio, empleado, horaSeleccionada) {
  return horaSeleccionada < empleado.horaComida && finServicio > horaComida
    ? true
    : false;
}
