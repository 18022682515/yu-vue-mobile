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

### 路由子页面
<!-- 带返回键 -->
```html
<yu-router to="/a" name="left">a</yu-router>
<!-- 或 -->
<yu-router :to="{ path:'/a',query:{ user:'xxx' } }" name="left">a</yu-router>
<!-- 或 -->
<yu-router :to="{ name:'a',params:{ user:'xxx' } }" name="left">a</yu-router>

<!-- 不能用于首页路由，如：<yu-router to="/">home</yu-router>这是错误的 -->

to:'/a',   //router-link的to属性
name:'left'|'right'|'left-right'|'right-left'|'opacity'|'top'|'bottom'|'top-bottom'|'bottom-top', //路由页面进入和离开的过渡动画
```


### 子页面
<!-- 带返回键 -->
```html
<yu-subpage name="left" v-model="show" :toggle="toggle" @load="load" >
		<p v-for="i in 88">{{i}}</p>
</yu-subpage>
name:'left'|'right'|'left-right'|'right-left'|'opacity'|'top'|'bottom'|'top-bottom'|'bottom-top', //元素进入和离开的过渡动画
shou:true|false,   //本组件是否显示
toggle:true|false, //切换新的组件(非缓存的组件)
@load        //本组件加载完成触发
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

### 页面导航选项
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

### vue的过渡动画
```html
<yu-transition name="left">
	<div v-if="show"></div>
</yu-transition>

name:'left'|'right'|'left-right'|'right-left'|'opacity'|'top'|'bottom'|'top-bottom'|'bottom-top', //元素进入和离开的过渡动画
show:true|false  //控制div是否显示
```

### 轮播图
```html
<yu-slide-x :imgs="imgs" :default="0" width="300px" ></yu-slide-x>

imgs:[ require('./1.jpg'), require('./2.jpg') ],  //轮播图片数组
default:0,      //0表示默认显示第一张
width:"300px"   //轮播窗口的宽度
```