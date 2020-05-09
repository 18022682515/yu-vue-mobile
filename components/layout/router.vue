<template>
<div class="router">
	<router-link :to="to">
		<slot></slot>
	</router-link>
	<yu-transition :name="name">
		<div class="box" v-if="show">
			<keep-alive>
				<router-view class="view"></router-view>
			</keep-alive>
				<div class="return">
					<i class="iconfont " @click="$router.go(-1)">&#xe637;</i>
				</div>
		</div>
	</yu-transition>
</div>
</template>

<script>

export default {
  name: 'router',
  data () {
    return {
      show: false,
			path:'/'
    }
  },
  props: {
		name:{
			type:String,
			default:'left'
		},
    to: {
      type: [String, Object]
    }
  },
  watch: {
    '$route' (n, o) {
      let path = ''; let name = ''
      if (typeof this.to === 'object') {
        path = this.to.path
        name = this.to.name
      } else {
        path = this.to
      }
			
			let oArr = (path||this.path).split('/')
			let nArr = n.path.split('/')
			let bool = oArr[oArr.length-1]===(nArr[nArr.length-2]||false);

			if ((path && n.path === path) || (name && n.name === name)) {
				this.show = true
				if(!path){
					this.path = n.path
				}
			} else {
				if(bool){
					this.show = true;
				}else{
					this.show = false
				}
				
			}
    }
  }
}
</script>

<style scoped lang="less">
.box{
	position:fixed;
	top:0;
	left:0;
	width:100vw;
	height:100vh;
	overflow:hidden;
	background-color: #FFF;
}
.return{
	position:absolute;
	top:0;
	left:0;
	right:0;
	opacity:.5;
}
</style>
