// pages/face/face.js
Page({
  timer: null, // 定时器

  /**
   * 页面的初始数据
   */
  data: {

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
    this.startFaceCheck(); // 页面显示时开启
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    this.stopFaceCheck(); // 页面隐藏（跳转）时停止，防止内存泄漏
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    this.stopFaceCheck(); // 页面销毁时停止
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

  },

  startFaceCheck() {
    const ctx = wx.createCameraContext();
    
    // 每 3 秒执行一次拍照比对
    this.timer = setInterval(() => {
      ctx.takePhoto({
        quality: 'low', // 低画质节省流量且后端处理快
        success: (res) => {
          this.uploadAndVerify(res.tempImagePath);
        }
      });
    }, 3000); 
  },

  stopFaceCheck() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },

  uploadAndVerify(path) {
    wx.uploadFile({
      url: 'http://192.168.8.136:8080/api/face/search',
      filePath: path,
      name: 'image',
      success: (res) => {
        // res.data 转成 JSON
        const result = JSON.parse(res.data);
        
        // 返回的状态码是 200 
        if (res.statusCode === 200 && result.success == true) {
          this.stopFaceCheck(); // 停止定时器
          wx.showToast({ title: '验证通过', icon: 'success' });
          // 将后端返回的人名和图片路径拼接到 URL 中
          const name = encodeURIComponent(result.personName);
          const avatar = encodeURIComponent(result.imagePath);
          // 跳转到个人信息页
          setTimeout(() => {
            wx.reLaunch({ 
              url: `/pages/profile/profile?name=${name}&avatar=${avatar}` 
            });
          }, 1000);
        }
      },
      fail: (err) => {
        console.error("验证失败", err);
      }
    });
  }
})