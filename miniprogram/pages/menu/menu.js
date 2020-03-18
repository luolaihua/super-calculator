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
        url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/ren.png?sign=d3d51b6cd80337305ecbaa681651ca1b&t=1583810614'
      },
      {
        name: '单位转换',
        url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/transfer.png?sign=1e1cd7308864eef93c7aca19794ccaee&t=1583810636'
      },
      /*  {
        name: '聊天室',
        url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/chat.png?sign=e997ce067a2b221c69f8df23c36ea74d&t=1583810662'
      }, */
      {
        name: '体测成绩计算',
        url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/tice.png?sign=4377add665517649836f45cdeb025d84&t=1583810682'
      },
      {
        name: 'BMI计算',
        url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/bmi_heart.png?sign=0ce03487b7fc0209cd34cc99a0d8eb73&t=1583810706'
      },
      {
        name: '色环电阻计算',
        url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/dianzu.png?sign=13107795a86da836e239ddcbb9eeb764&t=1583810720'
      },
      {
        name: '洋气网名生成',
        url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/tushe.png?sign=c1d696b5abf791809d1827df41b0041c&t=1583810736'
      }, 
      {
        name: '翻译机',
        url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/laugh.png?sign=c967f9a3732781aac35db6247aa5b126&t=1583833459'
      },{
        name: '智商提高',
        url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/zhishang.png?sign=93f2e91128fb2b9e9bb9b87de7472b2a&t=1583810771'
      },{
        name: '小偏心大转盘',
        url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/l.png?sign=b0771e17f0466b51de37266784bc51fc&t=1583810797'
      },{
        name: '数学闯关',
        url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/math.png?sign=1261d5d036cd39ca8d2314219e969249&t=1583851184'
      },/* {
        name: 'Robot',
        url: 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/robot2.png?sign=887fbe785832601321b5a29d9f48e26d&t=1583915103'
      } */

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
/*       case 2:
        wx.navigateTo({
          url: '../im/room/room',
        })
        break; */
      case 6:
        wx.navigateTo({
          url: '../beijinghua/beijinghua',
        })
        break;
      case 5:
        wx.navigateTo({
          url: '../nameMade/nameMade',
        })
        break;
      case 3:
        wx.navigateTo({
          url: '../bmi/bmi',
        })
        break;
      case 2:
        wx.navigateTo({
          url: '../bodyTest/bodyTest',
        })
        break;
        case 4:
          wx.navigateTo({
            url: '../resistance/resistance',
          })
          break;
        case 7:
          wx.navigateTo({
            url: '../iq/iq',
          })
          break;
          case 8:
            wx.navigateTo({
              url: '../bigWheel/bigWheel',
            })
            break;
            case 9:
              wx.navigateTo({
                url: '../iqGame/iqGame',
              })
              break;
  /*           case 10:
              wx.navigateTo({
                url: '../myRobot/myRobot',
              })
              break; */
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
    return {
       title: '一起来玩超级计算器T3000叭~',
       path: '/pages/menu/menu',
       success: function (res) {
          console.log('成功进入分享==========', res);

       },
       fail: function (res) {
          console.log('进入分享失败==========', res);
       }
    }
 },
})