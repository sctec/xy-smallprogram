var app = getApp();
Page({
  data: {
    title: "",
    content: "",
    tip: ""
  },
  bindClose: function() {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function(res) {
        app.globalData.successTitle = "",
        app.globalData.successContent = ""
        app.globalData.successTip = ""
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  onLoad: function(options) {
    this.setData({
      title: app.globalData.successTitle,
      content: app.globalData.successContent,
      tip: app.globalData.successTip
    })
    // console.log(options.query)
  }
});