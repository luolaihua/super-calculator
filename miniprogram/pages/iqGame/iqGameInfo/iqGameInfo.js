// miniprogram/pages/iqGame/iqGameInfo/iqGameInfo.js
var util = require('../../util/util')
var imgUrl = require('../../util/imgUrl')
var app = getApp()

Page({

  data: {
    grade: '一年级',
    downTime: 5,
    isSound: '',
    isRepeat: '',
    isBGM: '',
    iqMaxNum: 0,
    isMax: false
  },
  sliderChange: function (e) {
    var value = e.detail.value
    wx.setStorageSync('downTime', value)
    this.setData({
      downTime: value
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
    var iqMaxNum = successNum
    var isMax = false

    var that = this
    const db = wx.cloud.database()
    const _ = db.command
    //存在时延


    //存在时延 ,不是同步进行的，云端操作需要时间，本地操作会先完成
    //方法1是设置时延，但是时延时间不好确定
    //方法2是 异步函数

    //这是一个异步函数，获取再更新
    async function updateGet() {
      //先执行完await中的get函数，才会执行更新
      await db.collection('maxNum').doc('iqGameMax').get().then(res => {
        var maxCloud = res.data.maxNum
        if (iqMaxNum >= maxCloud) {
          //iqMaxNum = res.data.maxNum
          // console.log('iqMaxNum > res.data.maxNum')
          isMax = true
          db.collection('maxNum').doc('iqGameMax').update({
            data: {
              // 表示指示数据库将字段自增 1
              maxNum: iqMaxNum
            },
            success: function (res) {
              console.log(res, '更新+1')
            }
          })
        } else {
          // console.log('iqMaxNum > res.data.maxNum')
          iqMaxNum = maxCloud
        }
        // console.log(maxCloud)
        //console.log(iqMaxNum)

      })

      //console.log(isMax)
      that.setData({
        iqMaxNum,
        isMax
      })
    }
    updateGet()

    that.gradeMake(successNum)
    that.setData({
      isSound: isSound,
      isBGM: isBGM,
      downTime: downTime
    })

    /*     setTimeout(() => {
          
        }, 1000) */

  },
  onShow: function () {

  },

  //声音
  switchChangeSound() {

    var isSound = this.data.isSound
    isSound = isSound ? false : true;
    wx.setStorageSync('isSound_game', isSound)
    this.setData({
      isSound: isSound,
    })
  },


  switchChangeBGM() {
    var isBGM = this.data.isBGM
    isBGM = isBGM ? false : true;
    wx.setStorageSync('isBGM', isBGM)
    this.setData({
      isBGM: isBGM
    })
  },



  onShareAppMessage: function () {

  }
})