const puppeteer = require('puppeteer');
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`https://www.pokemon-card.com/deck/confirm.html/deckID/${process.argv[2]}/`, {
    waitUntil: 'domcontentloaded'
  })
  console.log(await page.title());
  const summary = await page.evaluate(() => {
    console.log(document.getElementById('cardImagesView').getElementsByTagName('img'));
    
    return Array.prototype.map.call(document.getElementById('cardImagesView').getElementsByTagName('table'), element => {
      const obj = {
        img: element.getElementsByTagName('img')[0].src,
        num: Number(element.getElementsByTagName('span')[0].innerText.slice(0, -1)),
      }
      return obj;
    });
    // return document.getElementsByTagName('img');
  })
  console.log(summary)

  try {
    fs.writeFileSync("./src/assets/deck/deck.dat", JSON.stringify(summary, null, 1));
    console.log('write end');
  } catch (error) {
    console.log(e);
  }
  await browser.close()
})()