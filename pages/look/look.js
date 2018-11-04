var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    tabIndex: 0,
    protocols: [],
    floaters: {},
    userInfo: {},
    toView: 'red',
    scrollTop: 100
  },
  //下拉更新
  onPullDownRefresh: function() {
    this.requestProtocolList();
    this.requestFloaterList();
    wx.stopPullDownRefresh();
  },
  //获取协议列表
  requestProtocolList: function() {
    var that = this;
    wx.request({
      method: 'GET',
      url: "https://xyapi.lzhu.top/api/v1/protocolList/100/1",
      success: function(res) {
        if (res.data.code == 1) {
          that.setData({
            protocols: res.data.data,
          })
        }
      },
      fail: function(res) {
        wx.hideToast();
        app.showErrorModal(res.errMsg, '获取失败');
      }
    });
  },
  //获取随机漂流瓶
  requestFloaterList: function() {
    var that = this;
    wx.request({
      method: 'GET',
      url: "https://xyapi.lzhu.top/api/v1/getRandomFloater",
      success: function(res) {
        if (res.data.code == 1) {
          that.setData({
            floaters: res.data.data,
          })
        }
      },
      fail: function(res) {
        wx.hideToast();
        app.showErrorModal(res.errMsg, '获取失败');
      }
    });
  },
  // tab menu 切换
  changeTab: function(e) {
    var id = e.currentTarget.id;
    var that = this;

    if (id == 'protocol') {
      this.setData({
        tabIndex: 0
      });
      this.requestProtocolList();
    }

    if (id == 'floater') {
      this.setData({
        tabIndex: 1
      });
      this.requestFloaterList();
    }
  },
  //漂流瓶签署
  bindsign: function(e) {
    var _this = this;
    wx.request({
      url: 'https://xyapi.lzhu.top/api/v1/signFloater',
      method: "POST",
      data: {
        id: _this.data.floaters._id,
        username: app.globalData.userName
      },
      success: function(res) {
        if (res.data.code == 1) {
          wx.showToast({
            title: '签署成功',
            icon: 'success',
            duration: 2000
          })
        } else if (res.data.code == 0) {
          wx.hideToast();
          app.showErrorModal(res.errMsg, res.data.message);
        }
      },
      fail: function(res) {
        wx.hideToast();
        app.showErrorModal(res.errMsg, '签署失败');
      }
    })
  },
  //获取协议详情
  getDetail: function(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id,
    });
  },
  onShow: function() {
    var that = this;
    this.requestProtocolList();
    this.requestFloaterList();
  },

  // 初始化设置
  onLoad: function() {
    var that = this;
    wx.request({
      method: 'GET',
      url: "https://xyapi.lzhu.top/api/v1/protocolList/100/1",
      success: function(res) {
        if (res.data.code == 1) {
          that.setData({
            protocols: res.data.data,
          })
        }
      },
      fail: function(res) {
        wx.hideToast();
        app.showErrorModal(res.errMsg, '获取失败');
      }
    });
  }
});