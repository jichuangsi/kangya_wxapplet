// pages/Videoplay/index.js
// const AgoraMiniappSDK = require('../../data/Agora_Miniapp_SDK_for_WeChat.js');
// this.liveP = wx.createLivePlayerContext('livePlayer');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'sadds',
    state:0,
    lovestate: false,
    arr:[1,1,1,1,1,1,1],
    text:'',
    show: false,
    client: ''
  },


  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  ipttext(e) {
    this.setData({
      text: e.detail.value
    })
  },
  send() {
    this.setData({
      text: ''
    })
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false, text: '' });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title ? options.title:'',
      state: options.state ? options.state:0
    })
    wx.setNavigationBarTitle({
      title: options.title
    })
  },
  loveclick(){
    this.setData({
      lovestate:!this.data.lovestate
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let client = new AgoraMiniappSDK.Client();

    // client.init("ee1b888a0e83476da90812fcb1623031", function () {
    // //   // 初始化成功
    //   console.log("初始化成功");
    //   client.join(null, "10sd0", null, function (uid) {
    // //     // 加入成功
    //     console.log("加入成功User " + uid + " join channel successfully");
    // // //     // 发布本地音频流并获取推流 url 地址
    // // //     client.publish(function (res) {
    // // //       // 发布成功
    // // //       console.log("发布成功pushPath" + res);
    // // //       that.setData({
    // // //         pushPath: res
    // // //       })
    // // //       // 监听
    //       client.on('error', function (err) {
    //         console.log("Got error msg:", err.reason);
    //         if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
    //           client.renewChannelKey(that.data.fangjianhao, function () {
    //             console.log("Renew channel key successfully");
    //           }, function (err) {
    //             console.log("Renew channel key failed: ", err);
    //           });
    //         }
    //       });
    // // //       // 监听远程视频添加
    //       client.on('stream-added', function (evt) {
    //         client.subscribe(evt.uid, function (res) {
    //           console.log("订阅视频流成功playUrl" + res);
    //           that.setData({
    //             playUrl: res
    //           });
    //         }, function (err) {
    //           console.log("订阅视频流错误", err);
    //         });
    //       });

    //       client.on('update-url', function (evt) {
    //         console.log("视频播放", evt);
    //       });

    //       client.on('stream-removed', function (evt) {
    //         console.log("视频停止播放");
    //       });

    //       client.on('video-rotation', function (evt) {
    //         console.log(evt.uid + " leaved from this channel");
    //       });
    //     client.on('stream-subscribed', function (evt) {
    //       console.log(54646)
    //     })


    // // //     }, function (err) {
    // // //       // 发布失败
    // // //       console.log("发布失败" + err);
    // // //     });
    //   }, function (err) {
    //     // 加入失败
    //     console.log("加入失败", err);
    //   });
    // }, function (err) {
    //   //初始化失败
    //   console.log("初始化失败", err);
    // });

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

  }
})