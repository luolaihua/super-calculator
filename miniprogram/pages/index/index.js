//index.js
//更新管理
const updateManager = wx.getUpdateManager()
var math = require('../util/math.min.js');
var Fraction = require('../util/fraction.js');
const parser = math.parser();
String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

/* console.log(math.simplify('3 + 2 / 4').toString())              // '7 / 2'
console.log(math.simplify('2x + 3x').toString())                // '5 * x'
console.log(math.simplify('x^2 + x + 3 + x^2').toString())      // '2 * x ^ 2 + x + 3'
console.log(math.simplify('x * y * -x / (x ^ 2)').toString())   // '-y
var testRes = math.rationalize('(2x+1)^6').toString()
console.log(testRes)
var testRes = math.simplify('(2x+1)^6').toString()
console.log(testRes)
var testRes = math.derivative('(2x+1)^6', 'x').toString()
console.log(testRes)  */
/* console.log(math.simplify('x -x / (x ^ 2)+3').toString()) // '-y
var testRes = math.rationalize('(x - y) ^2').toString()
console.log(testRes)
console.log(math.simplify(testRes).toString()) // '-y
console.log(math.simplify('asin(x)+3sin(x) + 2 / 4sin(x)').toString())
var testRes = math.derivative('log(2x,e)', 'x').toString()
console.log(testRes)
console.log(math.simplify('4 / (4 * x)').toString())

const f = math.parse('-x / (x ^ 2)')
const simplified = math.simplify(f)
console.log(simplified.toString()) // '3 * x'
console.log(simplified.evaluate({
  x: 4
})) // 12 */

//获取应用实例
const app = getApp()
var touchStartX = 0; //触摸时的原点 
var touchStartY = 0; //触摸时的原点 
var time = 0; // 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = ""; // 记录/清理时间记录 
var touchMoveX = 0; // x轴方向移动的距离
var touchMoveY = 0; // y轴方向移动的距离


Page({
  data: {
    scrollTop: 100,
    isSound: false,
    isScientific: true,
    isFraction: false,
    ANS: '0',
    poet: '',
    isRuleTrue: false,
    imageUrl: '',
    fontsize: 150,
    res: "0", //结果
    res_ed: '',
    id_sin: 'sin(',
    id_cos: 'cos(',
    id_tan: 'tan(',
    id_asin: 'asin(',
    id_acos: 'acos(',
    id_atan: 'atan(',
    id_X: '!',
    id_log: 'log(',
    id_dou: ',',
    id_gen: '√(',
    id_mod: '%',
    id_deg: '°',
    id_i: 'i',
    id_pi: 'π',
    id_e: 'e',
    id1: "1",
    id2: '2',
    id3: '3',
    id4: "4",
    id5: '5',
    id6: '6',
    id7: "7",
    id8: '8',
    id9: '9',
    id_c: 'clear',
    id_d: 'del',
    id_love: 'love',
    id_div: '÷',
    id_div_sp: '/',
    id_inverse: '^(-1)',
    id_left: '(',
    id_right: ')',
    id_pow: '^',
    id_mult: '×',
    id_mult_sp: '*',
    id_sub: '-',
    id_add: '+',
    id_equal: 'equal',
    id0: '0',
    id_ans: 'A',
    id_dot: '.',
    id_x: 'x',
    id_y: 'y',
    id_z: 'z',
    condition: 'initial',
    justOne: false,
    startTime: '',
    endTime: '',
    isLove: 'false',
    lastTapTime: 0,
    isOpenSpecial: false,
    indexOfSpecialList: 2,
    indexOfdevirativeList: 0,
    specialOperatorList: [{
        name: '多项式化简',
        content: '多项式化简如：(x+3)^3'
      },
      {
        name: '多项式求导',
        content: '多项式求导如：x^4 + x + 3 + x^2'
      },
      {
        name: '取消',
        content: ''
      }
    ],
    /*     devirativeList: [{
          name: 'x',
          isRed: true
        }, {
          name: 'y',
          isRed: false
        }, {
          name: 'z',
          isRed: false
        }, {
          name: 'i',
          isRed: false
        }] */

  },
  chooseContent: function (e) {

    var id = this.data.indexOfSpecialList,
      content

    if (id == 0) {
      content = '(x+3)^3'
    } else if (id == 1) {
      content = 'x^4 + x + 3 + x^2'
    }

    this.setData({
      res: content
    })
  },
  specialOp: function (e) {
    var id = Number(e.currentTarget.id)
    if (id == 2) {
      this.clearBtn()
    }
    this.setData({
      indexOfSpecialList: id,
      isOpenSpecial: false,
    })
  },
  isOpenSpecial: function (e) {
    this.setData({
      isOpenSpecial: !this.data.isOpenSpecial
    })
  },
  isSound: function (e) {
    if (this.data.isSound) {
      this.setData({
        //fontsize: 40,
        isSound: false
      })
      wx.showToast({
        title: '语音关闭',
      })
    } else {
      this.setData({
        //fontsize: 40,
        isSound: true
      })
      wx.showToast({
        title: '语音开启',
      })
    }
  },

  //打开透明层
  showRule: function () {
    this.setData({
      isRuleTrue: true
    })
  },
  //关闭透明层
  hideRule: function () {
    this.setData({
      isRuleTrue: false
    })
  },

  //是否开启分式运算
  startFraction: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    var isFraction = this.data.isFraction
    console.log(isFraction)
    var res = this.data.res


    if (isFraction) {
      math.config({
        number: 'number'
      })
      this.setData({
        isFraction: false
      })
      wx.showToast({
        title: '普通运算',
      })
      //indexOfSpecialList == 2说明已取消特别计算模式
      if (this.data.indexOfSpecialList == 2) {
        try {
          res = new Fraction(res).toString()
        } catch (e) {
          console.log(e)
          wx.showToast({
            title: '格式错误！',
          })
        }
      }


      if (!isNaN(res)) {
        this.setData({
          res: res
        })
      }
    } else {
      math.config({
        number: 'Fraction'
      })
      wx.showToast({
        title: '分式运算',
      })
      this.setData({
        isFraction: true
      })
      if (!isNaN(res)) {
        this.setData({
          res: new Fraction(res).toFraction()
        })
      }
    }
  },
  //-------------------------------------------心形按钮功能
  loveBtn: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    var curTime = e.timeStamp
    var lastTime = e.currentTarget.dataset.time // 通过e.currentTarget.dataset.time 访问到绑定到该组件的自定义数据

    this.setData({
      lastTapTime: curTime,
      condition: "initial",
    })


    if ((this.data.endTime - this.data.startTime) > 1000) {
      //判断是否长按
      //TODO


    } else if (curTime - lastTime < 500) {
      //是双击事件
      //TODO

    } else {

      //切换科学计算
      if (this.data.isScientific) {
        this.setData({
          isScientific: false
        })
        /*         wx.showToast({
                  title: '普通计算',
                }) */
      } else {
        this.setData({
          isScientific: true
        })
        /*         wx.showToast({
                  title: '科学计算',
                }) */
      }
    }


  },
  //通过touchStart和touchEnd来控制长按的时间
  touchStart: function (e) {
    this.setData({
      startTime: e.timeStamp
    })
    touchStartX = e.touches[0].pageX; // 获取触摸时的原点 
    touchStartY = e.touches[0].pageY; // 获取触摸时的原点 
    // 使用js计时器记录时间 
    interval = setInterval(function () {
      time++;
    }, 100);

  },
  // 触摸移动事件 
  touchMove: function (e) {
    touchMoveX = e.touches[0].pageX;
    touchMoveY = e.touches[0].pageY;
  },

  touchEnd: function (e) {
    this.setData({
      endTime: e.timeStamp
    })
    var moveX = Math.abs(touchMoveX - touchStartX);
    var moveY = Math.abs(touchMoveY - touchStartY)
    //console.log(moveX+"  Y: "+moveY)

    if (moveX <= moveY && touchMoveY != 0) { // 上下
      // 向上滑动
      if (touchMoveY - touchStartY <= -120 && time < 10) {
        this.setData({
          poet: '除了爱你我没有别的愿望\n一场风暴占满了河谷\n一条鱼占满了河\n我把你造得像我的孤独一样大\n整个世界好让我们躲藏\n日日夜夜好让我们互相了解\n为了在你的眼睛里不再看到别的\n只看到我对你的想象\n只看到你的形象中的世界\n还有你眼帘控制的日日夜夜',
          isRuleTrue: true
        })
        //console.log("向上滑动"+touchMoveY+ '  |  '+touchStartY+'up')
      }
      // 向下滑动 
      if (touchMoveY - touchStartY >= 120 && time < 10) {
        //console.log('向下滑动 '+touchMoveY+ '   |  '+touchStartY);

        this.setData({
          poet: '我爱你，不光因为你的样子，\n还因为，和你在一起时，我的样子。\n我爱你，\n不光因为你为我而做的事，\n还因为，为了你，\n我能做成的事。\n我爱你，\n因为你能唤出，我最真的那部分。\n我爱你，因为你穿越我心灵的旷野，\n如同阳光穿透水晶般容易，\n我的傻气，我的弱点，\n在你的目光里几乎不存在。\n而我心里最美丽的地方，\n却被你的光芒照得通亮，\n别人都不曾费心走那么远，\n别人都觉得寻找太麻烦，\n所以没人发现过我的美丽，\n所以没人到过这里。',
          isRuleTrue: true
        })

      }
    } else if (touchMoveX != 0) { // 左右
      // 向左滑动
      if (touchMoveX - touchStartX <= -120 && time < 10) {
        //console.log("左滑页面"+touchMoveX+ '  |  '+touchStartX+'left')

        this.setData({
          poet: '深深的话，\n我们浅浅地说。\n长长的路，\n我们慢慢地走。',
          isRuleTrue: true
        })
      }
      // 向右滑动 
      if (touchMoveX - touchStartX >= 120 && time < 10) {
        //console.log('向右滑动'+touchMoveX+ '  |  '+touchStartX+'left');

        this.setData({
          poet: '愿我如星君如月，\n夜夜流光相皎洁。',
          isRuleTrue: true
        })
      }
    }
    clearInterval(interval); // 清除setInterval 
    time = 0;
  },
  //love btn长按触发
  longtap: function (e) {


  },
  backBtn: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    var res = this.data.res;
    var condition = this.data.condition;
    if (condition != 'initial' && res.length > 1) {
      this.setData({
        res: res.substr(0, res.length - 1)
      })
    } else if (res.length == 1) {
      this.setData({
        res: '0',
        condition: 'initial'
      })
    }

    //加音效
    //添加音效
    if (this.data.isSound) {
      const innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/del.wav?sign=13dfc6d5b63527b1d270b2ab55302774&t=1582902798'
      innerAudioContext.play()
    }

  },
  clearBtn: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    this.setData({
      res: '0',
      condition: 'initial',
      //fontsize: 100
    })

    //加音效
    //添加音效
    if (this.data.isSound) {
      const innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E6%B8%85%E9%99%A4.wav?sign=a5eb5a0e860b03850f7caa129c3d788c&t=1582898674'
      innerAudioContext.play()
    }

  },
  clickBtn: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    var btnValue = e.target.id;
    var result = this.data.res;
    var condition = this.data.condition;
    switch (condition) {
      case 'initial':
        result = btnValue;
        this.setData({
          res: result,
          condition: 'clicked'
        });
        break;

      case 'clicked':

        //不能连续重复点击： +-*/. 判断最后一个字符是否+-*/. 如果是就删除
        var lastChar = result.charAt(result.length - 1);

        if (btnValue == '+' || btnValue == '-' || btnValue == '×' || btnValue == '÷' || btnValue == '.') {

          if (lastChar == '+' || lastChar == '-' || lastChar == '×' || lastChar == '÷' || lastChar == '.') {
            result = result.substr(0, result.length - 1)
          }
        }
        if (lastChar != 'A' || btnValue != "A") {
          result = result + btnValue;
        }


        this.setData({
          //显示内容增加时滑动到底部---动态
          scrollTop: result.length * 150,
          res: result,
          condition: 'clicked'
        });

        break;

      case 'equaled':


        if (isNaN(btnValue) && btnValue != 'A' && btnValue != 'x' && btnValue != 'y' && btnValue != 'z' && btnValue != 'i') {
          result = result + btnValue;
          this.setData({
            res: result,
            condition: 'clicked'
          })

        } else {
          result = btnValue;
          this.setData({
            res: result,
            condition: 'clicked'
          })
        };

        break;

    }
    this.changeFontSize(result)


    //加音效
    //添加音效
    if (this.data.isSound) {
      const innerAudioContext = wx.createInnerAudioContext()
      switch (btnValue) {
        case '1':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E4%B8%80.wav?sign=3cc974e8c54918056ee064a9610cb392&t=1582898183'
          break;
        case '2':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E4%BA%8C.wav?sign=6dd653c302b76d79ca4d84221894f683&t=1582898200'
          break;
        case '3':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E4%B8%89.wav?sign=1336f5e7a4fe5e95dddbcbeb7a553407&t=1582898222'
          break;
        case '4':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E5%9B%9B.wav?sign=899c4b724047e281a68097387ba3f60c&t=1582898235'
          break;
        case '5':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E4%BA%94.wav?sign=955774279e60c65df3618b3a931014fd&t=1582898250'
          break;
        case '6':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E5%85%AD.wav?sign=9d69018c5420b26dde0ca3208b185493&t=1582898264'
          break;
        case '7':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E4%B8%83.wav?sign=70256ef35fec8b6a2eefa2baf5514f2f&t=1582898276'
          break;
        case '8':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E5%85%AB.wav?sign=44b5d547f4f17f90e1b3101c54c74574&t=1582898289'
          break;
        case '9':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E4%B9%9D.wav?sign=cf48b26372b64649379078de761983e6&t=1582898302'
          break;
        case '0':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E9%9B%B6.wav?sign=4dabc88dc83d3ef7056547a8702283e2&t=1582898316'
          break;
        case '.':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E7%82%B9.wav?sign=0f24fb49d3e22303b0172df3aeee89d2&t=1582898462'
          break;
        case '+':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E5%8A%A0.wav?sign=4778ae236f472915ca6e9c1bd485f722&t=1582898488'
          break;
        case '-':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E5%87%8F.wav?sign=c54b1dfcc9e986a3dc13ee81dc9a6bbd&t=1582898504'
          break;
        case '÷':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E9%99%A4%E4%BB%A5.wav?sign=1bdeb37260fd216f73cca73b841e8e3a&t=1582898515'
          break;
        case '×':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E4%B9%98.wav?sign=d6400ce05da72f732bf429ca98d5ef39&t=1582898529'
          break;
        case '×':
          innerAudioContext.src = ''
          break;
        case 'sin(':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/sin.wav?sign=b25c6ed7f78535a5edfb151bc1837ec7&t=1582903026'
          break;
        case 'cos(':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/cos.wav?sign=3ca766df686d09c05c6d679cef96974f&t=1582903053'
          break;
        case 'tan(':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/tan.wav?sign=4c3a4e9f90919841bbe12975221cb627&t=1582903084'
          break;
        case 'asin(':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/asin.wav?sign=a67b818eeb27d39f71d644bc0b4ba341&t=1582903118'
          break;
        case 'acos(':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/acos.wav?sign=9d5316f3c0236a506be9fb07ca3e41fa&t=1582903138'
          break;
        case 'atan(':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/atan.wav?sign=5e845e0ea3d81b938f18cc042eacba2f&t=1582903161'
          break;
        case 'log(':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/log.wav?sign=2866208fed5edf60b029a2d35948a379&t=1582903181'
          break;
        case '(':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/left.wav?sign=489d4d8c0d2107151b68e5081931dbf4&t=1582903243'
          break;
        case ')':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/right.wav?sign=e5c8006901637a6dc421bdc52932add8&t=1582903269'
          break;
        case 'π':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/pi.wav?sign=a4d1af8a6b0c643f7c6248a6528621b3&t=1582903312'
          break;
        case '^':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/npow.wav?sign=6b37e40286d6af08b6ab0df413d88833&t=1582903335'
          break;
        case '!':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/n.wav?sign=7f49fe1d2a655f93d6b8e68cbc411046&t=1582903408'
          break;
        case '√(':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/sqrt.wav?sign=882d1ca1eb3128c6c0d940b64d551400&t=1582903906'
          break;
        case '^(-1)':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/inverse.wav?sign=b22b7ce4300f0b3fcaa5a9d6f4619a57&t=1582903888'
          break;
        case '%':
          innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/mod.wav?sign=41501bcde363db26363cbe75ff7aad45&t=1582903877'
          break;
      }
      innerAudioContext.play()
    }





  },
  equal: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }

    var index = this.data.indexOfSpecialList
    var result = this.data.res;
    var ans = this.data.ANS;

    result = this.dataPre(result)
    ans = this.dataPre(ans)

    //index==0 说明是化简有理化
    if (index == 0) {
      try {
        var res = math.rationalize(result).toString()

        //如果是分式计算
        if (this.data.isFraction) {
          res = math.simplify(res, {}, {
            exactFractions: true
          }).toString()
        } else {
          res = math.simplify(res).toString()
        }
      } catch (e) {
        console.log(e)
        wx.showToast({
          title: '表达式错误,请重新输入',
          icon: 'none'
        })
      }
    }
    //求导
    if (index == 1) {
      try {
        var res = math.derivative(result, 'x').toString()

      } catch (e) {
        console.log(e)
        wx.showToast({
          title: '表达式错误,请重新输入',
          icon: 'none'
        })
      }

      // console.log(res, 'res')
      // console.log(result, 'result')
    }

    if (index == 2) {
      try {
        parser.evaluate('A = ' + ans)
        //计算结果
        var res = parser.evaluate(result)
        //将精度设为16
        res = math.format(res, {
          precision: 16
        })

        //如果是分式计算
        if (this.data.isFraction) {
          res = new Fraction(res).toFraction()
        }
        //数字谐音解析
        this.showlove(res)
        //把deg转成°
        res = res.toString().replace(' deg', '°');

        //console.log(res)
      } catch (e) {
        console.log(e)
        wx.showToast({
          title: '表达式错误,请重新输入',
          icon: 'none'
        })
      }
    }
    this.changeFontSize(res)

    this.setData({
      res: res,
      ANS: res,
      condition: 'equaled'
    })


    //加音效
    //添加音效
    if (this.data.isSound) {
      const innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E7%AD%89%E4%BA%8E.wav?sign=feec5bbb7a08686461a79ddcd655d293&t=1582898728'
      innerAudioContext.play()
    }
  },
  toScientificData: function (e) {

    //这一步特别牛，先把全局对象存起来，后面全局对象可能会改变，所以that可以代替this作为全局对象
    var that = this

    wx.navigateTo({
      //传参格式：参数与路径之间使用 ?分隔，参数键与参数值用 = 相连，
      //不同参数用 & 分隔；如 '/pages/index/index?value1=hello&value2=world'
      url: '../scientificData/scientificData',
      events: {
        getScientifiData: function (data) {
          that.setData({
            res: data.data,
            condition: 'clicked'

          })
        }
      },
      success: function (res) {}
    })
  },
  help: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    this.setData({
      poet: '555',
      isRuleTrue: true
    })
  },


  //数字谐音解析函数
  showlove: function (res) {
    var one = '1314:一生一世:1314520:一生一世I love you:1324:今生来世:1324320:今生来世深爱你:1314920:一生一世就爱你:1372:一厢情愿:1392010:一生就爱你一个:1414:要死要死；意思意思:147:一世情:1573:一往情深:1589854:要我发，就发五次:1711:一心一意:177155:MISS:1920:依旧爱你:1930:依旧想你:200:爱你哦:20110:爱你一百一十年:20184:爱你一辈子:2030999:爱你想你久久久:2037:为你伤心:20475:爱你是幸福:20609:爱你到永久:20863:爱你到来生:220225:爱爱你爱爱我:230:爱死你:234:爱相随:235:要想你:2406:爱死你啦:246:饿死了:246437:爱是如此神奇:25184:爱我一辈子:25873:爱我到今生:25910:爱我久一点:25965:爱我就留我:259695:爱我就了解我:259758:爱我就娶我吧:2627:爱来爱去:27:爱妻:282:饿不饿:256895:你是可爱的小狗::300:想你哦:30920:想你就爱你:3013:想你一生:310:先依你:31707:LOVE:32062:想念你的爱:032069:想爱你很久:3207778:想和你去吹吹风:330335:想想你想想我:3344587:生生世世不变心:3399:长长久久:356:上网啦:35910:想我久一点:359258:想我就爱我吧:360:想念你:369958:神啊救救我吧:3731:真心真意:39:Thankyou:30920:想你就爱你:440295:谢谢你爱过我:447735:时时刻刻想我:4456:速速回来:456:是我啦:460:想念你:4980:只有为你:48:是吧:4466:顺顺利利:505:SOS:507680:我一定要追你:510:我依你，我要你:51020:我依然爱你:51095:我要你嫁我:51396:我要睡觉了:51368:我一生顺发:514:无意思:515206:我已不爱你了:518420:我一辈子爱你:521:我爱你:520:我爱你:5201314:我爱你一生一世:5211314:我爱你一生一世:52094:我爱你到死:521:我愿意:52306:我爱上你了:5240:我爱是你:52460:我爱死你了:5260:我暗恋你:530:我想你:5366:我想聊聊:5376:我生气了:53719:我深情依旧:53770:我想亲亲你:53782:我心情不好:53880:我想抱抱你:53980:我想揍扁你:540086:我是你女朋友:5406:我是你的:5420:我只爱你:54335:无事想想我:543720:我是真心爱你:54430:我时时想你:5452830:无时无刻不想你:546:我输了:5460:我思念你:5490:我去找你:54920:我始终爱你:555:呜呜呜:55646:我无聊死了:5620:我很爱你:5360:我想念你:5630:我很想你:564335:无聊时想想我:570:我气你:57350:我只在乎你:57386:我去上班了:57410:我心属于你:574839:我其实不想走:5776:我出去了:58:晚安:580825:我怕你不爱我:584520:我发誓我爱你:586:我不来:587:我抱歉:5871:我不介意:592:我就爱:59240:我最爱是你:59420:我就是爱你:59520:我永远爱你:596:我走了:　　517230:我已经爱上你:5170:我要娶你:5209484:我爱你就是白痴:609:到永久:6120:懒得理你:6785753:老地方不见不散:6868:溜吧溜吧:687:对不起:666:溜溜溜:6699:顺顺利利:70345:请你相信我:706:起来吧:70626:请你留下来:7087:请你别走:70885:请你帮帮我:721:亲爱你:729:去喝酒:7319:天长地久:737420:今生今世爱你:73807:情深怕缘浅:740:气死你:7408695:其实你不了解我:74520:其实我爱你:74074:去死你去死:74839:其实不想走:756:亲我啦:765:去跳舞:770880:亲亲你抱抱你:7731:心心相印:7752:亲亲吾爱:77543:猜猜我是谁:77895:紧紧抱着我:786:吃饱了:7998:去走走吧:7086:七零八落:70345:请你相信我:780:牵挂你:706519184:请你让我依靠一辈子:7708801314520:亲亲你抱抱你一生一世我爱你:7758258:亲亲我吧爱我吧:8006:不理你了:8013:伴你一生:8074:把你气死:8084:BABY:81176:不要在一起了:82475:被爱是幸福:825:别爱我:837:别生气:8384:不三不四:85941:帮我告诉他:860:不留你:865:别惹我:8716:八格耶鲁:88:ByeBye:886:拜拜啦:82266:把爱爱顺了:8834760:漫漫相思只为你:898:分手吧:902535:求你爱我想我:9089:求你别走:910:就依你:918:加油吧:920:就爱你:9213:钟爱一生:9240:最爱是你:930:好想你:93110:好想见见你:940194:告诉你一件事:9494:就是就是:95:救我:987:对不起:9908875:求求你别抛弃我';
    var oneBox = one.split(':')
    //判断有没有该元素
    var isExist = oneBox.indexOf(res);
    //数字谐音解析功能
    if (isExist != -1 && res != '0') {
      res = oneBox[isExist + 1]
      wx.showToast({
        title: res,
        icon: 'success'
        // image:'../../images/t1.jpg'
      })
    }
  },
  //预处理数据
  dataPre: function (result) {

    //预处理
    result = result.replaceAll('×', '*');
    result = result.replaceAll('°', 'deg');
    result = result.replaceAll('÷', '/');
    result = result.replaceAll('π', 'pi');
    result = result.replaceAll('√', 'sqrt');
    //parser.evaluate('A = ' + ans)

    //求左括号出现次数
    var index = result.indexOf('('); // 字符首次出现的位置
    var count_left = 0; // 这个字符出现的次数
    while (index !== -1) {
      count_left++; // 每出现一次 次数加一
      index = result.indexOf('(', index + 1); // 从字符串出现的位置的下一位置开始继续查找
    }
    //求左括号出现次数
    var index = result.indexOf(')'); // 字符首次出现的位置
    var count_right = 0; // 这个字符出现的次数
    while (index !== -1) {
      count_right++; // 每出现一次 次数加一
      index = result.indexOf(')', index + 1); // 从字符串出现的位置的下一位置开始继续查找
    }
    //补填右括号
    for (var i = 0; i < (count_left - count_right); i++) {
      result = result + ')'
    }
    return result

  },
  changeFontSize: function (res) {
    var length = res.length,
      fontsize

    if (length < 14) {
      fontsize = 150
    } else if (length < 26) {
      fontsize = 120
    } else {
      fontsize = 100
    }
    this.setData({
      fontsize
    })

  },

  onLoad: function () {

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log('hasUpdate', res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })

  },
  onShareAppMessage: function () {
    return {
      title: '一起来玩超级计算器T3000叭~',
      path: '/pages/index/index',
      success: function (res) {
        console.log('成功进入分享==========', res);

      },
      fail: function (res) {
        console.log('进入分享失败==========', res);
      }
    }
  },

})