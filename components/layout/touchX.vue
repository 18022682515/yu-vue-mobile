<template>
<div class="touchX">
    <div ref="box" class="box" :style="style">
        <slot></slot>
    </div>
</div>
</template>

<script>

export default {
    name:"touchX",
    props:{
			value:{
					type:Number,
					default:0
			}
    },
    data(){
			return {
					length:0,
					translateX:0,
					offset:{},
					time:0
			}
    },
    watch:{
			value(n,o){
				let now = Date.now();
				let current = Math.round(Math.abs(this.translateX/this.pageWidth))
				if( now-this.time<300 || n>this.length-1 || n<0 || n==current) return;
				this.time = now;
				this.homing(n); //value改变时，执行动画切换到value页面
			},
			'offset.moveX'(n,o){
				this.translateX += n - this.offset.startX;
				this.translateX = this.translateX>0 ? 0 :(Math.abs(this.translateX)/this.pageWidth>this.length-1 ? -this.pageWidth*(this.length-1) : this.translateX);
				this.$set(this.offset,'startX',n)
			}
    },
    computed:{
			width(){
					let defaultVNodes = this.$slots.default;
					let vNodes = defaultVNodes.filter(node=>{
						return node.tag;
					})
					this.length = vNodes.length;
					return 100*this.length+'%';
			},
			style(){
				return { 
					width:this.width,
					transform:`translateX(${this.translateX}px)`
				};
			},
			
    },
    methods:{
			homing(n){
				let target = -this.pageWidth * n;
				let cout = Math.round(300/(1000/60));
				let speed = (target-this.translateX)/cout;
				const _this = this;
				(function fn(){
					if( cout<=0 || _this.offset.pause){
						_this.$emit('input',n)
						cout<=0 && (_this.translateX = Math.round(_this.translateX))
						return
					}
					_this.translateX += speed
					cout--
					requestAnimationFrame(fn)
				})();
			},
			addEvent( ele,options ){
				
				options = options || {};
				const touchstart = options.touchstart || null
				const touchmove = options.touchmove || null
				const touchend = options.touchend || null
				
				ele.addEventListener('touchstart',(e)=>{
					let touch = e.changedTouches[0]
					this.$set(this.offset,'run',false)
					this.$set(this.offset,'pause',true)
					this.$set(this.offset,'startX',touch.clientX)
					ele.addEventListener('touchmove',move)
					touchstart && touchstart(this.offset)
				})
				
				ele.addEventListener('touchend',(e)=>{
					let touch = e.changedTouches[0]
					
					this.$set(this.offset,'pause',false)
					this.$set(this.offset,'endX',touch.clientX)
					ele.removeEventListener('touchmove',move)
					touchend && touchend(this.offset)
				})
				
				let _this = this;
				function move(e){
					if(_this.offset.run) return
					let touch = e.changedTouches[0]
					_this.$set(_this.offset,'lastTime',Date.now())
					_this.$set(_this.offset,'lastX',_this.offset.moveX||_this.offset.startX)
					_this.$set(_this.offset,'moveX',touch.clientX)
					touchmove && touchmove(_this.offset)
				}
			},
			init(){
				let pages = this.$slots.default.filter(node=>{
					return node.tag
				});
				this.pageWidth = pages[0].elm.offsetWidth;
				this.translateX = -this.pageWidth * this.value;
				for(let i=0; i<pages.length-1; i++){
					pages[i].elm.addEventListener('scroll',()=>{
						this.$set(this.offset,'run',true);
					});
				}
			}
    },
    mounted(){
			this.init();
			const _this = this;
        this.addEvent(this.$refs.box, {
					touchend(offset){
						let lastSpeed = (offset.lastX - offset.moveX)/(Date.now()-offset.lastTime)
						let pageCout = 0;
						if(Math.abs(lastSpeed)>5){
							lastSpeed>0 && (pageCout = Math.ceil(Math.abs(_this.translateX/_this.pageWidth)))
							lastSpeed<0 && (pageCout = Math.floor(Math.abs(_this.translateX/_this.pageWidth)))
						}else{
							pageCout = Math.abs(Math.round(_this.translateX/_this.pageWidth))
						}
						_this.homing(pageCout);
					}
				});
    }
}
</script>

<style lang="less" scoped>
.touchX{
    overflow: hidden;
		height:100%;

    .box{
        display:flex;
				height:100%;

        >*{
            flex:1;
						height:100%;
						overflow:scroll;
        }
    }
}
</style>