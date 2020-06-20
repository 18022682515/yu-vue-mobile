<template>
<div class="slideX" :style="{ width:width }">
	<ul class="boxs" :style="style">
		<li class="box" v-for="(img,i) in changeImgs" :key="i" :style="{ width:imgWidth+'px' }">
			<img :src="img" alt="" width="100%" @load="load">
		</li>
	</ul>
	<div class="btn">
		<div class="left iconfont" @click="minus" @touchstart.stop.prevent="minus">&#xe752;</div>
		<div class="right iconfont" @click="add" @touchstart.stop.prevent="add">&#xe751;</div>
	</div>
	<div class="mark">
		<span v-for="(img,i) in imgs" @mouseover="index=i+1" @touchstart="index=i+1" :class="[ index===i+1?'active':'',index===changeImgs.length-1&&i===0?'active':'',index===0&&i===imgs.length-1?'active':'' ]"></span>
	</div>
</div>
</template>

<script>
import { ani } from 'yu-ani'
export default {
  name: 'slideX',
  props: {
    width: {
      type: String,
      default: 'auto'
    },
    imgs: {
      type: Array
    },
    default: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      translateX: 0,
      imgWidth: 0,
      index: 1,
      ms: 300,
      lastTime: 0,
      status: null
    }
  },
  methods: {
    load () {
      this.imgWidth = this.$el.offsetWidth
      this.index = this.default + 1
      this.runAni(this.index, 0)
    },
    add () {
      const diff = Date.now() - this.lastTime
      this.lastTime = Date.now()
      if (this.index === this.changeImgs.length - 1 && diff < this.ms) return
      this.index++
    },
    minus () {
      const diff = Date.now() - this.lastTime
      this.lastTime = Date.now()
      if (this.index === 0 && diff < this.ms) return
      this.index--
    },
    runAni (n, ms) {
      this.status && this.status.stop()
      const _this = this
      this.status = ani({
			  duration: ms,
			  initial: { translateX: this.translateX },
			  target: { translateX: -this.imgWidth * n },
			  update (current) {
			    _this.translateX = current.translateX
			  },
        complete (current) {
          if (n === _this.changeImgs.length - 1) {
            _this.index = 1
          } else if (n === 0) {
            _this.index = _this.changeImgs.length - 2
          }
        }
      })
    }
  },
  watch: {
    index (n, o) {
      if (o === this.changeImgs.length - 1 || o === 0) {
        this.runAni(n, 0)
        return
      }
      this.runAni(n, this.ms)
    }
  },
  computed: {
    changeImgs () {
      return [this.imgs[this.imgs.length - 1], ...this.imgs, this.imgs[0]]
    },
    style () {
      return {
        width: this.changeImgs.length * 100 + '%',
        transform: `translateX(${this.translateX}px)`
      }
    }
  }

}
</script>

<style scoped lang="less">
	.slideX{
		overflow:hidden;
		position:relative;

		.btn{
			position:absolute;
			left:0;
			right:0;
			top:50%;
			trnasform:translateY(-50%);
			.left{
				float:left;
				opacity: 0.3;
			}
			.right{
				float:right;
				opacity: 0.3;
			}
			>*:hover{
				opacity:1;
			}
		}
		.mark{
			position:absolute;
			left:50%;
			bottom:3vw;
			transform:translateX(-50%);
			>*{
				display:inline-block;
				width:0;
				height:0;
				padding:.5vw;
				border-radius: 50%;
				background:#c2c8ff;
				&:not(:last-child){
					margin-right:1.5vw;
				}
			}
			.active{
				background: #b41e1e;
			}
		}
	}
	.boxs{
		padding:0;
		margin:0;
		list-style: none;
		display:flex;

		.box{
			flex:auto;
		}
	}
</style>
