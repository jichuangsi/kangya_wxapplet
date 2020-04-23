// pages/Agreeimg/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '知情同意书',
    show:false,
    img_arr:[]
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    this.setData({show:true})
  },
  onClose() {
    this.setData({ show: false });
  },
  imgclick() {
    wx.previewImage({
      current: e.currentTarget.dataset.item.url, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.item.url] // 需要预览的图片http链接列表
    })
  },
  pz() {
    let self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
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
        const tempFilePaths = res.tempFilePaths
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
        // var yourfilename = '45'
        // var fileArray = new Uint8Array(fileStream.data);
        // var start_boundary = '\r\n–yourboundary\r\n' + 'Content - Disposition: form - data; name =“data”; filename = "' + yourfilename + '"\r\n' + 'Content - Type: application / octet - stream' + '\r\n\r\n';
        // var end_boundary = '\r\n–yourboundary–';
        // var startArray = [];
        // for (var i = 0; i < start_boundary.length; i++) {
        //   startArray.push(start_boundary.charCodeAt(i));
        // }
        // var endArray = [];
        // for (var i = 0; i < end_boundary.length; i++) {
        //   endArray.push(end_boundary.charCodeAt(i));
        // }
        // var totalArray = startArray.concat(Array.prototype.slice.call(fileArray), endArray);
        // var typedArray = new Uint8Array(totalArray);
        wx.request({
          url: 'https://www.kyawang.com/oc9/remote.php/webdav/rec/' + name,

          method: 'PUT',
          dataType: 'ARRAYBUFFER',
          header: {
            'Authorization': 'Basic cHViOnB1YkAxMjM=',
            'Content-Type': 'multipart/form-data',
          },

          data: fileStream.data,

          processData: false,

          success: function (res) {

            wx.showToast({
              title: '上传成功',
            })
            self.setData({
              show: false
            })
            self.getdata()
          },

          fail: function (err) {

            console.log("失败");
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
            self.setData({
              show: false
            })

          }

        })
      }
    })
  },
  imggo(){
    wx.navigateTo({
      url: '../img/index?title=选择影像',
    })
    this.onClose()
  },
  getdata(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '知情同意书'
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