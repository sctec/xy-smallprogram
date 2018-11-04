// pages/detail/detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    content: "",
    time: "",
    signatory: [],
    protocol_comments: "",
    protocol_praise: "",
    praise:true
  },
  //改变点赞的转态
  changestar:function(){
    this.setData({
      praise:!this.data.praise
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log(options.id);
    wx.request({
      url: 'https://xyapi.lzhu.top/api/v1/viewProtocol?id=' + options.id,
      method: "GET",
      success: function(res) {
        if (res.data.code == 1) {
          that.setData({
            title: res.data.data.title,
            content: res.data.data.title,
            time: res.data.data.created_at,
            protocol_comments: res.data.data.protocol_comments.length,
            protocol_praise: res.data.data.protocol_praise.length,
            signatory: res.data.data.signatory,
          })
        } else if (res.data.code == 0) {
          app.showErrorModal(res.errMsg, res.data.message);
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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