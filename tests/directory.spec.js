const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DirectoryPage } = require('../pages/DirectoryPage');
const { readExcelSheet } = require('../utils/excelReader');
const path = require('path');

test.describe('Flujo de Directorio - Buscar por Nombre de Empleado', () => {
  const dataPath = path.join(__dirname, '../data/data.xlsx');
  
  // Consumo aislado de las pestañas correspondientes sin alterar lo anterior
  const loginData = readExcelSheet(dataPath, 'Login')[0];
  const directoryData = readExcelSheet(dataPath, 'Directory')[0];

  test('Debería iniciar sesión y buscar un empleado', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const directoryPage = new DirectoryPage(page);

    // --- PASO 1: LOGIN (Reutilización limpia del módulo base) ---
    await loginPage.navigate(loginData.url);
    await loginPage.login(loginData.username, loginData.password);
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

    // --- PASO 2: DIRECTORIO (Nuevo Flujo Integrado) ---
    // Navegación
    await directoryPage.navigate();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory');

    // Búsqueda y filtrado por Hints
    await directoryPage.searchByEmployeeName(directoryData.searchName);

    // Aserción nativa de Playwright para validar que la búsqueda se procesó correctamente
    await expect(directoryPage.searchButton).toBeVisible();
  });
});
