// miniprogram/pages/imageEdit/imageEdit.js
const imgUrl = require('../util/imgUrl')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempPath:'',
    addImage:imgUrl.addImage,
    isSuccess:false

  },
  chooseImage:function(e){
    var tempPath ,that = this
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res){
        console.log(res)
        tempPath=res.tempFilePaths[0]
        wx.getImageInfo({
          src: tempPath,
          success: (result)=>{
            console.log(result)
            wx.getFileSystemManager().readFile({
              filePath: tempPath, //选择图片返回的相对路径
              encoding: 'base64', //编码格式
              success: res => { //成功的回调
                wx.cloud.callFunction({
                  name:'databaseTest',
                  data:{
                    //path: 'pictures/' + util.vcode(new Date())+index+'.png',
                    requestType:'airCropImage',
                    file: res.data
                  },
                  success(_res){    
                    console.log(_res)
                  },fail(_res){
                    console.log(_res)
                  }
                })
              }
            })
          },
          fail: ()=>{},
          complete: ()=>{}
        });
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
 
  },
   /**
   * 由于此数据仅在逻辑层使用，因此定义一个tempData 进行存储
   */
  tempData:{
    path:null,
  },
  onClick() {
    var that = this
    /**
     * 选择文件
     */
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: res => {
        wx.showLoading({
          title: "智能裁剪中",
          mask: true,
        });
        /**
         * 获取文件路径，并传递给 tempData
         */
        let file = res.tempFiles[0].path
        this.tempData.path = file
        console.log("[info]:开始上传文件")
        /**
         * 上传文件到云存储
         */
        wx.cloud.uploadFile({
          filePath: file,
          cloudPath: "test1.jpg"
        }).then(res => {
          /**
           * 调用云函数
           */
          console.log("[info]:开始调用云端裁剪")
          wx.cloud.callFunction({
            name: "databaseTest",
            data: {
              requestType:'airCropImage',
              file: res.fileID
            }
          }).then(res => {
            wx.hideLoading();
            /**
             * 调用裁剪
             */
            console.log("[info]:云端裁剪成功 ", res)
            console.log(res.result)
            this.crop(res.result);
            this.setData({
              isSuccess:true
            })
          }).catch(err => {
            console.error("[error]:函数调用错误", err)
          })
        }).catch(err => {
          console.error("[error]:文件上传错误", err)
        })
      },
      fail: err => {
        console.error("[error]:文件选择错误", err)
      }
    })
  },
  crop(cropOps) {
    /**
     * 获取 Context
     */
    let ctx = wx.createCanvasContext('aiCrop', this);
    /**
     * 判断是否成功裁剪
     */
    if (cropOps.results.length == 0) {
      return
    }
    /**
     * 计算裁剪的值
     */
    let crop = cropOps.results[0];
    let width = crop.cropRight - crop.cropLeft
    let height = crop.cropBottom - crop.cropTop
    /**
     * 绘制图像
     */
    ctx.drawImage(this.tempData.path, crop.cropLeft, crop.cropTop, width, height, 0, 0, 300, 300);
    ctx.draw()
/* setTimeout(res=>{
   this.save()
},1000) */
   
  },
    //保存到手机相册
    save: function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 300, //导出图片的宽
        height: 300, //导出图片的高
        destWidth: 300 * 750 / wx.getSystemInfoSync().windowWidth, //绘制canvas的时候用的是px， 这里换算成rpx ，导出后非常清晰
        destHeight: 300 * 750 / wx.getSystemInfoSync().windowWidth, //同上 px 换算成 rpx
        canvasId: 'aiCrop',
        success: function (res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
          })
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail: function (res) {
          wx.showToast({
            title: '系统繁忙，请重试',
            icon: 'success',
            duration: 2000
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