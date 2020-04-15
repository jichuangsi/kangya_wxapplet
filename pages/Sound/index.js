// pages/Sound/index.js
var countDown = '';
const recorderManager = wx.getRecorderManager()
let a = 0
let timedjs = ''
recorderManager.onStart(() => {
  console.log('recorder start')
  a = 1
})
recorderManager.onFrameRecorded((res) => {
  const { frameBuffer } = res
  console.log('frameBuffer.byteLength', frameBuffer.byteLength)
})

const options = {
  duration: 600000,
  sampleRate: 44100,
  numberOfChannels: 1,
  encodeBitRate: 192000,
  format: 'aac',
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:0,
    text:'准备录音',
    path: '',
    playstate:0,
    time: 600000,
    newtime: 600000
  },
  click(){
    let self = this
    let newtime = self.data.time
    if (self.data.state==0){
      self.setData({
        text: '正在录音',
        state:1
      })
      if (a == 0) {
        recorderManager.start(options)
      } else {
        recorderManager.resume(options)
      }
      countDown.start()
    } else {
      countDown.pause()
      recorderManager.pause(options)
      recorderManager.onPause((res) => {
        console.log(res)
        self.setData({
          text: '暂停录音',
          state: 0
        })
      })
    }
  },
  btn() {
    let self = this
    countDown.pause()
    recorderManager.stop(options)
    recorderManager.onStop((res) => {
      console.log(res)
      self.setData({
        text: '停止录音',
        state: 0,
        path: res.tempFilePath
      })
      console.log(res.tempFilePath.substring(res.tempFilePath.length - 6))
      var file = res.tempFilePath;
      wx.request({

        url: 'https://www.kyawang.com/oc9/remote.php/webdav/rec/45.txt',

        method: 'PUT',
        dataType:'ARRAYBUFFER',
        header: {
          'Authorization': 'Basic cHViOnB1YkAxMjM=',
          'Content-Type': 'multipart/form-data',
        },

        data: { 'file': file},

        processData: false,

        success: function (res) {

          console.log(res);
          wx.showToast({
            title: '上传成功',
          })
          setTimeout(function(){
            wx.navigateBack({
              delta: 1,
            })
          },1000)
        },

        fail: function (err) {

          console.log("失败");

        }

      })

    })
  },

  // play(){
  //   let self = this
  //   let audioCtx = wx.createAudioContext('myAudio')
  //   if (self.data.playstate == 0 && this.data.path!=''){
  //     audioCtx.play()
  //     self.setData({
  //       text: '正在播放录音...',
  //       playstate: 1
  //     })
  //   }else{
  //     audioCtx.play()
  //     self.setData({
  //       text: '暂停播放录音...',
  //       playstate: 0
  //     })
  //   }
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '录音'
    })
    countDown = this.selectComponent('.control-count-down');
    countDown.pause()
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

  }
})