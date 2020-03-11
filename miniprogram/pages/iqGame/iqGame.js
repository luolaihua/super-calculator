// miniprogram/pages/iqGame/iqGame.js
var util = require('../util/util')
var countDownTime = 5
Page({

  /**
   * 页面的初始数据
   */
  data: {
    condition:'noTap',
    isStart: false,
    ansArr:[0,0,0],
    ans: 0,
    ans1: 11,
    ans3: 11,
    ans2: 11,
    num1: '?',
    num2: '?',
    operator: '+',
    count: 1,
    time: countDownTime, //倒计时初始值
    timer: '' //定时器编号，这个值可以传递给clearInterval来取消该定时

  },
  answerBtn:function(e){
    var id = e.currentTarget.id
    var ans = this.data.ans
    var ansArr = this.data.ansArr
    console.log(e)
    if(ans==ansArr[id]){
      wx.showToast({
        title: '答案正确',
      })
      this.setData({
        condition:'right'
      })
    }else{
      this.setData({
        condition:'wrong'
      })
      wx.showToast({
        title: '答案错误',
      })
    }
  },
  startGame: function (e) {
    var that = this

    if (!this.data.isStart) {
      this.setData({
        time:countDownTime,
      })

      let countDownNum = that.data.time;
      var max = 20,
        min = 1
      var num1 = Math.floor(Math.random() * (max - min + 1) + min);
      var num2 = Math.floor(Math.random() * (max - min + 1) + min);
      var ans = num1 + num2 ,ansArr=[],i=0
      while(i<3){
        ansArr.push(ans+i)
        i++
      }
      ansArr.sort(util.randomsort)

      this.setData({
        
        isStart:true,
        ans:ans,
        ansArr: ansArr,
        num1: num1,
        num2: num2,
        timer: setInterval(
          function () {
            //开始倒计时，并且刷新data中的time数据
            countDownNum--;
            that.setData({
              time: countDownNum
            });
            //如果时间为0则取消倒计时------
            if (countDownNum == 0) {
              clearInterval(that.data.timer)
              that.setData({
                isStart: false
              })
            }
          }, 1000
        )
      })
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