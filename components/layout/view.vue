<template>
	<yu-cache :name="transition">
		<router-view :class="{ view:true,fill,top }" :name="name"></router-view>
	</yu-cache>
</template>

<script>
export default {
	name:'yuView',
	props:{
		top:{
			type:Boolean,
			default:false
		},
		fill:{
			type:Boolean,
			default:true
		},
		name:{
			type:String,
			default:'default'
		},
		transition:{
			type:String,
			default:'left'
		}
	}
}
</script>

<style scoped lang="less">
	.top{
		z-index:1;
	}
	.fill{
		position:absolute;
		top:0;
		bottom:0;
		left:0;
		right:0;
	}
	.view{
		overflow-x:hidden;
		overflow-y:auto;
		background-color: #FFF;
	}
</style>
