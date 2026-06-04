const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { PimPage } = require('../pages/PimPage');
const { readExcelSheet } = require('../utils/excelReader');
const path = require('path');

test.describe('Flujo de Gestión de Empleados (PIM)', () => {
  const dataPath = path.join(__dirname, '../data/data.xlsx');
  
  // Lectura dirigida a cada pestaña correspondiente
  const loginData = readExcelSheet(dataPath, 'Login')[0];
  const pimData = readExcelSheet(dataPath, 'PIM')[0];

  test('Debería registrar el empleado (con manejo de ID duplicado)', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const pimPage = new PimPage(page);

    // 💡 YA NO HAY LOGIN. Entramos directo porque la sesión ya existe:
     await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    
    // Flujo PIM
    await dashboardPage.navigateToPimModule();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');

    await pimPage.clickAddEmployee();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee');

    // Dentro del dir de pruebas
    const imagePath = path.join(__dirname, '../data/Ray.jpg');


    // Llenamos el formulario
    await pimPage.fillEmployeeForm(
      pimData.firstName, 
      pimData.middleName, 
      pimData.lastName, 
      String(pimData.employeeId),
      imagePath // <- Pasamos la ruta de la foto aquí
    );

    // --- CONDICIONAL PARA MANEJAR EL ID DUPLICADO ---
    try {
      // Esperamos un máximo de 1.5 segundos a que aparezca el mensaje de error
      // Usamos el selector por texto que es mucho más estable que el XPath absoluto
      await page.getByText('Employee Id already exists').waitFor({ state: 'visible', timeout: 1500 });
      
      // Si el código llega aquí, significa que el error SÍ apareció
      console.log('⚠️ Registro: El Employee Id ya existe. Dando clic en Cancelar...');
      
      // Hacemos clic en el botón Cancelar (usando su rol/nombre nativo en el DOM)
      await page.getByRole('button', { name: 'Cancel' }).click();
      
      // Validamos que regresamos con éxito a la lista de empleados
      await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');

    } catch (error) {
      // Si ocurre un 'timeout' en el waitFor, significa que el mensaje NO apareció (el ID está disponible)
      console.log('✅ Registro: El ID está libre. Procediendo a guardar al empleado...');
      
      await pimPage.clickSave();
      await expect(page).toHaveURL(/.*\/pim\/viewPersonalDetails\/empNumber.*/);
    }
});
});
