<template>
<div class="pull">
	<div class="pull-box" @touchstart="start" @touchend="end" @touchmove="move" :style="style">
		<div class="pull-box-icon">
			<yu-icon icon="icon-xiajiantou" v-show="load=='down'"></yu-icon>
			<yu-icon icon="icon-shangjiantou" v-show="load==false"></yu-icon>
			<yu-icon class="load" icon="icon-jiazai2" v-show="load===true"></yu-icon>
			<span>{{downText}}</span>
		</div>
		<div ref="content" class="pull-box-content" @scroll="scroll">
			<slot></slot>
		</div>
	</div>
	
</div>

</template>

<script>
export default {
    name:'',
	data(){
		return {
			rub:1,
			y:0,
			translateY:0,
			transition:'',
			load:'down',
			downText:'下拉刷新',
			scrollTop:0,
		}
	},
	computed:{
		style(){
			return { transition:this.transition,transform:`translateY(${this.translateY}vw)` };
		}
	},
	watch:{
		load(n,o){
			if(!n){
				this.downText = '加载完成';
				this.transition = 'all .5s';
				this.translateY = 0;
			}
		}
	},
	methods:{
		scroll(e){
			let ele = e.target;
			this.scrollTop = ele.scrollTop || 0;
			let scrollHeihgt = ele.scrollHeight || 0;
			let offsetHeihgt = ele.offsetHeight;
			if(this.scrollTop+offsetHeihgt>=scrollHeihgt-10){
				this.$emit('pull-up');
			}
		},
		start(e){
			if(this.scrollTop>0) return;
			this.transition = '';
			let touch = e.changedTouches[0];
			this.y = touch.clientY;
			this.load = 'down';
			this.downText = '下拉刷新';
		},
		end(e){
			if(this.scrollTop>0) return;
			this.rub = 1;
			if(this.translateY<10){
				this.load = false;
				return;
			}else if(this.translateY>10){
				this.transition = 'all .5s';
				this.translateY = 10;
			}
			this.load = true;
			this.downText = '加载中';
			this.$emit('pull-down',this);
		},
		move(e){
			if(this.scrollTop>0) return;
			let touch = e.changedTouches[0];
			let my = touch.clientY;
			this.translateY += (my - this.y)/20*this.rub;
			this.y = my;
			this.rub *= 0.98;
		},
	},
	mounted(){
		this.scroll({ target:this.$refs.content });
	}
}
</script>

<style scoped lang="less">
	.pull{
		height:100%;
		overflow:hidden;
		&>.pull-box{
			position:relative;
			height:100%;
			
			&>.pull-box-icon{
				width:100%;
				box-sizing: border-box;
				position:absolute;
				top:-10vw;
				left:0;
				display:flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				height:10vw;
				border-bottom:1px solid #EEE;
				color:rgba(0,0,0,0.4);
				font-size: 4vw;
				>svg{
					width:5vw;
				}
			}
			
			&>.pull-box-content{
				height:100vh;
				overflow: scroll;
			}
		}
		@keyframes rotate{
			from{
				transform:rotate(0deg);
			} 
			to{
				transform:rotate(360deg);
			}
		}
		.load{
			animation:rotate 1s linear infinite;
		}
	}
	

</style>
