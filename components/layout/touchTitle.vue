<template>
<div class="touchTitle">
    <div ref="title" class="item" v-for="(title,i) in titles" :key="i" @tag="$emit('input',i)">{{title}}</div>
		<div class="box" :style="style"></div>
</div>
</template>

<script>
export default {
  name: 'touchTitle',
  props: {
    titles: {
      type: Array
    },
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    style () {
      return { width: this.width + 'px', transform: `translateX(${this.translateX}px)` }
    }
  },
  watch: {
    value (n) {
      this.width = this.elements[n].offsetWidth
      let translateX = 0
      for (let i = 0; i < n; i++) {
        translateX += this.elements[i].offsetWidth + 1
      }
      this.translateX = translateX
    }
  },
  data () {
    return {
      elements: null,
      width: 0,
      translateX: 0
    }
  },
  mounted () {
    this.elements = this.$refs.title
    this.width = this.elements[this.value].offsetWidth
  }
}
</script>

<style scoped lang="less">
	.touchTitle{
		position:relative;
		display:flex;
		background-color: #EEE;
		border:1px solid #EEE;
	}
	.box{
		position:absolute;
		height:100%;
		border-bottom:2px solid #F00;
		transition:all .3s;
	}
	.item{
		background-color: #FFF;
		flex:auto;
		padding:2px 0;
		text-align:center;
		
		&:not(:nth-last-child(2)){
			margin-right:1px;
		}
	}
</style>
