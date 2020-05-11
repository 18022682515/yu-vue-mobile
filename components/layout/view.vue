<template>
	<yu-transition :name="name">
		<keep-alive>
			<router-view class="view"></router-view>
		</keep-alive>
	</yu-transition>
</template>

<script>
export default {
	name:'yuView',
	props:{
		name:{
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
	left:0;
}
</style>
