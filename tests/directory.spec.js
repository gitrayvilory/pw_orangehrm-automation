const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DirectoryPage } = require('../pages/DirectoryPage');
const { readExcelSheet } = require('../utils/excelReader');
const path = require('path');

test.describe('Flujo de Directorio - Buscar por Nombre de Empleado', () => {
  const dataPath = path.join(__dirname, '../data/data.xlsx');
  
  // Consumo aislado de las pestañas correspondientes para este test específico
  const loginData = readExcelSheet(dataPath, 'Login')[0];
  const directoryData = readExcelSheet(dataPath, 'Directory')[0];
    const pimData = readExcelSheet(dataPath, 'PIM')[0];

  test('Debería buscar un empleado', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const directoryPage = new DirectoryPage(page);

    // 💡 Entramos directo a la URL de directorio, el navegador ya está logueado
    // Navegación
    await directoryPage.navigate();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory');


    // Búsqueda y filtrado por Hints
    await directoryPage.searchByEmployeeName(directoryData.searchName);

    // Aserción nativa de Playwright para validar que la búsqueda se procesó correctamente
    await expect(directoryPage.searchButton).toBeVisible();


const nombreABuscar = await concatenarNombreRegistrado();
await validarNombreEmpleado(page, nombreABuscar);


    // Obtener el texto del elemento que muestra el resultado de la búsqueda para validar que el nombre del empleado aparece correctamente

   async function concatenarNombreRegistrado() {
  const nombreRegistrado = `${pimData.firstName} ${pimData.middleName} ${pimData.lastName}`;
  return nombreRegistrado.trim();
}

async function validarNombreEmpleado(page, nombreABuscar) {
  // Localizar solo el elemento que contiene el texto buscado
  const headerLocator = page.locator('.orangehrm-directory-card-header')
                            .filter({ hasText: `${nombreABuscar}` });

  console.log(`Validación PRE-headerLocator: "${headerLocator}" `);

  try {
    await headerLocator.first().waitFor({ state: 'visible', timeout: 15000 });

    const nombreExtraido = await headerLocator.first().innerText();
    const nombreLimpio = nombreExtraido.trim().toLowerCase();
      console.log(`Validación PRE-nombreLimpio: "${nombreLimpio}" `);

    const coincide = nombreLimpio === nombreABuscar.trim().toLowerCase();

    expect(nombreLimpio).toBe(nombreABuscar.trim().toLowerCase());
    console.log(`✅ Búsqueda: Validación exitosa: "${nombreLimpio}" coincide con el buscado.`);
    return coincide;

  } catch (error) {
    console.error("❌ Búsqueda: Error: El elemento no apareció en el tiempo esperado.", error);
    return false;
  }
}



  });
});
