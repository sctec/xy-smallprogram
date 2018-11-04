//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.globalData.userId = wx.getStorageSync('userId')
    this.globalData.userName = wx.getStorageSync('userName')
    console.log(this.globalData.userId);
    console.log(this.globalData.userName)
    if (this.globalData.userId) {
      wx.switchTab({
        url: '/pages/look/look',
      })
    }
  },
  showErrorModal: function(content, title) {
    wx.showModal({
      title: title || '加载失败',
      content: content || '未知错误',
      showCancel: false
    });
  },
  showLoadToast: function(title, duration) {
    wx.showToast({
      title: title || '加载中',
      icon: 'loading',
      duration: duration || 10000
    });
  },
  globalData: {
    userId: null, //用户ID
    userName: null, //用户名
    successTitle: null, //最后一次创建成功标题
    successContent: null, //最后一次创建成功内容
    successTip: null, //最后一次创建成功提示信息
  }
})