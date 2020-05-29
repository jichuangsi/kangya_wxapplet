//app.js
App({
  data:{
    API: 'http://kangya.sample.jichuangsi.com',
    APIS: 'https://kyys.kyawang.com'
  },
  onLaunch: function (option) {
    let a = 1
    let self = this
    let page_arr = ['pages/my/index', 'pages/Relation/index', 'pages/Relationclinic/index', 'pages/authorize/index', 'pages/D_index/index', 'pages/information/index', 'pages/study/index', 'pages/news/index', 'pages/newsdetails/index', 'pages/studynav/index', 'pages/studysearch/index', 'pages/QRCode/index', 'pages/friendsearch/index', 'pages/PriceList/index', 'pages/Pricesearch/index', 'pages/addfriend/index', 'pages/Videoplay/index', 'pages/Mydata/index', 'pages/Mydataedit/index', 'pages/Myclinic/index', 'pages/Record/index', 'pages/Approval/index', 'pages/Newslist/index', 'pages/about/index', 'pages/aboutdetails/index', 'pages/set/index', 'pages/setdetails/index', 'pages/feedback/index', 'pages/feedbackdetails/index', 'pages/feedbackbtn/index', 'pages/W_index/index', 'pages/W_team/index', 'pages/W_project/index', 'pages/W_projectdetails/index', 'pages/W_order/index', 'pages/W_address/index', 'pages/W_introduce/index', 'pages/Colleaguedetails/index', 'pages/D_QRCode/index']
    // wx.setStorageSync('token', 'cstoken')
    wx.onAppRoute(function (res) {
      //获取加载的页面
      let pages = getCurrentPages(),
        //获取当前页面的对象
        view = pages[pages.length - 1],
        data;
        console.log(view)
        self.view = view
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
          if(wx.getStorageSync('token')==''&&page_arr.indexOf(view.route) == -1&&a==2){
            // self.signin()
          }
        }else{
          if(wx.getStorageSync('token')==''&&page_arr.indexOf(view.route) == -1&&a==2){
            // self.signin()
          }
        }
      }
    })
    wx.getSetting({
      success: result => {
        if (page_arr.indexOf(wx.getLaunchOptionsSync().path) != -1) {
        } else {
          wx.setStorage({
            key: "CurrentPage",
            data: wx.getLaunchOptionsSync().path
          })
          self.result = result
          if (!result.authSetting['scope.userInfo']) {
            wx.redirectTo({
              url: '/pages/authorize/index',
            })
          } else {
            // self.signin()
            a = 2
          }
        }
      }
    })
  },
  signin() {
    //****************************放在初始化界面****************************//
    var that = this;
    var xdata = getApp().data
    wx.login({
      // 调用 login 获取 code
      success: function (res) {
        var code = res.code;
        wx.getUserInfo({
          // 调用 getUserInfo 获取 encryptedData 和 iv
          success: function (res) {
            console.log(res)
            // success
            xdata.userInfo = res.userInfo;
            var encryptedData = res.encryptedData || 'encry';
            var iv = res.iv || 'iv';
            wx.request({ // 发送请求 获取 jwt
              url: xdata.APIS + '/svc/a',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                plugin: 'oauth2',
                code: code,
                username: encryptedData,
                password: iv,
                grant_type: "password",
                auth_approach: 'wxapp',
              },
              method: "POST",
              success: function (res) {
                console.log(11)
                console.log(res)
                if (res.statusCode === 200) {
                  if (res.data.list[0].r =='no auth'){
                    wx.navigateTo({
                      url: '/pages/Relationclinic/index?state=0',
                    })
                  }else{
                    // 得到 jwt 后存储到 storage，
                    // wx.showToast({
                    //   title: '登录成功',
                    //   icon: 'success'
                    // });
                    xdata.access_token = res.data.list[0].token;
                    wx.setStorageSync('token', res.data.list[0].token)
                    self.view.onLoad()
                  }
                } else {
                  // 如果没有注册调用注册接口
                  // 提示错误信息
                  wx.showToast({
                    title: res.data.text,
                    icon: 'success',
                    duration: 2000
                  });
                  // that.register();//调到授权登录页
                  wx.navigateTo({
                    url: '/pages/Relationclinic/index?state=0',
                  })
                }
              },
              fail: function (res) {
                console.log('request token fail');
              }
            })
          },
          fail: function (res) {
            console.log('request token fail');
            wx.navigateTo({
              url: '',
            })
          }
        })
      }
    });
  }, 
  onHide: function(){
    wx.removeStorageSync('token')
  },
  onShow: function () {
    wx.hideHomeButton()
  },
})