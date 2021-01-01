// pages/song/song.js
const util=require("../../utils/util.js")
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    geci:{},
    music:{},
    singUrl:{},
    xs:true,
    gecidexs:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var songid=wx.getStorageSync("songId");
    
    var Url = app.globalData.musicBase + "/cloudsearch?keywords="+songid;
    util.getMusicListData(Url,this.processMusicData);
    var singUrl = app.globalData.musicBase + "/song/url?id="+songid;
    util.getMusicListData(singUrl,this.getsingUrl);

    var xs=wx.getStorageSync("xs");
    var singUrl=wx.getStorageSync("singUrl");
    this.setData({
      xs:xs,
      singUrl:singUrl
    })
  },
  getsingUrl: function (event) {
    var musicurl=event.data.data
    this.setData({
      singUrl:musicurl[0].url
    }) 
  },

  processMusicData: function (event) {
    var musicData = event.data.result.songs[0];
    var picUrl=musicData.al.picUrl
    var zhuangji=musicData.al.name
    var zhuangjiId=musicData.al.id
    var songid=musicData.id
    var songName=musicData.name
    var ar=[]
    var arid=[]
      for (var idz in musicData.ar){
        ar.push(musicData.ar[idz].name)
        arid.push(musicData.ar[idz].id)
      }
    var songer=ar
    var songerid=arid
    var geciUrl = app.globalData.musicBase + "/lyric?id=" + songid
    var musices = {picUrl,zhuangji,zhuangjiId,songName,songer,songerid}
    this.setData({
      music:musices
    }) 
    util.getMusicListData(geciUrl,this.geci);
  },
  geci:function (event) {
    this.setData({
      geci:event.data.lrc.lyric
    }) 
  },
  ongecidexs: function () {
    this.setData({
      gecidexs:!this.data.gecidexs
    })
  },
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
      wx.setStorageSync("singUrl", this.data.singUrl);
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  this.audioCtx = wx.createAudioContext('myAudio')
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