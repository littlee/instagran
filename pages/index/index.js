var HOST_NAME = 'http://139.199.78.119'

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
      }
    })
  },

  _tap: function (e) {
    wx.previewImage({
      urls: [this.data.url]
    })
  }
})
