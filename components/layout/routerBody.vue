<template>
<yu-transition :name="name">
	<router-view class="slide-view" @touchstart.native="start" @touchend.native="end"></router-view>
</yu-transition>

</template>

<script>
export default {
  name: 'slide-view',
  props: {
    y: {
      type: Boolean,
      default: false
    },
    titles: {
      type: Array
    }
  },
  data () {
		return {
			xy: 0,
			mark:false,
			name:'left-right'
		}
  },
	watch:{
		'$route'(n,o){
			if(this.mark) return
			let oi = this.paths.indexOf(o.path);
			let ni = this.paths.indexOf(n.path);
			if(oi>ni){
				this.name = this.y ? 'top-bottom' : 'left-right'
			}else{
				this.name = this.y ? 'bottom-top' : 'right-left'
			}
			
		}
	},
	computed:{
		paths(){
			return this.titles.map(item=>{
				return item.path;
			})
		}
	},
  methods: {
    up () {
		  let i = this.paths.indexOf(this.$route.path)
      i = i === 0 ? this.paths.length : i
		  this.$router.push(this.paths[i - 1])
    },
    down () {
      let i = this.paths.indexOf(this.$route.path)
      i = i === this.paths.length - 1 ? -1 : i
      this.$router.push(this.paths[i + 1])
    },
    start (e) {
			this.diff = 0;
      const ele = e.currentTarget
      ele.style.transition = ''
      const touch = e.changedTouches[0]
      this.xy = this.y ? touch.clientY : touch.clientX
      ele.addEventListener('touchmove', this.move)
    },
    move (e) {
      const ele = e.currentTarget
      const touch = e.changedTouches[0]
      const mxy = this.y ? touch.clientY : touch.clientX
      this.diff = mxy - this.xy
      ele.style.transform = this.y ? `translateY(${this.diff}px)` : `translateX(${this.diff}px)`
    },
    end (e) {
      const ele = e.currentTarget
			this.mark = true;
      if (this.diff > 100) {
        this.name = this.y ? 'top-bottom' : 'left-right'
        this.up()
      } else if (this.diff < -100){
        this.name = this.y ? 'bottom-top' : 'right-left'
        this.down()
      }
      ele.style.transition = '.5s'
      setTimeout(() => {
        ele.style.transform = ''
				this.mark = false;
      }, 0)
      ele.removeEventListener('touchmove', this.move)
    }
  }
}
</script>

<style scoped lang="less">
.slide-view{
	position:absolute;
	top:0;
	left:0;
	bottom:0;
	right:0;
}
</style>
