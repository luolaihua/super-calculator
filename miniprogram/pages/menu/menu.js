// miniprogram/pages/menu/menu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: [{
        name: '亲戚计算',
        url: '../../images/ren.png'
      },
      {
        name: '单位装换',
        url: '../../images/transfer.png'
      }, {
        name: '聊天室',
        url: '../../images/chat.png'
      },
      {
        name: '北京话生成',
        url: '../../images/bj.png'
      },
      {
        name: '算姻缘',
        url: '../../images/l.png'
      }, {
        name: '单位装换',
        url: '../../images/ren.png'
      },
      {
        name: '单位装换',
        url: '../../images/ren.png'
      },
      {
        name: '单位装换',
        url: '../../images/ren.png'
      }, {
        name: '单位装换',
        url: '../../images/ren.png'
      },

    ]
  },
  navigateTo: function (e) {
    var id = Number(e.currentTarget.id)
    console.log(id)
    switch (id) {
      case 0:
        wx.navigateTo({
          url: '../relative/relative',
        })
        break;
      case 1:
        wx.navigateTo({
          url: '../unitTransfer/unitTransfer',
        })
        break;
      case 2:
        wx.navigateTo({
          url: '../im/room/room',
        })
        break;

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