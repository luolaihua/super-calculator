// miniprogram/pages/iqGame/iqGameInfo/iqGameInfo.js
var util = require('../../util/util')
var app = getApp()

Page({

   data: {
     grade:'一年级',
     downTime:5,
     isSound: '',
      isRepeat:'' ,
      isBGM: '',

   },
   sliderChange:function(e){
      var value = e.detail.value
      wx.setStorageSync('downTime', value)
      this.setData({
        downTime:value
      })
   },
   gradeMake: function (successNum) {
    var grade
    switch (Math.ceil(successNum / 10)) {
      case 1:
        grade = '壹'
        break;
      case 2:
        grade = '贰'
        break;
      case 3:
        grade = '叁'
        break;
      case 4:
        grade = '肆'
        break;
      case 5:
        grade = '伍'
        break;
      case 6:
        grade = '陆'
        break;
      default:
        grade = '柒'
        break;
    }
    this.setData({
      grade: grade,
    })
  },

   onLoad: function (options) {
    
     var isSound = wx.getStorageSync('isSound_game')
     var isBGM = wx.getStorageSync('isBGM')
     var downTime = wx.getStorageSync('downTime')
     var successNum = wx.getStorageSync('successNum')
this.gradeMake(successNum)
    this.setData({
      isSound:isSound,
      isBGM:isBGM,
      downTime:downTime
    })
   },

   //声音
   switchChangeSound() {
    
      var isSound = this.data.isSound
      isSound = isSound ? false : true;
      wx.setStorageSync('isSound_game', isSound)
      this.setData({
        isSound:isSound,
      })
   },

  
   switchChangeBGM() {
      var isBGM = this.data.isBGM
      isBGM = isBGM ? false : true;
      wx.setStorageSync('isBGM', isBGM)
      this.setData({
        isBGM:isBGM
      })
   },

  

   onShareAppMessage: function () {

   }
})