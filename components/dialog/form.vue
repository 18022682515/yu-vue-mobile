<template>
<transition>
	<div class="layer" v-if="value" @mousedown="$emit('input',!value)">
		<form class="dialog" action="javascript:" @mousedown.stop>
			<h3>{{title}}</h3>
			<span @click="$emit('input',!value)" class="close">x</span>
			<div class="label" v-for="label in o">
				<label>
					<div class="box">
						<p class="text">{{label.text}}</p>
						<input :style="{ width:new RegExp(label.text).test('图片验证码')?'60%':'100%',borderColor:label.allow?'#dcdfe6':'#F00' }" :type="label.type" autocomplete="off" :name="label.type" v-model="label.value">
						<div class="img" v-if="new RegExp(label.text).test('图片验证码')" :style="{ width:'40%' }">
							<img :src="img" alt="" width="100%">
						</div>
					</div>
				</label>
			</div>
			<div class="btn-group">
				<button @click="reset">重置</button>
				<button @click="$emit('submit',o)">提交</button>
			</div>
		</form>
	</div>
</transition>
</template>

<script>

const names = {
  username: '用户名字',
  password: '输入密码',
  verify: '输入验证码',
  phone: '手机号码',
  email: '邮箱地址'
}
export default {
  name: 'yuForm',
  props: {
    value: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '用户注册'
    },
    img: {
      type: String,
      default: ''
    },
	  labels: {
	    type: Array,
	    default: () => ['用户名', '密码', '验证码']
	  }
  },
  data () {
    return {
      o: []
    }
  },
  methods: {
    reset () {
      this.o.forEach(label => {
        this.$set(label, 'allow', true)
        this.$set(label, 'value', '')
      })
    }
  },
  created () {
    this.labels.forEach((val, i) => {
      this.$set(this.o, i, {})
      this.$set(this.o[i], 'text', val)
      this.$set(this.o[i], 'allow', true)

      Object.keys(names).forEach(key => {
			  if (new RegExp(val).test(names[key])) {
          this.$set(this.o[i], 'type', key)
          this.$set(this.o[i], 'value', '')
        }
      })
    })
  }
}
</script>

<style scoped lang="less">
.v-enter,.v-leave-to{
	opacity:0
}
.v-enter-active,.v-leave-active{
	transition:all .6s;
}

.layer{
	position:absolute;
	top:0;
	left:0;
	bottom:0;
	right:0;
	font-size:13px;
	background-color: rgba(0,0,0,.7);

	.dialog{
		position:absolute;
		top:50%;
		left:50%;
		width:25%;
		min-height:10%;
		border-radius: 2px;
		padding:30px;
		transform:translate(-50%,-50%);
		background-color: #FFF;

		h3{
			text-align: center;
			margin:0px 0 15px 0;
		}
		.close{
			font-size:20px;
			color:#49a2ff;
			position:absolute;
			top:3px;
			right:10px;
		}

		.btn-group{
			margin-top:15px;
			text-align: right;

			button{
				display:inline-block;
				outline:0;
				border:1px solid #dcdfe6;
				border-radius: 4px;
				padding: 12px 20px;
				background-color: #FFF;
				&:first-child:hover{
					border-color: #c6e2ff;
					background-color:#ecf5ff;
					color:#409eff;
				}
				&:last-child{
					border-color:#409eff;
					background-color:#409eff;
					color:#FFF;
				}
			}
		}

		.label{
			overflow: hidden;
			margin-top:15px;

			.box{
				width:75%;
				float:right;
				margin:0;
				padding:0;
				display:flex;
				align-items: center;

				.text{
					box-sizing: border-box;
					text-align: left;
					color:rgb(96, 98, 102);
					width:30%;
					margin-left:-30%;
				}

				input{
					display:inline-block;
					box-sizing: border-box;
					width:100%;
					height:30px;
					line-height:1px;
					outline: 0;
					border:1px solid #dcdfe6;
					border-radius: 4px;
					padding:0 10px;
					margin:0;
					&:focus{
						background-color: #303133;
						color:#FFF;
					}
				}
			}
		}

	}
}
</style>
