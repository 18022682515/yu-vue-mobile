<template>
<div class="router-container">
    <slot></slot>
		<yu-transition :name="name">
			<div class="view" v-if="value">
				<keep-alive>
					<router-view></router-view>
				</keep-alive>
				<i class="iconfont" @touchstart="start">&#xe637;</i>
			</div>
		</yu-transition>
</div>
</template>

<script>
export default {
  name: 'routerContainer',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'left'
    }
  },
  methods: {
    start () {
      this.$router.go(-1)
      this.$emit('input', !this.value)
    }
  },
}
</script>

<style scoped lang="less">
.view{
	position:fixed;
	top:0;
	left:0;
	background-color: #FFF;
	width:100vw;
	height:100vh;
	overflow:hidden;
	z-index:1;

	.iconfont{
		position:absolute;
		top:1vw;
		left:1vw;
		opacity:.3;
	}
}
</style>
