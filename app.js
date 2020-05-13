//app.js
App({
  data:{
    API: 'http://kangya.sample.jichuangsi.com',
    APIS: 'https://kyys.kyawang.com',
  },
  onLaunch: function () {

    wx.setStorageSync('token', 'cstoken')
    wx.onAppRoute(function (res) {
      //获取加载的页面
      let pages = getCurrentPages(),
        //获取当前页面的对象
        view = pages[pages.length - 1],
        data;
      if (view) {
        data = view.data;
        console.log('是否重写分享方法', data.isOverShare);
        if (!data.isOverShare) {
          data.isOverShare = true;
          view.onShareAppMessage = function () {
            //分享配置
            return {
              title: view.data.title, // 子页面的title
              path: view.route,
            };
          }
        }
      }
    })
  },
  onShow: function () {
    wx.hideHomeButton()
  },
})