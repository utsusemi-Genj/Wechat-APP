// pages/page3/page3.js
const util=require("../../utils/util")
var app =getApp()


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

  },
    //页面数据获取
  getyemiandata: function () {
        //获取缓存中收藏的曲id
        this.setData({
          musices:[]
        })
        var songdata=wx.getStorageSync('newsdata')
        var tem = []
        //调用方法获得首歌的详细数据
        for(var idx in songdata){
          var Url = app.globalData.musicBase + "/cloudsearch?keywords="+songdata[idx];
          util.getMusicListData(Url,this.processMusicData);
          tem.push(songdata[idx])
        }
        this.setData({songdata:tem})
        //获取播放按钮的状态
    var xs=wx.getStorageSync("xs");
    var singUrl=wx.getStorageSync("singUrl");
    this.setData({
      xs:xs,
      singUrl:singUrl
    })
  },

    //获得首歌的详细数据的代码
  processMusicData: function (song) {
    var musices = this.data.musices
    var songname = song.data.result.songs[0].name
    var songid = song.data.result.songs[0].id
    var SoucangXS = true
    for (var idt in this.data.songdata){
      if(songid == this.data.songdata[idt]){
          SoucangXS = false
      }
    }
    var ar =[];
    for (var idz in song.data.result.songs[0].ar){
      if(idz==0){
        ar=ar + song.data.result.songs[0].ar[idz].name
      }else if(idz < 2){
        ar=ar + "/" + song.data.result.songs[0].ar[idz].name
      }else if(idz==2){
        ar=ar + "..."
      }
    }
    var songer = ar
    if(musices.length==""){
      var number = "1."
    }else{
      var number = musices.length + 1 + "."
    }
    var dd = {number,songname,songid,songer,SoucangXS}
    musices.push(dd)
    this.setData({musices})
  },

  //播放按钮的点击事件
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

  //点击歌曲和跳转
  onSong:function(event){
    var songid = event.currentTarget.dataset;
    wx.setStorageSync("songId", songid);
    wx.navigateTo({
      url: "../song/song"
    })
  },
  
  //收藏按钮的点击事件
  onSoucang: function (event) {
    var dianjiId =event.currentTarget.dataset.songid
    var newsdataID =[]
    var shoucangde =this.data.musices
    for(var idx in this.data.musices){
      if(!(dianjiId == this.data.musices[idx].songid)){
        // shoucangde.push(this.data.musices[idx])
        newsdataID.push(this.data.musices[idx].songid)
      }else{
        shoucangde[idx].SoucangXS=!this.data.musices[idx].SoucangXS
      }
    }
    for (var idt in shoucangde){
      shoucangde[idt].number=parseInt(idt) + 1
    }
    this.setData({
      musices:shoucangde 
    })
    wx.setStorageSync('newsdata', newsdataID)
  },
  onRefresh(){
    //在当前页面显示导航条加载动画
    wx.showNavigationBarLoading(); 
    //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    wx.showLoading({
      title: '刷新中...',
    })
    this.onLoad()
    //隐藏loading 提示框
    wx.hideLoading();
    //隐藏导航条加载动画
    wx.hideNavigationBarLoading();
    //停止下拉刷新
    wx.stopPullDownRefresh();
  },
/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function () {
    //调用刷新时将执行的方法
  this.onRefresh();
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
    this.getyemiandata()
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