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
console.log(math.evaluate('1kcal to J')+'')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'length',
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

    index: 0,
    index1:0,
    index2:0,
    array: ['米 m', '千米 km','分米 dm','厘米 cm','厘米 cm','毫米 mm','微米 um','纳米 nm','皮米 pm',
    '公里','里','丈','尺','寸','分','厘','毫',
    '海里 nmi','英里 mi','浪 fur','英寸 in', '英尺 ft', '码 yd', 
    '杆 rd', '链 ch', 'angstrom', '密耳mil','link (li)', 'angstrom'],
    array_length: ['米 m', '千米 km','分米 dm','厘米 cm','厘米 cm','毫米 mm','微米 um','纳米 nm','皮米 pm',
    '公里','里','丈','尺','寸','分','厘','毫',
    '海里 nmi','英里 mi','浪 fur','英寸 in', '英尺 ft', '码 yd', 
    '杆 rd', '链 ch', 'angstrom', '密耳mil','link (li)', 'angstrom'],
    array_energy: ['焦耳 J','千焦 kJ','卡 cal','千卡 kcal', 'erg', '瓦时 Wh', 'BTU', '电子伏特 eV'],
    array_pressure: ['帕斯卡 Pa', 'psi', '标压atm', 'torr', '巴 bar', '毫米汞柱mmHg', '毫米水柱mmH2O', '厘米水柱cmH2O'],
    array_temperature: ['kelvin (K)', 'celsius (degC)', 'fahrenheit (degF)', 'rankine (degR)'],
    array_mass: ['gram(g)', 'tonne', 'ton', 'grain (gr)', 'dram (dr)', 'ounce (oz)', 'poundmass (lbm, lb, lbs)', 'hundredweight (cwt)', 'stick', 'stone'],
    array_area: ['m2', 'sqin', 'sqft', 'sqyd', 'sqmi', 'sqrd', 'sqch', 'sqmil', 'acre', 'hectare'],
    array_volume: ['m3', 'litre (l, L, lt, liter)', 'cc', 'cuin', 'cuft', 'cuyd', 'teaspoon', 'tablespoon'],
    array_liquidVolume: ['minim (min)', 'fluiddram (fldr)', 'fluidounce (floz)', 'gill (gi)', 'cup (cp)', 'pint (pt)', 'quart (qt)', 'gallon (gal)', 'beerbarrel (bbl)', 'oilbarrel (obl)', 'hogshead', 'drop (gtt)'],
    array_angles: ['rad (radian)', 'deg (degree)', 'grad (gradian)', 'cycle', 'arcsec (arcsecond)', 'arcmin (arcminute)'],
    array_time: ['second (s, secs, seconds)', 'minute (mins, minutes)', 'hour (h, hr, hrs, hours)', 'day (days)', 'week (weeks)', 'month (months)', 'year (years)', 'decade (decades)', 'century (centuries)', 'millennium (millennia)'],
    array_jinzhi: ['二进制 BIN', '八进制 OCT', '十进制 DEC', '十六进制 HEX'],
  },
  clickBtn: function (e) {
    console.log(e)
    var btnValue = e.target.id;
    wx.showToast({
      title: btnValue,
    })
    switch (btnValue) {
      case 'length':
        this.setData({
          array:this.data.array_length
        });break;
      case 'time':
        this.setData({
          array:this.data.array_time
        });break;
      case 'mass':
        this.setData({
          array:this.data.array_mass
        });break;
      case 'volume':
        this.setData({
          array:this.data.array_volume
        });break;
      case 'temperature':
        this.setData({
          array:this.data.array_temperature
        });break;
      case 'presure':
        this.setData({
          array:this.data.array_pressure
        });break;
      case 'area':
        this.setData({
          array:this.data.array_area
        });break;
      case 'liquidVolume':
        this.setData({
          array:this.data.array_liquidVolume
        });break;
      case 'angles':
        this.setData({
          array:this.data.array_angles
        });break;
      case 'big':
        this.setData({
          array:this.data.array_length
        });break;
      case 'energy':
        this.setData({
          array:this.data.array_energy
        });break;
      case 'jinzhi':
        this.setData({
          array:this.data.array_jinzhi
        });break;
      case 'EM':
        this.setData({
          array:this.data.array_length
        });break;
      case 'velocity':
        this.setData({
          array:this.data.array_length
        });break;

    }
  },
  bindPickerChange1: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  bindPickerChange2: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
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