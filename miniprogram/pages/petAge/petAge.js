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
      name: '猪',
      url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/tice.png?sign=4377add665517649836f45cdeb025d84&t=1583810682'
    },
    {
      name: '仓鼠',
      url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/bmi_heart.png?sign=0ce03487b7fc0209cd34cc99a0d8eb73&t=1583810706'
    },
    {
      name: '龙猫',
      url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/dianzu.png?sign=13107795a86da836e239ddcbb9eeb764&t=1583810720'
    },
    {
      name: '兔子',
      url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/tushe.png?sign=c1d696b5abf791809d1827df41b0041c&t=1583810736'
    },
    {
      name: '乌龟',
      url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/laugh.png?sign=c967f9a3732781aac35db6247aa5b126&t=1583833459'
    }, {
      name: '豚鼠',
      url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/zhishang.png?sign=93f2e91128fb2b9e9bb9b87de7472b2a&t=1583810771'
    }, {
      name: '鱼',
      url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/l.png?sign=b0771e17f0466b51de37266784bc51fc&t=1583810797'
    }, {
      name: '马',
      url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/math.png?sign=1261d5d036cd39ca8d2314219e969249&t=1583851184'
    }, {
      name: '牛',
      url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/formula2.png?sign=4bb677a8286994c9ac7f65c197d4b451&t=1584948328'
    },
    {
      name: '羊',
      url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/dog.png?sign=8308889b4d9f08aba9c4b1209116dc95&t=1585277948'
    }, {
      name: '鸡',
      url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/math.png?sign=1261d5d036cd39ca8d2314219e969249&t=1583851184'
    }, {
      name: '鸭',
      url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/formula2.png?sign=4bb677a8286994c9ac7f65c197d4b451&t=1584948328'
    },
    {
      name: '鹅',
      url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/dog.png?sign=8308889b4d9f08aba9c4b1209116dc95&t=1585277948'
    }

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
        which = '狗狗'

        break;
      case 1:
        which = '猫猫'

        break;
      case 6:

        break;
      case 5:

        break;
      case 3:

        break;
      case 2:

        break;
      case 4:

        break;
      case 7:

        break;
      case 8:

        break;
      case 9:

        break;
      case 10:

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

  }
})