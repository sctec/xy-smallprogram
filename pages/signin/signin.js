//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    help_status: false,
    username_focus: false,
    password_focus: false,
    username: '',
    password: '',
    phone:'',
    angle: 0
  },
  onReady: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 600);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },
  bind: function () {
    var _this = this;
    if (!_this.data.username || !_this.data.password) {
      app.showErrorModal('账号,手机号及密码不能为空', '提醒');
      return false;
    }
    app.showLoadToast('注册中，欢迎使用');
    wx.request({
      method: 'POST',
      url: "https://xyapi.lzhu.top/api/v1/doregister",
      data: {
        username: _this.data.username,
        phone:_this.data.phone,
        password: _this.data.password
      },
      success: function (res) {
        if (res.data.code == 1) {
          wx.setStorageSync('userId', res.data.data.id);
          wx.setStorageSync('userName', res.data.data.username);
          app.globalData.userId = res.data.data.id;
          app.globalData.username = res.data.data.username;
          wx.switchTab({
            url: '/pages/look/look',
          })
        } else if(res.data.code==0) {
          wx.hideToast();
          app.showErrorModal(res.errMsg, res.data.message);
        }
        console.log(res.data)
      },
      fail: function (res) {
        wx.hideToast();
        app.showErrorModal(res.errMsg, '注册失败');
      }
    });
  },
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    });
  },
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    });
  },
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  inputFocus: function (e) {
    if (e.target.id == 'username') {
      this.setData({
        'username_focus': true
      });
    } else if (e.target.id == 'password') {
      this.setData({
        'password_focus': true
      });
    } else if (e.target.id == 'phone') {
      this.setData({
        'phone_focus': true
      });
    }
  },
  inputBlur: function (e) {
    if (e.target.id == 'username') {
      this.setData({
        'username_focus': false
      });
    } else if (e.target.id == 'password') {
      this.setData({
        'password_focus': false
      });
    } else if (e.target.id == 'phone') {
      this.setData({
        'phone_focus': false
      });
    }
  },
});