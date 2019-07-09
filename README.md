# nav-dynamic 
微信小程序自定义nav头部组件；适配全面屏设计；满足页面滚动时，动态渲染组件样式；

## 实现功能
+ 当初始进入页面时，展示初始状态下的nav样式；当页面滚动时，监听页面滚动事件，展示滚动状态下的nav样式；
+ 根据配置字段值、页面栈数量，展示“返回”图标
+ 根据配置字段值、页面栈数量，展示“首页”图标

## 字段说明
* navBackgroundInit: '#ffffff',
>> 字符串类型；导航栏背景颜色（初始值）；进入页面时，展示的背景颜色；
>> 当nav不要设置透明时，可设置成'transparent';
* navBackgroundRoll: '#ffffff', // 导航栏背景颜色-滚动值
* titleColorInit: '#ffffff', // 标题颜色-初始值 16进制
* titleColorRoll: '#000000', // 标题颜色-滚动值 16进制
* titleTextInit: '', // 标题文字-初始值
* titleTextRoll: '', // 标题文字-滚动值
* historyShow: true, // 历史图标是否显示
* scrollMin: 50, // 最小滚动间距（保持初始值，设置为0），单位px
* scrollMax: 200, // 最大滚动间距（保持初始值，设置为0），单位px
* homeShow: false, // 是否展示home图标
* homeJudgeStack: true, // home图标展示是否判断页面栈
* homePath: '/pages/findModule/pages/index/index', // 默认的home页面
* homeColorInit: 'white', // home图标颜色-初始值 white / black
* homeColorRoll: 'black', // home图标颜色-滚动值 white / black

## 使用方法