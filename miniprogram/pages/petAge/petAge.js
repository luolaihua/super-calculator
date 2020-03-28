// miniprogram/pages/petAge/petAge.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: [{
      name: '狗',
      url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/animalsPic/dog2.png?sign=e41ffa5cbb8aa43b13871514ff0b36b6&t=1585289910'
    },
    {
      name: '猫',
      url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/animalsPic/cat2.png?sign=8231aeb1281fb01a15bbc05f1382b381&t=1585290101'
    },
    {
      name: '仓鼠',
      url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/animalsPic/cangshu.png?sign=bbc89fe72017dd2dbfe3dd359fc550a5&t=1585359084'
    },
    {
      name: '龙猫',
      url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/animalsPic/longmao.png?sign=ad2626eb2214a0017b0ef40c74f0a5ec&t=1585359171'
    },
    {
      name: '兔子',
      url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/animalsPic/rabbit.png?sign=ccc71b81c5eb30c96073c106a584e916&t=1585359281'
    },
/*     {
      name: '关于',
      url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/animalsPic/human.png?sign=f1be6b14b63398f1293a42dc626ab3a8&t=1585308592'
    } */
  ]
  },
  navigateTo: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    var which = ''
    var id = Number(e.currentTarget.id)
    switch (id) {
      case 0:
        which = '狗狗&index=0'

        break;
      case 1:
        which = '猫猫&index=1'
        break;
      case 2:
        which = '仓鼠&index=2'
        break;
      case 3:
        which = '龙猫&index=3'
        break;
      case 4:
        which = '兔兔&index=4'
        break;
      case 5:
        which = 'about&index=5'
        break;
    }
    wx.navigateTo({
      url: '../petAge/ageCalculate/ageCalculate?value='+which,
    })
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
    return {
       title: '来算一算你家宠物几岁啦~',
       path: '/pages/petAge/petAge',
       success: function (res) {
          console.log('成功进入分享==========', res);

       },
       fail: function (res) {
          console.log('进入分享失败==========', res);
       }
    }
 },
})