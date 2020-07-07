<template>
<div class="touchY">
    <div ref="box" class="box" :style="style">
        <slot></slot>
    </div>
</div>
</template>

<script>

export default {
    name:"touchY",
    props:{
			value:{
					type:Number,
					default:0
			}
    },
    data(){
			return {
					length:0,
					translateY:0,
					offset:{},
					time:0
			}
    },
    watch:{
			value(n,o){
				let now = Date.now();
				let current = Math.round(Math.abs(this.translateY/this.pageHeight))
				if( now-this.time<300 || n>this.length-1 || n<0 || n==current) return;
				this.time = now;
				this.homing(n); //value改变时，执行动画切换到value页面
			},
			'offset.moveX'(n,o){
				this.translateY += n - this.offset.startX;
				this.translateY = this.translateY>0 ? 0 :(Math.abs(this.translateY)/this.pageHeight>this.length-1 ? -this.pageHeight*(this.length-1) : this.translateY);
				this.$set(this.offset,'startX',n)
			}
    },
    computed:{
			height(){
					let defaultVNodes = this.$slots.default;
					let vNodes = defaultVNodes.filter(node=>{
						return node.tag;
					})
					this.length = vNodes.length;
					return 100*this.length+'%';
			},
			style(){
				return { 
					height:this.height,
					transform:`translateY(${this.translateY}px)`
				};
			},
			
    },
    methods:{
			homing(n){
				let target = -this.pageHeight * n;
				let cout = Math.round(300/(1000/60));
				let speed = (target-this.translateY)/cout;
				const _this = this;
				(function fn(){
					if( cout<=0 || _this.offset.pause){
						_this.$emit('input',n)
						cout<=0 && (_this.translateY = Math.round(_this.translateY))
						return
					}
					_this.translateY += speed
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
					this.$set(this.offset,'startX',touch.clientY)
					ele.addEventListener('touchmove',move)
					touchstart && touchstart(this.offset)
				})
				
				ele.addEventListener('touchend',(e)=>{
					let touch = e.changedTouches[0]
					
					this.$set(this.offset,'pause',false)
					this.$set(this.offset,'endX',touch.clientY)
					ele.removeEventListener('touchmove',move)
					touchend && touchend(this.offset)
				})
				
				let _this = this;
				function move(e){
					if(_this.offset.run) return
					let touch = e.changedTouches[0]
					_this.$set(_this.offset,'lastTime',Date.now())
					_this.$set(_this.offset,'lastX',_this.offset.moveX||_this.offset.startX)
					_this.$set(_this.offset,'moveX',touch.clientY)
					touchmove && touchmove(_this.offset)
				}
			},
			init(){
				let pages = this.$slots.default.filter(node=>{
					return node.tag
				});
				this.pageHeight = pages[0].elm.offsetHeight;
				this.translateY = -this.pageHeight * this.value;
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
							lastSpeed>0 && (pageCout = Math.ceil(Math.abs(_this.translateY/_this.pageHeight)))
							lastSpeed<0 && (pageCout = Math.floor(Math.abs(_this.translateY/_this.pageHeight)))
						}else{
							pageCout = Math.abs(Math.round(_this.translateY/_this.pageHeight))
						}
						_this.homing(pageCout);
					}
				});
    }
}
</script>

<style lang="less" scoped>
.touchY{
    overflow: hidden;
		height:100%;

    .box{
        display:flex;
				flex-direction: column;

        >*{
						width:100%;
            flex:1;
						overflow-y:hidden;
        }
    }
}
</style>