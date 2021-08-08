const puppeteer = require('puppeteer');
const dappeteer = require('@nodefactory/dappeteer');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const browser = await dappeteer.launch(puppeteer);
  const metamask = await dappeteer.setupMetamask(browser);

  await metamask.addNetwork({
    networkName: 'BSC',
    rpc: 'https://bsc-dataseed1.binance.org/',
    chainId: 56,
    symbol: 'BNB',
    explorer: 'https://bscscan.com/',
  });

  await metamask.switchNetwork('BSC');

  const page = await browser.newPage();

  await page.goto('https://marketplace.plantvsundead.com');

  const loginBtn = await page.waitForSelector('.metamask');

  await loginBtn.click();

  await metamask.approve();

  await sleep(3000);

  await metamask.sign();

  await page.bringToFront();

  await page.waitForNavigation();

  await page.goto('https://marketplace.plantvsundead.com/farm/map');

  await sleep(3000);

  await page.goto(
    'https://tenor.com/es/ver/hacker-man-hackerman-kung-fury-gif-4990055'
  );

  await page.evaluate(() => alert('🕵️'));
}

main();
