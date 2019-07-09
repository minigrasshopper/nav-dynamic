/**
 * 动态变化的nav组件
 */
Component({
  options: {
    multipleSlots: true
  },
  properties: {},
  data: {
    compatible: wx.getSystemInfoSync().SDKVersion > '2.4.3' ? true : true, // 是否兼容，原生最低兼容基础库2.4.3版本，低于限制版本时，隐藏组件
    navHeight: 0, // 导航栏高度，单位px
    statusHeight: 0, // 状态栏高度，单位px
    navOpacity: 0, // 导航栏的透明度 初始=1，到最小滚动点=0，到最大滚动点=1
    titleSize: wx.getSystemInfoSync().fontSizeSetting, // 字体大小
    navBackground: '', // 导航栏背景颜色
    titleColor: '', // 标题颜色
    titleText: '', // 标题文本
    historyShow: false, // 历史图标是否显示
    homeShow: false, // 是否展示home图标
    homePath: '', // 默认的home页面
    homeColor: '', // home图标颜色
    options: {
      navBackgroundInit: '#000000', // 导航栏背景颜色-初始值
      navBackgroundRoll: '#ffffff', // 导航栏背景颜色-滚动值
      titleColorInit: '#ffffff', // 标题颜色-初始值 16进制
      titleColorRoll: '#000000', // 标题颜色-滚动值 16进制
      titleTextInit: '', // 标题文字-初始值
      titleTextRoll: '', // 标题文字-滚动值
      historyShow: true, // 历史图标是否显示
      scrollMin: 50, // 最小滚动间距，单位px
      scrollMax: 200, // 最大滚动间距，单位px
      homeShow: false, // 是否展示home图标
      homeJudgeStack: true, // home图标展示是否判断页面栈
      homePath: '/pages/findModule/pages/index/index', // 默认的home页面
      homeColorInit: 'white', // home图标颜色-初始值 white / black
      homeColorRoll: 'black', // home图标颜色-滚动值 white / black
    },
  },
  attached() {
    this.init();
  },
  methods: {
    init() {
      // 组件初始化
      this.initData();
      this.setNavHeight();
    },
    initData() {
      // 更新data数据
      this.setData({
        navOpacity: 1,
        navBackground: this.data.options.navBackgroundInit,
        titleColor: this.data.options.titleColorInit,
        titleText: this.data.options.titleTextInit,
        homePath: this.data.options.homePath,
        homeColor: this.data.options.homeColorInit,
      })
      wx.setNavigationBarColor({
        backgroundColor: '',
        frontColor: this.data.titleColor,
      })
      this.updateHistory();
      this.updateHome();
    },
    updateHistory() {
      // 更新历史图标的状态
      if (!this.data.options.historyShow) {
        this.setData({
          historyShow: false
        })
        return
      }
      // 如果页面栈数量小于2，不显示图标
      let routes = getCurrentPages();
      if (routes.length < 2) {
        this.setData({
          historyShow: false
        })
      } else {
        this.setData({
          historyShow: true
        })
      }
    },
    updateHome() {
      // 更新home图标的状态 
      if (!this.data.options.homeShow) {
        this.setData({
          homeShow: false
        })
        return
      }
      // homeShow && !homeJudgeStack，一直显示
      if (this.data.options.homeShow && !this.data.options.homeJudgeStack) {
        this.setData({
          homeShow: true
        })
        return
      }
      // homeShow && homeJudgeStack，如果页面栈数量小于2，显示图标
      if (this.data.options.homeShow && this.data.options.homeJudgeStack) {
        let routes = getCurrentPages();
        if (routes.length < 2) {
          this.setData({
            homeShow: true
          })
        } else {
          this.setData({
            homeShow: false
          })
        }
        return
      }
    },
    setNavHeight() {
      // 设置nav高度 = 状态栏高度 + 定值
      if (!this.data.compatible) {
        this.data.navHeight = 0;
        return
      }
      let statusHeight = wx.getSystemInfoSync().statusBarHeight;
      this.setData({
        navHeight: statusHeight + 45,
        statusHeight: statusHeight,
      })
    },
    getNavHeight() {
      // 获取导航栏高度px
      return this.data.navHeight;
    },
    setOptions(options = {}) {
      // 设置options参数
      let target = JSON.parse(JSON.stringify(this.data.options));
      Object.assign(target, options);
      this.data.options = target;
      this.initData();
    },
    scrollHandle(scrollTop) {
      // 页面滚动事件回调
      let navOpacity = '';
      let navBackground = '';
      let titleColor = '';
      let titleText = '';
      let homeColor = '';
      if (scrollTop < this.data.options.scrollMin) {
        navOpacity = 1;
        navBackground = this.data.options.navBackgroundInit;
        titleColor = this.data.options.titleColorInit;
        titleText = this.data.options.titleTextInit;
        homeColor = this.data.options.homeColorInit;
      } else if (scrollTop > this.data.options.scrollMax) {
        navOpacity = 1;
        navBackground = this.data.options.navBackgroundRoll;
        titleColor = this.data.options.titleColorRoll;
        titleText = this.data.options.titleTextRoll;
        homeColor = this.data.options.homeColorRoll;
      } else {
        navOpacity = (scrollTop - this.data.options.scrollMin) / (this.data.options.scrollMax - this.data.options.scrollMin);
        navBackground = this.data.options.navBackgroundRoll;
        titleColor = this.data.options.titleColorRoll;
        titleText = this.data.options.titleTextRoll;
        homeColor = this.data.options.homeColorRoll;
      }
      this.setData({
        navOpacity,
        navBackground,
        titleColor,
        titleText,
        homeColor,
      })
      wx.setNavigationBarColor({
        backgroundColor: '',
        frontColor: this.data.titleColor,
      })
    },
    historyHandle() {
      // 触发返回按钮
      wx.navigateBack();
    },
    homeHandle(){
      // 跳转home路由
      let url = this.data.homePath;
      wx.switchTab({
        url,
        fail: () => {
          // switchTab失败回调
          wx.redirectTo({
            url,
            fail: () => {
              // redirectTo失败回调
              wx.reLaunch({
                url,
              })
            }
          })
        }
      })
    }
  }
})