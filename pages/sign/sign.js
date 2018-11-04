// pages/sign/sign.js
var app = getApp();
Page({
  data: {
    tabIndex: 0,
    title_focus: false,
    content_focus: false,
    pick_array: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    pick_index: 0,
    title: "",
    content: "",
    share: 1,
    signatoryNum: 2,
    region: "太原理工大学"
  },
  // tab menu 切换
  changeTab: function(e) {
    var id = e.currentTarget.id;
    var that = this;

    if (id == 'sendprotocol') {
      this.setData({
        tabIndex: 0,
      });
      app.globalData.successTip = "发送给你的好友，邀请他到协易签署协议！";
    }

    if (id == 'sendfloater') {
      this.setData({
        tabIndex: 1,
      });
      app.globalData.successTip = "漂流瓶已生效，等待有缘人来捞它吧~";
    }
  },
  //聚焦
  inputFocus: function(e) {
    if (e.target.id == 'title') {
      this.setData({
        'title_focus': true
      });
    } else if (e.target.id == 'content') {
      this.setData({
        'content_focus': true
      });
    }
  },
  inputBlur: function(e) {
    if (e.target.id == 'title') {
      this.setData({
        'title_focus': false
      });
    } else if (e.target.id == 'content') {
      this.setData({
        'content_focus': false
      });
    }
  },
  //获取协议标题title
  titleInput: function(e) {
    this.setData({
      'title': e.detail.value
    });
  },
  //获取协议内容
  contentInput: function(e) {
    this.setData({
      'content': e.detail.value
    });
  },
  //获取是否分享开关的值
  switchChange: function(e) {
    if (this.data.share) {
      this.setData({
        'share': 0
      });
    } else {
      this.setData({
        'share': 0
      });
    }
    this.setData({
      'share': this.data.share
    });
  },
  //获取签署人数
  bindPickerChange: function(e) {
    this.setData({
      pick_index: e.detail.value
    })
  },
  //发出协议。请求服务
  bindsign: function(e) {
    var _this = this;
    if (!_this.data.title || !_this.data.content) {
      app.showErrorModal('标题或内容还未填写哦', '提醒');
      return false;
    }
    app.showLoadToast('协议生成中');
    wx.request({
      method: 'POST',
      url: "https://xyapi.lzhu.top/api/v1/doProtocol",
      data: {
        title: _this.data.title,
        content: _this.data.content,
        share: _this.data.share,
        signatoryNum: _this.data.signatoryNum,
        username: app.globalData.userName
      },
      success: function(res) {

        if (res.data.code == 1) {
          app.globalData.successTitle = _this.data.title,
            app.globalData.successContent = _this.data.content,
            wx.showToast({
              title: '生成协议成功',
              icon: 'success',
              duration: 2000
            });
            console.log("qw");
          wx.navigateTo({
            url: '/pages/success/success',
          });
          console.log("wiio");
        } else if (res.data.code == 0) {
          wx.hideToast();
          app.showErrorModal(res.errMsg, res.data.message);
        }
      },
      fail: function(res) {
        wx.hideToast();
        app.showErrorModal(res.errMsg, '生成协议失败');
      }
    });
  },
  //扔出漂流瓶。请求服务
  bindsignfloater: function(e) {
    var _this = this;
    if (!_this.data.title || !_this.data.content) {
      app.showErrorModal('标题或内容还未填写哦', '提醒');
      return false;
    };
    app.showLoadToast('正在扔出去');
    wx.request({
      method: 'POST',
      url: "https://xyapi.lzhu.top/api/v1/makefloater",
      data: {
        title: _this.data.title,
        content: _this.data.content,
        username: app.globalData.userName
      },
      success: function(res) {

        if (res.data.code == 1) {
          app.globalData.successTitle = _this.data.title,
            app.globalData.successContent = _this.data.content,
            wx.showToast({
              title: '漂流瓶生成成功',
              icon: 'success',
              duration: 2000
            });
          wx.navigateTo({
            url: '/pages/success/success',
          });
        } else if (res.data.code == 0) {
          wx.hideToast();
          app.showErrorModal(res.errMsg, res.data.message);
        }
      },
      fail: function(res) {
        wx.hideToast();
        app.showErrorModal(res.errMsg, '漂流瓶生成失败');
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      title:"",
      content:""
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})