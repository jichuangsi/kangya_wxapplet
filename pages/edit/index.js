// pages/edit/index.js

const app = getApp();
//引入插件：微信同声传译
const plugin = requirePlugin('WechatSI');
//获取全局唯一的语音识别管理器recordRecoManager
const manager = plugin.getRecordRecognitionManager();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '患者详情',
    recordState: false, //录音状态
    content: '',//内容
    prevpage:'',
    index:'',
    gt_arr: ['咨询沟通', '投诉']
  },

  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    let self = this
    let arr;
    if (this.data.title == '输入主诉') {
      self.data.prevpage.setData({
        complain: self.data.content
      })
      self.onClickLeft()
    } else if (this.data.title == '输入复诉') {
      self.data.prevpage.setData({
        repetition: self.data.content
      })
      self.onClickLeft()
    } else if (this.data.title == '输入现病史') {
      self.data.prevpage.setData({
        disease: self.data.content
      })
      self.onClickLeft()
    } else if (this.data.title == '输入既往史') {
      self.data.prevpage.setData({
        past: self.data.content
      })
      self.onClickLeft()
    } else if (this.data.title == '输入过敏史') {
      self.data.prevpage.setData({
        allergy: self.data.content
      })
      self.onClickLeft()
    } else if (this.data.title == '输入检查') {
      let arr = self.data.prevpage.data.inspect
      arr[self.data.index].text = self.data.content
      self.data.prevpage.setData({
        inspect: arr
      })
      self.onClickLeft()
    } else if (this.data.title == '输入辅助检查') {
      let arr = self.data.prevpage.data.auxiliary
      arr[self.data.index].text = self.data.content
      self.data.prevpage.setData({
        auxiliary: arr
      })
      self.onClickLeft()
    } else if (this.data.title == '输入诊断') {
      let arr = self.data.prevpage.data.diagnose
      arr[self.data.index].text = self.data.content
      self.data.prevpage.setData({
        diagnose: arr
      })
      self.onClickLeft()
    } else if (this.data.title == '输入治疗方案') {
      let arr = self.data.prevpage.data.programme
      arr[self.data.index].text = self.data.content
      self.data.prevpage.setData({
        programme: arr
      })
      self.onClickLeft()
    } else if (this.data.title == '输入治疗') {
      let arr = self.data.prevpage.data.treat
      arr[self.data.index].text = self.data.content
      self.data.prevpage.setData({
        treat: arr
      })
      self.onClickLeft()
    } else if (this.data.title == '输入医嘱') {
      self.data.prevpage.setData({
        advice: self.data.content
      })
      self.onClickLeft()
    } else if (this.data.title == '输入客户主诉') {
      self.data.prevpage.setData({
        complaints: self.data.content
      })
      self.onClickLeft()
    } else if (this.data.title == '输入基本需求') {
      self.data.prevpage.setData({
        basicdemand: self.data.content
      })
      self.onClickLeft()
    } else if (this.data.title == '输入潜在需求') {
      self.data.prevpage.setData({
        potentialdemand: self.data.content
      })
      self.onClickLeft()
    } else if (this.data.title == '输入医生方案') {
      self.data.prevpage.setData({
        programme: self.data.content
      })
      self.onClickLeft()
    } else if (this.data.title == '输入沟通记录') {
      self.data.prevpage.setData({
        record: self.data.content
      })
      self.onClickLeft()
    } else if (this.data.title == '输入服务建议') {
      self.data.prevpage.setData({
        proposal: self.data.content
      })
      self.onClickLeft()
    }
    else if (this.data.title == '影像浏览') {
      wx.navigateTo({
        url: '../img/index?state=1&&title=选择影像',
      })
    }else{
      self.onClickLeft()
    }
  },

  imgclick(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.item.url, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.item.url] // 需要预览的图片http链接列表
    })
  },
  gtclick(e) {
    this.data.prevpage.setData({
      communicatetype: e.currentTarget.dataset.text
    })
    this.onClickLeft()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ title: options.title, content:options.value,index:options.index })
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.initRecord();
  },



  conInput (e) {
    this.setData({
      content: e.detail.value,
    })
  },
  //识别语音 -- 初始化
  initRecord () {
    const that = this;
    // 有新的识别内容返回，则会调用此事件
    manager.onRecognize = function (res) {
      console.log(res)
    }
    // 正常开始录音识别时会调用此事件
    manager.onStart = function (res) {
      console.log("成功开始录音识别", res)
    }
    // 识别错误事件
    manager.onError = function (res) {
      console.error("error msg", res)
    }
    //识别结束事件
    manager.onStop = function (res) {
      console.log('..............结束录音')
      console.log('录音临时文件地址 -->' + res.tempFilePath);
      console.log('录音总时长 -->' + res.duration + 'ms');
      console.log('文件大小 --> ' + res.fileSize + 'B');
      console.log('语音内容 --> ' + res.result);
      if (res.result == '') {
        wx.showModal({
          title: '提示',
          content: '听不清楚，请重新说一遍！',
          showCancel: false,
          success: function (res) { }
        })
        return;
      }
      var text = that.data.content + res.result;
      that.setData({
        content: text
      })
    }
  },
  //语音  --按住说话
  touchStart: function (e) {
    this.setData({
      recordState: true  //录音状态
    })
    // 语音开始识别
    manager.start({
      lang: 'zh_CN',// 识别的语言，目前支持zh_CN en_US zh_HK sichuanhua
    })
  },
  //语音  --松开结束
  touchEnd: function (e) {
    this.setData({
      recordState: false
    })
    // 语音结束识别
    manager.stop();
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
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];//上一个页面
    this.setData({
      prevpage: prevPage
    })
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