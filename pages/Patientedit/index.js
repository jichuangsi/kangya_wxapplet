// pages/Patientedit/index.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '患者详情',
    name: '',
    age:'',
    hobby:'',
    Economic: '',
    qq: '',
    mailbox: '',
    iphone1:'',
    iphone2: '',
    address: '',
    remarks: '',
    project_arr: ['治疗', '修复', '种植', '正畸', '检查', '洗牙', '其他'],
    Occupation_arr: ['公务员', '教师', '职员', '学生', '医生', '军人', '其他'], 
    Education_arr: ['本科', '硕士', '博士', '大专', '高中', '初中'],
    ascription_arr: ['本人', '爸爸', '妈妈', '儿子', '女儿', '老公','老婆'],


    IDCard: '',
    socialcard: '',
    Consultant:'',
    Insurance: '',
    Introducer: '',
    powergrid: '',
    impression: '',
    Habit: '',
    experience: '',
    allergy: '',
    past: '',
    ask: '',
    Consultant_arr: ['林逍麒', '以键'],
    powergrid_arr: ['林逍麒', '以键'],
    impression_arr: [
      { title: '种植用户',state:0 },
      { title: '正畸用户', state: 0 }
    ],
     allergy_arr: [
      { title: '磺胺', state: 0 },
      { title: '青霉素', state: 0 }
    ],
     past_arr: [
      { title: '心律不齐', state: 0 },
      { title: '肝炎', state: 0 }
    ],
    Matter_arr: [
      { title: '补牙', state: 0 },
      { title: '拔牙', state: 0 }
    ],
    time_arr: ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00'],
    time_start:10,
    time_end: '',

    lx_arr: ['未上门', '未成交', '术后'],
    nr_arr: ['治疗后一周', '拔牙后一周', '治疗后隔天'],
    jg_arr: ['少量出血', '无不适', '牙微疼痛']
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    let self = this
    let arr;
    if (this.data.title == '输入姓名'){
      wx.getStorage({
        key: 'Patientlist',
        success: function (res) {
          arr = res.data
          arr.name = self.data.name
          wx.setStorage({
            key: 'Patientlist',
            data: arr,
          })
        },
      })
    } else if (this.data.title == '添加年龄'){
      wx.getStorage({
        key: 'Patientlist',
        success: function (res) {
          arr = res.data
          arr.age = self.data.age
          wx.setStorage({
            key: 'Patientlist',
            data: arr,
          })
        },
      })
    } else if (this.data.title == '添加兴趣爱好'){
      wx.getStorage({
        key: 'Patientlist',
        success: function (res) {
          arr = res.data
          arr.hobby = self.data.hobby
          wx.setStorage({
            key: 'Patientlist',
            data: arr,
          })
        },
      })
    } else if (this.data.title == '添加经济实力') {
      wx.getStorage({
        key: 'Patientlist',
        success: function (res) {
          arr = res.data
          arr.Economic = self.data.Economic
          wx.setStorage({
            key: 'Patientlist',
            data: arr,
          })
        },
      })
    } else if (this.data.title == '添加QQ号码') {
      wx.getStorage({
        key: 'Patientlist',
        success: function (res) {
          arr = res.data
          arr.qq = self.data.qq
          wx.setStorage({
            key: 'Patientlist',
            data: arr,
          })
        },
      })
    } else if (this.data.title == '添加电子邮箱') {
      wx.getStorage({
        key: 'Patientlist',
        success: function (res) {
          arr = res.data
          arr.mailbox = self.data.mailbox
          wx.setStorage({
            key: 'Patientlist',
            data: arr,
          })
        },
      })
    } else if (this.data.title == '添加电话1') {
      wx.getStorage({
        key: 'Patientlist',
        success: function (res) {
          arr = res.data
          arr.iphone1 = self.data.iphone1
          wx.setStorage({
            key: 'Patientlist',
            data: arr,
          })
        },
      })
    } else if (this.data.title == '添加电话2') {
      wx.getStorage({
        key: 'Patientlist',
        success: function (res) {
          arr = res.data
          arr.iphone2 = self.data.iphone2
          wx.setStorage({
            key: 'Patientlist',
            data: arr,
          })
        },
      })
    } else if (this.data.title == '修改地址') {
      wx.getStorage({
        key: 'Patientlist',
        success: function (res) {
          arr = res.data
          arr.address = self.data.address
          wx.setStorage({
            key: 'Patientlist',
            data: arr,
          })
        },
      })
    } else if (this.data.title == '修改备注') {
      wx.getStorage({
        key: 'Patientlist',
        success: function (res) {
          arr = res.data
          arr.remarks = self.data.remarks
          wx.setStorage({
            key: 'Patientlist',
            data: arr,
          })
        },
      })
    } else if (this.data.title == '添加身份证') {
      wx.getStorage({
        key: 'informationlist',
        success: function (res) {
          arr = res.data
          arr.IDCard = self.data.IDCard
          wx.setStorage({
            key: 'informationlist',
            data: arr,
          })
        },
      })
    } else if (this.data.title == '添加社保号') {
      wx.getStorage({
        key: 'informationlist',
        success: function (res) {
          arr = res.data
          arr.socialcard = self.data.socialcard
          wx.setStorage({
            key: 'informationlist',
            data: arr,
          })
        },
      })
    } else if (this.data.title == '添加介绍人') {
      wx.getStorage({
        key: 'informationlist',
        success: function (res) {
          arr = res.data
          arr.Introducer = self.data.Introducer
          wx.setStorage({
            key: 'informationlist',
            data: arr,
          })
        },
      })
    } else if (this.data.title == '添加洁牙习惯') {
      wx.getStorage({
        key: 'informationlist',
        success: function (res) {
          arr = res.data
          arr.Habit = self.data.Habit
          wx.setStorage({
            key: 'informationlist',
            data: arr,
          })
        },
      })
    } else if (this.data.title == '添加就诊经历') {
      wx.getStorage({
        key: 'informationlist',
        success: function (res) {
          arr = res.data
          arr.experience = self.data.experience
          wx.setStorage({
            key: 'informationlist',
            data: arr,
          })
        },
      })
    } else if (this.data.title == '患者印象') {
      wx.getStorage({
        key: 'informationlist',
        success: function (res) {
          arr = res.data
          let text = '';
          for(let i=0;i<self.data.impression_arr.length;i++){
            if (self.data.impression_arr[i].state !=0){
              text += self.data.impression_arr[i].title + ','
            }
          }
          arr.impression = text
          wx.setStorage({
            key: 'informationlist',
            data: arr,
          })
        },
      })
    } else if (this.data.title == '过敏史模板') {
      wx.getStorage({
        key: 'informationlist',
        success: function (res) {
          arr = res.data
          let text = '';
          for (let i = 0; i < self.data.allergy_arr.length; i++) {
            if (self.data.allergy_arr[i].state != 0) {
              text += self.data.allergy_arr[i].title + ','
            }
          }
          arr.allergy = text
          wx.setStorage({
            key: 'informationlist',
            data: arr,
          })
        },
      })
    } else if (this.data.title == '既往史模板') {
      wx.getStorage({
        key: 'informationlist',
        success: function (res) {
          arr = res.data
          let text = '';
          for (let i = 0; i < self.data.past_arr.length; i++) {
            if (self.data.past_arr[i].state != 0) {
              text += self.data.past_arr[i].title + ','
            }
          }
          arr.past = text
          wx.setStorage({
            key: 'informationlist',
            data: arr,
          })
        },
      })
    } else if (this.data.title == '添加过敏史') {
      wx.getStorage({
        key: 'informationlist',
        success: function (res) {
          arr = res.data
          arr.allergy = self.data.allergy
          wx.setStorage({
            key: 'informationlist',
            data: arr,
          })
        },
      })
    } else if (this.data.title == '添加既往史') {
      wx.getStorage({
        key: 'informationlist',
        success: function (res) {
          arr = res.data
          arr.past = self.data.past
          wx.setStorage({
            key: 'informationlist',
            data: arr,
          })
        },
      })
    } else if (this.data.title == '添加顾客要求') {
      wx.getStorage({
        key: 'informationlist',
        success: function (res) {
          arr = res.data
          arr.ask = self.data.ask
          wx.setStorage({
            key: 'informationlist',
            data: arr,
          })
        },
      })
    }
    self.onClickLeft()
  },
  nameipt(e){
    this.setData({ name: e.detail.value})
  },
  ageipt(e) {
    this.setData({ age: e.detail.value })
  }, 
  hobbyipt(e) {
    this.setData({ hobby: e.detail.value })
  },
  Economicipt(e) {
    this.setData({ Economic: e.detail.value })
  },
  qqipt(e) {
    this.setData({ qq: e.detail.value })
  },
  mailboxipt(e) {
    this.setData({ mailbox: e.detail.value })
  },
  iphone1ipt(e) {
    this.setData({ iphone1: e.detail.value })
  }, 
  iphone2ipt(e) {
    this.setData({ iphone2: e.detail.value })
  },
  addressipt(e) {
    this.setData({ address: e.detail.value })
  }, 
  remarksipt(e) {
    this.setData({ remarks: e.detail.value })
  }, 
  IDCardipt(e) {
    this.setData({ IDCard: e.detail.value })
  }, 
  socialcardipt(e) {
    this.setData({ socialcard: e.detail.value })
  },
  Introduceript(e) {
    this.setData({ Introducer: e.detail.value })
  },
  Habitipt(e) {
    this.setData({ Habit: e.detail.value })
  },
  allergyipt(e) {
    this.setData({ allergy: e.detail.value })
  },
  pastipt(e) {
    this.setData({ past: e.detail.value })
  },
  askipt(e) {
    this.setData({ ask: e.detail.value })
  },
  experienceipt(e) {
    this.setData({ experience: e.detail.value })
  },
  projectclick(e){
    console.log(e.currentTarget.dataset.text)
    let text = e.currentTarget.dataset.text
    let self = this
    let arr
    wx.getStorage({
      key: 'Patientlist',
      success: function (res) {
        arr = res.data
        arr.check_project = text
        wx.setStorage({
          key: 'Patientlist',
          data: arr,
        })
        self.onClickLeft()
      },
    })
  },
  Occupationclick(e){
    let text = e.currentTarget.dataset.text
    let self = this
    let arr
    wx.getStorage({
      key: 'Patientlist',
      success: function (res) {
        arr = res.data
        arr.check_Occupation = text
        wx.setStorage({
          key: 'Patientlist',
          data: arr,
        })
        self.onClickLeft()
      },
    })
  },
  Educationclick(e) {
    let text = e.currentTarget.dataset.text
    let self = this
    let arr
    wx.getStorage({
      key: 'Patientlist',
      success: function (res) {
        arr = res.data
        arr.check_Education = text
        wx.setStorage({
          key: 'Patientlist',
          data: arr,
        })
        self.onClickLeft()
      },
    })
  },
  ascriptionclick1(e) {
    let text = e.currentTarget.dataset.text
    let self = this
    let arr
    wx.getStorage({
      key: 'Patientlist',
      success: function (res) {
        arr = res.data
        arr.check_ascription1 = text
        wx.setStorage({
          key: 'Patientlist',
          data: arr,
        })
        self.onClickLeft()
      },
    })
  },
  ascriptionclick2(e) {
    let text = e.currentTarget.dataset.text
    let self = this
    let arr
    wx.getStorage({
      key: 'Patientlist',
      success: function (res) {
        arr = res.data
        arr.check_ascription2 = text
        wx.setStorage({
          key: 'Patientlist',
          data: arr,
        })
        self.onClickLeft()
      },
    })
  }, 
  Consultantclick(e) {
    let text = e.currentTarget.dataset.text
    let self = this
    let arr
    wx.getStorage({
      key: 'informationlist',
      success: function (res) {
        arr = res.data
        arr.Consultant = text
        wx.setStorage({
          key: 'informationlist',
          data: arr,
        })
        self.onClickLeft()
      },
    })
  },
  powergridclick(e) {
    let text = e.currentTarget.dataset.text
    let self = this
    let arr
    wx.getStorage({
      key: 'informationlist',
      success: function (res) {
        arr = res.data
        arr.powergrid = text
        wx.setStorage({
          key: 'informationlist',
          data: arr,
        })
        self.onClickLeft()
      },
    })
  },
  impressionclick(e) {
    let index = e.currentTarget.dataset.index
    let arr = this.data.impression_arr
    arr[index].state = arr[index].state==0?1:0
    this.setData({ impression_arr:arr})
  },
  allergyclick(e) {
    let index = e.currentTarget.dataset.index
    let arr = this.data.allergy_arr
    arr[index].state = arr[index].state == 0 ? 1 : 0
    this.setData({ allergy_arr: arr })
  },
  pastclick(e) {
    let index = e.currentTarget.dataset.index
    let arr = this.data.past_arr
    arr[index].state = arr[index].state == 0 ? 1 : 0
    this.setData({ past_arr: arr })
  },
  Matterclick(e) {
    let index = e.currentTarget.dataset.index
    let arr = this.data.Matter_arr
    arr[index].state = arr[index].state == 0 ? 1 : 0
    this.setData({ Matter_arr: arr })
  },
  timeclick(e){
    let index = e.currentTarget.dataset.index
    console.log(this.data.time_start)
    console.log(this.data.time_end)

    if (this.data.time_start != '' && this.data.time_end != '') {
      this.setData({ time_end: '', time_start: index })
    }
    if (this.data.time_start != index && this.data.time_start < index){
      this.setData({ time_end:index })
    }
    if (this.data.time_start != index && this.data.time_start > index) {
      this.setData({ time_end: this.data.time_start, time_start:index})
      console.log(this.data.time_end)
    }
  },


  lxclick(){
    this.onClickLeft()
  }, nrclick() {
    this.onClickLeft()
  }, jgclick() {
    this.onClickLeft()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ title:options.title})
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