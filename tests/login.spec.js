const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { readExcelSheet } = require('../utils/excelReader');
const path = require('path');

test.describe('Flujo de Autenticación en OrangeHRM', () => {
  const dataPath = path.join(__dirname, '../data/data.xlsx');
  const loginData = readExcelSheet(dataPath, 'Login')[0]; 

  test('Debería iniciar sesión de forma exitosa usando credenciales válidas', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate(loginData.url);
    await loginPage.login(loginData.username, loginData.password);

    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
  });
});
