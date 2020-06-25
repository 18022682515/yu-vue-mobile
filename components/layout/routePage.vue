<template>
<div class="routePage">
	<div v-if="back">
		<yu-icon icon="icon-fanhui5" @click.native="$router.go(-1)" @touchstart.native.stop.prevent="$router.go(-1)"></yu-icon>
	</div>
	<slot></slot>
</div>
</template>

<script>
export default {
	name:'routePage',
	props:{
		back:{
			type:Boolean,
			default:true
		}
	}
}
</script>

<style scoped lang="less">
.icon{
	padding:0.2rem;
	color:rgba(0,0,0,0.4);
}
</style>
