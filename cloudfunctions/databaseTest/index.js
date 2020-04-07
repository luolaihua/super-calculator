// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
  throwOnNotFound: false
})
const db = cloud.database()
const MAX_LIMIT = 2
// 云函数入口函数
exports.main = async (event, context) => {



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

   const fileID = 'cloud://luo-r5nle.6c75-luo-r5nle-1301210100/animalsPic/cangshu.png'
    const res = await cloud.downloadFile({
      fileID: fileID,
    })
    //const buffer = res.fileContent

    var buffer = new Buffer(event.file, 'base64')
    try {
      var result = await cloud.openapi.security.imgSecCheck({
        media: {
          contentType:"image/png",
          value: buffer
        }
      })
      return result
    } catch (err) {
      return err
    } 
}