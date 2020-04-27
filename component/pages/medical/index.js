// pages/medical/index.js
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog.js';
import * as echarts from '../../ec-canvas/echarts.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '病历',
    arr:[],
    name:'',
    sex:'',
    patdetails: '',
    power_arr: [],
    user: '',
    arr_state:false
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight(){
    wx.navigateTo({
      url: '../../../pages/medicaledit/index?title=新增病历',
    })
  },
  qm() {
    wx.showToast({
      title: '模板记录不存在',
      icon: 'none',
      duration: 1000
    })
  },
  del(e) {
    let self = this
    Dialog.confirm({
      title: '提示',
      message: '您确定删除这条病历吗？'
    }).then(() => {
      wx.request({
        url: getApp().data.APIS + '/patient/delmedicarecord',
        method: 'post',
        data: {
          "mediarecordidentity": e.currentTarget.dataset.item.mediarecordidentity, 
          "customerid": e.currentTarget.dataset.item.customerid, 
          "datastatus": "1"
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' //修改此处即可
        },
        success: function (res) {
          console.log(res)
          if (res.data.info == 'ok') {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
            self.getdata()
          } else {
            wx.showToast({
              title: '失败',
              duration: 2000
            })
          }
        }
      })
      // on confirm
    }).catch(() => {
      // on cancel
    })
  },
  edit(e) {
    wx.navigateTo({
      url: '../../../pages/medicaledit/index?title=病历详情&&index=' + e.currentTarget.dataset.index,
    })
  },
  getdata(){
    let self = this
    self.setData({
      arr_state: false
    })
    wx.request({
      url: getApp().data.APIS + '/patient/medicalrecordinfo',
      method:'post',
      success: function (res) {
        // console.log(res)
        // console.log(JSON.parse(res.data.list[11].exam))
        if(res.data.info == 'ok'){
          let arr = res.data.list
          for (let k = 0; k < arr.length; k++) {
            arr[k].check_state = 0
            if (typeof (arr[k].exam) =='string'){
              arr[k].exam = JSON.parse(arr[k].exam)
              if ('items' in arr[k].exam) {
                self.getdetails(arr[k].mediarecordidentity, arr[k].customerid,k)
              }
            }else{

            }
          }
          self.setData({
            arr: arr,
            arr_state:true
          })
          console.log(self.data.arr)
        }
      },
    })
  }, 
  getdetails(mediarecordidentity, customerid,index) {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/osexalist',
      method: 'post',
      data:{
        mediarecordidentity: mediarecordidentity,
        customerid: customerid,
      },
      success: function (res) {
        if(res.data.info == 'ok'){
          let arr = self.data.arr
          arr[index].exam = res.data.list[0].exam
          self.setData({
            arr: arr
          })
        }
      },
    })
  },
  check_medical(e){
    let arr = this.data.arr
    let index = e.currentTarget.dataset.index
    for(let i = 0;i<arr.length;i++){
      if (i == index) {
        arr[i].check_state = 1
      } else {
        arr[i].check_state = 0
      }
    }
    this.setData({
      arr:arr
    })
  },
  medical_btn() {
    let arr = this.data.arr
    let arr1 = {
      mediarecordidentity: '',
      examdoctor: '',
      examdate: ''
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].check_state == 1) {
        arr1 = arr[i]
      }
    }
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      mediarecordidentity: arr1.mediarecordidentity,
      examdoctor: arr1.examdoctor,
      examdate: arr1.examdate
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  getcharts(index){
    let self = this
    console.log(index + '`````')
    let BoneLoss = self.data.arr[index].exam.BoneLoss >= 40 ? 100 : self.data.arr[index].exam.BoneLoss
    let PPD = self.data.arr[index].exam.PPD > 10 ? 10 : self.data.arr[index].exam.PPD
    let BOP_MAX = self.data.arr[index].exam.NumberTeeth * self.data.arr[index].exam.SitesPer
    let BOP_BFB = ((self.data.arr[index].exam.BOP / BOP_MAX) * 100).toFixed() +'%'
    let BOP = (self.data.arr[index].exam.BOP / BOP_MAX) >= 0.4 ? BOP_MAX : self.data.arr[index].exam.BOP
    let BoneLoss_BFB = (BoneLoss / self.data.arr[index].exam.Age).toFixed(3)
    let Envir = self.data.arr[index].exam.Envir+1
    let SystGen = self.data.arr[index].exam.SystGen+1
    let ToothLoss = self.data.arr[index].exam.ToothLoss >= 10 ? 28 : self.data.arr[index].exam.ToothLoss
    let ALL = BOP_MAX + 5 + 2 +100 +28 +10
    let ALL_NUM = BOP + Envir + SystGen + BoneLoss + ToothLoss+PPD
    let color = ''
    if ((ALL_NUM / ALL) <= 0.166){
      color = '#ccff80'
    } else if ((ALL_NUM / ALL) <= 0.333) {
      color = '#e6ff80'
    } else if ((ALL_NUM / ALL) <= 0.5) {
      color = '#ffff80'
    } else if ((ALL_NUM / ALL) <= 0.666) {
      color = '#ffc080'
    } else if ((ALL_NUM / ALL) > 0.666) {
      color = '#ffa080'
    }
    console.log(SystGen)
    self.selectComponent('#mychart-dom-graph' + index).init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      var option = {
        grid: {
          left:'60%',
          width:'100rpx'
        },
        radar: {
          // shape: 'circle',
          radius:'60%',
          name: {
            textStyle: {
              color: '#333',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: '探诊出血阳性位点百分比=' + BOP_BFB, max: BOP_MAX },
            { name: '环境', max: 5 },
            { name: '全身状况/遗传', max: 2 },
            { name: '骨丧失/年龄=' + BoneLoss, max: 100 },
            { name: '牙齿丧失', max: 28 },
            { name: '探诊深度≥5mm', max: 10 },
          ]
        },
        color: color,
        series: [{
          name: '图表',
          type: 'radar',
          areaStyle: {},
          // areaStyle: {normal: {}},
          data: [
            {
              value: [BOP, Envir, SystGen, BoneLoss, ToothLoss, PPD],
              name: '图表'
            }
          ]
        }]
      };
      chart.setOption(option);
      return chart;
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title ? options.title:'病历'
    })
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    console.log(prevPage.data)
    if (options.title) {
      this.setData({
        title: options.title,
        power_arr: prevPage.data.power_arr,
        user: prevPage.data.user,
        name: prevPage.data.name,
        sex: prevPage.data.sex,
      })
    } else {
      this.setData({
        name: prevPage.data.patdetails.name,
        sex: prevPage.data.patdetails.sex,
        patdetails: prevPage.data.patdetails,
        power_arr: prevPage.data.power_arr,
        user: prevPage.data.user,
      })
    }
    console.log(this.data.power_arr)
    this.getdata()
    // this.pieShow()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let self = this
    let timeout1 = setInterval(function () {
      if (self.data.arr.length > 0 || self.data.arr_state) {
        for (let i = 0; i < self.data.arr.length;i++){
          if (self.data.arr[i].exam.Age && !self.data.arr[i].exam.Group0){
            self.getcharts(i)
          }
        }
        clearInterval(timeout1)
      }
    }, 100)
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