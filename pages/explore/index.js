var HOST_NAME = 'https://www.littlee.xyz'
// var HOST_NAME = 'https://48156786.qcloud.la'

var app = getApp()
Page({
  onLoad: function() {
    
  },

  tt: function() {
    wx.downloadFile({
      url: 'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/18812179_335530313528788_7142766952413396992_n.jpg',
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            console.log('gg')
          },
          fail: (e) => {
            console.log('fail')
          }
        })
      }
    })

    
  }
})
