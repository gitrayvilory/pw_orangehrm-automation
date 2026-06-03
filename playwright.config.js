const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  reporter: 'html',
  // 1. TIMEOUT GLOBAL DEL TEST: El tiempo máximo que puede durar una prueba individual (ej. 30 segundos)
  timeout: 30000,
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
  projects: [
    // Definimos el Test 1 como el proyecto principal o inicial
    {
      name: 'PrimerTest',
      testMatch: /login\.spec\.js/,
    },
        // Definimos el Test 2 y le creamos la dependencia del anterior
    {
      name: 'SegundoTest',
      testMatch: /pim\.spec\.js/,
      dependencies: ['PrimerTest'], 

    },
    // Definimos el Test 3 y le creamos la dependencia del anterior
    {
      name: 'TercerTest',
      testMatch: /directory\.spec\.js/,
      dependencies: ['SegundoTest'], 
    },
  ],
});
