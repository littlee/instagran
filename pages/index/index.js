/* global wx getApp Page */

var HOST_NAME = 'https://www.littlee.xyz'

function isValidURL(url) {
  return /^https:\/\/(www.)?instagram.com\/p\//.test(url)
}

var app = getApp()
Page({
  data: {
    loading: false,
    url: '',
    v: '',
    userCount: '-',
    noti: '',
    saving: false
  },

  onLoad: function() {
    wx.request({
      url: HOST_NAME + '/info',
      method: 'GET',
      success: (res) => {
        this.setData({
          userCount: res.data.userCount,
          noti: res.data.noti
        })
      },
      fail: () => {
        wx.showToast({
          title: '请求失败'
        })
      }
    })
  },

  onShow: function() {
    wx.getClipboardData({
      success: (res) => {
        console.log(res.data)
        if (isValidURL(res.data)) {
          this.setData({
            v: res.data
          })

          wx.showToast({
            title: '成功粘贴剪切板的链接',
            icon: 'success'
          })
        }
      },

      fail: function() {
        wx.showModal({
          title: 'Oops',
          content: '不支持自动粘贴功能，请手动输入链接',
          showCancel: false
        })
      }
    })
  },

  _submit: function (e) {
    if (this.data.loading) {
      return
    }
    if (!e.detail.value.url || !isValidURL(e.detail.value.url)) {
      wx.showModal({
        title: 'Oops',
        content: '输入的链接不走心，请重新输入',
        showCancel: false
      })
      return
    }

    this.setData({
      loading: true
    })
    wx.request({
      url: HOST_NAME + '/api/getimg',
      data: {
        url: e.detail.value.url
      },
      method: 'POST',
      success: (res) => {
        this.setData({
          url: res.data.url,
          loading: false
        })
      },
      fail: () => {
        wx.showToast({
          title: '请求失败'
        })
      }
    })
  },

  _tap: function (e) {
    wx.previewImage({
      urls: [this.data.url]
    })
  },

  _imgLoad: function(e) {
    // console.log(e)
  },

  _saveImg: function() {
    this.setData({
      saving: true
    })
    wx.downloadFile({
      url: this.data.url,
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            wx.showToast({
              title: '保存成功',
            })
            this.setData({
              saving: false
            })
          }
        })
      },
      fail: () => {
        wx.showModal({
          showCancel: false,
          title: 'Oops',
          content: '下载图片失败',
        })
        this.setData({
          saving: false
        })
      }
    })
  },

  _clear: function () {
    this.setData({
      v: ''
    })
  },

  _help: function() {
    wx.navigateTo({
      url: '/pages/help/index',
    })
  },

  onShareAppMessage: function() {
    return {
      title: 'Instagran: download picture from Instagram',
      path: 'pages/index/index'
    }
  }
})
