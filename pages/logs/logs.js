//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    menuitems: [
      { text: '我的关注', url: '/pages/userfollow/follow', icon: '/images/userInfo.png' },
      { text: '帮助反馈', url: '', icon: '/images/help.png'},
      { text: '联系客服', url: '', icon: '/images/connection.png' },
      { text: '关于我们', url: '', icon: '/images/about.png' }
    ]
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
