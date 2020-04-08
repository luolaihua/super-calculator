// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
  throwOnNotFound: false
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {

var data
 await db.collection('topList').orderBy('maxNum', 'desc').get().then(res => {
    // res.data 包含该记录的数据
    console.log(res.data)
     data =res.data
  })
return data

//文本内容安全检测
  /*   try {
      let result = await cloud.openapi.security.msgSecCheck({
        content: '么么么哒'
      })
      console.log(result)
      if (result.errCode == 0) {
        return true;
      }
      return false
    } catch (err) {
      return false;
    } */
//图像内容安全检测
/*   const fileID = 'cloud://luo-r5nle.6c75-luo-r5nle-1301210100/animalsPic/cangshu.png'
  const res = await cloud.downloadFile({
    fileID: fileID,
  })
  //const buffer = res.fileContent

  var buffer = new Buffer(event.file, 'base64')
  try {
    var result = await cloud.openapi.security.imgSecCheck({
      media: {
        contentType: "image/png",
        value: buffer
      }
    })
    return {
      result,
      test: "66666666"
    }
  } catch (err) {
    return err
  } */


}