var app = getApp();

Page({
  data: {
  },
  //修改资料
  xiugaiziliao:function(){
    wx.navigateTo({
      url: '/pages/xiugaiziliao/xiugaiziliao',
    })
  },
  //退出登录
  wode_out:function(){
    wx.redirectTo({
      url: '/pages/login/login',
    });
    wx.clearStorageSync('userId');
    wx.clearStorageSync('userName');
    app.globalData.userId = null;
    app.globalData.username = null;
  },
  onLoad: function () {
    
  }
})