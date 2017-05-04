// var HOST_NAME = 'https://www.littlee.xyz'
var HOST_NAME = 'https://48156786.qcloud.la'

var app = getApp()
Page({
  data: {
    loading: false,
    url: null,
    v: ''
  },

  onLoad: function() {
    wx.getClipboardData({
      success: (res) => {
        console.log(res.data)
        if (res.data.indexOf('https://instagram.com/p/') !== -1) {
          this.setData({
            v: res.data
          })
        }
      }
    })
  },

  _submit: function (e) {
    if (this.data.loading) {
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

  _clear: function () {
    this.setData({
      v: ''
    })
  },

  onShareAppMessage: function() {
    return {
      title: 'Instagran: download picture from Instagram',
      path: 'pages/index/index'
    }
  }
})
