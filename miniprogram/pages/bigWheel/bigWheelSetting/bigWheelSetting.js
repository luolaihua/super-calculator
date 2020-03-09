// miniprogram/pages/bigWheel/bigWheelSetting/bigWheelSetting.js
var util = require('../../util/util')
var app = getApp()

Page({

   data: {
     speed:1,
      isSound: '',
      isRepeat:'' ,
      isLove: '',
      gdhw: [ //更多好玩的参数设置死的
         { 
            
         }
      ]
   },
   sliderChange:function(e){
      var value = e.detail.value
      wx.setStorageSync('speed', value)
      this.setData({
        speed:value
      })
   },

   onLoad: function (options) {
     var isRepeat = wx.getStorageSync('isRepeat')
     var isSound = wx.getStorageSync('isSound')
     var isLove = wx.getStorageSync('isLove')
     var speed = wx.getStorageSync('speed')
    this.setData({
      isSound:isSound,
      isLove:isLove,
      isRepeat:isRepeat,
      speed:speed
    })
   },

   //声音
   switchChangeSound() {
    
      var isSound = this.data.isSound
      isSound = isSound ? false : true;
      wx.setStorageSync('isSound', isSound)
      this.setData({
        isSound:isSound,
      })
   },

   //快速决定
   switchChangeFastSelect() {
      var isLove = this.data.isLove
      isLove = isLove ? false : true;
      wx.setStorageSync('isLove', isLove)
      this.setData({
        isLove:isLove
      })
   },

   //不重复抽取
   switchChangeNoRepetitionSelect() {
      var isRepeat = this.data.isRepeat
      isRepeat = isRepeat ? false : true;
      wx.setStorageSync('isRepeat', isRepeat)
      this.setData({
        isRepeat:isRepeat
      })
   },

   onShareAppMessage: function () {

   }
})