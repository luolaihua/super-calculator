// miniprogram/pages/petAge/ageCalculate/ageCalculate.js
const calcuPetAge = require('../../util/calcuPetAge')
//console.log(Math.round(0.264))
Page({

  /**
   * 页面的初始数据
   */
  data: {
    petName: 'test',
    petUrl: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/dog.png?sign=8308889b4d9f08aba9c4b1209116dc95&t=1585277948',
    year: 0,
    month: 0,
    isShowHumanAge: false,
    human2PetAge: 0,
    pet2humanAge: 0,
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
    {
      name: '关于',
      url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/animalsPic/human.png?sign=f1be6b14b63398f1293a42dc626ab3a8&t=1585308592'
    }
  ]

  },
  isShowHumanAge: function (e) {
    this.setData({
      isShowHumanAge: !this.data.isShowHumanAge
    })
  },
  calculate: function (e) {

    //处理输入数据
    var year = Number(this.data.year)
    var month = Number(this.data.month)
    year = Number((year + month / 12).toFixed(2))
    //console.log(Math.round(0.564))
    var petName = this.data.petName,
      res = {}
    //res = calcuPetAge.tuZiAge(month, year)
    switch (petName) {
      case '狗狗':
        res = calcuPetAge.dogAge(year)
        console.log('wangwang')
        break;
      case '猫猫':
        res = calcuPetAge.catAge(year)
        console.log('miaomiao')
        break;
      case '仓鼠':
        res = calcuPetAge.cangShuAge(month, year)
        //console.log('miaomiao')
        break;
      case '龙猫':
        res = calcuPetAge.longMaoAge(year)
        //console.log('miaomiao')
        break;
      case '兔兔':
        res = calcuPetAge.tuZiAge(month, year)
        
        break;
      default:
        break;
    }
    var pet2humanAge = res.pet2humanAge
    var human2PetAge = res.human2PetAge




    // function changeToSuiYue(age) {
    //   var sui = parseInt(age)
    //   var yue = Math.round((age - sui) * 12)
    //   if (sui == 0) {
    //     return yue + ' 个月'
    //   } else if (yue == 0) {
    //     return sui + ' 岁'
    //   } else {
    //     return sui + ' 岁 ' + yue + ' 个月'
    //   }
    // }

    // pet2humanAge = changeToSuiYue(pet2humanAge)
    // human2PetAge = changeToSuiYue(human2PetAge)
    this.setData({
      human2PetAge,
      pet2humanAge
    })

  },
  inputMonth: function (e) {
    var month = e.detail.value
    this.setData({
      month
    })
  },
  inputYear: function (e) {
    var year = e.detail.value
    this.setData({
      year
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var index = Number(options.index)
    var petUrl = this.data.grids[index].url
    //console.log(options.value)
   // console.log(options.index)
    this.setData({
      petName: options.value,
      petUrl
    })

    var isShowPetAge = wx.getStorageSync('isShowPetAge')
    if(isShowPetAge===''){
      wx.setStorageSync('isShowPetAge', true)
      isShowPetAge = true
    }
    if(isShowPetAge){
      wx.showModal({
        title: '宠物年龄计算',
        content: '宠物头像可以点击，切换人类和宠物年龄',
        cancelText: '不再提醒',
        confirmText: '我知道了',
        confirmColor: '#3CC51F',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
            wx.setStorageSync('isShowPetAge', false)
          }
        },
        fail: function (res) {},
        complete: function (res) {},
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
       title: '来算一算你家'+this.data.petName+'几岁啦~',
       path: '/pages/petAge/ageCalculate/ageCalculate',
       success: function (res) {
          console.log('成功进入分享==========', res);

       },
       fail: function (res) {
          console.log('进入分享失败==========', res);
       }
    }
 },
})