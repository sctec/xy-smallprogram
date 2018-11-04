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
            if (angle > 14) {
                angle = 14;
            }
            else if (angle < -14) {
                angle = -14;
            }
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
            app.showErrorModal('账号及密码不能为空', '提醒');
            return false;
        }
        app.showLoadToast('正在登录ing');
        wx.request({
            method: 'POST',
            url: "https://xyapi.lzhu.top/api/v1/dologin",
            data: {
                username: _this.data.username,
                password: _this.data.password
            },
            success: function (res) {
                if (res.data.code == 1) {
                    console.log(res.data.data._id);
                  console.log(res.data.data.username);
                    wx.setStorageSync('userId', res.data.data._id);
                  wx.setStorageSync('userName', res.data.data.username);
                    app.globalData.userId = res.data.data._id
                    app.globalData.username = res.data.data.username
                    wx.switchTab({
                        url: '/pages/look/look',
                    })
                }
                console.log(res.data)
            },
            fail: function (res) {
                wx.hideToast();
                app.showErrorModal(res.errMsg, '登录失败');
            }
        });
    },
    usernameInput: function (e) {
        this.setData({
            username: e.detail.value
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
        }
    },
});