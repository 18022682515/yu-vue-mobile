<template>
	<router-link class="router" :to="to" @click.native="$emit('input',!value)">
	  <slot></slot>
	</router-link>
</template>

<script>
export default {
  name: 'router',
  props: {
    to: {
      type: [String, Object]
    },
    value: {
      type: Boolean,
      default: false
    }
  }

}
</script>

<style scoped lang="less">

</style>
