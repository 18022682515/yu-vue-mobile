<template>
	<yu-transition :name="name">
		<keep-alive>
			<yu-page :key="change" v-if="value" :value="value" @input="$emit('input',!value)" v-on="$listeners">
				<slot></slot>
			</yu-page>
		</keep-alive>
	</yu-transition>
</template>

<script>
export default {
	name:'subpage',
	props:{
		name:{
			type:String,
			default:'left'
		},
		value:{
			type:Boolean,
			default:false
		},
		toggle:{}
	},
	computed:{
		change(){
			this.toggle;
			return Math.random();
		}
	}
}
</script>

<style scoped lang="less">

</style>