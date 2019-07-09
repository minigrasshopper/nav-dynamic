# nav-dynamic
微信小程序自定义nav头部组件；适配全面屏设计；满足页面滚动时，动态渲染组件样式；

## 实现功能
1. 当初始进入页面时，展示初始状态下的nav样式；当页面滚动时，监听页面滚动事件，展示滚动状态下的nav样式；
2. 根据配置字段值、页面栈数量，展示“返回”图标
3. 根据配置字段值、页面栈数量，展示“首页”图标

## 字段说明
* navBackgroundInit: '#ffffff',
	- String类型；导航栏背景颜色（初始值）；进入页面时，展示的背景颜色；
	- 当nav要设置透明时，可设置成'transparent';
* navBackgroundRoll: '#000000',
	- String类型；导航栏背景颜色（滚动值）；滚动页面时，展示的背景颜色；
	- 当nav要设置透明时，可设置成'transparent';
* titleColorInit: '#ffffff',
	- String类型；文本颜色（初始值）；进入页面时，展示的文本颜色；
	- 只能设置成16进制，不可简写，栗子：'#ffffff'不能简写成'#fff'，
* titleColorRoll: '#000000',
	- String类型；文本颜色（滚动值）；滚动页面时，展示的文本颜色；
	- 只能设置成16进制，不可简写，栗子：'#ffffff'不能简写成'#fff'，
* titleTextInit: '初始标题',
- String类型；标题文本（初始值）；进入页面时，展示的标题文本；
* titleTextRoll: '滚动标题',
- String类型；标题文本（滚动值）；滚动页面时，展示的标题文本；
* historyShow: true,
- Boolean类型；历史图标是否显示；
- 值为false，隐藏图标；值为true，当页面栈数量小于2时，隐藏图标，否则，显示图标；
* scrollMin: 50,
- Number类型；最小滚动间距；单位px；
- 当页面滚动距离小于scrollMin时；组件的opacity值为0；
* scrollMax: 200,
- Number类型；最大滚动间距；单位px；
- 当页面滚动距离大于scrollMax时；组件的opacity值为1；
* homeShow: false,
- Boolean类型；是否展示home图标；
- 值为false，隐藏图标；值为true，还要设置homeJudgeStack再行判断；
* homeJudgeStack: true,
- Boolean类型；home图标展示是否判断页面栈；
- 值为false，显示图标；值为true，当页面栈数量小于2时，显示图标，否则，隐藏图标；
* homePath: '/pages/findModule/pages/index/index',
- String类型；home页面路径；
* homeColorInit: 'white',
- String类型；home图标颜色（初始值）；进入页面时，展示的home图标颜色；取值：white / black；
* homeColorRoll: 'black',
- String类型；home图标颜色（滚动值）；滚动页面时，展示的home图标颜色；取值：white / black；

## 方法说明


## 使用方法
#### 1、在app.json中全局配置组件
```
"usingComponents": {
    "comp-nav-dynamic": "/components/nav-dynamic/nav-dynamic"
},
```
#### 2、在页面的wxml中引入组件
```
<comp-nav-dynamic id='comp-nav-dynamic'></comp-nav-dynamic>
```
#### 3、在页面的js中使用 this.selectComponent('#comp-nav-dynamic') 方法获取组件实例，并调用setOptions方法配置参数；然后在页面的onLoad生命周期中调用；当页面有滚动修改nav组件样式需求时，在页面的onPageScroll的页面方法中，调用组件的scrollHandle方法；
```
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
      titleColorInit: '#ffffff', // 标题颜色-初始值 16进制
      titleColorRoll: '#000000', // 标题颜色-滚动值 16进制
      titleTextInit: '初始文本', // 标题文字-初始值
      titleTextRoll: '滚动文本', // 标题文字-滚动值
      historyShow: true, // 历史图标是否显示
      scrollMin: 50, // 最小滚动间距，单位px
      scrollMax: 200, // 最大滚动间距，单位px
      homeShow: true, // 是否展示home图标
      homeJudgeStack: true, // home图标展示是否判断页面栈
      homePath: '/pages/findModule/pages/index/index', // 默认的home页面
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
```