import {
  getTime
} from '../../utils/util'
Page({
  data: {
    //地址
    location: null,
    //图片
    images: [],
    //文本
    content: '',
  },

  post() {
    let that = this;
    let userinfo;
    let time = getTime()
    try {
      userinfo = wx.getStorageSync('userinfo')
    } catch (e) {}
    let data = {}
    data.name = userinfo.nickName
    data.cover = userinfo.avatarUrl
    data.pic = that.data.images[0]
    data.content = that.data.content
    data.addTime = time
    wx.request({
      url: "http://127.0.0.1:7001/addArticle",
      method: 'post',
      data: data,
      success: function (res) {
        //清除数据
        that.setData({
          location: null,
          images: [],
          content: '',
        })
        //提示发布成功
        wx.showToast({
          title: '操作成功！', 
          icon: 'success',  
          duration: 1500  
        })
        //跳到主页
        wx.switchTab({
          url: '../index/index'
        })
      },
    })
  },
  chooseImage() {
    wx.chooseImage({
      count: 9, //默认9
      sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.images.length != 0) {
          this.setData({
            images: this.data.images.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            images: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.images,
      current: e.currentTarget.dataset.url
    });
  },
  getInputValue(e) {
    this.setData({
      content: e.detail.value
    })
  },
  chooseLocation() {
    let that = this
    wx.chooseLocation({
      success(res) {
        that.setData({
          location: res.name
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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