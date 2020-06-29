<template>
	<yu-cache :name="transition">
		<router-view :class="{ view:true,fill:fill,front:front }" :name="name"></router-view>
	</yu-cache>
</template>

<script>
export default {
	name:'yuView',
	props:{
		front:{
			type:Boolean,
			default:false
		},
		fill:{
			type:Boolean,
			default:false
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
	.view{
		overflow-x:hidden;
		overflow-y:auto;
	}
	.fill{
		position:absolute;
		top:0;
		bottom:0;
		left:0;
		right:0;
	}
	.front{
		z-index:1;
	}
	
</style>
