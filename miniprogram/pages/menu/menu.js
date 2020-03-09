// miniprogram/pages/menu/menu.js
/* var re = /[\u4E00-\u9FA5]/g;
//g代表可多次匹配正则

var reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g;
var txt = '你好，this is a test? 123456789'
var re1 = /\d/g; // 数字
var re2 = /[a-zA-Z]/g; //字母
var re3 = /[\u4e00-\u9fa5]/g; //汉字
//字符
var reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g;
var len1 = 0,
  len2 = 0,
  len3 = 0,
  len4 = 0;
if (txt !== "") {
  if (txt.match(re1) != null) {
    len1 = (txt.match(re1)).length;
  }
  if (txt.match(re2) != null) {
    len2 = (txt.match(re2)).length;
  }
  if (txt.match(re3) != null) {
    len3 = (txt.match(re3)).length;
  }
  if (txt.match(reg) != null) {
    len4 = (txt.match(re3)).length;
  }
}
console.log(len1, len2, len3, len4)
 */

var result = parseInt(11111, 2).toString(8);

/* console.log((123&234).toString(2),'&&&')
console.log((123).toString(2))
console.log((234).toString(2))
console.log((89).toString(2))
console.log(123|234,' |')
console.log(123^234,' 异或')
console.log(~123,' 取反')
console.log((8>>1).toString(2),'++')

 */


Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: [{
        name: '亲戚计算',
        url: '../../images/ren.png'
      },
      {
        name: '单位装换',
        url: '../../images/transfer.png'
      }, {
        name: '聊天室',
        url: '../../images/chat.png'
      },
      {
        name: '体测成绩计算',
        url: '../../images/bbb.png'
      },
      {
        name: 'BMI',
        url: '../../images/h.png'
      },
      {
        name: '色环电阻',
        url: '../../images/dian.png'
      },
      {
        name: '洋气网名生成',
        url: '../../images/tushe.png'
      }, 
      {
        name: '翻译机',
        url: '../../images/laugh.png'
      },{
        name: '智商提高',
        url: '../../images/zhi.png'
      },{
        name: '小偏心大转盘',
        url: '../../images/l.png'
      }

    ]
  },
  navigateTo: function (e) {
    var id = Number(e.currentTarget.id)
    switch (id) {
      case 0:
        wx.navigateTo({
          url: '../relative/relative',
        })
        break;
      case 1:
        wx.navigateTo({
          url: '../unitTransfer/unitTransfer',
        })
        break;
      case 2:
        wx.navigateTo({
          url: '../im/room/room',
        })
        break;
      case 7:
        wx.navigateTo({
          url: '../beijinghua/beijinghua',
        })
        break;
      case 6:
        wx.navigateTo({
          url: '../nameMade/nameMade',
        })
        break;
      case 4:
        wx.navigateTo({
          url: '../bmi/bmi',
        })
        break;
      case 3:
        wx.navigateTo({
          url: '../bodyTest/bodyTest',
        })
        break;
        case 5:
          wx.navigateTo({
            url: '../resistance/resistance',
          })
          break;
        case 8:
          wx.navigateTo({
            url: '../iq/iq',
          })
          break;
          case 9:
            wx.navigateTo({
              url: '../bigWheel/bigWheel',
            })
            break;
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
    wx.getStorage({
      key: 'myName',
      success(res) {
        //console.log(res.data)
        if (res.data != '') {
          wx.showToast({
            title: '你好呀，' + res.data,
            icon: 'none'
          })
        }
      }
    })

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