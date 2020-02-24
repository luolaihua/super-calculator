// miniprogram/pages/myMatrices/myMatrices.js
var math = require('../util/math.min.js');

var app = getApp()

function dataPro(data, rowA, coloumA) {
  var d = []
  //切割数组
  for (var i = 0; i < rowA; i++) {
    d.push(data[i].slice(0, coloumA))
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
    operator: '',
    isFraction: false,
    isClearA: true,
    isClearB: true,
    dataA: [
      [0, 0, 0, 0, 0, ],
      [0, 0, 0, 0, 0, ],
      [0, 0, 0, 0, 0, ],
      [0, 0, 0, 0, 0, ],
      [0, 0, 0, 0, 0, ]
    ],
    dataB: [
      [0, 0, 0, 0, 0, ],
      [0, 0, 0, 0, 0, ],
      [0, 0, 0, 0, 0, ],
      [0, 0, 0, 0, 0, ],
      [0, 0, 0, 0, 0, ]
    ],
    valueA1: [2],
    valueA2: [2],
    rowA: 3,
    coloumA: 3,
    valueB1: [2],
    valueB2: [2],
    rowB: 3,
    coloumB: 3,
    days: [1, 2, 3, 4, 5],
    res: '=',
    det: 0,
    isChoose: true
  },
  choose: function (e) {
    if (this.data.isChoose) {
      this.setData({
        isChoose: false
      })
    } else {
      this.setData({
        isChoose: true
      })
    }
  },
  bindinputA: function (e) {

    var id = e.target.id
    var index_rowA = parseInt(id / 10)
    var index_coloumA = parseInt(id % 10)
    var value = e.detail.value
    var data = this.data.dataA

    if (this.data.isFraction) {
      try{
              data[index_rowA][index_coloumA] = value+''
      data = math.fraction(data)
      }catch(e){
        console.log(e)
      }

    } else {

      //将当前input的数据放入指定位置
      try {
        value = math.evaluate(value + '')
      } catch (e) {
        console.log(e)
      }
      data[index_rowA][index_coloumA] = Number(value)
    }
    //console.log(Number(value))
    this.setData({
      dataA: data
    })
  },
  //行变化
  bindChangeA1: function (e) {
    this.setData({
      rowA: e.detail.value[0] + 1,
      coloumA: e.detail.value[0] + 1,
      rowB: e.detail.value[0] + 1,
      coloumB: e.detail.value[0] + 1,
      valueA2: e.detail.value,
      valueB1: e.detail.value,
      valueB2: e.detail.value,
    })
    this.dataChangeA()
  },
  //列变化
  bindChangeA2: function (e) {
    this.setData({
      coloumA: e.detail.value[0] + 1
    })
    this.dataChangeA()
  },
  dataChangeA: function () {

    for (var i = 0; i < this.data.rowA; i++) {
      for (var j = 0; j < this.data.coloumA; j++) {
        data_0[i][j] = this.data.dataA[i][j]
      }
    }
    this.setData({
      dataA: data_0
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

  bindinputB: function (e) {

    var id = e.target.id
    var index_rowB = parseInt(id / 10)
    var index_coloumB = parseInt(id % 10)
    var value = e.detail.value
    var data = this.data.dataB

    if(this.data.isFraction){
      try{
              data[index_rowB][index_coloumB] = value+''
      data = math.fraction(data)
      }catch(e){
        console.log(e)
      }

    }else{
         //将当前input的数据放入指定位置
    try {
      value = math.evaluate(value + '')
    } catch (e) {
      console.log(e)
    }

    data[index_rowB][index_coloumB] = Number(value)

    }
 
    this.setData({
      dataB: data
    })
  },
  //行变化
  bindChangeB1: function (e) {
    this.setData({
      rowB: e.detail.value[0] + 1,
      valueB2: e.detail.value,
      coloumB: e.detail.value[0] + 1
    })
    this.dataChangeB()
  },
  //列变化
  bindChangeB2: function (e) {
    this.setData({
      coloumB: e.detail.value[0] + 1
    })
    this.dataChangeB()
  },
  dataChangeB: function () {

    for (var i = 0; i < this.data.rowB; i++) {
      for (var j = 0; j < this.data.coloumB; j++) {
        data_0[i][j] = this.data.dataB[i][j]
      }
    }
    this.setData({
      dataB: data_0
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
    //触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }


    var id = e.target.id

    this.setData({
      operator: id
    })

    if (this.data.isChoose) {
      var data22 = this.data.dataA
      var row = this.data.rowA
      var coloum = this.data.coloumA
    } else {
      var data22 = this.data.dataB
      var row = this.data.rowB
      var coloum = this.data.coloumB
    }
    var a2 = ''

    //切割数组
    var data333 = dataPro(data22, row, coloum)

    if(this.data.isFraction){
     data333= math.fraction(data333)
    }


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
      case 'inv':
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
          res: math.trace(data333).toFraction()
        })
        break;
      case 'eigsValues':
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
      case 'eigsVectors':
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
        this.output2(math.qr(data333).Q)
        break;
      case 'R':

        //格式化输出
        this.output2(math.qr(data333).R)
        break;
      case 'L':

        //格式化输出
        this.output2(math.lup(data333).L)
        break;
      case 'U':
        //格式化输出
        this.output2(math.lup(data333).U)
        break;
      case 'pow':
        this.setData({
          valueB1: [0],
          valueB2: [0],
          rowB: 1,
          coloumB: 1,
        })
        break;
      case 'solve':
        this.setData({
          valueB1: this.data.valueA1,
          valueB2: [0],
          rowB: this.data.rowA,
          coloumB: 1,
        })
        break;
      case 'fraction':
        if (this.data.isFraction) {
          this.setData({
            isFraction: false,
            dataA: math.number(this.data.dataA),
            dataB: math.number(this.data.dataB)

          })
          wx.showToast({
            title: '分式模式关闭',
            icon: 'none'
          })
        } else {
          this.setData({
            isFraction: true,
            dataA:math.fraction(this.data.dataA),
            dataB:math.fraction(this.data.dataB)
          })
          wx.showToast({
            title: '分式模式开启',
            icon: 'none'
          })
        }
        break;
    }

  },
  clear: function (e) {
    if (this.data.isChoose) {
      this.setData({
        dataA: [
          [0, 0, 0, 0, 0, ],
          [0, 0, 0, 0, 0, ],
          [0, 0, 0, 0, 0, ],
          [0, 0, 0, 0, 0, ],
          [0, 0, 0, 0, 0, ]
        ],
        valueA1: [2],
        valueA2: [2],
        rowA: 3,
        coloumA: 3,
        res: '=',
        isClearA: false
      })
      this.setData({
        isClearA: true
      })
    } else {
      this.setData({
        dataB: [
          [0, 0, 0, 0, 0, ],
          [0, 0, 0, 0, 0, ],
          [0, 0, 0, 0, 0, ],
          [0, 0, 0, 0, 0, ],
          [0, 0, 0, 0, 0, ]
        ],
        valueB1: [2],
        valueB2: [2],
        rowB: 3,
        coloumB: 3,
        res: '=',
        isClearB: false
      })
      this.setData({
        isClearB: true
      })
    }

  },
  clearAll: function (e) {
    this.setData({
      dataA: [
        [0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, ]
      ],
      valueA1: [2],
      valueA2: [2],
      rowA: 3,
      coloumA: 3,
      res: '=',
      isClearA: false,
      dataB: [
        [0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, ]
      ],
      valueB1: [2],
      valueB2: [2],
      rowB: 3,
      coloumB: 3,
      res: '=',
      isClearB: false
    })

    this.setData({
      isClearB: true
    })
  },
  show: function (e) {
    var dataA = this.data.dataA
    var rowA = this.data.rowA
    var coloumA = this.data.coloumA
    var dataB = this.data.dataB
    var rowB = this.data.rowB
    var coloumB = this.data.coloumB
    var operator = this.data.operator

    var row = ''
    var coloum = ''
    var res = ''

    dataA = dataPro(dataA, rowA, coloumA)
    dataB = dataPro(dataB, rowB, coloumB)

    switch (operator) {
      case '':
        if (this.data.isChoose) {
          res = dataA
        } else {
          res = dataB
        }
        break;
      case 'add':
        res = math.add(dataA, dataB)
        break;
      case 'multiply':
        res = math.multiply(dataA, dataB)
        break;
      case 'divide':
        res = math.divide(dataA, dataB)
        break;
      case 'dotDivide':
        res = math.dotDivide(dataA, dataB)
        break;
      case 'dotMultiply':
        res = math.dotMultiply(dataA, dataB)
        break;
      case 'subtract':
        res = math.subtract(dataA, dataB)
        break;
      case 'pow':
        res = math.pow(dataA, dataB[0][0])
        break;
      case 'solve':
        res = math.lusolve(dataA, dataB)
        break;




    }





    //格式化输出
    this.output(res)

  },
  output: function (data) {
    var a2 = ''
    var row = math.size(data)[0]
    var coloum =  math.size(data)[1]
    //console.log('size:')
    //console.log(math.size(data))

    //格式化输出

    if (this.data.isFraction) {
      for (var i = 0; i < row; i++) {
        for(var j=0;j<coloum;j++){
          data[i][j] = data[i][j].toFraction()
        }
      }

      for (var i = 0; i < row; i++) {
        a2 = a2 + data[i] + '\n'
      }
    } else {
      for (var i = 0; i < row; i++) {
        a2 = a2 + math.format(data[i], 6) + '\n'
      }
    }

    //console.log('a2')
    //console.log(a2)
    this.setData({
      res: a2
    })
  },
  output2: function (data) {
    var a2 = ''
    var row = math.size(data)[0]
    var coloum =  math.size(data)[1]
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