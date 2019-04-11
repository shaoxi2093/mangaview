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
superagent.get('http://www.pufei.net/manhua/49/').charset('gbk').end((err, res) => {
  if(err) {
    return console.error('加载失败')
  }
  let $ = cheerio.load(res.text)
  let count = 10
  $('.plist li a').each((index, element) => {
    let i = 0, url = $(element).attr('href')
    let imgArr = []
    // if(count >= 0){
    //   while(i < 30){
    //     superagent.get(`${defaultOpts.url + url}?page=${i++}`).charset('gbk').end((err2, res2) => {
    //       let $ = cheerio.load(res2.text)
    //       let imgSrc = $('#viewimg').attr('src')
    //       if(!/undefined/.test(imgSrc)){
    //         imgArr.push(imgSrc)
    //       }
    //     })
    //   }
    // }
    
    resultArr.push({
      url,
      name: $(element).text(),
      imgArr,
    })
    count--
    
  })
  console.log(resultArr)

  // 点击
  for(const manga of resultArr){

  }
})
