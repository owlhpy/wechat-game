var num = 15//计时  
var strH = ''
var strM = ''
var strS = ''
var timer = '' 
var isRight = []
var userClick = []
var score = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listitem:[
      { name: "boom", src:"/sounds/boom.wav",id:0,picsrc:"/img/boom.jpg"},
      { name: "clap", src: "/sounds/clap.wav", id: 1, picsrc: "/img/clap.jpg"},
      { name: "hihat", src: "/sounds/hihat.wav", id: 2, picsrc: "/img/hihat.jpg"},
      { name: "tom", src: "/sounds/tom.wav", id: 3, picsrc: "/img/tom.jpg"}
    ],
    check:true,
    randomitem:[
      0,1,2,3
    ],
    timeText:"",
    showscore:"",
    userpic:"",
    nickname:"",
    isable:false,
    finalscore:0
  },
  zeroFill(str, n) {
    //补零方法，str为数字字符串 n为需要的位数，不够补零  
    if (str.length < n) {
      str = '0' + str
    }
    return str
  } ,
  check(){
    var user = userClick.toString();
    var server = isRight.toString()
    if (user==server) {
      ++score
     this.setData({showscore:score})
     this.setData({isable:false})
    } else {
      console.log('no')
      this.setData({ isable: false })
    }
  },
  move() {
    if(num==1){
      this.check()
    }
    //时  
    strH = this.zeroFill('' + parseInt(num / 3600 % 24), 2)
    //分  
    strM = this.zeroFill('' + parseInt(num / 60 % 24), 2)
    //秒  
    strS = this.zeroFill('' + parseInt(num % 60), 2)
    //赋值给text内容  
    this.setData({
      timeText: strH + ':' + strM + ':' + strS
    })
    //当时间归零停止计时器  
    if (num == 0) {
      clearInterval(timer)
      num = 15
      return
    }
    //每秒递减  
    num--
  }, 
  zeroFill(str, n) {
    //补零方法，str为数字字符串 n为需要的位数，不够补零  
    if (str.length < n) {
      str = '0' + str
    }
    return str
  } ,
  RandomNumBoth:function(Min,Max){
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
  },
  player:function(e){
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = e.currentTarget.dataset.url
    userClick.push(e.currentTarget.dataset.id)
    console.log(userClick)
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    
  },
 navigateto:function(){
    wx.navigateTo({
      url: '../final/final',
    })
 },
 preok:function(){
 num = 0
 clearInterval(timer)
 this.move()
 this.check()
 return 
 },
  startplay: function(e){
    isRight = []
    userClick = []
    this.move()
    timer = setInterval(this.move, 1000); 
    this.setData({isable:true})
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    var i = this.RandomNumBoth(0, 3);
    console.log(i)
    
    innerAudioContext.src = this.data.listitem[i].src
    var counttime = 0;
    innerAudioContext.onEnded(()=>{
      if(counttime>1)
      {
           innerAudioContext.offEnded()
           
      }
        var i = this.RandomNumBoth(0, 3);
        
        innerAudioContext.src = this.data.listitem[i].src
        counttime+=innerAudioContext.duration
        isRight.push(i);
        console.log(isRight)
        
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              that.setData({ userpic: res.userInfo.avatarUrl })
              that.setData({nickname:res.userInfo.nickName})
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    isRight = []
    userClick = []
   
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