// pages/S_Orderdetails/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'商城',
    state:0,
    id:'',
    item:'',
    check_item:'',
    address_arr:{},
    invoice_id:'',
    feetype:'',
    show:false,
    company:[],
    price:'',
    user:'',
    check_obj:''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  stateclick(){
    this.setData({state:0})
  },
  stateclick2() {
    this.setData({ state: 2 })
  },
  payshow(){
    this.setData({
      show:true
    })
  },
  onClose(){
    this.setData({
      show:false
    })
  },
  del() {
    Dialog.confirm({
      title: '标题',
      message: '您确定要删除订单吗？'
    }).then(() => {
      // on confirm
    }).catch(() => {
      // on cancel
    });
  },
  S_invoicego() {
    wx.navigateTo({
      url: '../S_invoice/index',
    })
  },
  shgo(){
    wx.navigateTo({
      url: '../S_Service/index?state=1',
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
    this.onClose()
  },
  getcartorderdetail(id){
    let self = this
    wx.request({
      url: getApp().data.APIS +"/svc/a",
      method: "get",
      data: {
        "plugin": 'getcartorderdetail',
        "p": id
      },
      header: {
          "token": wx.getStorageSync("token"),
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(777)
        console.log(res)
        res.data.list[0].createDate = self.getLocalTime(res.data.list[0].createDate)
        self.setData({
          item:res.data.list[0],
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
  getLocalTime(nS) { 
    return new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " "); 
  },
  AddressGo(){
    if(this.data.state == 0){
      wx.navigateTo({
        url: '../S_address/index?check=1',
      })
    }
  },
  S_invoicego(){
    if(this.data.state == 0){
      wx.navigateTo({
        url: '../S_invoice/index',
      })
    }
  },
  btn(){
    let self = this
    wx.request({
      url: getApp().data.APIS + "/lab/pay/",
      method: "POST",
      data: {
        "token": wx.getStorageSync("token"),"orderId":self.data.id
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
            })
            wx.redirectTo({
              url: '../S_my/index',
            })
          },
          'fail': function(res) {
            console.log("支付失败", res)
          },
        })
      }
    })
  },
  editbtn(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: "post",
      data: {
        "plugin":'addcartorder',
        "goods":JSON.stringify(self.data.check_obj),
        "pay":JSON.stringify({
          'moneyId':self.data.item.moneyId,
          'postFeeId':null,
          'saler_id':wx.getStorageSync('saler_id'),
          'isProof':'0',
          'addressid':self.data.address_arr.name?self.data.address_arr.id:'',
          'invoiceType':self.data.invoice_id==''?self.data.item.invoiceType:self.data.invoice_id,
          'feetype':self.data.feetype==''?self.data.item.payType:self.data.feetype
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
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];//
    this.pageprv = Page
    let obj = {}
    for(let i = 0;i<Page.data.check_item.detail.length;i++){
      obj[Page.data.check_item.detail[i].value] = Page.data.check_item.detail[i].goodinfo.num
    }
    this.setData({
      state:options.state,
      id:options.id,
      check_item:Page.data.check_item,
      price:Page.data.check_item.total,
      user:Page.data.user,
      check_obj:obj
    })
    wx.setNavigationBarTitle({
      title: '商城'
    })
    this.getcartorderdetail(options.id)
    // check_obj
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