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

  page.cookies('.plantvsundead.com');

  await page.goto('https://marketplace.plantvsundead.com/farm/map');
}

main();
