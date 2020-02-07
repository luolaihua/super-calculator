// pages/welcome/welcome.js
//获取实例
var app = getApp();
//引用js
var relationship = require("../util/relationship.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    second_height: 0, //第二部分的高度
    screenData: "我",
    result: "",
    id_h: "丈夫",
    id_w: "妻子",
    id_back: "back",
    id_clear: "clear",
    id_f: "爸爸",
    id_m: "妈妈",
    id_bb: "哥哥",
    id_sb: "弟弟",
    id_bs: "姐姐",
    id_ss: "妹妹",
    id_son: "儿子",
    id_d: "女儿",
    id_inverse: "inverse",
    id_equal: "=",
    id_love: "love",
    id_chain: 'chain',
    id_sex: 'sex',
    isTrue: false,
    sex: 1,
    sex_text: '♂'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 点击开关男|女
   */
  loveBtn:function(e){
    wx.showToast({
      title: '老婆我爱你',
    })
  },
  changeSex: function (e) {
    //console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    //通过判断true or false
    if (this.data.sex == 1) { //true时为女
      //设置数据为选中
      this.setData({
        sex: 0,
        sex_text: '♀'
      })
      wx.showToast({
        title: '我是朱永慧',
      })
    } else {
      //设置数据为选中
      this.setData({
        sex: 1,
        sex_text: '♂'
      })
      wx.showToast({
        title: '我是罗来华',
      })
    }

  },


  /**
   * 点击按钮事件
   */
  clickButton: function (event) {
    //console.log(event);
    //获取屏幕内容
    var data = this.data.screenData.toString();
    //console.log(data);
    //获取屏幕结果内容
    var dataResult = this.data.result.toString();
    //获取点击的id
    var id = event.target.id;
/*
    switch (id) {
      //退格功能实现
      case this.data.id_back:
        //如果屏幕只有 "我" 则不处理
        if (data == "我") {
          break;
        } else {
          data = data.substring(0, data.length - 3);
          //需要重新计算关系
          var result = relationship({
            text: data,
            sex: this.data.sex,
            reverse: false,
            type: 'default'
          });
          dataResult = result;
        }
        break;
        //清除功能实现
      case this.data.id_clear:
        data = "我";
        dataResult = "";
        break;
      case this.data.id_back:
        break;
      case this.data.id_back:
        break;
    }
*/

    //退格功能实现
    if (id == this.data.id_back) { //如果是X 后退则清除两个字符
      //如果屏幕只有 "我" 则不处理
      if (data == "我") {
        return;
      } else {
        data = data.substring(0, data.length - 3);
        //需要重新计算关系
        var result = relationship({
          text: data,
          sex: this.data.sex,
          reverse: false,
          type: 'default'
        });
        dataResult = result;
      }
      //   console.log(data);
    } else if (id == this.data.id_clear) {
      //AC操作 清空屏幕
      data = "我";
      dataResult = "";
    } else {



      //点击其他操作
      //var data = data.substring(0, data.length);

      var result = relationship({
        text: data,
        sex: this.data.sex,
        reverse: false,
        type: 'default'
      });
      console.log(result);

      //点击等于按钮
      if (id == this.data.id_equal) {

        //点击 = 处理
        //如果字数大于22个则不要增加and提示关系态复杂啦
        if (data.length >= 22) {
          //console.log("字数超出限制");
          dataResult = "关系有点远，年长就叫老祖宗吧~";
          return;
        }
        //计算公式，核心算法
        //修改屏幕结果为result
        dataResult = result;
      } else if (id == this.data.id_inverse) { //互查操作  Ta称呼我
        //如果字数大于22个则不要增加and提示关系态复杂啦
        if (data.length >= 22) {
          //console.log("字数超出限制");
          dataResult = "关系有点远，年长就叫老祖宗吧~";
          return;
        }
        //this.data.isTrue
        if (this.data.isTrue) { //一开始为false
          result = relationship({
            text: data,
            sex: this.data.sex,
            reverse: false,
            type: 'default'
          });
          //设置数据
          this.setData({
            isTrue: false
          })
        } else {
          result = relationship({
            text: data,
            sex: this.data.sex,
            reverse: true,
            type: 'default'
          });
          //设置数据
          this.setData({
            isTrue: true
          })
        }


        //修改屏幕结果为result
        dataResult = result;
      } else {
        //如果字数大于22个则不要增加and提示关系态复杂啦
        if (data.length >= 22) {
          //console.log("字数超出限制");
          dataResult = "关系有点远，年长就叫老祖宗~\n同龄人就叫帅哥美女吧";
        } else {

          //同性关系处理 当为男性时，一开始点击夫不做处理
          if ((this.data.sex == 1 && id == this.data.id1 && data == '我') || (this.data.sex == 0 && id == this.data.id2 && data == '我')) {

          } else {
            data = data + "的" + id;
            //需要重新计算关系
            result = relationship({
              text: data,
              sex: this.data.sex,
              reverse: false,
              type: 'default'
            });
            if (this.isNull(result)) { //结果为空
              result = "哎呀，关系太复杂了啊，我算不出来";
            }

            dataResult = result;
          }

        }
      }



    }
    //设置数据
    if(data =='我的妻子'&&this.data.sex!=0){
      dataResult = '朱永慧'
    }
    if(data =='我的丈夫'&&this.data.sex!=1){
      dataResult = '罗来华'
    }
    this.setData({
      screenData: data,
      result: dataResult
    })
  },
  //判断结果是否为空，若是则输出关系太复杂了
  isNull: function (result) {
    if (result.length == 0) {
      return true;
    }
    return false;
  }

})