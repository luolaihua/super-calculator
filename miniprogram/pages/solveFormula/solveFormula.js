// miniprogram/pages/solveFormula/solveFormula.js
const math = require('../util/math.min.js');
const PRECISION = 6
//console.log(math.evaluate('sqrt(-4)+3').toString())
Page({

  /**
   * 页面的初始数据
   */
  data: {
    process: '',
    result_fraction: 0,
    result: 'X1=66666' + "\nX2=55555",
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    NumOfYuan: [0],
    NumOfCi: [0],
    indexOfShow: 0,
    indexOfYuan: 0,
    indexOfCi: 0,
    paraList: [{
      name: 'a',
      value: 0
    }, {
      name: 'b',
      value: 0
    }, {
      name: 'c',
      value: 0
    }, {
      name: 'd',
      value: 0
    }, {
      name: 'e',
      value: 0
    }, ],
    yuan: ['一', '二', '三', '四', '五'],
    ci: ['一', '二', '三', '四'],
    formulaList: ['aX+b=0', 'aX²+bX+c=0', 'aX³+bX²+cX+d=0', 'aX⁴+bX³+cX²+dX+e=0', ]
  },
  paraDelete: function (e) {
    var id = e.currentTarget.id
    var paraList = this.data.paraList
    paraList[id].value = 0
    this.setData({
      paraList
    })
    //console.log(paraList)

  },
  solve: function (e) {
    var a = this.data.paraList[0].value
    var b = this.data.paraList[1].value
    var c = this.data.paraList[2].value
    var d = this.data.paraList[3].value
    var e = this.data.paraList[4].value
    var indexOfShow = this.data.indexOfShow
    var result = 0,
      delta, x1, x2, process
    let scope = {
      a: a,
      b: b,
      c: c,
      d: d,
      e: e
    }


    switch (indexOfShow) {
      //一元一次
      case 0:
        if (a == 0) {
          result = 0
        } else {
          result = math.evaluate('-b / a ', scope)
        }
        result = "X = " + math.format(result, PRECISION).toString()
        process = '① ' + a + ' * X + ' + b + '= 0\n' +
          '② ' + a + ' * X = ' + -b + '\n' +
          '③ ' + result

        break;
        // one yuan two ci
      case 1:

        if (a == 0) {
          result = math.evaluate('-c / b', scope)
          result = "X = " + math.format(result, PRECISION).toString()
          process = '① ' + b + ' * X + ' + c + '= 0\n' +
            '② ' + b + ' * X = ' + -c + '\n' +
            '③ ' + result

        } else {
          delta = math.evaluate('sqrt(b * b - 4 * a * c)', scope)
          scope.delta = delta
          // console.log(scope)
          if (delta == 0) {
            result = math.evaluate('-b / a / 2', scope)
            result = 'X₁=X₂= ' + math.format(result, PRECISION).toString()

            process = '① ' + a + ' * X² + ' + b + ' * X + ' + c + '= 0\n' +
              '②  △ = b²- 4ac = ' + b * b + ' - ' + 4 * a * c + ' = 0\n' +
              '③ ' + result + ' = -b/2a'

          } else {
            x1 = math.evaluate('(-b+delta)/2/a', scope)
            x2 = math.evaluate('(-b-delta)/2/a', scope)

            result = 'X₁= ' + math.format(x1, PRECISION).toString() +
              '\nX₂= ' + math.format(x2, PRECISION).toString()
            if (b * b - 4 * a * c > 0) {

              process = '① ' + a + ' * X² + ' + b + ' * X + ' + c + '= 0\n' +
                '② △ = b²- 4ac = ' + b * b + ' - ' + 4 * a * c + ' > 0\n' +
                '③ 有实数解：\n' + result
            }else {
              process = '① ' + a + ' * X² + ' + b + ' * X + ' + c + '= 0\n' +
              '② △ = b²- 4ac = ' + b * b + ' - ' + 4 * a * c + ' < 0\n' +
              '③ 有复数解：\n' + result
            }

          }
        }
        break;
      default:
        break;
    }

    this.setData({
      process,
      //保留6位小数
      result,
      //result_fraction: math.fraction(result).toFraction()
    })

  },
  inputPara: function (e) {
    var id = e.target.id
    var value = e.detail.value
    var paraList = this.data.paraList
    if (value == '') {
      value = 0
    } else {
      try {
        value = Number(math.evaluate(value + ''))
      } catch (e) {
        console.log(e)
      }
    }
    paraList[Number(id)].value = value
    this.setData({
      paraList
    })
    // console.log(id, value)
    console.log(paraList)
  },
  bindChangeYuan: function (e) {
    var indexOfYuan = e.detail.value[0]
    this.setData({
      indexOfYuan
    })
    this.showWhich()
  },
  bindChangeCi: function (e) {
    var indexOfCi = e.detail.value[0]
    this.setData({
      indexOfCi
    })
    this.showWhich()

  },
  showWhich: function () {
    var indexOfYuan = this.data.indexOfYuan
    var indexOfCi = this.data.indexOfCi
    if (indexOfYuan == 0) {
      this.setData({
        indexOfShow: indexOfCi
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