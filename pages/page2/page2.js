// pages/page2/page2.js
const util = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musices:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var xs=wx.getStorageSync("xs");
    var singUrl=wx.getStorageSync("singUrl");

    this.setData({
      xs:xs,
      singUrl:singUrl
    })
  },
    //点击转到歌曲页面
    onSong:function(event){
      var songid = event.currentTarget.dataset.songid;
      wx.setStorageSync("songId", songid);
      wx.navigateTo({
        url: "../song/song"
      })
    },
    //输入框事件-点击完成
    onconfirmInput:function(event){
      var keyWord = event.detail.value
      var sousuoUrl = app.globalData.musicBase + "/cloudsearch?keywords=" + keyWord ;
      if( ! keyWord == ""){
        util.getMusicListData(sousuoUrl,this.processMusicData);
      }else{
        this.setData({musices:""})
      }
    }, 

    //输入框事件-输入框内容变动
    onBindInput:function(event){
      var keyWord = event.detail.value
      var sousuoUrl = app.globalData.musicBase + "/search?limit=10&keywords=" + keyWord ;
      if( ! keyWord == ""){
        util.getMusicListData(sousuoUrl,this.processMusicData);
      }else{
        this.setData({musices:""})
      }
    }, 
    //获取详细内容
    processMusicData:function(song){
      var musices = [];
      var songs = song.data.result.songs
      for(var idx in songs){
        var subject = songs[idx];
        var ar =[];
        var at=[]
        for (var idz in subject.artists){
          if(idz==0){
            ar=ar + subject.artists[idz].name
          }else if(idz < 2){
            ar=ar + "/" +subject.artists[idz].name
          }else if(idz==2){
            ar=ar + "..."
          }
        }
        for (var idz in subject.ar){
          if(idz==0){
            at=at + subject.ar[idz].name
          }else if(idz < 2){
            at=at + "/" +subject.ar[idz].name
          }else if(idz==2){
            at=at + "..."
          }
        }
        if (!(at=="")){
          ar=at
        }
        f = util.panduanSC(subject.id)
        var temp = {
          number:(parseInt(idx) + 1)+".",
          songname : subject.name,
          songid : subject.id,
          songer :ar,
          SoucangXS:f
        }
        musices.push(temp)
      }
      this.setData({musices});
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
    var musices = this.data.musices
    var dianjiId =event.currentTarget.dataset.songid
    for (var idx in musices){
      if (dianjiId == musices[idx].songid){
        musices[idx].SoucangXS=!this.data.musices[idx].SoucangXS
        if (!musices[idx].SoucangXS){
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
      musices:musices
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