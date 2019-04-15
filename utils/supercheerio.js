const charset = require('superagent-charset');
const superagent = charset(require('superagent'));
const cheerio = require('cheerio');


const defaultOpts = {
  url: 'http://www.pufei.net',
  selectors: {
    searchInput: '.searchtext1',
    searchBtn: '#btnSend1',
    searchOut: true,
    searchResults: '#dmList dl dt a',
    imgView: '#imgView'
  }
}
// 搜索
/*
superagent.get(defaultOpts).end((err, res) => {
  if(err) {
    return console.error('加载失败')
  }
  let $ = cheerio.load(res.text)
  $('.searchtext1').click()
  $('.searchtext1').val('百炼成神')
  $('#btnSend1').click()
  
})
*/
const resultArr = []
/**
 * 扑飞网 经常卡死加载失败
 */
/*
superagent.get('http://www.pufei.net/manhua/49/').charset('gbk').end((err, res) => {
  if(err) {
    return console.error('加载失败')
  }
  let $ = cheerio.load(res.text)
  let count = 10
  $('.plist li a').each(async (index, element) => {
    let i = 0, url = $(element).attr('href')
    let imgArr = []
    if(count >= 0){
      while(i < 30){
        const res2 = await superagent.get(`${defaultOpts.url + url}?page=${i++}`).charset('gbk')
        let $ = cheerio.load(res2.text)
        let imgSrc = $('#viewimg').attr('src')
        if(!/undefined/.test(imgSrc)){
          imgArr.push(imgSrc)
        }
        i++
      }
    }
    
    resultArr.push({
      url,
      name: $(element).text(),
      imgArr,
    })
    count--
    
  })
  console.log(resultArr)

})
*/

/**
 * 古风漫画网
 */
superagent.get('https://www.gufengmh8.com/manhua/bailianchengshen/').end((err, res) => {
  if(err) {
    return console.error('加载失败')
  }
  let $ = cheerio.load(res.text)
  $('#chapter-list-1 a').each((index, item) => {
    // console.log($(item).text())
    let title = $(item).text().trim()
    let titleNo = title.match(/(?<=\u7b2c)\d(?=\u8bdd)/) //检索出 【第几话】中的数字几
    console.log(titleNo)
  })
})