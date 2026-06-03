const XLSX = require('xlsx');

/**
 * Lee una hoja específica de un archivo Excel y la transforma en formato JSON.
 * @param {string} filePath - Ruta absoluta del archivo Excel.
 * @param {string} sheetName - Nombre de la pestaña a leer.
 * @returns {Array<Object>} Arreglo con las filas mapeadas por columnas.
 */
function readExcelSheet(filePath, sheetName) {
  const workbook = XLSX.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];
  
  if (!worksheet) {
    throw new Error(`La hoja con el nombre "${sheetName}" no fue encontrada en el archivo Excel.`);
  }
  
  return XLSX.utils.sheet_to_json(worksheet);
}

module.exports = { readExcelSheet };
