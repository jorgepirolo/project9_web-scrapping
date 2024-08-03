const puppeteer = require('puppeteer')
const fs = require('fs')

const shoesArray = []

const scrapper = async (url) => {
  console.log(url)

  const browser = await puppeteer.launch({ headless: false })

  const page = await browser.newPage()

  await page.goto(url)

  try {
    const cookies = '.reject-all-cookies'
    await page.waitForSelector(cookies)
    await page.click(cookies)
    await repeat(page, browser)
  } catch (error) {
    await repeat(page, browser)
  }
}

const repeat = async (page, browser) => {
  const arrayDivs = await page.$$('.productListItem')

  for (const shoeDiv of arrayDivs) {
    let price = await shoeDiv.$eval(
      "[data-e2e='product-listing-price']",
      (el) =>
        parseFloat(
          el.textContent.slice(0, el.textContent.length - 1).replace(',', '.')
        )
    )
    let model = await shoeDiv.$eval(
      "[data-e2e='product-listing-name']",
      (el) => el.textContent
    )

    let img = await shoeDiv.$eval('.thumbnail', async (el) => el.dataset.src)
    const shoe = {
      model,
      price,
      img
    }

    shoesArray.push(shoe)
  }
  console.log(`Llevamos ${shoesArray.length} datos recolectados`)

  try {
    const nextpage = "a[title='Página siguiente']"
    await page.waitForSelector(nextpage)
    await page.$eval(nextpage, (el) => el.click())
    await page.waitForNavigation()
    console.log('Pasamos a la siguiente página')

    await repeat(page, browser)
  } catch (error) {
    write(shoesArray)
    await browser.close()
  }
}

const write = (shoesArray) => {
  fs.writeFile('shoes.json', JSON.stringify(shoesArray), () => {
    console.log('Archivo escrito')
  })
}

module.exports = { scrapper }
