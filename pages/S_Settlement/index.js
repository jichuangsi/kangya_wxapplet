// pages/S_Settlement/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '商城',
    show: false,
    state:0,
    yh_arr: [
    ],
    address_arr:{},
    yh_id:'',
    yf_id:'',
    check_yh:'',
    check_yf:'',
    quannum:1,
    invoice_id:0,
    message:'',
    arr:[],
    user:'',
    all_price:0,
    price:0,
    check_obj:'',
    saler_id:'',
    feetype:0,
    company:''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  messageipt(e){
    this.setData({
      message:e.detail.value
    })
  },
  paystype(e){
    let index = e.currentTarget.dataset.index
    if(index=='2'){
      if(Number(this.data.user.remain)>=Number(this.data.price)){
        this.setData({
          feetype:index
        })
      }else{
        wx.showToast({
          title: '余额不足',
          icon:'none'
        })
      }
    }else{
      this.setData({
        feetype:index
      })
    }
  },
  S_rechargego(){
    wx.navigateTo({
      url: '../S_recharge/index',
    })
  }, 
  S_addressgo() {
    wx.navigateTo({
      url: '../S_address/index?check=1',
    })
  },
  S_invoicego() {
    wx.navigateTo({
      url: '../S_invoice/index',
    })
  },
  showpopup(e){
    this.setData({
      show:true,
      quannum:e.currentTarget.dataset.index
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: "get",
      data: {
        "plugin":'getfree'
      },
      header: {
        "token": wx.getStorageSync("token")
      },
      success: function(res) {
        console.log(res)
        self.setData({
          yh_arr:res.data.list
        })
      }
    });
    wx.request({
      url: getApp().data.APIS +"/svc/a",
      method: "get",
      data: {
          "plugin": 'getcompanyaccount'
      },
      header: {
        "token": wx.getStorageSync("token")
      },
      success: function(res) {
        console.log(5888)
        let arr = res.data.list[0].msg.split('\n')
        self.setData({
          company:arr
        })
      }
    });
  },
  checkyh(e){
    let price = Number(this.data.all_price)-Number(e.currentTarget.dataset.item.price)>0?Number(this.data.all_price)-Number(e.currentTarget.dataset.item.price):0
    if(this.data.quannum=='1'){
      this.setData({
        yh_id:e.currentTarget.dataset.id,
        check_yh:e.currentTarget.dataset.item,
        show:false,
        price:price
      })
    }else{
      this.setData({
        yf_id:e.currentTarget.dataset.id,
        check_yf:e.currentTarget.dataset.item,
        show:false
      })
    }
  },
  btn(){
    let self = this
    if(!self.data.address_arr){
      wx.showToast({
        title: '请选择收货地址',
        icon:'none'
      })
      return
    }
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: "post",
      data: {
        "plugin":'addcartorder',
        "goods":JSON.stringify(self.data.check_obj),
        "pay":JSON.stringify({
          'moneyId':self.data.yh_id,
          'postFeeId':self.data.yf_id,
          'saler_id':self.data.saler_id,
          'isProof':'0',
          'addressid':self.data.address_arr.id,
          'invoiceType':self.data.invoice_id,
          'feetype':self.data.feetype
        })
      },
      header: {
        "token": wx.getStorageSync("token"),
        'content-type': 'application/x-www-form-urlencoded'

      },
      success: function(res) {
        console.log(res)
        if(res.data.info=='ok'){
          // wx.showToast({
          //   icon:'success',
          //   title: '生成订单成功',
          // })
          if(self.data.feetype == 2){
            if(self.data.state == 1){
              let pages = getCurrentPages();
              let Page = pages[pages.length - 2];//
              wx.setStorageSync('buylist', JSON.stringify(Page.data.surplus_arr))
            }
            wx.showToast({
              title: '生成订单成功',
              icon: 'success',
              complete:function(){
                wx.navigateTo({
                  url: '../S_Order/index?title=0',
                })
              }
            })
          }else{
            if(self.data.state == 1){
              let pages = getCurrentPages();
              let Page = pages[pages.length - 2];//
              wx.setStorageSync('buylist', JSON.stringify(Page.data.surplus_arr))
            }
            wx.request({
              url: getApp().data.APIS + "/lab/pay/",
              method: "POST",
              data: {
                "token": wx.getStorageSync("token"),"orderId":res.data.list[0].orderId
              },
              header: {
                "content-type": "application/json"
              },
              success: function(e) {
                console.log(788)
                console.log(e)
                // 签权调起支付 
                if(!e.data.data){
                  wx.showToast({
                    title: '支付失败',
                    icon: 'none',
                    complete:function(){
                      wx.navigateTo({
                        url: '../S_Order/index?title=0',
                      })
                    }
                  })
                }
                wx.requestPayment({
                  'timeStamp': e.data.data.timeStamp,
                  'nonceStr': e.data.data.nonceStr,
                  'package': e.data.data.package,
                  'signType': e.data.data.signType,
                  'paySign': e.data.data.paySign,
                  'success': function(res) {
                    console.log(res, "成功")
                    wx.showToast({
                      title: '支付成功',
                      icon: 'success',
                      complete:function(){
                        wx.navigateTo({
                          url: '../S_Order/index?title=0',
                        })
                      }
                    })
                  },
                  'fail': function(res) {
                    console.log("支付失败", res)
                    wx.showToast({
                      title: '支付失败',
                      icon: 'none',
                      complete:function(){
                        wx.navigateTo({
                          url: '../S_Order/index?title=0',
                        })
                      }
                    })
                  },
                })
              }
            })
          }
        }else{
          wx.showToast({
            icon:'none',
            title: '生成订单失败',
          })
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商城'
    })
    let pages = getCurrentPages();
  	let Page = pages[pages.length - 2];//
    this.setData({
      state:options.state==1?1:0,
      arr:Page.data.order_arr,
      saler_id:wx.getStorageSync('saler_id')
    })
    console.log(this.data.arr)
    this.getdata()
    this.getuser()
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
        console.log(res)
        let price = 0
        let obj = {}
        for(let i = 0;i<self.data.arr.length;i++){
          price += res.data.list[0].vip!=''&&res.data.list[0].vip?(Number(self.data.arr[i].vipPrice)*Number(self.data.arr[i].buynum)):(Number(self.data.arr[i].promotionPrice)*Number(self.data.arr[i].buynum))
          obj[self.data.arr[i].id]=self.data.arr[i].buynum
        }
        console.log(price)
        self.setData({
          user:res.data.list[0],
          all_price:price,
          price:price,
          check_obj:obj
        })
      }
    });
    
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: "get",
      data: {
        "plugin":'getaddr'
      },
      header: {
        "token": wx.getStorageSync("token")
      },
      success: function(res) {
        console.log(res)
        self.setData({
          address_arr:res.data.list[0]
        })
      }
    });
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