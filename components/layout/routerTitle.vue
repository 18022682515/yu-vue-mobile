<template>
<div class="router-title">
	<div class="item" :style="style"></div>
	<ul class="box" :style="{ width }">
		<li ref="li" v-for="(item,i) in titles" :class="{ active:index===i }" @tap="index=i">
			<router-link tap="p" :to="item.path">{{item.text}}</router-link>
		</li>
	</ul>
	
</div>

</template>

<script>
export default {
  name: 'router-title',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    titles: {
      type: Array
    }
  },
  watch: {
    index (n, o) {
      this.x = 0
      this.eles.forEach((ele, i) => {
        if (i === 0 || i > n) return
        this.x += this.eles[i - 1].offsetWidth
      })
      this.itemWidth = this.eles[n].offsetWidth
    },
		'$route'(n,o){
			let paths = this.titles.map(item=>item.path);
			let i = paths.indexOf(n.path);
			this.index = i===-1? 0: i;
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
			index:0,
      itemWidth: 0,
      x: 0
    }
  },
  mounted () {
    this.eles = this.$refs.li
    this.eles.forEach((ele, i) => {
		  if (i === 0 || i > this.index) return
		  this.x += this.eles[i - 1].offsetWidth
    })
    this.itemWidth = this.eles[this.index].offsetWidth
    this.$router.push(this.titles[this.index])
  }
}
</script>

<style scoped lang="less">
.router-title{
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
