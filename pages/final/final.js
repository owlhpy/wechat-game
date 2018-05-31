// pages/final/final.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  score:"",
  userpic:"",
  nickname:"",
  userlevel:""
  },

  testlevel:function(level){
 if(level==0){
   this.setData({userlevel:"音痴"})
 }else if(level>1&&level<=4){
   this.setData({ userlevel: "初级音乐人" })
 }else{
   this.setData({ userlevel: "超级棒棒" })
 }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.setData({
    score:options.score
  })
  var that = this

  wx.getSetting({
    success: function (res) {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称
        wx.getUserInfo({
          success: function (res) {
            console.log(res.userInfo)
            that.setData({ userpic: res.userInfo.avatarUrl })
            that.setData({ nickname: res.userInfo.nickName })
          }
        })
      }
    }
  })
  this.testlevel(options.score)
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