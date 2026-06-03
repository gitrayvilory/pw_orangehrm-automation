class DashboardPage {
  constructor(page) {
    this.page = page;
    this.dashboardBrand = page.locator('.oxd-brand-banner');
    this.pimMenuButton = page.locator('xpath=//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[2]/a/span');
  }

  async navigateToPimModule() {
    await this.pimMenuButton.click();
  }
}

module.exports = { DashboardPage };
