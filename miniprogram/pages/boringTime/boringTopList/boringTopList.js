// miniprogram/pages/boringTime/boringTopList/boringTopList.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '张三',
    maxNum: 0,
    collectionData:{}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var collectionData ,that = this

    const db = wx.cloud.database()
    db.collection('topList').orderBy('maxNum', 'desc').get().then(res => {
      // res.data 包含该记录的数据
      collectionData = res.data
      that.setData({
        collectionData
      })

      console.log(res.data)
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