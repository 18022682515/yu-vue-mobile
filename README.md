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

### vue的过渡动画
```html
<yu-transition name="left">
	<div v-if="show"></div>
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
<!-- 加了过渡动画的router-view --><!-- 默认绝对定位占满父元素 -->
<yu-view transition="left"></yu-view>   

transition:'left'|'right'|'left-right'|'right-left'|'opacity'|'top'|'bottom'|'top-bottom'|'bottom-top', //页面进入和离开的过渡动画

<!-- 去掉绝对定位 -->
<yu-view :fill="false"></yu-view>   

<!-- 如果是命名视图 -->
<yu-view name="a"></yu-view>
name:'a',   //{path:"/",components:{ a:a组件 }},渲染a组件
```


### 路由组件的容器
```html
<!-- 带返回图标，点击返回上一级路由 -->
<yu-route-page parent="/">路由页面内容</yu-route-page>
parent:'/'     //点击返回图标，即返回到首页

<!-- 不带返回图标 -->
<yu-route-page>路由页面内容</yu-route-page>
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

### 轮播图
```html
<yu-slide-x :imgs="imgs" :default="0" width="300px" ></yu-slide-x>

imgs:[ require('./1.jpg'), require('./2.jpg') ],  //轮播图片数组
default:0,      //0表示默认显示第一张
width:"300px"   //轮播窗口的宽度
```