# nav-dynamic
微信小程序自定义nav头部组件；适配全面屏设计；

## 实现功能
1. 初始进入页面时，展示初始状态下的nav样式；
2. 页面滚动时，监听页面滚动事件，展示滚动状态下的nav样式；
3. 根据配置字段值、页面栈数量，展示“返回”图标；
4. 根据配置字段值、页面栈数量，展示“首页”图标，同时配置“首页路径”；
5. 设置组件插槽，允许开发者在组件上添加任意元素；

## 方法说明
#### getNavHeight()
###### 获取导航栏高度；单位px;

* setOptions(options)
###### 设置组件参数；
options Object

| 参数名称 | 类型 | 默认值 | 说明 | 备注 |
| :----: | :----: | :----: | :----: | :----: |
| navBackgroundInit | String | '#ffffff' | 导航栏背景颜色（初始值） | 当nav要设置透明时，可设置成'transparent' |
| navBackgroundRoll | String | '#000000' | 导航栏背景颜色（滚动值） | 当nav要设置透明时，可设置成'transparent' |
| titleColorInit | String | '#ffffff' | 文本颜色（初始值） | 只能设置成16进制，不可简写 |
| titleColorRoll | String | '#000000' | 文本颜色（滚动值） | 只能设置成16进制，不可简写 |
| titleTextInit | String | '' | 标题文本（初始值） | 无 |
| titleTextRoll | String | '' | 标题文本（滚动值） | 无 |
| historyShow | Boolean | true | 历史图标是否显示 | 值为false，隐藏图标；值为true，当页面栈数量小于2时，隐藏图标，否则，显示图标 |
| scrollMin | Number | 50 | 最小滚动间距 | 当页面滚动距离小于scrollMin时；组件的opacity值为0 |
| scrollMax | Number | 200 | 最大滚动间距 | 当页面滚动距离大于scrollMax时；组件的opacity值为1 |
| homeShow | Boolean | false | home图标是否显示 | 值为false，隐藏图标；值为true，还要设置homeJudgeStack再行判断 |
| homeJudgeStack | Boolean | true | home图标显示是否判断页面栈 | 值为false，显示图标；值为true，当页面栈数量小于2时，显示图标，否则，隐藏图标（homeShow值为true才有意义） |
| homePath | String | '/pages/index/index' | home页面路径 | 无 |
| homeColorInit | String | 'white' | home图标颜色（初始值） | white / black |
| homeColorRoll | String | 'black' | home图标颜色（初始值） | white / black |

* scrollHandle(scrollTop)
###### 页面滚动事件回调；

| 参数名称 | 类型 | 默认值 | 说明 | 备注 |
| :----: | :----: | :----: | :----: | :----: |
| scrollTop | Number | 0 | 页面滚动距离 | 无 |

## 插槽用法
#### 插槽名称：ant-nav-slot
#### 插槽用法
```
<comp-nav-dynamic id='comp-nav-dynamic'>
  <view slot='ant-nav-slot' style='color: red;'>我是插槽</view>
</comp-nav-dynamic>
```

## 使用栗子
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
#### 3、在页面的js中使用 this.selectComponent('#comp-nav-dynamic') 方法获取组件实例，并调用setOptions方法配置参数；然后在页面的onLoad生命周期中调用；当页面有滚动修改nav组件样式需求时，在页面的onPageScroll的页面方法中，调用实例的scrollHandle方法；
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
```