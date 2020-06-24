<template>
<div class="routePage">
	<div v-if="parent"><i class="iconfont" @click="$router.push(parent)" @touchstart.stop.prevent="$router.push(parent)">&#xe637;</i></div>
	<slot></slot>
</div>
</template>

<script>
export default {
    name:'routePage',
		props:{
			parent:{
				type:[String,Boolean],
				default:false
			}
		}
}
</script>

<style scoped lang="less">
.iconfont{
	padding:0.5vh 0.5vw;
	color:rgba(0,0,0,0.4);
}
</style>
