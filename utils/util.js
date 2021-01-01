//访问API
function getMusicListData(url,callBack){
    wx.request({
      url: url,
      success: function (res) {
        callBack(res)
      },
      fail: function (error) {
        console.log(error)
      }
    })
 }
   //判断是否为收藏
 function panduanSC(res){
  var songdata=wx.getStorageSync('newsdata')
  f=true
  for (var idt in songdata){
    if (res == songdata[idt]){
      f=false
    }
  }
  return f
}
module.exports = {
  getMusicListData:getMusicListData,
  panduanSC:panduanSC
}
