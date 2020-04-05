// miniprogram/pages/boringTime/boringTime.js
/* var timestamp3 = 1403058804;
var newDate = new Date();
newDate.setTime(timestamp3 * 1000);
// Wed Jun 18 2014 
console.log(newDate.toDateString());
// Wed, 18 Jun 2014 02:33:24 GMT 
console.log(newDate.toGMTString());
// 2014-06-18T02:33:24.000Z
console.log(newDate.toISOString());
// 2014-06-18T02:33:24.000Z 
console.log(newDate.toJSON());
// 2014年6月18日 
console.log(newDate.toLocaleDateString());
// 2014年6月18日 上午10:33:24 
console.log(newDate.toLocaleString());
// 上午10:33:24 
console.log(newDate.toLocaleTimeString());
// Wed Jun 18 2014 10:33:24 GMT+0800 (中国标准时间)
console.log(newDate.toString());
// 10:33:24 GMT+0800 (中国标准时间) 
console.log(newDate.toTimeString());
// Wed, 18 Jun 2014 02:33:24 GMT
console.log(newDate.toUTCString()); */
var util = require('../util/util')
var intervalArr = []
const imageUrl = [
  "https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/laugh2.png?sign=310aeeca7601e257cc79b36841f9fb9c&t=1585384439",
  "https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/laugh3.png?sign=7e86dee0fe73d633865f39f1f06cd763&t=1585384456",
  "https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/laugh5.png?sign=0fdc6d4710745906287a71793bb60c56&t=1585384478",
  "https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/laugh4.png?sign=4cb50e79168a35f15626283b618cff8b&t=1585384642",
  "https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/laugh9.png?sign=a085413aa877aeecdaa41bd30671c596&t=1585385237",
  "https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/laugh7.png?sign=c8c37e7fd6d741b6b7084cbe506f2353&t=1585385254",
  "https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/laugh6.png?sign=31488ae5f2f3e3868e9bffbb66a7d585&t=1585385289",
  "https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/laugh8.png?sign=37d7e00d4ad8c838968096efda07b53e&t=1585385276",
  "https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/laugh12.png?sign=8018aaced0651999812ef55a4ab1ef90&t=1585385183",
  "https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/laugh11.png?sign=a2a31f9d9ea90e7fa82917ac0da527c5&t=1585385203",
  "https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/laugh10.png?sign=7e97fe28770c222c919a86a9a95baa82&t=1585385215",
  "https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/f1.png?sign=6eac500f2c18457205ffba5dd36117bc&t=1585386749",
  "https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/f3.png?sign=3b066daee50369c34bcb494a100372b9&t=1585386762",
  "https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/f2.png?sign=4783b01de7cdd29e30eb8bd78276744d&t=1585386772",
  "https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/f1.png?sign=194e3e795ad4e625452b56904ebc89c9&t=1585386789",
  "https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/f6.png?sign=18a061d2401b581cd2f5885b57e591f8&t=1585386985",
  "https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/f5.png?sign=7d1c938237977a7945a39ee4b3ea67b0&t=1585387055",
  "https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/f9.png?sign=0a640d4d98f3023a8ad575745574bb8b&t=1585387356",
  "https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/f8.png?sign=a8f392ae297c6df2173d27e054bfdb4e&t=1585387425",
  "https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/laugh.png?sign=cf4e5681c3e3689f63c9aff2249c85db&t=1585387764",

]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    boringTimeMax_cloud:0,
    boringTimeMax: 0,
    boringTime: 0,
    startTime: 0,
    endTime: 0,
    time: 0,
    num: 0,
    imgUrl: imageUrl.sort(util.randomsort),

  },
  toTopList (){
    wx.navigateTo({
      url: '../boringTime/boringTopList/boringTopList',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  showMax(){
    
    var that = this
    var boringTimeMax = this.data.boringTimeMax
    const db = wx.cloud.database()
    //存在时延
    var boringTimeMax_cloud
    //存在时延 ,不是同步进行的，云端操作需要时间，本地操作会先完成
    //方法1是设置时延，但是时延时间不好确定
    //方法2是 异步函数

    //这是一个异步函数，获取再更新
    async function updateGet() {
      //先执行完await中的get函数，才会执行更新
      await db.collection('maxNum').doc('boringMax').get().then(res => {
        var maxCloud = res.data.maxNum
        if (boringTimeMax < maxCloud) {
          //iqMaxNum = res.data.maxNum
          // console.log('iqMaxNum > res.data.maxNum')
          boringTimeMax_cloud = maxCloud
          db.collection('maxNum').doc('boringMax').update({
            data: {
              maxNum: boringTimeMax
            },
            success: function (res) {
              console.log(res, '更新+1')
            }
          })
        } else {
          // console.log('iqMaxNum > res.data.maxNum')
          boringTimeMax_cloud = boringTimeMax
        }
        // console.log(maxCloud)
        //console.log(iqMaxNum)

      })

      if(boringTimeMax_cloud==boringTimeMax){
        var content = '真棒！您已是全服最无聊的网友~'
      }else{
        var content = '全服最无聊：'+boringTimeMax_cloud
      }
      wx.showModal({
        title: 'SoBoring',
        content: content,
        showCancel:false,
        confirmText: '我知道了',
        confirmColor: '#3CC51F',
      })
      that.setData({
        boringTimeMax_cloud
      })
    }
    updateGet()


  },
  bindtap(e) {
    clearInterval(this.data.num)
    // console.log(e)
  },
  bindtouchstart(e) {
    var that = this


    function ani() {
      that.animation.rotate(Math.random() * 720 - 360).step()
      that.animation2.rotate(Math.random() * 720 - 360).step()
      that.animation3.rotate(Math.random() * 720 - 360).step()

      that.setData({
        animation: that.animation.export(),
        animation2: that.animation2.export(),
        animation3: that.animation3.export(),

      })
    }
    var num = setInterval(ani, 500)
    intervalArr.push(num)

    this.setData({
      startTime: e.timeStamp,
      num
    })
    //console.log(this.data.num)
  },

  bindtouchend(e) {

    //把interval全部清除
    for (let index = 0; index < intervalArr.length; index++) {
      clearInterval(intervalArr[index])
    }
    

    var t1 = e.timeStamp - this.data.startTime
    var boringTimeMax = this.data.boringTimeMax
    var that = this
    const db = wx.cloud.database()

    if (boringTimeMax < t1) {
      boringTimeMax = t1
      this.setData({
        boringTimeMax
      })
      
      this.setTopList(boringTimeMax)
      wx.setStorageSync('boringTimeMax', boringTimeMax)
    }
    this.setData({
      boringTime: t1
    })
  },
  setTopList:function(maxNum){
    var nickName = wx.getStorageSync('nickName')
    var avatarUrl = wx.getStorageSync('avatarUrl')
    wx.cloud.callFunction({
      name: 'setTopList',
      data: {
        maxData: {
          maxNum:maxNum,
          nickName:nickName,
          avatarUrl:avatarUrl
        }
      },
      success: res => {
        // output: res.result === 3
      },
      fail: err => {
        // handle error
      },
      complete: () => {
        // ...
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var boringTimeMax = wx.getStorageSync('boringTimeMax')
    if(boringTimeMax==''){
      wx.setStorageSync('boringTimeMax', 0)
    }
    var isShowBoringModal = wx.getStorageSync('isShowBoringModal')
    if(isShowBoringModal===''){
      wx.setStorageSync('isShowBoringModal', true)
      isShowBoringModal = true
    }
    if(isShowBoringModal){
      wx.showModal({
        title: 'SoBoring',
        content: '无聊的时候就按住屏幕不要松手，左上角为您的最大无聊指数，按住屏幕的时间越长，指数越大。',
        cancelText: '不再提醒',
        confirmText: '我知道了',
        confirmColor: '#3CC51F',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
            wx.setStorageSync('isShowBoringModal', false)
          }
        },
        fail: function (res) {},
        complete: function (res) {},
      })
    }


    this.setData({
      boringTimeMax
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation()
    this.animation2 = wx.createAnimation()
    this.animation3 = wx.createAnimation()
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
  // 分享回掉函数
  onShareAppMessage: function () {
    // 用户点击右上角分享  
    return {
    title: '咱们来比一比谁更无聊~', // 分享标题  
      desc: '我的无聊指数是'+this.data.boringTimeMax, // 分享描述  
      path: 'pages/boringTime/boringTime' // 分享路径  
    }
  },

})