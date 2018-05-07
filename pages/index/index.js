//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imageUrl: "images/icon.jpg",
    navbar: ['微博', '豆瓣', '知乎', '头条'],
    currentTab: 0,
    search: '',
    weibo:[],
    douban:[],
    toutiao:[]
  },
  searchInput: function (e) {
    this.setData({
      search: e.detail.value
    })
  },
  searchSubmit: function (e) {
   // console.log("点击了回车");
     console.log(e);
     app.keywords = e.detail.value;
     wx.navigateTo({
       url: '../analysis/analysis?keyword='+e.detail.value
     })
  },

   onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
      wx.request({
        url: 'https://yujianweb.com/Yqanalysis/LoadInfoServlet',
        success: res=>{
          console.log(res);
          var wbkwdStr = res.data.wbkwdStr;

          wbkwdStr=wbkwdStr.replace('\n','');
          var array = wbkwdStr.split(',')
          this.setData({
            weibo: array,
            douban: res.data.dbkwdStr.split(','),
            toutiao: res.data.ttkwdStr.split(',')
          })
        }
      })
    //  console.log('onLoad')
    //  var that = this;
    //  wx.request({
    //    url: 'https://api.niucodata.com/api/vip/items/?access_token=df6cfe180cc1aae3faabeccccf3a716c705c410e',
    //    header: {
    //      'content-type': 'application/json'
    //    },
    //    data: {//请求的参数
    //      'keywords': '大学考到哪就把他带到哪',
    //      "scope": "poweiboitem",
    //      'limit': '20'
    //    },
    //    //请求后台数据成功
    //    success: function (res) {
    //      that.setData({
    //        weibo:  res.data
    //      })
    //    }
    //  })


  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  // focusSearch: function () {
  //   if (this.data.search.searchValue) {
  //     this.setData({
  //       'search.showClearBtn': true
  //     })
  //   }
  // },
  jump: function (e) {
    console.log(e)
    var keyword = e.currentTarget.dataset.select
    app.keywords=keyword;
    wx.navigateTo({
      url: '../analysis/analysis?keyword='+keyword
    })
  },

 
  navbarTap: function (e) {
    console.log(e)
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  }

  // data: {
  //   motto: 'Hello World',
  //   userInfo: {},
  //   hasUserInfo: false,
  //   canIUse: wx.canIUse('button.open-type.getUserInfo')
  // },
  // //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // onLoad: function () {
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
  
})
