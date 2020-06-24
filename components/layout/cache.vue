<template>
	<yu-transition :name="name">
		<keep-alive>
			<slot></slot>
		</keep-alive>
	</yu-transition>
</template>

<script>
export default {
    name:'yuCache',
		props:{
			name:{
				type:String,
				default:'left'
			}
		}
}
</script>

<style scoped lang="less">

</style>
