export function endOfDay(date) {
  if (date) {
    date.setHours(23, 59, 59, 999);
    return date;
  } else {
    return null
  }

}

/**Este formato es útil para trabajar con APIs o almacenar datos en una base de datos que espera una fecha en este formato estándar. (2024-10-11T15:08:05)*/
export function formatNovaDate(date): string {
  if (date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
  } else {
    return null
  }

}
