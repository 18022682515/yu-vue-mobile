<template>
	<div class="page">
		<i class="iconfont" @touchstart="$emit('input',!value)">&#xe637;</i>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name:'page',
	props:{
		value:{
			type:Boolean,
			default:false
		}
	},
	// mounted(){
	// 	this.$emit('load');
	// },
	activated(){
		this.$emit('load');
	},
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