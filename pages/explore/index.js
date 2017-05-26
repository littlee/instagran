var HOST_NAME = 'https://www.littlee.xyz'
// var HOST_NAME = 'https://48156786.qcloud.la'

var app = getApp()
Page({
  onLoad: function() {
    
  },

  tt: function() {
    wx.saveImageToPhotosAlbum({
      filePath: 'https://www.littlee.xyz/static/1.png',
      success: () => {
        console.log('gg')
      },
      fail: (e) => {
        console.log('fail')
      }
    })
  }
})
