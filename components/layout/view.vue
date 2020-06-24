<template>
	<yu-cache :name="transition">
		<router-view :class="['view',fill?'fill':'']" :name="name"></router-view>
	</yu-cache>
</template>

<script>
export default {
	name:'yuView',
	props:{
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
	}
</style>
