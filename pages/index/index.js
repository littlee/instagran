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
      url: 'http://192.168.0.101/api/getimg',
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
