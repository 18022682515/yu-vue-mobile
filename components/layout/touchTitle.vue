<template>
<div class="touch-title">
	<div class="item" :style="style"></div>
	<ul class="box" :style="{ width }">
		<li ref="li" v-for="(title,i) in titles" :class="{ active:value===i }" @tap="$emit('input',i)">
			<p>{{title}}</p>
		</li>
	</ul>
	
</div>

</template>

<script>
export default {
  name: 'touch-title',
  props: {
		value:{
			type:Number,
			default:0
		},
    width: {
      type: String,
      default: '100%'
    },
    titles: {
      type: Array
    }
  },
  watch: {
    value (n, o) {
      let x = 0
      this.eles.forEach((ele, i) => {
        if (i === 0 || i > n) return
        x += this.eles[i - 1].offsetWidth
      })
			this.x = x;
      this.itemWidth = this.eles[n].offsetWidth
    }
  },
  computed: {
    style () {
      return { width: this.itemWidth + 'px', transform: `translateX(${this.x}px)` }
    }
  },
  data () {
    return {
      eles: [],
      itemWidth: 0,
      x: 0,
			sum:0
    }
  },
  mounted () {
    this.eles = this.$refs.li
    this.eles.forEach((ele, i) => {
		  if (i === 0 || i > this.value) return
		  this.x += this.eles[i - 1].offsetWidth
    })
    this.itemWidth = this.eles[this.value].offsetWidth
  }
}
</script>

<style scoped lang="less">
.touch-title{
	position:absolute;
	background-color: #FFF;
	width:100%;
	overflow-x: scroll;
	&::-webkit-scrollbar {display:none}
}
.item{
	position:absolute;
	top:0;
	left:0;
	height:100%;
	background-color: #F00;
	transition:all .5s;
}
.box{
	display:flex;
	align-items:center;
	
	li{
		flex:auto;
		position:relative;
		padding:.2rem 0;
		&.active>p{
			color:#FFF;
		}
		p{
			text-align:center;
			transition:all .5s;
			color:#000;
		}
	}
}
</style>
