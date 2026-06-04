const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  reporter: 'html',
  // 1. TIMEOUT GLOBAL DEL TEST: El tiempo máximo que puede durar una prueba individual (ej. 30 segundos)
  timeout: 50000,
  use: {
    // 2. TIMEOUT DE ACCIÓN: El tiempo máximo que Playwright esperará por un clic, scroll o tipeo antes de fallar
    actionTimeout: 30000, // 30 segundos
    viewport: { width: 981, height: 729 },
    screenshot: 'on',
    launchOptions: {
      slowMo: 1000, // 2000 ms (2 segs) de espera entre cada interacción
      },
    //screenshot: 'only-on-failure',
    //trace: 'retain-on-failure',
    
  },
  reporter: [['allure-playwright']],
  projects: [
    {
      name: '1-Login',
      testMatch: /login\.spec\.js/,
    },
    {
      name: '2-PIM',
      testMatch: /pim\.spec\.js/,
      dependencies: ['1-Login'], // 👈 No arranca hasta que '1-Login' termine con éxito
      use: {
        storageState: 'playwright/.auth/user.json', // 👈 Reutiliza la sesión guardada
      },
    },
    {
      name: '3-Directory',
      testMatch: /directory\.spec\.js/,
      dependencies: ['2-PIM'], // 👈 No arranca hasta que '2-PIM' termine
      use: {
        storageState: 'playwright/.auth/user.json', // 👈 Reutiliza la misma sesión
      },
    },
  ],
});
