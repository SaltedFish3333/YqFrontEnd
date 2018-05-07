// pages/analysis/analysis.
var util = require("../../utils/util.js");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // ec:{
    //   onInit: initChart
    // },
    mark: 0,//手指触摸位置
    newmark: 0, //滑动新位置
    winHeight: 0,
    winWidth: 0,
    isSubscribed: false,
    isNewsHidden: false,
    currentTab: 0,
    keywordInfo: {
      keywordName: app.keywords,
      intro: "如果你无法简洁的表达你的想法，那只能说明你还不够了解它。"
    },
    keywordEmotion: {
      positive: 82,
      nagative: 18,
    },
    toNewsAnimationData: null,



    scroll_height: '',
    showWeibo: false,
    showWeixin: false,
    showZhihu: false,
    showToutiao: false,
    showNews: false,
    weiboContent: null,
    weixinContent: null,
    zhihuContent: null,
    toutiaoContent: null,
    newsContent: null

  },

  // 点击标题切换当前页时改变样式
  switchNav: function (e) {
    console.log(e)
    var cur = e.target.dataset.current;
    if (cur == 0) {
      this.setData({
        isNewsHidden: false
      })
    } else {
      this.setData({
        isNewsHidden: true
      })
    }
    if (this.data.currentTab == cur) {
      this.setData({

      })
    }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //关注按钮切换
  changeStatus: function (e) {
    console.log(app.globalData.openid)
    wx.request({
      url: 'https://yujianweb.com/Yqanalysis/ChangeKeywordsServlet',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      data: {
        openId: app.globalData.openid,
        isSubscribed: this.data.isSubscribed,
        keyword: this.data.keywordInfo.keywordName
      },
      success: res => {
        if (this.data.isSubscribed) {
          this.setData({
            isSubscribed: false
          })
          wx.showToast({
            title: '取消关注',
            icon: 'success',
            duration: 1000
          })
        } else {
          this.setData({
            isSubscribed: true
          })
          wx.showToast({
            title: '关注成功',
            icon: 'success',
            duration: 1000
          })
        }
      }
    })

  },
  bindDetailView: function (event) {
    var nowUrl = event.currentTarget.dataset.url;
    console.log(nowUrl);
    app.detailUrl = nowUrl;
    wx.navigateTo({
      url: "../details/details"
    })
  },
  //判断显示状态
  onChangeShowState: function (event) {
    var that = this;
    var scope = event.currentTarget.dataset.scope;

    console.log(scope);
    if (scope == 'weibo') {
      that.setData({
        showWeibo: (!that.data.showWeibo)
      });
    }
    else if (scope == 'weixin') {
      that.setData({
        showWeixin: (!that.data.showWeixin)
      });
    }
    else if (scope == 'zhihu') {
      that.setData({
        showZhihu: (!that.data.showZhihu)
      });
    }
    else if (scope == 'toutiao') {
      that.setData({
        showToutiao: (!that.data.showToutiao)
      });
    }
    else if (scope == 'news') {
      that.setData({
        showNews: (!that.data.showNews)
      });
    }
  },
  // 选项卡切换
  touchStart: function (e) {
    this.data.mark = this.data.newmark = e.touches[0].pageX
  },
  toNewsOrYq: function (e) {
    console.log(e)
    console.log(this.data.winWidth + "宽度")
    this.data.newmark = e.touches[0].pageX
    var roffset = this.data.newmark - this.data.mark
    var loffset = 0 - roffset
    if (roffset > 0.2 * this.data.winWidth) {
      console.log(roffset)
      // var toNewsAnimation = wx.createAnimation({
      //   duration: 500,
      //   timingFunction: 'ease',
      //   delay: 0
      // })
      // toNewsAnimation.translate(this.data.winWidth).opacity(0).step()
      this.setData({
        // toNewsAnimationData: toNewsAnimation.export(),
        currentTab: 0,
        isNewsHidden: false
      })

      // setTimeout(function(){
      //   this.setData({
      //     display: 'none',
      //     canvasHidden:true,
      //     isNewsHidden: false
      //   })
      // }.bind(this),300)    
    }
    if (loffset > 0.2 * this.data.winWidth) {
      this.setData({
        // toNewsAnimationData: toNewsAnimation.export(),
        currentTab: 1,
        isNewsHidden: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      keywordInfo: {
        keywordName: options.keyword,
        intro: this.data.keywordInfo.intro
      }
    })
    var scopeArray = ['poweiboitem', 'powechatitem', 'zhihuitem', 'toutiaoitem', 'newsitem'];
    var contents = [];
    
    var keywords = options.keyword;
    var weibo;
    var that = this;
    for (var j = 0, len = scopeArray.length; j < len; j++) {
      (function (j) {
        util.getData(keywords, scopeArray[j])
          .then(function (data) {
            var actualData = data.data;
            var simpleItem = actualData.result.items;
            for (var i = 0; i < simpleItem.length; i++) {
              simpleItem[i]._source.title = simpleItem[i]._source.title.replace(/<[\w\s\"\/\=]+>/g, "");
            }

            if (j == 0) {
              that.setData({
                weiboContent: simpleItem
              })
            }
            else if (j == 1) {
              that.setData({
                weixinContent: simpleItem
              })
            }
            else if (j == 2) {
              that.setData({
                zhihuContent: simpleItem
              })
            }
            else if (j == 3) {
              that.setData({
                toutiaoContent: simpleItem
              })
            }
            else if (j == 4) {
              that.setData({
                newsContent: simpleItem
              })
            }

          });
      })(j);
    }
    wx.getSystemInfo({
      success: res => {
        this.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        })
      },
    })
    wx.getStorage({
      key: 'openid',
      success: res => {
        wx.request({
          url: 'https://yujianweb.com/Yqanalysis/CheckKeywordServlet',
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          data: {
            openId: res.data,
            keyword: this.data.keywordInfo.keywordName
          },
          success: e => {
            var isSubscribed = e.data.isKeySubscribed
            console.log(e.data)
            this.setData({
              isSubscribed: isSubscribed
            })
          }
        })
      },
    });


     wx.request({
      url: 'https://api.niucodata.com/api/vip/chart/?access_token=df6cfe180cc1aae3faabeccccf3a716c705c410e',
      data: {
        "keywords": options.keyword,
        "chart_type": "line_chart",
        "scope": "newsitem"
      },
      header: {
        'content-type': 'application/json'
      },
      success :function(e){
        var chartData = e.data.result
        chartShow(chartData)
        // console.log(chartData)
        // that.setData({
        //   lineChartData: chartData
        // })

      },
      fail:function(e){
        console.log("失败")
      }
    })
    wx.request({
      url: 'https://api.niucodata.com/api/vip/chart/?access_token=df6cfe180cc1aae3faabeccccf3a716c705c410e',
      
      data:{
        "keywords": options.keyword,
        "chart_type": "emotion"
      },
      
      header: {
        'content-type': 'application/json'
      },
      success :function(e){
        console.log(e.data)
        var positive = e.data.result.items[0].percent
        var nagative = e.data.result.items[1].percent
        that.setData({
          keywordInfo:{
            keywordName: options.keyword,
            intro: "如果你无法简洁的表达你的想法，那只能说明你还不够了解它。"
          },
          keywordEmotion:{
            positive: (positive * 100).toFixed(2),
            nagative: (nagative * 100).toFixed(2)
          }
          
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

  }

})

function chartShow(chartdata) {
  var CHART = require('../../utils/wxcharts.js')
  var hotlist = []
  var timelist = []
  var chartName = chartdata.name
  var chartData = chartdata.data
  for (var a in chartData) {
    if (a < 30) {
      hotlist.push(chartData[a].index)
      timelist.push(chartData[a].time)
    }
  }
  console.log(hotlist)
  console.log(timelist)
  let line = {
    canvasId: 'line-chart', // canvas-id
    type: 'line', // 图表类型，可选值为pie, line, column, area, ring
    categories: timelist,
    series: [{ // 数据列表
      name: chartName,
      data: hotlist
    }],
    xAxis: {
      type: 'calibration'
    },
    yAxis: {
      min: 0 // Y轴起始值
    },
    width: 300,
    height: 200,
    dataLabel: false, // 是否在图表中显示数据内容值
    legend: false, // 是否显示图表下方各类别的标识
    extra: {
      lineStyle: 'curve' // (仅对line, area图表有效) 可选值：curve曲线，straight直线 (默认)
    }
  }
  new CHART(line)
}
