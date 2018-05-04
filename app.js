//app.js 
// 主色调：#315BA7
App({
  onLaunch: function () {
    // 展示本地存储能力
    var appid = 'wx768193c00f3c795f'
    var appsecret = 'e00512a9876b33812d02ee7399a33db2'
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.authorize({
      scope: 'scope.userInfo',
      success: res =>{
        wx.getUserInfo({         
          success: res =>{
            this.globalData.userInfo = res.userInfo
            wx.setStorageSync('userInfo', res.userInfo)
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
          }
        })
      }
    })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           console.log(this.glaobalData.userInfo)
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
    // 登录
    wx.login({
      success: res => {
        var that = this
        if (res.code) {
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?' +
            'appid=' + appid +
            '&secret=' + appsecret +
            '&js_code=' + res.code +
            '&grant_type=authorization_code',
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: res => {
              var openid = res.data.openid
              wx.setStorage({
                key: 'openid',
                data: openid,
              })
              that.globalData.openid = openid
              wx.request({
                url: 'http://45.32.65.148:81/Yqanalysis/LoginServlet',
                method: 'GET',
                data: {
                  openId: openid
                },
                header: {
                  'content-type': 'application/json'
                },
                success: e => {
                  console.log(e.data)
                }
              })
            }
          })
        }
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // wx.getSystemInfo({
    //   success: res=>{
    //     this.globalData.windowHeight = res.windowHeight
    //     this.globalData.widowWidth = res.windowWidth
    //   },
    // })
  },
  globalData: {
    userInfo: null,
    openid: null
    // windowWidth:null,
    // windowHeight:null
  }
})