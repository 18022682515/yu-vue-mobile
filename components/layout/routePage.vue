<template>
<div class="routePage">
	<i class="iconfont" @click="$router.go(-1)" @touchstart.stop.prevent="$router.go(-1)">&#xe637;</i>
	<slot></slot>
	<yu-view></yu-view>
</div>

</template>

<script>
export default {
    name:'routePage'
}
</script>

<style scoped lang="less">
.iconfont{
	position:absolute;
	top:0;
	left:0;
	padding:0.5vh 0.5vw;
	color:rgba(0,0,0,0.4);
}
</style>
