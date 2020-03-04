// miniprogram/pages/beijinghua/beijinghua.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    index: 0,
    lang: '北京话',
    language: ['北京话', '猫语', '狗语', '猪语', '公鸡语', '母鸡语', '鸭语', '老鼠语', '青蛙语', '羊语', '牛语', '虎语', 'giao语'],
    content: '',
    input: '',
    name1: ['大', '小', '一', '二', '三', '四', '五', '六', '七', '八', '九',
      '十', '百', '千', '万', '钢', '铁', '锤', '巨', '无', '有', '不','真',
      '土', '没', '可', '最', '会', '亿', '两','吨','giao','条','桶','太',
      '上', '下', '左', '又', '右', '东', '南','西','北','红','黄','白',
      '绿', '青', '蓝', '子', '紫', '电', '雷','雨','火','钻','来','阿',
    ],
    name2: ['炮', '狗', '猪', '牛', '鸭', '瓜', '蛋', '火', '钢', '铁', '锤', '猫', '毛', '根',
      '波', 'giao', '红', '虎', '熊', '剩', '金', '木', '水', '火', '土', '银',
      '铜', '球', '鸟', '霸', '熊', '拽', '强','鬼','菊','鱼','羊','马',
      '狼', '龟', '鸟', '万', '千', '亿', '斤','两','吨','顿','条','桶',
      '蛇', '兔', '鼠', '棒', '龙', '鸡', '嘴','手','脚','拳','皮','头',
      '福', '贵', '吉', '祥', '意', '发', '财','钱','钞','炸','春','夏',
      '秋', '冬', '香', '臭', '花','草', '树', '坚','硬','雪','雨','枫','风','太',
      '上', '下', '左', '又', '右', '东', '南','西','北','红','黄','白',
      '绿', '青', '蓝', '子', '紫', '电', '雷','雨','火','钻','来','阿',
    ],

  },
  confirm: function (e) {
    var value = e.detail.value
    if (value == '') {
      wx.showToast({
        title: '请输入姓氏',
      })
    } else {

    }

    var num1 = Math.floor(Math.random() * (this.data.name1.length))
    var num2 = Math.floor(Math.random() * (this.data.name2.length))
    this.setData({
      name: value,
      content: value + this.data.name1[num1] + this.data.name2[num2]
    })
  },

  switchName: function (e) {
    if (this.data.content == '') {
      wx.showToast({
        title: '请输入姓氏',
        icon:'none'
      })
    } else {
      var num1 = Math.floor(Math.random() * (this.data.name1.length))
      var num2 = Math.floor(Math.random() * (this.data.name2.length))
      this.setData({

        content: this.data.name + this.data.name1[num1] + this.data.name2[num2]
      })
    }
  },
  chooseIt:function(e){
    var data = this.data.content
    wx.setStorage({
      key: 'myName',
      data: data,
      success (res) {
        wx.showToast({
          title: 'Hi '+data,
        })
      }
    })
  },
  cancelChoose:function(e){
    wx.setStorage({
      key: 'myName',
      data: '',
      success (res) {
        wx.showToast({
          title: '已取消',
        })
      }
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