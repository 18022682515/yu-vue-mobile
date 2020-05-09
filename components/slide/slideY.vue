<template>
<div class="slideY" :style="{ maxWidth:width,height }">
	<ul class="boxs" :style="style">
		<li ref="box" class="box" :style="{ height }" v-for="(img,i) in changeImgs" :key="i">
			<img :src="img" alt="" width="100%" height="100%" @load="load">
		</li>
	</ul>
	<div class="btn">
		<div class="top iconfont" @click="minus" @touchstart.stop.prevent="minus">&#xe632;</div>
		<div class="mark">
			<span v-for="(img,i) in imgs" @mouseover="index=i+1" @touchstart="index=i+1" :class="[ index===i+1?'active':'',index===changeImgs.length-1&&i===0?'active':'',index===0&&i===imgs.length-1?'active':'' ]"></span>
		</div>
		<div class="bottom iconfont" @click="add" @touchstart.stop.prevent="add">&#xe631;</div>
	</div>

</div>
</template>

<script>
import { ani } from 'yu-ani'
export default {
  name: 'slideY',
  props: {
    width: {
      type: String,
      default: 'auto'
    },
    height: {
      type: String,
      default: '500px'
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
      translateY: 0,
      imgHeight: 0,
      index: 1,
      ms: 300,
      lastTime: 0,
      status: null
    }
  },
  methods: {
    load (e) {
      this.imgHeight = this.$el.offsetHeight
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
			  initial: { translateY: this.translateY },
			  target: { translateY: -this.imgHeight * n },
			  onUpdate (current) {
			    _this.translateY = current.translateY
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
        transform: `translateY(${this.translateY}px)`
      }
    }
  }

}
</script>

<style scoped lang="less">
	.slideY{
		overflow:hidden;
		position:relative;
		display:flex;
		text-align: center;

		.btn{
			position:absolute;
			right:2vw;
			top:50%;
			trnasform:translateY(-50%);
			display:flex;
			flex-direction: column;
			align-items: center;
			.top{
				opacity: 0.3;
			}
			.bottom{
				opacity: 0.3;
			}
			.top:hover,.bottom:hover{
				opacity:1;
			}
		}
		.mark{
			margin:1.5vw 0;
			>*{
				display:block;
				width:0;
				height:0;
				padding:.5vw;
				border-radius: 50%;
				background:#c2c8ff;
				&:not(:last-child){
					margin-bottom:1.5vw;
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
	}
</style>
