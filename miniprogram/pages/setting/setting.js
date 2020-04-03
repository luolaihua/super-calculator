// miniprogram/pages/setting/setting.js
//获取实例
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isVibrate_setting:false
  },
  //声音
  switchChangeVibrate() {

    var isVibrate_setting = this.data.isVibrate_setting
    isVibrate_setting = isVibrate_setting ? false : true;
    wx.setStorageSync('isVibrate_setting', isVibrate_setting)
    app.globalData.isVibrate = isVibrate_setting
    this.setData({
      isVibrate_setting
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var isVibrate_setting = wx.getStorageSync('isVibrate_setting')
    if (isVibrate_setting === '') {
      wx.setStorageSync('isVibrate_setting', false)
      isVibrate_setting = false
    }
    app.globalData.isVibrate = isVibrate_setting
    this.setData({
      isVibrate_setting
    })
/*     var that = this
    wx.cloud.downloadFile({
      fileID: 'cloud://luo-r5nle.6c75-luo-r5nle-1301210100/t1.jpg',
      success: res => {
        // get temp file path
        console.log(res.tempFilePath)
        that.setData({
          path:res.tempFilePath
        })
      },
      fail: err => {
        // handle error
      }
    }) */

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