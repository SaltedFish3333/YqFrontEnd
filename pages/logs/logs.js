//logs.js
const util = require('../../utils/util.js')
Page({
  data: {
    menuitems: [],
    userInfo : null
  },
  onLoad: function () {
    wx.getStorage({
      key: 'userInfo',
      success: res=> {
        this.setData({
          userInfo: res.data,
          menuitems: [
            { text: '我的关注', url: '/pages/userfollow/follow?avatarUrl='+res.data.avatarUrl, icon: '/images/userInfo.png' },
            //{ text: '帮助反馈', url: '/pages/help/help', icon: '/images/help.png' },
            //{ text: '联系客服', url: '', icon: '/images/connection.png' },
            //{ text: '关于我们', url: '/pages/about/about', icon: '/images/about.png' }
          ],
        })
      },
    })
  }
})
