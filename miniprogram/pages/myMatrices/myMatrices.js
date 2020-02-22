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
var data_0 = [
  [0, 0, 0, 0, 0, ],
  [0, 0, 0, 0, 0, ],
  [0, 0, 0, 0, 0, ],
  [0, 0, 0, 0, 0, ],
  [0, 0, 0, 0, 0, ]
]
//console.log(data)
var data2 = [
  [1, 2, 3, 0, 0, ],
  [2, 1, 2, 3, 0, ],
  [3, 2, 1, 2, 3, ],
  [0, 3, 2, 1, 2, ],
  [0, 0, 3, 2, 1, ]
]







/* 
console.log(math.evaluate('1/3+1/5').toFraction())
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
 */

/* 
var x = [1,3,5]
var y = [6,5,8]

console.info('计算两个向量的外积')
console.log(math.cross(x, y))	//计算两个向量的外积

console.info('计算两个向量的点积')
console.log(math.dot(x, y))	//计算两个向量的点积

console.info('计算共轭转置')
console.log(math.ctranspose(m1))	//计算共轭转置
 */
var m3 = [
  [1, 2, 0],
  [2, 1, 2],
  [0, 2, 1]
]
console.log('eigs')
//计算实对称矩阵的特征值和特征向量。--要数字
console.log(math.eigs(m3))
console.log(math.eigs(m3).values)
console.log(math.eigs(m3).vectors)


//生成单位阵
console.log(math.identity(3))


/* 
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
 */
//QR分解
var m = [
  [1, -1, 4],
  [1, 4, -2],
  [1, 4, 2],
  [1, -1, 0]
]
var result = math.qr(m)
console.log(math.format(result.Q, 10))



function dataPro(data, row, coloum) {
  var d = []
  //切割数组
  for (var i = 0; i < row; i++) {
    d.push(data[i].slice(0, coloum))
  }
  console.log('切割完成')
  console.log(d)
  return d
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isClear:true,
    data: [
      [0, 0, 0, 0, 0, ],
      [0, 0, 0, 0, 0, ],
      [0, 0, 0, 0, 0, ],
      [0, 0, 0, 0, 0, ],
      [0, 0, 0, 0, 0, ]
    ],
    value1: [2],
    value2: [2],
    row: 3,
    coloum: 3,
    days: [1, 2, 3, 4, 5],
    res: '',
    det: 0,
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
  bindinput: function (e) {

    var id = e.target.id
    var index_row = parseInt(id / 10)
    var index_coloum = parseInt(id % 10)
    var value = e.detail.value
    var data = this.data.data
    //将当前input的数据放入指定位置
    data[index_row][index_coloum] = Number(value)

    this.setData({
      data: data
    })
  },
  //行变化
  bindChange1: function (e) {
    this.setData({
      row: e.detail.value[0] + 1,
      value2: e.detail.value,
      coloum: e.detail.value[0] + 1
    })
   // console.log(this.data.coloum + 'coloum\n' + this.data.row + 'row')
    this.dataChange()
  },
  //列变化
  bindChange2: function (e) {
    this.setData({
      coloum: e.detail.value[0] + 1
    })
    //console.log(this.data.coloum + 'coloum\n' + this.data.row + 'row')
    this.dataChange()
  },
  dataChange: function () {

    for (var i = 0; i < this.data.row; i++) {
      for (var j = 0; j < this.data.coloum; j++) {
        data_0[i][j] = this.data.data[i][j]
      }
    }
    this.setData({
      data: data_0
    })
    data_0 = [
      [0, 0, 0, 0, 0, ],
      [0, 0, 0, 0, 0, ],
      [0, 0, 0, 0, 0, ],
      [0, 0, 0, 0, 0, ],
      [0, 0, 0, 0, 0, ]
    ]
    /*     console.log('data33333')
        console.log(this.data.data) */
  },

  clickOperator: function (e) {
    var id = e.target.id
    var data = this.data.data
    var row = this.data.row
    var coloum = this.data.coloum
    var a2 = ''

    //切割数组
    var data333 = dataPro(data, row, coloum)

    switch (id) {
      case 'transpose':
        data333 = math.transpose(data333)
        console.log('计算转置')
        console.log(data333) //计算转置
        //格式化输出
        this.output(data333)
        break;
      case 'det':
        this.setData({
          res: math.det(data333)
        })
        break;
      case 'inverse':
        if (math.det(data333) == 0) {
          wx.showToast({
            title: '不可逆！',
          })
        } else {
          //格式化输出
          this.output(math.inv(data333))
        }

        break;
      case 'trace':
        this.setData({
          res: math.trace(data333)
        })
        break;
      case 'eigsValue':
        //格式化输出
        try {
          this.output(math.eigs(data333).values)
        } catch (e) {
          wx.showToast({
            title: '当前仅支持实对称矩阵',
            icon: 'none'
          })
        }

        break;
      case 'eigsVector':
        //格式化输出
        try {
          this.output(math.eigs(data333).vectors)
        } catch (e) {
          wx.showToast({
            title: '当前仅支持实对称矩阵',
            icon: 'none'
          })
        }
        break;
      case 'Q':
        //格式化输出
        this.output(math.qr(data333).Q)
        break;
      case 'R':

        //格式化输出
        this.output(math.qr(data333).R)
        break;
      case 'L':

        //格式化输出
        this.output(math.lup(data333).L)
        break;
      case 'U':
        //格式化输出
        this.output(math.lup(data333).U)
        break;
      case 'clear':
        this.setData({
          data: [
            [0, 0, 0, 0, 0, ],
            [0, 0, 0, 0, 0, ],
            [0, 0, 0, 0, 0, ],
            [0, 0, 0, 0, 0, ],
            [0, 0, 0, 0, 0, ]
          ],
          value1: [2],
          value2: [2],
          row: 3,
          coloum: 3,
          res: '',
          isClear:false
        })
        this.setData({
          isClear:true
        })
        break;
    }

  },
  show: function (e) {

    var data22 = this.data.data
    var row = this.data.row
    var coloum = this.data.coloum
    var a2 = ''
    //切割数组
    var data333 = dataPro(data22, row, coloum)
    //格式化输出
    this.output(data333)

  },
  output: function (data) {
    math.format(data, 6)
    var a2 = ''
    var row = math.size(data)[0]
    //console.log('size:')
    //console.log(math.size(data))

    //格式化输出
    for (var i = 0; i < row; i++) {
      a2 = a2 + math.format(data[i], 6) + '\n'
    }
    //console.log('a2')
    //console.log(a2)
    this.setData({
      res: a2
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