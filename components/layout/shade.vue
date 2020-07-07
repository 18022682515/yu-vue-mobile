<template>
	<yu-transition name="opacity">
		<div class="shade" v-show="value" @tap="$emit('input',!value)"></div>
	</yu-transition>
</template>

<script>
	export default {
		name: 'test',
		props: {
			value: {
				type: Boolean
			}
		}
	}
</script>

<style lang="less" scoped>
	.shade {
		position:absolute;
		top:0;
		bottom:0;
		left:0;
		right:0;
		background-color: rgba(0,0,0,.3);
	}
</style>
