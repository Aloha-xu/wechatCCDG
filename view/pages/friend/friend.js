// pages/friend/friend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isChecked: false,
    articleDetail: null,
    commentConent: '',
  },
  changeRadio() {
    this.setData({
      isChecked: !this.data.isChecked
    })
  },
  bindinputFun(e) {
    this.setData({
      commentConent: e.detail.value
    })
  },
  getAstricleDetail() {
    var that = this
    //做一个点一下 触发下面方法
    wx.request({
      method: "GET",
      url: "http://127.0.0.1:7001/getArticleList",
      success: function (res) {
        that.setData({
          articleDetail: res.data.data
        })
      }
    })
  },
  submit(e) {
    let that = this
    try {
      var value = wx.getStorageSync('userinfo')
    } catch (e) {}
    let comment = {}
    comment.name = value.nickName
    comment.content = that.data.commentConent
    comment.id = e.target.dataset.id
    wx.request({
      url: "http://127.0.0.1:7001/addComment",
      method: 'post',
      data: comment,
      success: function (res) {
        that.getAstricleDetail()
      },
    })
    that.setData({
      commentConent: ""
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAstricleDetail()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})