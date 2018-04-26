// pages/userfollow/follow.js
var imageUtil = require('../../utils/util.js');
var app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imagefirstsrc: '/images/back.png',//图片链接 
      imagewidth: 0,//缩放后的宽 
      imageheight: 0,//缩放后的高 
      menuitems: [
        { text: '#习近平#', url: '' },
        { text: '#武汉大学#', url: '' },
        { text: '#中兴#', url: '' },
        { text: '#萨德#', url: '' },
        { text: '#习近平#', url: '' },
        { text: '#武汉大学#', url: '' },
        { text: '#中兴#', url: '' },
        { text: '#萨德#', url: '' },
        { text: '#习近平#', url: '' },
        { text: '#武汉大学#', url: '' },
        { text: '#中兴#', url: '' },
        { text: '#萨德#', url: '' },
      ]
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
  
  },
  imageLoad: function (e) {
      var imageSize = imageUtil.imageUtil(e)
      this.setData({
         imagewidth: imageSize.imageWidth,
         imageheight: imageSize.imageHeight
      })
   } 
})