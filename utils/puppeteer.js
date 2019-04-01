const puppeteer = require('puppeteer');


const getMangaImgArr = (data) => {
  return async (options) => {
    const defaultOpts = {
      url: 'http://www.pufei.net',
      selectors: {
        searchInput: '.searchtext1',
        searchBtn: '#btnSend1',
        searchOut: true,
        searchResults: '#dmList dl dt a'
      }
    }
  
    options = Object.assign({}, defaultOpts, options)
    const browser = await puppeteer.launch({
      //设置超时时间
      timeout: 15000,
      //如果是访问https页面 此属性会忽略https错误
      ignoreHTTPSErrors: true,
      // 打开开发者工具, 当此值为true时, headless总为false
      devtools: false,
      // headless模式, 不会打开浏览器
      headless: false
    });
  
    const page = await browser.newPage();
    await page.goto(options.url);
  
    await page.waitFor(2000)
    await page.click(options.selectors.searchInput)
    await page.type(options.selectors.searchInput, data)
    await page.click(options.selectors.searchBtn)

    const page2 = options.selectors.searchOut ? (await browser.pages())[2] : page
    const searchList = page2.$$(options.selectors.searchResults)
    for(let item of searchList){
      console.log(item.innerText)
    }

    // await browser.close();
  }
}


getMangaImgArr("百炼成神")()