<template>
<transition :name="name" :enter-active-class="className" :leave-active-class="className">
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
		},
		duration:{
			type:Number,
			default:600
		}
	},
	computed:{
		className(){
			let absArr = this.durations.map(val=>Math.abs(val-this.duration))
			let min = Math.min.apply(null,absArr)
			let item = this.durations[absArr.indexOf(min)]
			return 'active-'+item
		}
	},
	data(){
		return {
			durations:[ 300,600,1000,1500,2000,3000,5000,8000 ]
		}
	}
}
</script>

<style scoped lang="less">
.active-300{
	transition:all .3s;
}

.active-600{
	transition:all .6s;
}

.active-1000{
	transition:all 1s;
}

.active-1500{
	transition:all 1.5s;
}

.active-2000{
	transition:all 2s;
}

.active-3000{
	transition:all 3s;
}

.active-5000{
	transition:all 5s;
}

.active-8000{
	transition:all 8s;
}
	
.left-enter,.left-leave-to{
	transform:translateX(-100%);
}

.right-enter,.right-leave-to{
	transform:translateX(100%);
}

.left-right-enter{
	transform:translateX(-100%);
}
.left-right-leave-to{
	transform:translateX(100%);
}

.right-left-enter{
	transform:translateX(100%);
}
.right-left-leave-to{
	transform:translateX(-100%);
}

.opacity-enter,.opacity-leave-to{
	opacity:0;
}

.top-enter,.top-leave-to{
	transform:translateY(-100%);
}

.bottom-enter,.bottom-leave-to{
	transform:translateY(100%);
}

.top-bottom-enter{
	transform:translateY(-100%);
}
.top-bottom-leave-to{
	transform:translateY(100%);
}

.bottom-top-enter{
	transform:translateY(100%);
}
.bottom-top-leave-to{
	transform:translateY(-100%);
}

</style>
