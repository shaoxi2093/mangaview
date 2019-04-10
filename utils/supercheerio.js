const superagent = require('superagent');
const cheerio = require('cheerio');
import {gb2312ToUtf8} from './utf8_gb2312'

const defaultOpts = {
  url: 'http://www.pufei.net',
  selectors: {
    searchInput: '.searchtext1',
    searchBtn: '#btnSend1',
    searchOut: true,
    searchResults: '#dmList dl dt a'
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
superagent.get('http://www.pufei.net/manhua/1331/').end((err, res) => {
  if(err) {
    return console.error('加载失败')
  }
  let $ = cheerio.load(res.text)
  $('.plist li a').each((index, element) => {
    resultArr.push({
      url: $(element).attr('href'),
      name: gb2312ToUtf8($(element).text())
    })
  })
  console.log(resultArr)
})
