// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var maxData = event.maxData, collectionData = [], isExist = false
  var id=wxContext.OPENID
  maxData._id = id
  //获取集合列表，判断id是否存在，存在则更新数据，不存在则添加id和数据
  await db.collection('topList').get().then(res => {
    // res.data 包含该记录的数据
    collectionData = res.data
    console.log(res.data)
  })
  
  for (let index = 0; index < collectionData.length; index++) {
    if (collectionData[index]._id == id) {
      isExist = true
    }
  }

  if (!isExist) {
    db.collection('topList').add({
      data: maxData,
      success: function (res) {
        console.log(res)
      }
    })
  } else {
    db.collection('topList').doc(id).update({
      data: {
        maxNum:  maxData.maxNum,
        nickName:maxData.nickName,
        avatarUrl:maxData.avatarUrl
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  }
  //var result = 999
  /*   return {
     result: db.collection('test').get(),
      event,
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      unionid: wxContext.UNIONID,
    } */
}