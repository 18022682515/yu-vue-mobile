<template>
<div class="tabX">
	<div class="titles">
		<div ref="title" class="title" v-for="(title,i) in titles" :key="i" @tap="index=i">{{title}}</div>
		<div class="active" :style="style">{{text}}</div>
	</div>
	<div class="contents" :style="{ height }">
		<slot></slot>
	</div>
</div>
</template>

<script>
export default {
	name:"tabX",
	props:{
		height:{
			type:String,
			default:'auto'
		},
		titles:{
			type:Array
		},
		default:{
			type:Number,
			default:0
		}
	},
	data(){
		return {
			index:0,
			text:'',
			slots:null,
			titleElements:null,
			width:0,
			translateX:0
		}
	},
	computed:{
		style(){
			return { width:this.width+'px',transform:`translateX(${this.translateX}px)` };
		}
	},
	methods:{
		setActiveWidth(n,o){
			this.translateX = 0;
			let oWidth = 0, nWidth = 0;
			oWidth = typeof o==='number' ? this.titleElements[o].offsetWidth : 0;
			nWidth = this.titleElements[n].offsetWidth;
			this.width = nWidth;
			for(let i=0; i<n; i++){
				this.translateX += this.titleElements[i].offsetWidth;
			}
		}
	},
	watch:{
		index(n,o){
			this.slots[o].elm.style.display = 'none';
			this.slots[n].elm.style.display = 'block';
			this.setActiveWidth(n,o);
			this.text = this.titles[n];
		}
	},
	mounted(){
		this.index = this.default;
		this.text = this.titles[this.index];
		this.slots = this.$slots.default.filter(VNode=>{
			return VNode.tag;
		});
		this.slots[this.index].elm.style.display = 'block';
		this.titleElements = this.$refs.title;
		this.setActiveWidth(this.index);
	}

}
</script>

<style lang="less" scoped>
.tabX{
	ul{
		list-style:none;
	}
	.titles{
		float:left;
		overflow:hidden;
		position:relative;
		border:1px solid #EEE;
		border-bottom:0;
		border-radius: 10px 10px 0 0;
		.active{
			position:absolute;
			top:0;
			bottom:0;
			left:0;
			background:#ff0022;
			color:#FFF;
			transition:all .2s;
			display:flex;
			align-items: center;
			justify-content: center;
		}
		
		.title{
			float:left;
			padding:5px 38px;
			&:not(:nth-last-child(2)){
				border-right:1px solid #EEE;
			}
		}
	}
	.contents{
		clear:both;
		border:1px solid #eee;
		border-radius: 10px;
		border-top-left-radius: 0;
		padding:15px;
		>*{
			display:none;
		}
	}
}

</style>