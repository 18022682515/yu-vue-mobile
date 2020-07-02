# yu-vue-mobile

*vue移动端组件*

### 安装
```
cnpm install yu-vue-mobile --save
```

### 入口文件main.js引入插件
```javascript
import Vue from 'vue';
import Plugin from 'yu-vue-mobile';   
Vue.use(new Plugin());              //引入
```


### 增加的移动端事件（tag）：手指轻触屏幕触发
```javascript
<!-- 原生js绑定事件 -->
let div = document.querySelector('div');
div.addEventListener('tag',e=>{});
div.ontag = function(e){}

<!-- vue绑定事件 -->
<div @tag="fn"></div>
```


### 引入阿里图标库（支持多色图标）
```javascript
/* 在引入本插件时，传阿里图标项目的symbol地址 */
Vue.use(new Plugin('//at.alicdn.com/t/font_1139100_jyj7qajl4q.js')); 

/* 使用： */
<yu-icon icon="icon-taobao"></yu-icon>
/* "icon-taobao" 是某个图标的名称 */
```


### 图片懒加载：img元素出现在可视区域时才开始加载，兼容ie9
```html
<img v-lazy="src">

src:require('./xxx.jpg')
/* 
如果浏览器不支持IntersectionObserver，则默认启用window的scroll事件；
如果你的根滚动元素不是window,而是id为'#xxx'的元素；
可以在引入本插件时，提供你的根滚动元素id。
该元素也可以是vue组件中的元素，不用担心元素是否已在浏览器渲染的问题。
提供根滚动元素id，举例：Vue.use(new Plugin(),{ root:'#xxx' }) 
*/
```



### 轮播图
```html
<!-- 水平方向 -->
<yu-slide :imgs="imgs" width="300px" ></yu-slide>

imgs:[ require('./1.jpg'), require('./2.jpg') ],  //轮播图片数组
width:"300px"   //轮播窗口的宽度

<!-- 垂直方向 -->
<yu-slide y :imgs="imgs" width="300px"></yu-slide>
```


### vue的过渡动画
```html
<yu-transition name="left">
	<div v-show="show"></div>
</yu-transition>

name:'left'|'right'|'left-right'|'right-left'|'opacity'|'top'|'bottom'|'top-bottom'|'bottom-top', //元素进入和离开的过渡动画
show:true|false  //控制div是否显示
```


### 组件缓存（封装了keep-alive和transition）
```html
<yu-cache name="left">
	<v-test v-if="show"></v-test>
</yu-cache>

import vTest from './test.vue'
components:{ vTest },
show:true|false		//控制vTest组件激活或停用，会触发vTest的勾子函数activated或deactivated
```



### 路由页面渲染：router-view
```html
<!-- 加了过渡动画的router-view -->
<yu-view transition="left"></yu-view>   

transition:'left'|'right'|'left-right'|'right-left'|'opacity'|'top'|'bottom'|'top-bottom'|'bottom-top', //页面进入和离开的过渡动画

<!-- 如果是命名视图 -->
<yu-view name="a"></yu-view>
name:'a',   //{path:"/",components:{ a:a组件 }},渲染a组件

<!-- 绝对定位占满父元素 -->
<yu-view fill></yu-view>   

<!-- 显示在视图最前面，z-index:1 -->
<yu-view front></yu-view>
```


### 路由组件的容器
```html
<!-- 本组件对应的路由路径，必写 -->
<yu-route-page path="/">路由页面内容</yu-route-page>

<!-- 有返回图标，点击执行$router.go(-1) -->
<yu-route-page back>路由页面内容</yu-route-page>

<!-- 子路由组件的过渡动画 -->
<yu-route-page transition="right">路由页面内容</yu-route-page>

<!-- router-view渲染指定name的子路由组件 -->
<yu-route-page name="default">路由页面内容</yu-route-page>

<!-- router-view是本组件内的第一个子元素，（没有top则是最后一个子元素） -->
<yu-route-page top>路由页面内容</yu-route-page>

<!-- 子路由组件置于视觉最前那层，z-index:1 -->
<yu-route-page front>路由页面内容</yu-route-page>

<!-- 子路由组件全屏显示 -->
<yu-route-page fill>路由页面内容</yu-route-page>
```


### 遮罩层(透明黑色)
```html
<yu-shade v-model="show"></yu-shade>

show:true|false
```



### 下拉刷新、上拉加载
```html
<yu-pull @pull-down="downFn" @pull-up="upFn">
    <p>1</p>
    <p>2</p>
    <p>3</p>
    <p>4</p>
</yu-pull>

@pull-down  //当用户下拉刷新时，触发事件
downFn(child){
    setTimeout(()=>{
		child.load = false; //刷新完成，关闭"加载中"样式
	},1000);
}
@pull-up    //当滚动条到底部时，触发事件
```

### 侧边栏
```html
//左侧边栏，占屏幕宽度50%
<yu-left v-model="show" :size="50"></yu-left>

//右侧边栏，占屏幕宽度100%
<yu-right v-model="show" :size="100"></yu-right>

//上侧边栏，占屏幕高度50%
<yu-top v-model="show" :size="50"></yu-top>

//下侧边栏，占屏幕高度50%
<yu-bottom v-model="show" :size="50"></yu-bottom>

show:true  //本组件是否显示
```


### 滑动切换(同级)路由页面
```html
<!-- 水平方向滑动 -->
<yu-slide-view v-model="name" :paths="paths" ></yu-slide-view>

name:'left-right'   //切换页面的过渡动画
paths:[ '/a','/b','/c' ]   // 同级的路由路径

<!-- 垂直方向滑动 -->
<yu-slide-view y v-model="name" :paths="paths" ></yu-slide-view>
```


### 导航选项
```html
<yu-touch-title :titles="titles" v-model="index"></yu-touch-title>

titles:['page0','page1','page2','page3'],
index:0 当前高亮的选项——titles[0]
```

### 横向滑动切换页面
```html
<yu-touch-x v-model="index">
    <div class="page0">0</div>
    <div class="page1">1</div>
    <div class="page2">2</div>
    <div class="page3">3</div>
</yu-touch-x>

index:0,  //当前显示页面索引(.page0)
```

### 纵向滑动切换页面
```html
<yu-touch-y v-model="index">
    <div class="page0">0</div>
    <div class="page1">1</div>
    <div class="page2">2</div>
    <div class="page3">3</div>
</yu-touch-y>

index:0,  //当前显示页面索引(.page0)
```

### 标签页
```html
//横向标签页
<yu-tab-x :titles="titles" :default="0" height="100px">
	<div>标签名0的内容</div>
	<div>标签名1的内容</div>
	<div>标签名2的内容</div>
</yu-tab-x>

//纵向标签页
<yu-tab-y :titles="titles" :default="0" height="100px">
	<div>标签名0的内容</div>
	<div>标签名1的内容</div>
	<div>标签名2的内容</div>
</yu-tab-y>

titles:['标签名0','标签名1','标签名2'],
default:0,  //默认选中第一项：'标签名0'
height:"100px"||"auto"  //标签内容的高度100px,默认是"auto"
```



### 表单弹框
```html
<yu-form 
	v-model="show" 
	title="用户注册" 
	:img="require('public/1.jpg')" 
	:labels="['用户','密码','确认密码','手机','邮箱','验证码']" 
	@submit="fn">
</yu-form>

show:true|false,  //控制该弹框是否显示
title:'',   //表单标题
img:'',     //验证码图片的src
labels:[],  //有哪些input输入框

@submit:function(arr){},   //点击表单的提交按钮时触发本事件
<!-- 事件回调函数的参数arr说明： -->
<!-- 
[ 
	{ allow:true, text:'用户', type:'username', value:'' }, 
	{ allow:true, text:'密码', type:'password', value:'' },
	……
] 
-->
<!-- allow:false,则对应的input的border变红 -->
<!-- value:'',是用户在input输入框的输入内容 -->
```