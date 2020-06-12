// pages/Mydata/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '我的资料',
    show:false,
    text:'头像',
    areaList:[],
    name:'',
    age:'',
    sex:'',
    jc:'',
    dq:'',
    qm:'',
    xm:[],
    ll:'',
    userimg:''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  showPopup() {
    this.setData({ show: true, text:'头像' });
  },

  showPopup1() {
    this.setData({ show: true, text: '地区' });
  },
  showPopup2() {
    this.setData({ show: true, text: '性别' });
  },
  onClose() {
    this.setData({ show: false });
  },
  pz() {
    let self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        self.setData({
          userimg: res.tempFilePaths,
          show: false
        })
        self.addimg(res.tempFilePaths)
      }
    })
  },
  xc() {
    let self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        self.setData({
          userimg: res.tempFilePaths,
          show: false
        })
        self.addimg(res.tempFilePaths)
      }
    })
  },
  addimg(imgname) {
    let self = this
    let name = new Date().getTime() + imgname[0].substring(imgname[0].length - 4)
    wx.getFileSystemManager().readFile({
      filePath: imgname[0],
      success: fileStream => {
        console.log(fileStream)
        wx.request({
          url: 'https://www.kyawang.com/oc9/remote.php/webdav/rec/' + name,
          method: 'PUT',
          dataType: 'ARRAYBUFFER',
          header: {
            'Authorization': 'Basic cHViOnB1YkAxMjM=',
            'Content-Type': 'multipart/form-data',
            'token': wx.getStorageSync('token')
          },
          data: fileStream.data,
          processData: false,
          success: function (res) {
            self.setData({
              userimg: "https://www.kyawang.com/oc9/index.php/s/sdAqxmkSwWs7WK4/download?path=%2F&files=" + name
            })
          },

          fail: function (err) {

            console.log("失败");
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })

          }

        })
      }
    })

  },
  areaclick(e){
    console.log(e.detail.values)
    this.setData({ show: false,dq:e.detail.values[0].name+e.detail.values[1].name+e.detail.values[2].name });
  },
  sexclcik(e){
    this.setData({
      sex: e.currentTarget.dataset.text, 
      show: false
    })

  },
  editgo(e) {
    let value = e.currentTarget.dataset.value ? '&&value=' + e.currentTarget.dataset.value : ''
    wx.navigateTo({
      url: '../Mydataedit/index?title=' + e.currentTarget.dataset.text + value
    })
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data:{
        plugin:'selfsign',
        p:''
      },
      header: {
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(1)
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            qm: res.data.list[0].sign,
            ll: res.data.list[0].exp,
          })
        }
      }
    })
  },
  outlogin(){
    wx.removeStorageSync('token')
    wx.redirectTo({
      url: '../my/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的资料'
    })
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];
    this.pagesprev = Page
    this.setData({
      areaList: require("../../data/area.js").default,
      name: Page.data.user.name,
      age: Page.data.user.age,
      sex: Page.data.user.sex,
      jc: Page.data.user.grade,
      dq: Page.data.user.area,
      userimg: Page.data.user.picture,
      xm: Page.data.user.expert.indexOf('|')!=-1?Page.data.user.expert.split('|'):Page.data.user.expert
    })
    this.getdata()
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
    let self = this
    wx.request({
      url: getApp().data.APIS + '/member/ChangePerinfo',
      method: 'post',
      data: {
        picture: self.data.userimg,
        name: self.data.name,
        sex: self.data.sex,
        age: self.data.age,
        grade: self.data.jc,
        area: self.data.dq,
        expert: self.data.xm?self.data.xm.join('|'):self.data.xm,
        sign: self.data.qm,
        exp: self.data.ll,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.info == 'ok') {
          self.pagesprev.getPerinfo()
        }
      }
    })
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