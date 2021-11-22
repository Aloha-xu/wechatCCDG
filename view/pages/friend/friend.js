Page({
  data: {
    articleDetail: null,
    commentConent: '',
    isShowComment: null,
  },
  bindinputFun(e) {
    this.setData({
      commentConent: e.detail.value
    })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: [e.currentTarget.dataset.url],
      current: [e.currentTarget.dataset.url]
    });
  },
  getAstricleDetail() {
    var that = this
    //做一个点一下 触发下面方法
    wx.request({
      method: "GET",
      url: "http://127.0.0.1:7001/getArticleList",
      success: function (res) {
        let isShowComment = []
        for (let i = 0; i < res.data.data.length; i++) {
          isShowComment.push({
            isShow: false
          })
        }
        that.setData({
          articleDetail: res.data.data,
          isShowComment: isShowComment
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
  handleLikeFun(e) {
    let likeCount = this.data.articleDetail[e.currentTarget.dataset.index].likeCount
    let id = this.data.articleDetail[e.currentTarget.dataset.index].id
    let isLike = this.data.articleDetail[e.currentTarget.dataset.index].isLike
    if (isLike) {
      likeCount = likeCount + 1
    } else {
      likeCount = likeCount - 1
    }
    this.setData({
      [`articleDetail[${e.currentTarget.dataset.index}].likeCount`]: likeCount,
      [`articleDetail[${e.currentTarget.dataset.index}].isLike`]: !isLike
    })
    wx.request({
      url: "http://127.0.0.1:7001/addLikeCount",
      method: 'post',
      data: {
        likeCount: likeCount,
        id: id
      },
      success: function (res) {

      },
    })

  },
  handleCommentShow(e) {
    var isshow = null
    if (this.data.isShowComment[e.currentTarget.dataset.index].isShow) {
      isshow = false
    } else {
      isshow = true
    }
    this.setData({
      [`isShowComment[${e.currentTarget.dataset.index}].isShow`]: isshow
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