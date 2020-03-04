// miniprogram/pages/iq/iq.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  iq: function (e) {
    var date = new Date()
    var today = date.getDate()

    try {
      var day = wx.getStorageSync('today')
      if (day != today) {
        wx.setStorage({
          data: today,
          key: 'today',
        })
        wx.showToast({
          title: '智商已提高！',
        })
      } else {
        wx.showToast({
          title: '今日智商已提高，请明日再来',
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