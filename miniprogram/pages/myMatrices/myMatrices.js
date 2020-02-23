// miniprogram/pages/myMatrices/myMatrices.js
var math = require('../util/math.min.js');

var app = getApp()

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
var data_0 = [
  [0, 0, 0, 0, 0, ],
  [0, 0, 0, 0, 0, ],
  [0, 0, 0, 0, 0, ],
  [0, 0, 0, 0, 0, ],
  [0, 0, 0, 0, 0, ]
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isClear: true,
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
    res: '=',
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
    try {
      value = math.evaluate(value + '')
    } catch (e) {
      console.log(e)
    }

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
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }


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
          res: math.format(math.det(data333), 6)
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
          res: '=',
          isClear: false
        })
        this.setData({
          isClear: true
        })
        break;
      case 'love':
        wx.showToast({
          title: '后续功能正在开发中',
          icon: 'none'
        })
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