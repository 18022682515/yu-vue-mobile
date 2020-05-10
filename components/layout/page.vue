<template>
	<yu-transition :name="name">
		<div class="page" v-if="value">
			<i class="iconfont" @touchstart="$emit('input',!value)">&#xe637;</i>
			<slot></slot>
		</div>
	</yu-transition>
</template>

<script>
export default {
	name:'page',
	props:{
		name:{
			type:String,
			default:'left'
		},
		value:{
			type:Boolean,
			default:false
		}
	}
}
</script>

<style scoped lang="less">
.page{
	background-color: #FFF;
	position:absolute;
	top:0;
	left:0;
	width:100vw;
	height:100vh;
	overflow:scroll;
	
	.iconfont{
		position:absolute;
		top:2vw;
		left:2vw;
	}
}
</style>