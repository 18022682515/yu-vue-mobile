<template>
<div class="routePage" :style="{ overflow:overflow?'hidden':''}">
	<div v-if="top" class="view-container" :style="{ top:scrollTop+'px' }">
		<yu-view :transition="transition" :name="name" :front="front" :fill="fill"></yu-view>
	</div>
	<div v-if="back">
		<yu-icon class="return" icon="icon-fanhui5" @tag.native="$router.go(-1)"></yu-icon>
	</div>
	<slot></slot>
	<div v-if="!top" class="view-container" :style="{ top:scrollTop+'px' }">
		<yu-view :transition="transition" :name="name" :front="front" :fill="fill"></yu-view>
	</div>
</div>
</template>

<script>
export default {
	name:'routePage',
	data(){
		return {
			overflow: false,
			scrollTop:0
		}
	},
	props:{
		path:{
			type:String,
			default:'/'
		},
		back:{
			type:Boolean,
			default:false
		},
		top:{
			type:Boolean,
			default:false
		},
		front:{
			type:Boolean,
			default:false
		},
		fill:{
			type:Boolean,
			default:false
		},
		name:{
			type:String,
			default:'default'
		},
		transition:{
			type:String,
			default:'left'
		}
	},
	watch: {
	  '$route' (n, o) {
			if(n.path===this.path || n.path+'/'===this.path || n.path===this.path+'/'){
				this.overflow = false;
			}else{
				this.overflow = true;
				this.scrollTop = this.$el.scrollTop;
			}
	  }
	},
}
</script>

<style scoped lang="less">
	.routePage{
		&::-webkit-scrollbar { display:none; }
		>.view-container{
			position:absolute;
			width:100vw;
			height:100vh;
			pointer-events:none;
			>*{
				pointer-events:auto;
			}
		}
		.return{
			padding:0.2rem;
			color:rgba(0,0,0,0.4);
		}
	}

</style>
