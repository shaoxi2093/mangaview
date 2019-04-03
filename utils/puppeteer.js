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
    page.setDefaultNavigationTimeout(150000) //设置超时默认超时时间 150秒
    page.goto(options.url);
    let searchInput = await page.$$(options.selectors.searchInput)
    while(!searchInput.length){
      await page.waitFor(1000)
      searchInput = await page.$$(options.selectors.searchInput)
    }
    await page.click(options.selectors.searchInput)
    await page.type(options.selectors.searchInput, data)
    await page.click(options.selectors.searchBtn)
    let pages = await browser.pages()
    if(options.selectors.searchOut) {
      while(pages.length <= 2){
        await page.waitFor(1000)
        pages = await browser.pages
      }
    }
    
    const page2 = options.selectors.searchOut ? pages[2] : page
    const searchList = await page2.$$('.wordList')

    for(let item of searchList){
      console.log(item.innerText)
    }

    // await browser.close();
  }
}


getMangaImgArr("百炼成神")()