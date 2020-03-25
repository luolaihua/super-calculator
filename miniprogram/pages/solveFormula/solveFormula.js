// miniprogram/pages/solveFormula/solveFormula.js
const math = require('../util/math.min.js');
const PRECISION = 6
//console.log(math.evaluate('sqrt(-4)+3').toString())
//console.log(math.evaluate('9^(5/2)').toString())
math.config({
  number: 'number'
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    process: '',
    result_fraction: 0,
    result: 'X1=66666' + "\nX2=55555",
    NumOfYuan: [0],
    NumOfCi: [0],
    indexOfShow: 2,
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
  clear: function (e) {
    this.setData({
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
      process: '',
      result: '',
    })
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

    var paraList = this.data.paraList
    for (let index = 0; index < paraList.length; index++) {
      try {
        paraList[index].value = math.evaluate(paraList[index].value + '')
      } catch (e) {
        console.log(e)
        wx.showToast({
          title: '输入有误！',
          icon: 'none'
        })
        return
      }
    }

    var a = paraList[0].value
    var b = paraList[1].value
    var c = paraList[2].value
    var d = paraList[3].value
    var e = paraList[4].value


    if (Number(a) == 0) {
      wx.showToast({
        title: 'a不能为0！',
        icon: 'none'
      })
      return
    }
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
    console.log(scope)


    switch (indexOfShow) {
      //一元一次
      case 0:
        result = this.solve1Equaltion(scope).result
        process = this.solve1Equaltion(scope).process
        /*         result = math.evaluate('-b / a ', scope)
                result = "X = " + math.format(result, PRECISION).toString()
                process = '① ' + a + ' * X + ' + b + '= 0\n' +
                  '② ' + a + ' * X = ' + -b + '\n' +
                  '③ ' + result */
        break;
        // one yuan two ci
      case 1:
        result = this.solve2Equaltion(scope).result
        process = this.solve2Equaltion(scope).process
        /* 
                delta = math.evaluate('sqrt(b * b - 4 * a * c)', scope)
                //由于精确度问题。等于零的情况需要改进
                if (math.larger(delta, -1e-10) && math.smaller(delta, 1e-10)) {
                  delta = 0
                }
                scope.delta = delta

                // console.log(scope)
                if (delta == 0) {
                  result = math.evaluate('-b / a / 2', scope)
                  result = 'X₁=X₂= ' + math.format(result, PRECISION).toString()

                  process = '① ' + a + ' * X² + ' + b + ' * X + ' + c + '= 0\n' +
                    '②  △ = b² - 4ac = ' + b * b + ' - ' + 4 * a * c + ' = 0\n' +
                    '③ ' + result + ' = -b/2a'

                } else {
                  x1 = math.evaluate('(-b+delta)/2/a', scope)
                  x2 = math.evaluate('(-b-delta)/2/a', scope)

                  result = '   X₁= ' + math.format(x1, PRECISION).toString() +
                    '\n   X₂= ' + math.format(x2, PRECISION).toString()
                  if (b * b - 4 * a * c > 0) {

                    process = '① ' + a + ' * X² + ' + b + ' * X + ' + c + '= 0\n' +
                      '② △ = b²- 4ac = ' + b * b + ' - ' + 4 * a * c + ' > 0\n' +
                      '③ √△ = ' + math.format(delta, PRECISION).toString() + '\n' +
                      '④ 有实数解：\n' + result
                  } else {
                    process = '① ' + a + ' * X² + ' + b + ' * X + ' + c + '= 0\n' +
                      '② △ = b²- 4ac = ' + b * b + ' - ' + 4 * a * c + ' < 0\n' +
                      '③ √△ = ' + math.format(delta, PRECISION).toString() + '\n' +
                      '④ 有复数解：\n' + result
                  }

                } */

        break;
      case 2:
        result = this.solve3Equaltion(scope).result
        process = this.solve3Equaltion(scope).process
/*         var A = math.evaluate('b*b-3*a*c', scope).toString()
        var B = math.evaluate('b*c-9*a*d', scope).toString()
        var C = math.evaluate('c*c-3*b*d', scope).toString()
        scope.A = A
        scope.B = B
        scope.C = C
        delta = math.evaluate('B*B-4*A*C', scope)
        delta = math.format(delta, PRECISION).toString()
        if (math.larger(delta, -1e-10) && math.smaller(delta, 1e-10)) {
          delta = 0
        }

        process = '① 重根判别式：\n   A = b²-3ac = ' + A + '\n   B = bc-9ad = ' + B + '\n   C = c²-3bd = ' + C +
          '\n② 总判别式：\n' + '   △ = B²-4AC = ' + delta

        if (Number(delta) > 0) {
          process = process + ' > 0'
        } else if (Number(delta) < 0) {
          process = process + ' < 0'
        }
        // A=B=0,用盛金公式1
        if (A == B && A == '0') {
          console.log(A, B, C, delta)
          var res = '\n③ 由于A=B=0,有三重实根,\n   根据盛金公式1：\n'
          result = math.evaluate('-b / a / 3', scope)
          result = 'X₁=X₂=X₃= ' + math.format(result, PRECISION).toString()
          process = process + res + '   -b/3/a = -c/b = -3d/c \n   =' + result

        } else if (Number(delta) == 0) {
          var X1 = math.evaluate('-b/a + B/A', scope)
          var X2 = math.evaluate('-B/A/2', scope)
          var res = '\n③ 有三个实根,其中有一个两重根,\n   根据盛金公式3：\n   X1 = -b/a + B/A\n   X2 = -B/A/2\n'
          result = '   X₁= ' + math.format(X1, PRECISION).toString() +
            '\n   X₂=X₃= ' + math.format(X2, PRECISION).toString()
          process = process + res + result
        } else if (Number(delta) > 0) {
          var Y1 = math.evaluate('A*b+3/2*a*(-B + sqrt(B*B-4*A*C))', scope)
          var Y2 = math.evaluate('A*b+3/2*a*(-B - sqrt(B*B-4*A*C))', scope)
          scope.Y1 = Y1
          scope.Y2 = Y2

          var X1 = math.evaluate('(-b-cbrt(Y1)-cbrt(Y2))/3/a', scope)
          var X2 = math.evaluate('(-2*b+cbrt(Y1)+cbrt(Y2)+sqrt(3)*(cbrt(Y1)-cbrt(Y2))*i)/6/a', scope)
          var X3 = math.evaluate('(-2*b+cbrt(Y1)+cbrt(Y2)-sqrt(3)*(cbrt(Y1)-cbrt(Y2))*i)/6/a', scope)

          var res = '\n③ 有一个实根和一对共轭虚根,\n   根据盛金公式2：\n' +
            '   Y₁ = ' + math.format(Y1, PRECISION).toString() +
            '\n   Y₂ = ' + math.format(Y2, PRECISION).toString() + '\n'

          result = '   X₁ = ' + math.format(X1, PRECISION).toString() +
            '\n   X₂ = ' + math.format(X2, PRECISION).toString() +
            '\n   X₃ = ' + math.format(X3, PRECISION).toString()
          process = process + res + result
        } else if (Number(delta) < 0) {
          var T = math.evaluate('(2*A*b-3*a*B)/(2*(A^(3/2)))', scope)
          scope.T = T
          var theta = math.evaluate('acos(T)', scope)

          scope.theta = theta
          console.log(T.toString(), scope.theta.toString())
          var X1 = math.evaluate('(-b-2*sqrt(A)*cos(theta/3))/3/a', scope)
          var X2 = math.evaluate('(-b+sqrt(A)*(cos(theta/3)+sqrt(3)*sin(theta/3)))/3/a', scope)
          var X3 = math.evaluate('(-b+sqrt(A)*(cos(theta/3)-sqrt(3)*sin(theta/3)))/3/a', scope)

          var res = '\n③ 有三个不相等的实根,\n   根据盛金公式2：\n' +
            '   T = ' + math.format(T, PRECISION).toString() +
            '\n   θ = ' + math.format(theta, PRECISION).toString() + ' = ' + math.format(theta * 180 / Math.PI, PRECISION).toString() + '°\n'

          result = '   X₁ = ' + math.format(X1, PRECISION).toString() +
            '\n   X₂ = ' + math.format(X2, PRECISION).toString() +
            '\n   X₃ = ' + math.format(X3, PRECISION).toString()
          process = process + res + result
        } */

        break;
      default:
        break;
    }

    this.setData({
      process,
      result,
      paraList
      //result_fraction: math.fraction(result).toFraction()
    })

  },
  solve1Equaltion: function (scope) {
    var a = scope.a
    var b = scope.b
    var result = 0,
      process
    var res = {}
    result = math.evaluate('-b / a ', scope)
    result = "X = " + math.format(result, PRECISION).toString()
    process = '① ' + a + ' * X + ' + b + '= 0\n' +
      '② ' + a + ' * X = ' + -b + '\n' +
      '③ ' + result
    res.result = result
    res.process = process
    return res
  },
  solve2Equaltion: function (scope) {
    var a = scope.a
    var b = scope.b
    var c = scope.c
    var result = 0,
      delta, x1, x2, process
    var res = {}
    delta = math.evaluate('sqrt(b * b - 4 * a * c)', scope)

    scope.delta = delta

    // console.log(scope)
    if (delta == 0) {
      result = math.evaluate('-b / a / 2', scope)
      result = 'X₁=X₂= ' + math.format(result, PRECISION).toString()

      process = '① ' + a + ' * X² + ' + b + ' * X + ' + c + '= 0\n' +
        '②  △ = b² - 4ac = ' + b * b + ' - ' + 4 * a * c + ' = 0\n' +
        '③ ' + result + ' = -b/2a'

    } else {
      x1 = math.evaluate('(-b+delta)/2/a', scope)
      x2 = math.evaluate('(-b-delta)/2/a', scope)

      result = '   X₁= ' + math.format(x1, PRECISION).toString() +
        '\n   X₂= ' + math.format(x2, PRECISION).toString()
      if (b * b - 4 * a * c > 0) {

        process = '① ' + a + ' * X² + ' + b + ' * X + ' + c + '= 0\n' +
          '② △ = b²- 4ac = ' + b * b + ' - ' + 4 * a * c + ' > 0\n' +
          '③ √△ = ' + math.format(delta, PRECISION).toString() + '\n' +
          '④ 有实数解：\n' + result
      } else {
        process = '① ' + a + ' * X² + ' + b + ' * X + ' + c + '= 0\n' +
          '② △ = b²- 4ac = ' + b * b + ' - ' + 4 * a * c + ' < 0\n' +
          '③ √△ = ' + math.format(delta, PRECISION).toString() + '\n' +
          '④ 有复数解：\n' + result
      }

    }
    res.result = result
    res.process = process
    return res
  },
  solve3Equaltion: function (scope) {
    var a = scope.a
    var b = scope.b
    var c = scope.c
    var d = scope.d

    var result = 0,
      process, delta
    var RES = {}


    var A = math.evaluate('b*b-3*a*c', scope).toString()
    var B = math.evaluate('b*c-9*a*d', scope).toString()
    var C = math.evaluate('c*c-3*b*d', scope).toString()
    scope.A = A
    scope.B = B
    scope.C = C
    delta = math.evaluate('B*B-4*A*C', scope)
    delta = math.format(delta, PRECISION).toString()
    if (math.larger(delta, -1e-10) && math.smaller(delta, 1e-10)) {
      delta = 0
    }

    process = '① 重根判别式：\n   A = b²-3ac = ' + A + '\n   B = bc-9ad = ' + B + '\n   C = c²-3bd = ' + C +
      '\n② 总判别式：\n' + '   △ = B²-4AC = ' + delta

    if (Number(delta) > 0) {
      process = process + ' > 0'
    } else if (Number(delta) < 0) {
      process = process + ' < 0'
    }
    // A=B=0,用盛金公式1
    if (A == B && A == '0') {
      console.log(A, B, C, delta)
      var res = '\n③ 由于A=B=0,有三重实根,\n   根据盛金公式1：\n'
      result = math.evaluate('-b / a / 3', scope)
      result = 'X₁=X₂=X₃= ' + math.format(result, PRECISION).toString()
      process = process + res + '   -b/3/a = -c/b = -3d/c \n   =' + result

    } else if (Number(delta) == 0) {
      var X1 = math.evaluate('-b/a + B/A', scope)
      var X2 = math.evaluate('-B/A/2', scope)
      var res = '\n③ 有三个实根,其中有一个两重根,\n   根据盛金公式3：\n   X1 = -b/a + B/A\n   X2 = -B/A/2\n'
      result = '   X₁= ' + math.format(X1, PRECISION).toString() +
        '\n   X₂=X₃= ' + math.format(X2, PRECISION).toString()
      process = process + res + result
    } else if (Number(delta) > 0) {
      var Y1 = math.evaluate('A*b+3/2*a*(-B + sqrt(B*B-4*A*C))', scope)
      var Y2 = math.evaluate('A*b+3/2*a*(-B - sqrt(B*B-4*A*C))', scope)
      scope.Y1 = Y1
      scope.Y2 = Y2

      var X1 = math.evaluate('(-b-cbrt(Y1)-cbrt(Y2))/3/a', scope)
      var X2 = math.evaluate('(-2*b+cbrt(Y1)+cbrt(Y2)+sqrt(3)*(cbrt(Y1)-cbrt(Y2))*i)/6/a', scope)
      var X3 = math.evaluate('(-2*b+cbrt(Y1)+cbrt(Y2)-sqrt(3)*(cbrt(Y1)-cbrt(Y2))*i)/6/a', scope)

      var res = '\n③ 有一个实根和一对共轭虚根,\n   根据盛金公式2：\n' +
        '   Y₁ = ' + math.format(Y1, PRECISION).toString() +
        '\n   Y₂ = ' + math.format(Y2, PRECISION).toString() + '\n'

      result = '   X₁ = ' + math.format(X1, PRECISION).toString() +
        '\n   X₂ = ' + math.format(X2, PRECISION).toString() +
        '\n   X₃ = ' + math.format(X3, PRECISION).toString()
      process = process + res + result
    } else if (Number(delta) < 0) {
      var T = math.evaluate('(2*A*b-3*a*B)/(2*(A^(3/2)))', scope)
      scope.T = T
      var theta = math.evaluate('acos(T)', scope)

      scope.theta = theta
      console.log(T.toString(), scope.theta.toString())
      var X1 = math.evaluate('(-b-2*sqrt(A)*cos(theta/3))/3/a', scope)
      var X2 = math.evaluate('(-b+sqrt(A)*(cos(theta/3)+sqrt(3)*sin(theta/3)))/3/a', scope)
      var X3 = math.evaluate('(-b+sqrt(A)*(cos(theta/3)-sqrt(3)*sin(theta/3)))/3/a', scope)

      var res = '\n③ 有三个不相等的实根,\n   根据盛金公式2：\n' +
        '   T = ' + math.format(T, PRECISION).toString() +
        '\n   θ = ' + math.format(theta, PRECISION).toString() + ' = ' + math.format(theta * 180 / Math.PI, PRECISION).toString() + '°\n'

      result = '   X₁ = ' + math.format(X1, PRECISION).toString() +
        '\n   X₂ = ' + math.format(X2, PRECISION).toString() +
        '\n   X₃ = ' + math.format(X3, PRECISION).toString()
      process = process + res + result
    }


    RES.result = result
    RES.process = process
    return RES
  },
  inputPara: function (e) {
    var id = e.target.id
    var value = e.detail.value
    var paraList = this.data.paraList

    if (value == '') {
      value = 0
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