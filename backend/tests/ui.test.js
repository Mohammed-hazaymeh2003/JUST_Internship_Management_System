const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const URL = 'http://127.0.0.1:5500/GP_Project/frontend/Login.HTML';

function buildDriver() {
  const options = new chrome.Options();
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  return new Builder().forBrowser('chrome').setChromeOptions(options).build();
}

async function runTests() {
  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(` PASS: ${name}`);
      passed++;
    } catch(e) {
      console.log(` FAIL: ${name}`);
      console.log(`   Error: ${e.message}`);
      failed++;
    }
  }

  await test('TC01 - Login page loads with correct title', async () => {
    const driver = await buildDriver();
    try {
      await driver.get(URL);
      const title = await driver.getTitle();
      if (title !== 'FTMS') throw new Error(`Expected FTMS but got ${title}`);
    } finally { await driver.quit(); }
  });

  await test('TC02 - Login form inputs are visible', async () => {
    const driver = await buildDriver();
    try {
      await driver.get(URL);
      const email = await driver.findElement(By.id('loginEmail'));
      const pass  = await driver.findElement(By.id('loginPassword'));
      if (!await email.isDisplayed()) throw new Error('Email not visible');
      if (!await pass.isDisplayed()) throw new Error('Password not visible');
    } finally { await driver.quit(); }
  });

  await test('TC03 - Login with empty fields shows alert', async () => {
    const driver = await buildDriver();
    try {
      await driver.get(URL);
      await driver.findElement(By.xpath('//button[text()="Sign in"]')).click();
      const alert = await driver.switchTo().alert();
      const text  = await alert.getText();
      await alert.accept();
      if (!text.includes('Enter all fields')) throw new Error(`Wrong alert: ${text}`);
    } finally { await driver.quit(); }
  });

  await test('TC04 - Login with wrong credentials shows alert', async () => {
    const driver = await buildDriver();
    try {
      await driver.get(URL);
      await driver.findElement(By.id('loginEmail')).sendKeys('fake@test.com');
      await driver.findElement(By.id('loginPassword')).sendKeys('Fake@1234');
      await driver.findElement(By.xpath('//button[text()="Sign in"]')).click();
      await driver.wait(async () => {
        try {
          await driver.switchTo().alert();
          return true;
        } catch(e) {
          return false;
        }
      }, 10000);
      const alert = await driver.switchTo().alert();
      const text  = await alert.getText();
      await alert.accept();
      if (!text.includes('Wrong email or password')) throw new Error(`Wrong alert: ${text}`);
    } finally { await driver.quit(); }
  });

  console.log(`\nResults: ${passed} passed, ${failed} failed`);
}

runTests();