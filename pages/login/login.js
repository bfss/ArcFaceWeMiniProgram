// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: '', 
    pwd: '' 
  },

  inputUser(e) { this.setData({ user: e.detail.value }) },
  inputPwd(e) { this.setData({ pwd: e.detail.value }) },

  handleLogin() {
    // 伪登录
    if (this.data.user === 'admin' && this.data.pwd === '123456') {
      // 弹出提示框
      wx.showModal({
        title: '安全验证',
        content: '为了您的账号安全，请进行人脸识别',
        showCancel: false,
        success: (res) => {
          if (res.confirm) {
            // 跳转到人脸识别页
            wx.navigateTo({ url: '/pages/face/face' });
          }
        }
      });
    } else {
      wx.showToast({ title: '账号或密码错误', icon: 'none' });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})