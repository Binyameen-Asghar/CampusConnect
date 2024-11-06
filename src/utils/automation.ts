import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function automateSlateLogin(credentials: { username: string; password: string }) {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled'
    ]
  });
  
  const page = await browser.newPage();
  await page.goto('https://slate.uol.edu.pk');

  await delay(2000);

  try {
    await page.waitForSelector('img[width="24"]', { visible: true });
    await page.click('img[width="24"]');
    
    await page.waitForSelector('[type="email"]', { visible: true });
    await page.type('[type="email"]', credentials.username);
    
    await page.click('#identifierNext');
    await page.waitForSelector('[type="password"]', { visible: true });
    
    await page.type('[type="password"]', credentials.password);
    await page.click('#passwordNext');
    
    await page.waitForNavigation();
    console.log('Logged in successfully');
    
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

export async function automateERPLogin(credentials: { username: string; password: string; url: string }) {
  // Implement ERP login automation here
  console.log('ERP automation not implemented yet');
}