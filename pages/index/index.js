Page({
  data: {
    navHeight: 0,
  },
  onLoad() {
    this.setNav();
  },
  setNav() {
    this.selectComponent('#comp-nav-dynamic').setOptions({
      navBackgroundInit: '#000000', // 导航栏背景颜色-初始值
      navBackgroundRoll: '#ffffff', // 导航栏背景颜色-滚动值
      titleColorInit: '#ffffff', // 文本颜色-初始值 16进制
      titleColorRoll: '#000000', // 文本颜色-滚动值 16进制
      titleTextInit: '初始标题', // 标题文字-初始值
      titleTextRoll: '滚动标题', // 标题文字-滚动值
      historyShow: true, // 历史图标是否显示
      scrollMin: 50, // 最小滚动间距，单位px
      scrollMax: 200, // 最大滚动间距，单位px
      homeShow: true, // home图标是否显示
      homeJudgeStack: false, // home图标显示是否判断页面栈
      homePath: '/pages/index/index', // home页面路径
      homeColorInit: 'white', // home图标颜色-初始值 white / black
      homeColorRoll: 'black', // home图标颜色-滚动值 white / black
    })
    this.setData({
      navHeight: this.selectComponent('#comp-nav-dynamic').getNavHeight(),
    })
  },
  onPageScroll(e) {
    this.selectComponent('#comp-nav-dynamic').scrollHandle(e.scrollTop);
  },
})