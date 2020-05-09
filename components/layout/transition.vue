<template>
<transition :name="name">
		<slot></slot>
</transition>
</template>

<script>
export default {
    name:'yuTransition',
		props:{
			name:{
				type:String,
				default:'left'
			}
		}
}
</script>

<style scoped lang="less">
.left-enter,.left-leave-to{
	transform:translateX(-100%);
}
.left-enter-active,.left-leave-active{
	transition:all .5s;
}
.right-enter,.right-leave-to{
	transform:translateX(100%);
}
.right-enter-active,.right-leave-active{
	transition:all .5s;
}
.left-right-enter{
	transform:translateX(-100%);
}
.left-right-leave-to{
	transform:translateX(100%);
}
.left-right-enter-active,.left-right-leave-active{
	transition:all .5s;
}
.right-left-enter{
	transform:translateX(100%);
}
.right-left-leave-to{
	transform:translateX(-100%);
}
.right-left-enter-active,.right-left-leave-active{
	transition:all .5s;
}
.opacity-enter,.opacity-leave-to{
	opacity:0;
}
.opacity-enter-active,.opacity-leave-active{
	transition:all .5s;
}
.top-enter,.top-leave-to{
	transform:translateY(-100%);
}
.top-enter-active,.top-leave-active{
	transition:all .5s;
}
.bottom-enter,.bottom-leave-to{
	transform:translateY(100%);
}
.bottom-enter-active,.bottom-leave-active{
	transition:all .5s;
}
.top-bottom-enter{
	transform:translateY(-100%);
}
.top-bottom-leave-to{
	transform:translateY(100%);
}
.top-bottom-enter-active,.top-bottom-leave-active{
	transition:all .5s;
}
.bottom-top-enter{
	transform:translateY(100%);
}
.bottom-top-leave-to{
	transform:translateY(-100%);
}
.bottom-top-enter-active,.bottom-top-leave-active{
	transition:all .5s;
}
</style>
