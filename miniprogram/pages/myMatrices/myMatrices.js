// miniprogram/pages/myMatrices/myMatrices.js
var math = require('../util/math.min.js');

function arrTrans(num, arr) {
  var newArr = [];
  while (arr.length > 0) {
    newArr.push(arr.splice(0, num));
  }
  return newArr;
}

var m2 = [
  [1, -1, 4],
  [1, 4, -2]
]
var m3 = [
  [1, -1],
  [1, 4],
  [1, 4]
]
/* console.log(math.evaluate('1/3+1/5').toFraction())
var m1 = [11,22,33,44,55,66,77,88,999]
var m2 = [1/5,45,45,1/5]
var m3 = [1/3,10,10,1/3]

console.log(m1)
console.log(m2)
//reshape整形
var m4 =math.reshape(m1, [3,3])

m1 = arrTrans(3,m1)
m2 = arrTrans(2,m2)
m3 = arrTrans(2,m3)
console.info('m1,m2变换')
console.log(m1)
console.log(m4)
console.log(m2)

console.log('****************1')
console.log(math.multiply(m2, m3))
console.log('****************2')
console.log(math.multiply(m3, m2))
console.log('++++++++++++++++')
console.log(math.add(m2, m3))

console.log('-----------------')
console.log(math.subtract(m2, m3))



var x = [1,3,5]
var y = [6,5,8]

console.info('计算两个向量的外积')
console.log(math.cross(x, y))	//计算两个向量的外积

console.info('计算两个向量的点积')
console.log(math.dot(x, y))	//计算两个向量的点积

console.info('计算共轭转置')
console.log(math.ctranspose(m1))	//计算共轭转置

console.info('计算转置')
console.log(math.transpose(m1))	//计算共轭转置


console.info('计算行列式')
console.log(math.det(m2))	//计算行列式
console.log(math.det(m1))	//计算行列式


console.log(math.diag(m1))//返回对角数据

//计算实对称矩阵的特征值和特征向量。--要数字
console.log(math.eigs(m3))


//把矩阵平坦化
console.log(math.flatten(m1))
//生成单位阵
console.log(math.identity(3))
 
//把逆矩阵
console.log(math.inv(m2))

// 矩阵的迹，对角元素之和
console.log(math.trace(m2))

//解方程  L * x = b
var a = [[-2, 3,1], [2, 1,4], [2, 11,4]]   
var b = [11, 9,5]
var xx = math.lsolve(a, b)  // [[-5.5], [20]]
console.log(xx)

//LU分解
var m = [[2, 1], [1, 4]]
var r = math.lup(m)
console.log(r.L[0])
console.log(math.lup(m1))

//LU解方程
var mm = [[1, 0, 0, 0], [0, 2, 0, 0], [0, 0, 3, 0], [0, 0, 0, 4]]

 x = math.lusolve(mm, [-1, -1, -1, -1])        // x = [[-1], [-0.5], [-1/3], [-0.25]]
console.log(x)
var f = math.lup(mm)
var x1 = math.lusolve(f, [-1, -1, -1, -1])       // x1 = [[-1], [-0.5], [-1/3], [-0.25]]
var x2 = math.lusolve(f, [1, 2, 1, -1])          // x2 = [[1], [1], [1/3], [-0.25]]
console.log(x1)
console.log(x2)
 a = [[-2, 3], [2, 1]]
 b = [11, 9]
 x = math.lusolve(a, b)  // [[2], [5]]
console.log(x)

//QR分解
 m = [
  [1, -1,  4],
  [1,  4, -2],
  [1,  4,  2],
  [1,  -1, 0]
]
var result = math.qr(m)
console.log(result)
 */
const days = []
for (let i = 1; i <= 5; i++) {
  days.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1:[4],
    value2:[4],
    row:5,
    coloum:5,
    days: days,
    size:'',
    inputValue1: "",
    res: '',
    id_cTran: 'cTranspose',
    id_tran: 'transpose',
    id_LU: 'LU',
    id_QR: 'QR',
    id_det: 'det',
    id_eigsValue: 'eigsValue',
    id_eigsVector: 'eigsVector',
    id_trace: 'trace',
    id_clear: 'clear',
    id_inverse: 'inverse',

  },
  bindChange2:function(e){
    console.log(e.detail.value)
    this.setData({
      coloum:e.detail.value[0]+1
    })
    console.log(this.data.coloum)
  },
  bindChange1:function(e){
    this.setData({
      row:e.detail.value[0]+1,
      value2:e.detail.value,
      coloum:e.detail.value[0]+1
    })
  },
  clickOperator: function (e) {
    var id = e.target.id
    switch (id) {
      case 'transpose':
        wx.showToast({
          title: id,
        })
        break;
      case 'cTranspose':
        wx.showToast({
          title: id,
        })
        break;
      case 'det':
        wx.showToast({
          title: id,
        })
        break;
      case 'inverse':
        wx.showToast({
          title: id,
        })
        break;
      case 'trace':
        wx.showToast({
          title: id,
        })
        break;
      case 'eigsValue':
        wx.showToast({
          title: id,
        })
        break;
      case 'eigsVector':
        wx.showToast({
          title: id,
        })
        break;
      case 'QR':
        wx.showToast({
          title: id,
        })
        break;
      case 'LU':
        wx.showToast({
          title: id,
        })
        break;
    }
  },
  show: function (e) {
    var arr = this.data.inputValue1
    var a2 = ''
    while (arr.length > 0) {
      a2 = a2 + arr.splice(0, 3) + '\n';
    }
    this.setData({
      res: a2
    })
    console.log(a2)
    console.log(this.data.size)
  },

  input1: function (e) {
    
    var num = e.detail.value
    
    num = num.split(/\s|:|,/)
    num = num.replace(/[\n]/g, ' ')
    console.log(num)
    console.log(size)
    this.setData({
      inputValue1: num,
      size:size
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