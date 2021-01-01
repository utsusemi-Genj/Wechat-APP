// pages/page1/paihang/paihang.js
const util = require('../../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allMusie:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取数据
    var detail=wx.getStorageSync("detail").detail;
    var Url = app.globalData.musicBase + detail;
    util.getMusicListData(Url,this.processMusicData);
    var xs=wx.getStorageSync("xs");
    var singUrl=wx.getStorageSync("singUrl");

    this.setData({
      xs:xs,
      singUrl:singUrl
    })
  },

  //获取详细数据
  processMusicData:function(song){
    var musices = [];
    var musicData = song.data.playlist
    var coverImgUrl = musicData.coverImgUrl
    var description = musicData.description
    var paihangbangname = musicData.name
    for (var idx in musicData.tracks) {
      var subject = musicData.tracks[idx];
      var ar =[];
      for (var idz in subject.ar){
        if(idz==0){
          ar=ar + subject.ar[idz].name
        }else if(idz < 2){
          ar=ar + "/" +subject.ar[idz].name
        }else if(idz==2){
          ar=ar + "..."
        }
      }

      f = util.panduanSC(subject.id)


      var temp = {
        number:(parseInt(idx) + 1)+".",
        songname: subject.name,
        songid:subject.id,
        songer:ar,
        SoucangXS:f
      }
      musices.push(temp)
    }

    var allMusie = {paihangbangname,coverImgUrl,description,musices}
    this.setData({allMusie});
  },
  //跳转到歌曲
  onSong:function(event){
    console.log(event)
    var songid = event.currentTarget.dataset.songid;
    wx.setStorageSync("songId", songid);
    wx.navigateTo({
      url: "../../song/song"
    })
  },
    //点击播放按钮事件
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
  //收藏按钮的点击事件 
  onSoucang: function (event) {
    var songdata=wx.getStorageSync('newsdata')
    var allMusie = this.data.allMusie
    var dianjiId =event.currentTarget.dataset.songid
    for (var idx in allMusie.musices){
      if (dianjiId == allMusie.musices[idx].songid){
        allMusie.musices[idx].SoucangXS=!this.data.allMusie.musices[idx].SoucangXS
        if (!allMusie.musices[idx].SoucangXS){
          songdata.push(dianjiId)
        }else{
          var tt=[]
          for (var idz in songdata){
            if (!(songdata[idz]==dianjiId)){
              tt.push(songdata[idz])
            }
          }
          songdata=tt
        }
        continue
      }
    }
    wx.setStorageSync("newsdata", songdata);
    this.setData({
      allMusie:allMusie
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