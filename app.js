//app.js
App({
  globalData:{
    userInfo:null
  },
  onLaunch: function() {
    wx.login({
      success: function (res) {
        wx.getUserInfo({
          success: function (res) {
            var info = res.userInfo
            console.log(JSON.stringify({
              nickName: info.nickName,
              avatarUrl: info.avatarUrl
            }))
          }
        })
      }
    })
  }
})