// pages/userfollow/follow.js
var imageUtil = require('../../utils/util.js');
var app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imagefirstsrc: '/images/back.png',//图片链接 
      avatarUrl: '',
      menuitems: []
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      avatarUrl: options.avatarUrl
    })
    wx.getStorage({
      key: 'openid',
      success:res=> {
        var openid = res.data
        wx.request({
          url: 'http://45.32.65.148:81/Yqanalysis/UserKeywordsServlet',
          method: 'GET',
          data: {
            openId: openid
          },
          header: {
            'content-type': 'application/json'
          },
          success: res => {
            var keys = res.data.keywords
            this.setData({
              menuitems : keys.split(',')
            })
          }
        })
      },
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
  
  },
  imageLoad: function (e) {
      var imageSize = imageUtil.imageUtil(e)
      this.setData({
         imagewidth: imageSize.imageWidth,
         imageheight: imageSize.imageHeight
      })
   } 
})