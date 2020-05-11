<template>
	<yu-transition :name="transition">
		<keep-alive>
			<router-view class="view" :name="name"></router-view>
		</keep-alive>
	</yu-transition>
</template>

<script>
export default {
	name:'yuView',
	props:{
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
	position:absolute;
	top:0;
	bottom:0;
	left:0;
	right:0;
	background-color: #FFF;
	overflow-x:hidden;
	overflow-y:auto;
}
</style>
