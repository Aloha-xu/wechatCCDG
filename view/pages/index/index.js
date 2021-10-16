const app = getApp()
import {
  formatTime,
  getYestaryToday
} from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverImage: null,
    isLogin: false,
    userInfo: null,
    dynamicList: null,
  },
  getImage() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          coverImage: tempFilePaths
        })
      }
    })
  },
  login() {
    wx.getUserProfile({
      desc: '用于获取会员资料',
      success: (res) => {
        let info = res.userInfo;
        console.log(info)
        wx.setStorage({
          key: "userinfo",
          data: info
        })
        this.setData({
          isLogin: true,
          coverImage: info.avatarUrl,
          userInfo: info
        })
      }
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取朋友圈全部动态
    wx.request({
      method: "GET",
      url: "http://127.0.0.1:7001/getArticleList",
      success: function (res) {
        that.setData({
          dynamicList: res.data.data
        })
      }
    })
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
    var that = this
    //获取朋友圈全部动态
    wx.request({
      method: "GET",
      url: "http://127.0.0.1:7001/getArticleList",
      success: function (res) {
        that.setData({
          dynamicList: res.data.data
        })
      }
    })
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