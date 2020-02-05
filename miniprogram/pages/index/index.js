//index.js
var util = require('../index/mathStr.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    res:"0",//结果
    id1:"1",
    id2:'2',
    id3:'3',
    id4:"4",
    id5:'5',
    id6:'6',
    id7:"7",
    id8:'8',
    id9:'9',
    id_c:'clear',
    id_d:'del',
    id_love:'love',
    id_div:'÷',
    id_inverse:'',
    id_left:'(',
    id_right:')',
    id_two:'two',
    id_mult:'×',
    id_sub:'-',
    id_add:'+',
    id_equal:'equal',
    id0:'0',
    id00:'00',
    id_dot:'.',
    condition:'initial',
    justOne:false

  },
  sqrt:function(e){
    var res = this.data.res;
    if(!isNaN(res)){
      res = Number(res)
      this.setData({
        res:Math.sqrt(res)+'',
        condition:'equaled'
      })
    }
  },
  pow2:function(e){
    var res = this.data.res;
    if(!isNaN(res)){
      res = Number(res)
      this.setData({
        res:res*res+'',
        condition:'equaled'
      })
    }
  },
  loveBtn:function(e){
      wx.showToast({
        title: '老婆，我爱你',
        image:'../../images/t3.jpg'
      })
  },
  backBtn:function(e){
    var res = this.data.res;
    var condition = this.data.condition;
    if(condition != 'initial' ||res.length>1){
      this.setData({
        res:res.substr(0,res.length-1)
      })
    }
  },
  clearBtn:function(e){
    this.setData({
      res:'0',
      condition:'initial'
    })
  },
  clickBtn:function(e){
    var btnValue = e.target.id;
    var result = this.data.res;
    var condition = this.data.condition;
    
   // if(btnValue =='+'&&btnValue=='-'&&btnValue=='×'&&btnValue=='÷'&&btnValue=='.'

    switch(condition){
      case 'initial':
           result = btnValue;
           this.setData({
            res:result,
            condition:'clicked'});break;

      case 'clicked':
        //不能连续重复点击： +-*/. 判断最后一个字符是否+-*/. 如果是就删除
        var lastChar = result.charAt(result.length-1);
      
        if(btnValue =='+'||btnValue=='-'||btnValue=='×'||btnValue=='÷'||btnValue=='.'){
          
          if(lastChar =='+'||  lastChar=='-'||lastChar=='×'||lastChar=='÷'||lastChar=='.'){
            result = result.substr(0,result.length-1)
          }
        }


        result = result+btnValue;
       this.setData({
        res:result,
        condition:'clicked'
       });break;

       case 'equaled':
         if(isNaN(btnValue)){
          result = result+btnValue;
          this.setData({
           res:result,
           condition:'clicked'
          })
         }else{
          result = btnValue;
          this.setData({
           res:result,
           condition:'clicked'
         })
        };break;

    }

  

  },
  equal:function(e){
    var result = this.data.res;
    var condition = this.data.condition;
    var res = util.calcExpression(result);
    this.setData({
      res:res,
      condition:'equaled'
    })
  },
  
  onLoad: function () {
   
  },
})
