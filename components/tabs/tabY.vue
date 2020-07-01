<template>
<div class="tabY">
	<div class="titles">
		<div ref="title" class="title" v-for="(title,i) in titles" :key="i" @tag="index=i">{{title}}</div>
		<div class="active" :style="style">{{text}}</div>
	</div>
	<div ref="contents" class="contents" :style="{ height }">
		<slot></slot>
	</div>
	
</div>

</template>

<script>
export default {
    name:'tabY',
		props:{
			default:{
				type:Number,
				default:0
			},
			titles:{
				type:Array
			},
			height:{
				type:[ String ],
				default:'auto'
			}
		},
		data(){
			return {
				text:'',
				index:0,
				slots:null,
				titleElements:null,
				activeHeight:0,
				translateY:0
			}
		},
		methods:{
			setActiveHeight(n,o){
				this.translateY = 0;
				let oHeight = 0, nHeight = 0;
				oHeight = typeof o==='number' ? this.titleElements[o].offsetHeight : 0;
				nHeight = this.titleElements[n].offsetHeight;
				this.activeHeight = nHeight;
				for(let i=0; i<n; i++){
					this.translateY += this.titleElements[i].offsetHeight;
				}
			}
		},
		watch:{
			index(n,o){
				this.slots[o].elm.style.display = 'none';
				this.slots[n].elm.style.display = 'block';
				this.setActiveHeight(n,o);
				this.text = this.titles[n];
			}
		},
		computed:{
			style(){
				return { height:this.activeHeight+'px',transform:`translateY(${this.translateY}px)` };
			}
		},
		mounted(){
			this.index = this.default;
			this.text = this.titles[this.index];
			this.slots = this.$slots.default.filter(ele=>{
				return ele.tag;
			});
			let height = this.$el.offsetHeight;
			this.$refs.contents.style.minHeight = height+'px';
			this.titleElements = this.$refs.title;
			this.setActiveHeight(this.index);
		}
}
</script>

<style scoped lang="less">
	.tabY{
		&:after{
			content:'';
			display:block;
			height:0;
			clear:both;
		}
	}
	.titles{
		float:left;
		overflow: hidden;
		position:relative;
		border:1px solid #EEE;
		border-right:0;
		border-radius: 10px 0 0 10px;
		
		.active{
			position:absolute;
			top:0;
			left:0;
			right:0;
			background:#ff0022;
			color:#FFF;
			transition:all .1s;
			display:flex;
			align-items: center;
			justify-content: center;
		}
		.title{
			padding:4px 30px;
			text-align: center;
			&:not(:nth-last-child(2)){
				border-bottom:1px solid #EEE;
			}
		}
	}
	
	.contents{
		overflow: hidden;
		border:1px solid #EEE;
		padding:15px;
		box-sizing: border-box;
		>*{
			display:none;
		}
	}
</style>
