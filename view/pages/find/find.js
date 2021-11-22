// pages/find/find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dynamicCount:0,
    likeCount:0,
    commentCount:0
  },

  getData(){
    let that = this;
    let likecount = 0
    let commentcount = 0
    wx.request({
      url: "http://127.0.0.1:7001/getArticleList",
      method: 'get',
      success: function (res) {
        let data = res.data.data
        for (let i = 0; i < data.length; i++) {
          likecount = likecount + data[i].likeCount
          commentcount = data[i].comment.length + commentcount
        }
        that.setData({
          dynamicCount:data.length,
          likeCount:likecount,
          commentCount:commentcount
        })
      },
    })

  },
  toShare(){
    wx.switchTab({
      url: '../share/share'
    })
  },
  toDynamic(){
    wx.switchTab({
      url: '../friend/friend'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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
    this.getData()
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