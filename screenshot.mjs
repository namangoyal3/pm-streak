import { chromium } from 'playwright';

const token = process.env.SCREENSHOT_TOKEN;
if (!token) {
  console.error('Set SCREENSHOT_TOKEN to a valid session JWT (never hardcode it).');
  process.exit(1);
}
const browser = await chromium.launch();
const context = await browser.newContext();
await context.addCookies([{name:'token',value:token,domain:'localhost',path:'/',httpOnly:true,secure:false}]);
const page = await context.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:3002/dashboard', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(3000);
await page.screenshot({ path: '/tmp/dashboard-final.png' });
await browser.close();
console.log('Done');
