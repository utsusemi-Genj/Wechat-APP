

var app = getApp();
// pages/page1/page1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alldata:[],
    moren:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
 onLoad: function (options) {

  //调用方法获得榜单的数据
    var soarUrl = app.globalData.musicBase + "/playlist/detail?id=19723756";
    var newsongUrl = app.globalData.musicBase + "/playlist/detail?id=3779629";
    var originalUrl = app.globalData.musicBase + "/playlist/detail?id=2884035";
    var hotsongUrl = app.globalData.musicBase + "/playlist/detail?id=3778678";

    this.getMusicListData(    soarUrl, "飙升榜","/playlist/detail?id=19723756");
    this.getMusicListData( newsongUrl, "新歌榜","/playlist/detail?id=3779629");
    this.getMusicListData( originalUrl, "原创榜","/playlist/detail?id=2884035");
    this.getMusicListData( hotsongUrl, "热歌榜","/playlist/detail?id=3778678");

    var xs=wx.getStorageSync("xs");
    var singUrl=wx.getStorageSync("singUrl");

    this.setData({
      xs:xs,
      singUrl:singUrl
    })
  },

  //访问AIP的方法
  getMusicListData:function (url, categoryTitle , detail){
    var that = this;
    wx.request({
      url: url,
      success: function (res) {
        that.processMusicData(res.data.playlist, categoryTitle,detail)
      },
      fail: function (error) {
        console.log(error)
      }
    })
   },

  //获得榜单的详细数据的代码
  processMusicData:function(song, categoryTitle,detail){
    var musices = [];
    var alldata = this.data.alldata
    var coverImgUrl=song.coverImgUrl
    for (var idx = 0; idx < 3; ++idx) {
      var subject = song.tracks[idx];
      var ar =[];
      for (var idz in subject.ar){
        ar.push(subject.ar[idz].name)
      }
      var temp = {
        number:(parseInt(idx) + 1)+".",
        songname: subject.name,
        // .substr(0,7),
        songer:ar
      }
      musices.push(temp)
    }
    var dd = {coverImgUrl,detail,categoryTitle,musices}
    alldata.push(dd)
    this.setData({alldata});
  },
  //跳转到排行详细页
  onpaihang: function (event) {
    var detail = event.currentTarget.dataset;
    wx.setStorageSync("detail", detail);
    wx.navigateTo({
      url: '../page1/paihang/paihang',
    })
  },
  //播放按钮点击事件
  onBofang: function () {
    this.setData({
      xs:!this.data.xs
    })
    if(this.data.xs){    
      wx.pauseBackgroundAudio({
        success: (res) => {},
      })
      wx.setStorageSync("xs", this.data.xs);
    }else{
      wx.playBackgroundAudio({
        dataUrl: this.data.singUrl,
      })
      wx.setStorageSync("xs", this.data.xs);
    }
  },
  onhuiyuan:function () {
    wx.navigateTo({
      url: '../huiyuan/huiyuan',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})