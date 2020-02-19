// miniprogram/pages/myMatrices/myMatrices.js
var math = require('../util/math.min.js');


const aaa = ['2', '0','-1','3','2', '0','-1','3','33']
function arrTrans(num, arr) {
  const newArr = [];
  var i = 1
  while(arr.length > 0) {
    newArr.push(arr.splice(0, num));
    console.log(i++)
    console.log(arr.length+'jjjj')
    console.log(arr+'')
  }
  return newArr;
}
var bbb = arrTrans(3,aaa)
//console.log(aaa+'')
console.log(bbb[2][2])


const a = math.matrix([7,1,-2,3,7,1,-2,3,2]) // Matrix, size [0],       []       
Page({

  /**
   * 页面的初始数据
   */
  data: {

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