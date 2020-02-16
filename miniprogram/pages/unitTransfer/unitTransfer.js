// miniprogram/pages/unitTransfer/unitTransfer.js
var math = require('../util/math.min.js');
var Fraction = require('../util/fraction.js');
const parser = math.parser();
math.createUnit('nmi', '1.852km')
math.createUnit('fur', '220yd')
math.createUnit('gongli', '1km')
math.createUnit('lli', '500m')
math.createUnit('zhang', '3.333333333333m')
math.createUnit('chi', '0.1zhang')
math.createUnit('cun', '0.1chi')
math.createUnit('fen', '0.1cun')
math.createUnit('lii', '0.1fen')
math.createUnit('hao', '0.1lii')
math.createUnit('cal', '4.1858518208J')
math.createUnit('kcal', '4185.8518208J')
math.createUnit('degRe', '1.25degC')
math.createUnit('short', '1ton')
math.createUnit('longt', '1016.04691kg')
math.createUnit('ct', '0.2g')
math.createUnit('brcwt', '50.8023454kg') //英担
math.createUnit('gcwt', '100kg') //英担
math.createUnit('point', '0.002g') //分
math.createUnit('dan', '50kg') //担
math.createUnit('jin', '0.5kg') //斤
math.createUnit('liang', '0.05kg') //两
math.createUnit('qian', '5g') //担
math.createUnit('ha', '1hectare') //公顷
math.createUnit('are', '100m2') //公亩
math.createUnit('qing', '66666.666666666667m2') //顷
math.createUnit('mu', '0.01qing') //亩
math.createUnit('areaFen', '0.1mu') //分
math.createUnit('chi2', '0.11111111111111111111m2') //平方尺
math.createUnit('cun2', '0.01chi2') //平方寸


console.log(math.evaluate('1grad to rad') + '')
console.log(math.evaluate('1day to mins') + '')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    condition: '',
    res: '0',
    res1: '0',
    res2: '0',
    index: 0,
    index1: 0,
    index2: 0,
    showUnit1: 'm',
    showUnit2: 'm',
    isChooseUnit:false,
    isChoose: true,
    id: 'length',
    id_length: 'length',
    id_time: 'time',
    id_mass: 'mass',
    id_volume: 'volume',
    id_temperature: 'temperature',
    id_presure: 'presure',
    id_area: 'area',
    id_liquidVolume: 'liquidVolume',
    id_angles: 'angles',
    id_big: 'big',
    id_energy: 'energy',
    id_jinzhi: 'jinzhi',
    id_EM: 'EM',
    id_velocity: 'velocity',

    array: ['米 m', '千米 km', '分米 dm', '厘米 cm','毫米 mm', '微米 um', '纳米 nm', '皮米 pm',
      '公里 gongli', '里 lli', '丈 zhang', '尺 chi', '寸 cun', '分 fen', '厘 lii', '毫 hao',
      '海里 nmi', '英里 mi', '浪 fur', '英寸 in', '英尺 ft', '码 yd',
      '杆 rd', '链 ch', 'angstrom', '密耳mil', 'link', 'angstrom'
    ],
    array_length: ['米 m', '千米 km', '分米 dm', '厘米 cm', '毫米 mm', '微米 um', '纳米 nm', '皮米 pm',
      '公里 gongli', '里 lli', '丈 zhang', '尺 chi', '寸 cun', '分 fen', '厘 lii', '毫 hao',
      '海里 nmi', '英里 mi', '浪 fur', '英寸 in', '英尺 ft', '码 yd',
      '杆 rd', '链 ch','密耳 mil','link', 'angstrom'
    ],
    array_energy: ['焦耳 J', '千焦 kJ', '卡 cal', '千卡 kcal', 'erg', '瓦时 Wh', 'BTU', '电子伏特 eV'],
    array_pressure: ['帕斯卡 Pa', 'psi', '标压 atm', 'torr', '巴 bar', '毫米汞柱 mmHg', '毫米水柱 mmH2O', '厘米水柱 cmH2O'],
    array_temperature: ['开氏度 K', '摄氏度 °C', '华氏度 °F', '兰氏度 °R', '列氏度 °Re'],
    array_mass: ['千克 kg', '克 g', '毫克 mg', '微克 ug', '担 dan', '斤 jin', '两 liang', '钱 qian', '吨 t', '短吨 shortt', '长吨 longt', '格令 gr', '打兰 dr', '盎司 oz', '磅 lb', '美担 cwt', '英担 brcwt', '公担 gcwt', '分 point', '英石 stone', 'stick'],
    array_area: ['平方千米 km2', '平方米 m2', '平方分米 dm2', '平方厘米 cm2', '平方毫米 mm2', '顷 qing', '亩 mu', '分 areaF', '平方尺 chi2', '平方寸 cun2', '平方英寸 sqin', '平方英尺 sqft', ' 平方码 sqyd', '平方英里 sqmi', '平方竿 sqrd', 'sqch', 'sqmil', '英亩 acre', '公顷 ha'],
    array_volume: ['立方米 m3', '立方分米 dm3', '立方厘米 cm3', '立方毫米 mm3', '升 l', '毫升 ml', '微升 ul', '厘升 cl', '分升 dl', 'cc', '立方英寸 cuin', '立方英尺 cuft', '立方码 cuyd', 'teaspoon', 'tablespoon'],
    array_angles: ['弧度 rad', '角度 °', '百分度 grad', '圆周 cycle', '弧秒 arcsec', '弧分 arcmin'],
    array_time: ['纳秒 ns', '微秒 us', '毫秒 ms', '秒 s', '分 mins', '时 h', '天 day', '周 week', '月 month', '年 year', '十年 decade', '世纪 century'],
    array_jinzhi: ['二进制 BIN', '八进制 OCT', '十进制 DEC', '十六进制 HEX'],

    id0: '0',
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
    id_dot: '.'
  },
  //清除按钮
  clearBtn: function (e) {
    wx.vibrateShort({
      complete: (res) => {
      },
    })
    this.setData({
      res1: '0',
      res2: '0'
    })
  },
  //输入数字按钮
  inputBtn: function (e) {
    wx.vibrateShort({
      complete: (res) => {
      },
    })
    //获取当前按钮id值
    var btnValue = e.target.id
    //判断是输入到res1还是res2中，如果isChoose为true则输入到res1
    if (this.data.isChoose) {
      //获取当前res1的数据
      var res1 = this.data.res1
      //判断是否按下退格键
      if (btnValue == "del") {
        if (res1.length == 1) {
          res1 = '0'
        } else {
          res1 = res1.substr(0, res1.length - 1)
        }
      } else {
        //如果按下数字按钮
        if (res1 == '0' || this.data.condition=='choose') {
          res1 = btnValue
        } else {
          res1 = res1 + btnValue
        }
      }
      //按一次按钮做一次运算
      if (!isNaN(res1)) {
        var res = this.transfer(res1, this.data.showUnit1, this.data.showUnit2)
        this.setData({
          res2: res,
        })
      }
      this.setData({
        condition:'clicked',
        res1: res1
      })

    } else {
      //如果isChoose为false，则修改res2中的数据
      var res2 = this.data.res2
      if (btnValue == "del") {
        if (res2.length == 1) {
          res2 = '0'
        } else {
          res2 = res2.substr(0, res2.length - 1)
        }
      } else {
        if (res2 == '0' || this.data.condition=='choose') {
          res2 = btnValue
        } else {
          res2 = res2 + btnValue
        }
      }
      //处理完res2后再处理数据
      if (!isNaN(res2)) {
        var res = this.transfer(res2, this.data.showUnit2, this.data.showUnit1)
        this.setData({
          res1: res,
        })
      }
      this.setData({
        condition:'clicked',
        res2: res2
      })
    }

  },

  choose1: function (e) {
    this.setData({
      condition:'choose',
      isChoose: true
    })
  },
  choose2: function (e) {
    this.setData({
      condition:'choose',
      isChoose: false,
    })
  },

  //选择单位
  clickBtn: function (e) {
    wx.vibrateShort({
      complete: (res) => {
      },
    })
    var btnValue = e.target.id;
    this.setData({
      id: btnValue
    })
    wx.showToast({
      title: this.data.id,
    })
    switch (btnValue) {
      case 'length':
        this.initial(this.data.array_length)
        this.setData({
          array: this.data.array_length
        });
        break;
      case 'time':
        this.initial(this.data.array_time)
        this.setData({
          array: this.data.array_time
        });
        break;
      case 'mass':
        this.initial(this.data.array_mass)
        this.setData({
          array: this.data.array_mass
        });
        break;
      case 'volume':
        this.initial(this.data.array_volume)
        this.setData({
          array: this.data.array_volume
        });
        break;
      case 'temperature':
        this.initial(this.data.array_temperature)
        this.setData({
          array: this.data.array_temperature
        });
        break;
      case 'presure':
        this.initial(this.data.array_pressure)
        this.setData({
          array: this.data.array_pressure
        });
        break;
      case 'area':
        this.initial(this.data.array_area)
        this.setData({
          array: this.data.array_area
        });
        break;
      case 'liquidVolume':
        this.initial(this.data.array)
        this.setData({
          array: this.data.array
        });
        break;
      case 'angles':
        this.initial(this.data.array_angles)
        this.setData({
          array: this.data.array_angles
        });
        break;
      case 'big':
        this.initial(this.data.array_length)
        this.setData({
          array: this.data.array_length
        });
        break;
      case 'energy':
        this.initial(this.data.array_energy)
        this.setData({
          array: this.data.array_energy
        });
        break;
      case 'jinzhi':
        this.initial(this.data.array_jinzhi)
        this.setData({
          array: this.data.array_jinzhi
        });
        break;
      case 'EM':
        this.initial(this.data.array_length)
        this.setData({
          array: this.data.array_length
        });
        break;
      case 'velocity':
        this.initial(this.data.array_length)
        this.setData({
          array: this.data.array_length
        });
        break;

    }
  },
  bindPickerChange1: function (e) {
    
    var index = Number(e.detail.value)
    var id = this.data.id
    switch (id) {
      case 'length':
        this.setData({
          showUnit1: this.getUnit(this.data.array_length[index])
        });
        break;
      case 'time':
        this.setData({
          showUnit1: this.getUnit(this.data.array_time[index])
        });
        break;
      case 'mass':
        this.setData({
          showUnit1: this.getUnit(this.data.array_mass[index])
        });
        break;
      case 'volume':
        this.setData({
          showUnit1: this.getUnit(this.data.array_volume[index])
        });
        break;
      case 'temperature':
        this.setData({
          showUnit1: this.getUnit(this.data.array_temperature[index])
        });
        break;
      case 'presure':
        this.setData({
          showUnit1: this.getUnit(this.data.array_pressure[index])
        });
        break;
      case 'area':
        this.setData({
          showUnit1: this.getUnit(this.data.array_area[index])
        });
        break;
      case 'liquidVolume':
        this.setData({
          showUnit1: this.getUnit(this.data.array[index])
        });
        break;
      case 'angles':
        this.setData({
          showUnit1: this.getUnit(this.data.array_angles[index])
        });
        break;
      case 'big':
        this.setData({
          showUnit1: this.getUnit(this.data.array_length[index])
        });
        break;
      case 'energy':
        this.setData({
          showUnit1: this.getUnit(this.data.array_energy[index])
        });
        break;
      case 'jinzhi':
        this.setData({
          showUnit1: this.getUnit(this.data.array_jinzhi[index])
        });
        break;
      case 'EM':
        this.setData({
          showUnit1: this.getUnit(this.data.array_length[index])
        });
        break;
      case 'velocity':
        this.setData({
          showUnit1: this.getUnit(this.data.array_length[index])
        });
        break;

    }

    var res = this.transfer(this.data.res1, this.data.showUnit1, this.data.showUnit2)

    this.setData({
      index1: e.detail.value,
      res2: res
    })
  },
  bindPickerChange2: function (e) {
    console.log(e)
    console.log('picker2发送选择改变，携带值为', e.detail.value)
    var index = Number(e.detail.value)
    var id = this.data.id
    switch (id) {
      case 'length':
        this.setData({
          showUnit2: this.getUnit(this.data.array_length[index])
        });
        break;
      case 'time':
        this.setData({
          showUnit2: this.getUnit(this.data.array_time[index])
        });
        break;
      case 'mass':
        this.setData({
          showUnit2: this.getUnit(this.data.array_mass[index])
        });
        break;
      case 'volume':
        this.setData({
          showUnit2: this.getUnit(this.data.array_volume[index])
        });
        break;
      case 'temperature':
        this.setData({
          showUnit2: this.getUnit(this.data.array_temperature[index])
        });
        break;
      case 'presure':
        this.setData({
          showUnit2: this.getUnit(this.data.array_pressure[index])
        });
        break;
      case 'area':
        this.setData({
          showUnit2: this.getUnit(this.data.array_area[index])
        });
        break;
      case 'liquidVolume':
        this.setData({
          showUnit2: this.getUnit(this.data.array[index])
        });
        break;
      case 'angles':
        this.setData({
          showUnit2: this.getUnit(this.data.array_angles[index])
        });
        break;
      case 'big':
        this.setData({
          showUnit2: this.getUnit(this.data.array_length[index])
        });
        break;
      case 'energy':
        this.setData({
          showUnit2: this.getUnit(this.data.array_energy[index])
        });
        break;
      case 'jinzhi':
        this.setData({
          showUnit2: this.getUnit(this.data.array_jinzhi[index])
        });
        break;
      case 'EM':
        this.setData({
          showUnit2: this.getUnit(this.data.array_length[index])
        });
        break;
      case 'velocity':
        this.setData({
          showUnit2: this.getUnit(this.data.array_length[index])
        });
        break;

    }
    var res = this.transfer(this.data.res2, this.data.showUnit2, this.data.showUnit1)
    this.setData({
      index2: e.detail.value,
      res1: res
    })
  },
  transfer: function (num, u1, u2) {
    u1 = u1.replace('°','deg')
    u2 = u2.replace('°','deg')
    var str = num + u1 + ' to ' + u2
    var a = math.evaluate(str)
    var b = a.toNumber()
    var c = parseFloat(b)
    //console.log(math.format(b, {notation: 'fixed',precision: 6}))
   // console.log(c + '')
    return c + ''

  },
  initial: function (array) {
    this.setData({
      res: '0',
      res1: '0',
      res2: '0',
      index: 0,
      index1: 0,
      index2: 0,
      showUnit1: this.getUnit(array[0]),
      showUnit2: this.getUnit(array[0]),
    })
  },
  //得到单位函数
  getUnit: function (str) {
    var n = str.indexOf(" ")
    if (n == -1) {
      return str
    } else {
      var temp = str.split(" ")
      return temp[1]
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