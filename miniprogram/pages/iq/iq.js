// miniprogram/pages/iq/iq.js

var date = new Date()
var today =date.getDate()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLight:''

  },
  iq: function (e) {


    try {
      var day = wx.getStorageSync('today')
      if (day != today) {
        wx.setStorageSync('today', today)
        wx.setStorageSync('isLight', true)
        this.setData({
          isLight:true
        })
        wx.showToast({
          title: 'IQ已提高！',
        })
      } else {
        wx.showToast({
          title: '今日IQ已提高，请明日再来',
          icon: 'none'
        })
      }
    } catch (e) {
      // Do something when catch error
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var day = wx.getStorageSync('today')
    if (day != today) {
      wx.setStorageSync('isLight', false)
        this.setData({
          isLight:false
        })
       // console.log('???')
    }else{
      var isLight =wx.getStorageSync('isLight')
      this.setData({
        isLight:isLight
      })
    }

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
    return {
       title: '哈哈~来提高智商叭~',
       path: '/pages/iq/iq',
       success: function (res) {
          console.log('成功进入分享==========', res);

       },
       fail: function (res) {
          console.log('进入分享失败==========', res);
       }
    }
 },
})