// pages/Patientedit/index.js

Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '患者详情',
    btnstate:false,
    iptstate:false,
    textstate:false,
    iptvalue: '',
    textvalue: '',


    prevpage:'',
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
    jg_arr: ['少量出血', '无不适', '牙微疼痛'],

    gt_arr: ['咨询沟通', '投诉',],
    jbxq_arr:[
      { title: '补牙', state: 0 },
      { title: '拔牙', state: 0 }
    ],
     qzxq_arr: [
      { title: '补牙', state: 0 },
       { title: '拔牙', state: 0 },
       { title: 'RTC', state: 0 }
    ],

    bjfz_arr: ['健康宣教', '最近患者', '治疗完成'],
    activity_arr: [
      { title: '会员卡活动', state: 0 },
    ]
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
      let list = self.data.prevpage.data.Patientlist
      list.name = self.data.iptvalue
      self.data.prevpage.setData({
        Patientlist: list
      })
      console.log(self.data.prevpage.data)
    } else if (this.data.title == '添加年龄') {
      let list = self.data.prevpage.data.Patientlist
      list.age = self.data.iptvalue
      self.data.prevpage.setData({
        Patientlist: list
      })
    } else if (this.data.title == '添加兴趣爱好') {
      let list = self.data.prevpage.data.Patientlist
      list.hobby = self.data.iptvalue
      self.data.prevpage.setData({
        Patientlist: list
      })
    } else if (this.data.title == '添加经济实力') {
      let list = self.data.prevpage.data.Patientlist
      list.Economic = self.data.iptvalue
      self.data.prevpage.setData({
        Patientlist: list
      })
    } else if (this.data.title == '添加QQ号码') {
      let list = self.data.prevpage.data.Patientlist
      list.qq = self.data.iptvalue
      self.data.prevpage.setData({
        Patientlist: list
      })
    } else if (this.data.title == '添加电子邮箱') {
      let list = self.data.prevpage.data.Patientlist
      list.mailbox = self.data.iptvalue
      self.data.prevpage.setData({
        Patientlist: list
      })
    } else if (this.data.title == '添加电话1') {
      let list = self.data.prevpage.data.Patientlist
      list.iphone1 = self.data.iptvalue
      self.data.prevpage.setData({
        Patientlist: list
      })
    } else if (this.data.title == '添加电话2') {
      let list = self.data.prevpage.data.Patientlist
      list.iphone2 = self.data.iptvalue
      self.data.prevpage.setData({
        Patientlist: list
      })
    } else if (this.data.title == '修改地址') {
      let list = self.data.prevpage.data.Patientlist
      list.address = self.data.textvalue
      self.data.prevpage.setData({
        Patientlist: list
      })
    } else if (this.data.title == '修改备注') {
      if (self.data.prevpage.data.patdetails){
        let list = self.data.prevpage.data.patdetails
        list.remark = self.data.textvalue
        self.data.prevpage.setData({
          patdetails: list
        })
      }else{
        let list = self.data.prevpage.data.Patientlist
        list.remarks = self.data.textvalue
        self.data.prevpage.setData({
          Patientlist: list
        })
      }
    } else if (this.data.title == '添加身份证') {
      let list = self.data.prevpage.data.informationlist
      list.IDCard = self.data.iptvalue
      self.data.prevpage.setData({
        informationlist: list
      })
    } else if (this.data.title == '添加社保号') {
      let list = self.data.prevpage.data.informationlist
      list.socialcard = self.data.iptvalue
      self.data.prevpage.setData({
        informationlist: list
      })
    } else if (this.data.title == '添加介绍人') {
      let list = self.data.prevpage.data.informationlist
      list.Introducer = self.data.iptvalue
      self.data.prevpage.setData({
        informationlist: list
      })
    } else if (this.data.title == '添加洁牙习惯') {
      let list = self.data.prevpage.data.informationlist
      list.Habit = self.data.iptvalue
      self.data.prevpage.setData({
        informationlist: list
      })
    } else if (this.data.title == '添加就诊经历') {
      let list = self.data.prevpage.data.informationlist
      list.experience = self.data.iptvalue
      self.data.prevpage.setData({
        informationlist: list
      })
    } else if (this.data.title == '患者印象') {
      let list = self.data.prevpage.data.informationlist
      let arr = self.data.impression_arr
      let arr1 = ''
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].state == 1) {
          arr1+=arr[i].title+'、'
        }
      }
      list.impression = arr1
      self.data.prevpage.setData({
        informationlist: list
      })
    } else if (this.data.title == '过敏史模板') {
      let list = self.data.prevpage.data.informationlist
      let arr = self.data.allergy_arr
      let arr1 = ''
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].state == 1) {
          arr1 += arr[i].title + '、'
        }
      }
      list.allergy = arr1
      self.data.prevpage.setData({
        informationlist: list
      })
    } else if (this.data.title == '既往史模板') {
      let list = self.data.prevpage.data.informationlist
      let arr = self.data.past_arr
      let arr1 = ''
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].state == 1) {
          arr1 += arr[i].title + '、'
        }
      }
      list.past = arr1
      self.data.prevpage.setData({
        informationlist: list
      })
    } else if (this.data.title == '添加过敏史') {
      let list = self.data.prevpage.data.informationlist
      list.allergy = self.data.textvalue
      self.data.prevpage.setData({
        informationlist: list
      })
    } else if (this.data.title == '添加既往史') {
      let list = self.data.prevpage.data.informationlist
      list.past = self.data.textvalue
      self.data.prevpage.setData({
        informationlist: list
      })
    } else if (this.data.title == '添加顾客要求') {
      let list = self.data.prevpage.data.informationlist
      list.ask = self.data.textvalue
      self.data.prevpage.setData({
        informationlist: list
      })
    } else if (this.data.title == '上下班时间') {
      self.data.prevpage.setData({
        time: self.data.time_arr[self.data.time_start] + '~' + self.data.time_arr[self.data.time_end]
      })
    } else if (this.data.title == '添加回访内容') {
      self.data.prevpage.setData({
        visitcontent:self.data.textvalue
      })
    } else if (this.data.title == '添加回访结果') {
      self.data.prevpage.setData({
        visitresult: self.data.textvalue
      })
    } else if (this.data.title == '就诊时长') {
      self.data.prevpage.setData({
        Duration: self.data.time_arr[self.data.time_start] + '~' + self.data.time_arr[self.data.time_end]
      })
    } else if (this.data.title == '选择事项') {
      let arr = self.data.Matter_arr
      let arr1 = []
      for(let i =0;i<arr.length;i++){
        if(arr[i].state == 1){
          arr1.push(arr[i].title)
        }
      }
      self.data.prevpage.setData({
        Matter: arr1
      })
    } else if (this.data.title == '输入预约备注信息') {
      self.data.prevpage.setData({
        orderbz: self.data.textvalue
      })
    } else if (this.data.title == '优惠活动') {
      let list = self.data.prevpage.data.detailed
      let arr = self.data.activity_arr
      let arr1 = ''
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].state == 1) {
          arr1 += arr[i].title + '、'
        }
      }
      list.activity = arr1
      self.data.prevpage.setData({
        detailed: list
      })
    } else if (this.data.title == '整单折扣') {
      let list = self.data.prevpage.data.detailed
      list.discount = self.data.iptvalue
      list.discountfee = Number(self.data.iptvalue) / 100 * Number(list.discountfee)
      list.payfeetotal = Number(self.data.iptvalue) / 100 * Number(list.payfeetotal)
      for (let i = 0; i < list.handlelist.length;i++){
        list.handlelist[i].discount = self.data.iptvalue
        list.handlelist[i].discountfee = Number(self.data.iptvalue) / 100 * Number(list.handlelist[i].discountfee)
        list.handlelist[i].payfeetotal = Number(self.data.iptvalue) / 100 * Number(list.handlelist[i].payfeetotal)
      }
      self.data.prevpage.setData({
        detailed: list
      })
    } else if (this.data.title == '优惠后金额') {
      let list = self.data.prevpage.data.detailed
      list.discountfee = self.data.iptvalue
      list.payfeetotal = self.data.iptvalue
      self.data.prevpage.setData({
        detailed: list
      })
    } else if (this.data.title == '本次收费') {
      let list = self.data.prevpage.data.detailed
      list.payfeetotal = self.data.iptvalue
      self.data.prevpage.setData({
        detailed: list
      })
    } else if (this.data.title == '添加备注') {
      let list = self.data.prevpage.data.detailed
      list.remark = self.data.textvalue
      self.data.prevpage.setData({
        detailed: list
      })
    } else if (this.data.title == '折扣') {
      let list = self.data.prevpage.data.detailed
      let index = self.data.prevpage.data.childnum
      list.discount = ''
      list.discountfee = list.discountfee - list.handlelist[index].discountfee
      list.payfeetotal = list.payfeetotal - list.handlelist[index].payfeetotal
      list.handlelist[index].discount = Number(self.data.iptvalue)
      list.handlelist[index].discountfee = Number(self.data.iptvalue) / 100 * Number(list.handlelist[index].discountfee)
      list.handlelist[index].payfeetotal = Number(self.data.iptvalue) / 100 * Number(list.handlelist[index].payfeetotal)
      list.discountfee = list.discountfee + list.handlelist[index].discountfee
      list.payfeetotal = list.payfeetotal + list.handlelist[index].payfeetotal
      self.data.prevpage.setData({
        detailed: list
      })
    } else if (this.data.title == '总价') {
      let list = self.data.prevpage.data.detailed
      let index = self.data.prevpage.data.childnum
      list.discountfee = list.discountfee - list.handlelist[index].discountfee
      list.payfeetotal = list.payfeetotal - list.handlelist[index].payfeetotal
      list.handlelist[index].discountfee = Number(self.data.iptvalue)
      list.handlelist[index].payfeetotal = Number(self.data.iptvalue)
      list.discountfee = list.discountfee + list.handlelist[index].discountfee
      list.payfeetotal = list.payfeetotal + list.handlelist[index].payfeetotal
      self.data.prevpage.setData({
        detailed: list
      })
    } else if (this.data.title == '本次项目收费') {
      let list = self.data.prevpage.data.detailed
      let index = self.data.prevpage.data.childnum
      list.discountfee = list.discountfee - list.handlelist[index].discountfee
      list.payfeetotal = list.payfeetotal - list.handlelist[index].payfeetotal
      list.handlelist[index].payfeetotal = Number(self.data.iptvalue)
      list.discountfee = list.discountfee + list.handlelist[index].discountfee
      list.payfeetotal = list.payfeetotal + list.handlelist[index].payfeetotal
      self.data.prevpage.setData({
        detailed: list
      })
    }
    self.onClickLeft()
  },

  ipt(e) {
    console.log(e)
    this.setData({ iptvalue: e.detail.value})
  },
  textipt(e) {
    this.setData({ textvalue: e.detail.value })
  },

  // nameipt(e){
  //   this.setData({ name: e.detail.value})
  // },
  // ageipt(e) {
  //   this.setData({ age: e.detail.value })
  // }, 
  // hobbyipt(e) {
  //   this.setData({ hobby: e.detail.value })
  // },
  // Economicipt(e) {
  //   this.setData({ Economic: e.detail.value })
  // },
  // qqipt(e) {
  //   this.setData({ qq: e.detail.value })
  // },
  // mailboxipt(e) {
  //   this.setData({ mailbox: e.detail.value })
  // },
  // iphone1ipt(e) {
  //   this.setData({ iphone1: e.detail.value })
  // }, 
  // iphone2ipt(e) {
  //   this.setData({ iphone2: e.detail.value })
  // },
  // addressipt(e) {
  //   this.setData({ address: e.detail.value })
  // }, 
  // remarksipt(e) {
  //   this.setData({ remarks: e.detail.value })
  // }, 
  // IDCardipt(e) {
  //   this.setData({ IDCard: e.detail.value })
  // }, 
  // socialcardipt(e) {
  //   this.setData({ socialcard: e.detail.value })
  // },
  // Introduceript(e) {
  //   this.setData({ Introducer: e.detail.value })
  // },
  // Habitipt(e) {
  //   this.setData({ Habit: e.detail.value })
  // },
  // allergyipt(e) {
  //   this.setData({ allergy: e.detail.value })
  // },
  // pastipt(e) {
  //   this.setData({ past: e.detail.value })
  // },
  // askipt(e) {
  //   this.setData({ ask: e.detail.value })
  // },
  // experienceipt(e) {
  //   this.setData({ experience: e.detail.value })
  // },
  projectclick(e){
    let text = e.currentTarget.dataset.text
    let list = this.data.prevpage.data.Patientlist
    list.check_project = e.currentTarget.dataset.text
    this.data.prevpage.setData({
      Patientlist:list
    })
    this.onClickLeft()
  },
  Occupationclick(e) {
    let text = e.currentTarget.dataset.text
    let list = this.data.prevpage.data.Patientlist
    list.check_Occupation = e.currentTarget.dataset.text
    this.data.prevpage.setData({
      Patientlist: list
    })
    this.onClickLeft()
  },
  Educationclick(e) {
    let text = e.currentTarget.dataset.text
    let list = this.data.prevpage.data.Patientlist
    list.check_Education = e.currentTarget.dataset.text
    this.data.prevpage.setData({
      Patientlist: list
    })
    this.onClickLeft()
  },
  ascriptionclick1(e) {
    let text = e.currentTarget.dataset.text
    let list = this.data.prevpage.data.Patientlist
    list.check_ascription1 = e.currentTarget.dataset.text
    this.data.prevpage.setData({
      Patientlist: list
    })
    this.onClickLeft()
  },
  ascriptionclick2(e) {
    let text = e.currentTarget.dataset.text
    let list = this.data.prevpage.data.Patientlist
    list.check_ascription1 = e.currentTarget.dataset.text
    this.data.prevpage.setData({
      Patientlist: list
    })
    this.onClickLeft()
  }, 
  Consultantclick(e) {
    let text = e.currentTarget.dataset.text
    let list = this.data.prevpage.data.informationlist
    list.Consultant = e.currentTarget.dataset.text
    this.data.prevpage.setData({
      informationlist: list
    })
    this.onClickLeft()
  },
  powergridclick(e) {
    let text = e.currentTarget.dataset.text
    let list = this.data.prevpage.data.informationlist
    list.powergrid = e.currentTarget.dataset.text
    this.data.prevpage.setData({
      informationlist: list
    })
    this.onClickLeft()
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


  lxclick(e){
    this.data.prevpage.setData({
      visittype: e.currentTarget.dataset.text
    })
    this.onClickLeft()
  },
  nrclick(e) {
    this.data.prevpage.setData({
      visitcontent: e.currentTarget.dataset.text
    })
    this.onClickLeft()
  }, 
  jgclick(e) {
    console.log(this.data.prevpage.data)
    this.data.prevpage.setData({
      visitresult: e.currentTarget.dataset.text
    })
    this.onClickLeft()
  },



  jbxqclick(e) {
    let index = e.currentTarget.dataset.index
    let arr = this.data.jbxq_arr
    arr[index].state = arr[index].state == 0 ? 1 : 0
    this.setData({ jbxq_arr: arr })
  },
  qzxqclick(e) {
    let index = e.currentTarget.dataset.index
    let arr = this.data.qzxq_arr
    arr[index].state = arr[index].state == 0 ? 1 : 0
    this.setData({ qzxq_arr: arr })
  },
  gtclick() {
    this.onClickLeft()
  },

  bjfzclick() {
    this.onClickLeft()
  },


  activityclick(e) {
    let index = e.currentTarget.dataset.index
    let arr = this.data.activity_arr
    arr[index].state = arr[index].state == 0 ? 1 : 0
    this.setData({ activity_arr: arr })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ title: options.title, btnstate: options.btnstate ? true : false, iptstate: options.iptstate ? true : false, textstate: options.textstate ? true : false})
    wx.setNavigationBarTitle({
      title: options.title
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