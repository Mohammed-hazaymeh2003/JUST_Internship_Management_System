const { Builder, By, Select } = require('selenium-webdriver');
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
      console.log(`✅ PASS: ${name}`);
      passed++;
    } catch(e) {
      console.log(`❌ FAIL: ${name}`);
      console.log(`   Error: ${e.message}`);
      failed++;
    }
  }

  await test('TC05 - Register form appears on clicking Register', async () => {
    const driver = await buildDriver();
    try {
      await driver.get(URL);
      await driver.findElement(By.linkText('Register')).click();
      const form = await driver.findElement(By.id('registerForm'));
      if (!await form.isDisplayed()) throw new Error('Register form not visible');
    } finally { await driver.quit(); }
  });

  await test('TC06 - Selecting Student role shows student fields', async () => {
    const driver = await buildDriver();
    try {
      await driver.get(URL);
      await driver.findElement(By.linkText('Register')).click();
      const select = new Select(await driver.findElement(By.id('role')));
      await select.selectByValue('student');
      const fields = await driver.findElement(By.id('studentFields'));
      if (!await fields.isDisplayed()) throw new Error('Student fields not visible');
    } finally { await driver.quit(); }
  });

  await test('TC07 - Selecting Company role shows company fields', async () => {
    const driver = await buildDriver();
    try {
      await driver.get(URL);
      await driver.findElement(By.linkText('Register')).click();
      const select = new Select(await driver.findElement(By.id('role')));
      await select.selectByValue('company');
      const fields = await driver.findElement(By.id('companyFields'));
      if (!await fields.isDisplayed()) throw new Error('Company fields not visible');
    } finally { await driver.quit(); }
  });

  await test('TC08 - Student with invalid email shows error', async () => {
    const driver = await buildDriver();
    try {
      await driver.get(URL);
      await driver.findElement(By.linkText('Register')).click();
      const select = new Select(await driver.findElement(By.id('role')));
      await select.selectByValue('student');
      await driver.findElement(By.id('studentId')).sendKeys('12345');
      await driver.findElement(By.id('studentEmail')).sendKeys('taimaa@gmail.com');
      await driver.findElement(By.id('studentName')).sendKeys('Taimaa Abdelrahman Flieh Alshraideh');
      await driver.findElement(By.id('studentPhone')).sendKeys('0798334246');
      await driver.findElement(By.id('studentDept')).sendKeys('Computer Science');
      await driver.findElement(By.id('registerPassword')).sendKeys('Test@1234');
      await driver.findElement(By.id('registerConfirmPassword')).sendKeys('Test@1234');
      await driver.findElement(By.xpath('//button[text()="Register"]')).click();
      const error = await driver.findElement(By.id('studentEmailError'));
      if (!await error.isDisplayed()) throw new Error('Email error not shown');
    } finally { await driver.quit(); }
  });

  await test('TC09 - Weak password shows error', async () => {
    const driver = await buildDriver();
    try {
      await driver.get(URL);
      await driver.findElement(By.linkText('Register')).click();
      const select = new Select(await driver.findElement(By.id('role')));
      await select.selectByValue('student');
      await driver.findElement(By.id('studentId')).sendKeys('12345');
      await driver.findElement(By.id('studentEmail')).sendKeys('taimaalshraiedeh@cit.just.edu.jo');
      await driver.findElement(By.id('studentName')).sendKeys('Taimaa Abdelrahman Flieh Alshraideh');
      await driver.findElement(By.id('studentPhone')).sendKeys('0798334246');
      await driver.findElement(By.id('studentDept')).sendKeys('Computer Science');
      await driver.findElement(By.id('registerPassword')).sendKeys('weakpass');
      await driver.findElement(By.id('registerConfirmPassword')).sendKeys('weakpass');
      await driver.findElement(By.xpath('//button[text()="Register"]')).click();
      const error = await driver.findElement(By.id('registerPasswordError'));
      if (!await error.isDisplayed()) throw new Error('Password error not shown');
    } finally { await driver.quit(); }
  });

  await test('TC10 - Mismatched passwords shows error', async () => {
    const driver = await buildDriver();
    try {
      await driver.get(URL);
      await driver.findElement(By.linkText('Register')).click();
      const select = new Select(await driver.findElement(By.id('role')));
      await select.selectByValue('student');
      await driver.findElement(By.id('studentId')).sendKeys('12345');
      await driver.findElement(By.id('studentEmail')).sendKeys('taimaalshraiedeh@cit.just.edu.jo');
      await driver.findElement(By.id('studentName')).sendKeys('Taimaa Abdelrahman Flieh Alshraideh');
      await driver.findElement(By.id('studentPhone')).sendKeys('0798334246');
      await driver.findElement(By.id('studentDept')).sendKeys('Computer Science');
      await driver.findElement(By.id('registerPassword')).sendKeys('Test@1234');
      await driver.findElement(By.id('registerConfirmPassword')).sendKeys('Other@9999');
      await driver.findElement(By.xpath('//button[text()="Register"]')).click();
      const error = await driver.findElement(By.id('registerConfirmPasswordError'));
      if (!await error.isDisplayed()) throw new Error('Confirm password error not shown');
    } finally { await driver.quit(); }
  });

  console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
}

runTests();