// pages/S_index/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'商城',
    arr:['','',''],
    nav_arr:[],
    activity_arr:[
      { id: 0, img: '' },
      { id: 1, img: '' },
      { id: 2, img: '' },
      { id: 3, img: '' },
    ],
    assemble_arr: [
      {
        id:0,
        img: '../../images/my_service_icon_prepaid.png',
        title: 'VOCO/我和 PRovicl氢氧化钙PRovicl氢氧化钙临时观桥粘接剂临时观桥粘接剂',
        price: 36.00,
        oldprice: 46.00,
        tags: '红',
      }, {
        id: 0,
        img: '../../images/my_service_icon_prepaid.png',
        title: 'VOCO/我和 PRovicl氢氧化钙PRovicl氢氧化钙临时观桥粘接剂临时观桥粘接剂',
        price: 36.00,
        oldprice: 46.00,
        tags: '红',
      }, {
        id: 0,
        img: '../../images/my_service_icon_prepaid.png',
        title: 'VOCO/我和 PRovicl氢氧化钙PRovicl氢氧化钙临时观桥粘接剂临时观桥粘接剂',
        price: 36.00,
        oldprice: 46.00,
        tags: '红',
      }
    ],
    Promotion_list:'',
    all_arr: [],
    brand_arr:[],
    user:'',
    isOverShare: true
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 999
    })
  },
  gridclick(e){
    console.log(e)
    let item = e.currentTarget.dataset.item
    let stype = e.currentTarget.dataset.item.stype
    if (stype == 'article'){
      wx.navigateTo({
        url: '/pages/Newslist/index?title=' + item.name + '&&id=' + item.value,
      })
    } else if (stype == 'course') {
      wx.navigateTo({
        url: '/pages/studynav/index?title='+item.name+'&&state=2&&id=' + item.value,
      })
    } else if (stype == 'video') {
      wx.navigateTo({
        url: '/pages/PriceList/index?title=医患沟通视频&&value=' + item.value,
      })
    } else if (stype == 'link') {
      wx.navigateTo({
        url: item.value,
      })
    } else if (stype == 'app') {
      wx.navigateToMiniProgram({
        appId: item.value.appid, // 要跳转的小程序的appid
        path: item.value.page, // 跳转的目标页面
        extarData: {
        },
        success(res) {
          // 打开成功  
        },
        fail(err) {
          console.log(err)
        }
      }) 
    } else if (stype == 'api') {
      console.log(item.value.page + '&&id' + item.value.p.clinicid)
      let url_id = item.value.page.indexOf('?') != -1 ? '&&id=' + item.value.p.clinicid : '?id=' + item.value.p.clinicid
      wx.navigateTo({
        url: '/' + item.value.page + url_id + '&&rw_url=' + item.value.url,
      })
    } else if (stype == 'article1') {
      wx.navigateTo({
        url: '/pages/newsdetails/index?title=' + item.name + '&&id=' + item.value,
      })
    } else if (stype == 'course1') {
      wx.navigateTo({
        url: '/pages/coursedetails/index?id=' + item.value,
      })
    } else if (stype == 'cart') {
      wx.navigateTo({
        url: '/pages/S_Productlist/index?title='+ item.name +'&&id=' + item.value,
      })
    }
  },
  getuser(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: "get",
      data: {
        "plugin":'getcartuserinfo'
      },
      header: {
        "token": wx.getStorageSync("token")
      },
      success: function(res) {
        console.log(54361)
        console.log(res)
        self.setData({
          user:res.data.list[0]
        })
      }
    });
  },
  getbanner(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'getcartdoc',
        p: '5996939',
      },
      header: {
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          // self.getshop()
          self.setData({
            arr:res.data.list[0].content
          })
        }
      }
    })
  },
  getnav(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'gethomedoc',
        p: '5996907',
      },
      header: {
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        // console.log(777)
        console.log(res)
        if (res.data.info == 'ok') {
          // self.setData({
          //   nav_arr:res.data.list[0].content
          // })
          self.getnav1(res.data.list[0].content)
        }
      }
    })
  },
  getnav1(arr){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'gethomedoc',
        p: '5996978',
      },
      header: {
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(888)
        console.log(res)
        if (res.data.info == 'ok') {
          arr.push(...res.data.list[0].content)
          self.setData({
            nav_arr:arr
          })
        }
      }
    })
  },
  getactivity(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'gethomedoc',
        p: '5996967',
      },
      header: {
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        // console.log(2222)
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            activityactivity_arr:res.data.list[0].content
          })
        }
      }
    })
  },
  getassemble(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'gethomedoc',
        p: '5996988',
      },
      header: {
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        // console.log(2222)
        // console.log(res)
        if (res.data.info == 'ok') {
          for(let i = 0;i<res.data.list[0].content.length;i++){
            self.getcartdoc(res.data.list[0].content[i].value)
          }
        }
      }
    })
  },
  getcategory(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'gethomedoc',
        p: '5996944',
      },
      header: {
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(2222)
        console.log(res)
        if (res.data.info == 'ok') {
          for(let i = 0;i<res.data.list[0].content.length;i++){
            self.getcartdoc(res.data.list[0].content[i].value,i,res.data.list[0].content.length)
          }
        }
      }
    })
  },
  getcartdoc(id,i,num){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'getcartdoc',
        p: id,
      },
      header: {
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.info == 'ok') {
          if(res.data.list[0].title == '超值拼团'){
            self.setData({
              assemble_arr: res.data.list[0]
            })
          }else if(res.data.list[0].title == '促销单品'){
            self.setData({
              Promotion_list: res.data.list[0]
            })
          }else if(num != 0){
            res.data.list[0].content.splice(6,999999999)
            self.arr.push(res.data.list[0])
            self.setData({
              brand_arr: self.arr
            })
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商城'
    })
    // this.getdata()
    this.getuser()
    this.getbanner()
    this.getnav()
    this.getactivity()
    this.getassemble()
    this.arr = []
    this.getcategory()
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
    console.log(555)
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
    return {
      title: this.data.title,
      desc: '分享页面的内容',
      path: '/pages/S_index/index?title=商城'  // 路径，传递参数到指定页面。
    }
  }
})