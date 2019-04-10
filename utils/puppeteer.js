const puppeteer = require('puppeteer');


const getMangaIndexArr = (data) => {
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
    const resultList = []
  
    options = Object.assign({}, defaultOpts, options)
    const browser = await puppeteer.launch({
      //设置超时时间
      timeout: 15000,
      //如果是访问https页面 此属性会忽略https错误
      ignoreHTTPSErrors: true,
      // 打开开发者工具, 当此值为true时, headless总为false
      devtools: true,
      // headless模式, 不会打开浏览器
      headless: false
    });
  
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(150000) //设置超时默认超时时间 150秒
    await page.goto(options.url, {waitUntil: 'domcontentloaded'}); // dom加载完毕
    
    await page.click(options.selectors.searchInput)
    await page.type(options.selectors.searchInput, data)
    await page.click(options.selectors.searchBtn)

    // todo 点击搜索后会打开新页面
    // 官方issues里有类似的 https://github.com/GoogleChrome/puppeteer/issues/3718 打开<a target="_blank">找不到新page实例和挂加载完成事件监听
    // 但是没有官方提出的解决方案
    await page.waitFor(5000)
    
    const page2 = options.selectors.searchOut ? (await browser.pages())[2] : page
    const searchList = await page2.$$(options.selectors.searchResults)

    for(let item of searchList){
      await page2.evaluate(x => {
        console.log(x.innerText)
        resultList.push({
          name: x.innerText,
          src: x.getAttribute('href')
        })
      }, item)
    }

    
    // await browser.close();
  }
}



getMangaIndexArr("百炼成神")()