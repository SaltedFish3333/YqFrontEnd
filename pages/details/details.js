Page({
  data: {
    url: getApp().detailUrl
  },
  onLoad: function (options) {
    this.setData({ url: getApp().detailUrl });
  }
});