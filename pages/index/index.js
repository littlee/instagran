var HOST_NAME = 'https://www.littlee.xyz'

var app = getApp()
Page({
  data: {
    loading: false,
    url: null
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

  onShareAppMessage: function() {
    return {
      title: 'Instagran: download picture from Instagram',
      path: 'pages/index/index'
    }
  }
})
