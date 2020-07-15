<template>
<div class="echarts" :style="{ width,height }"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'echarts',
  props: {
    width: {
      type: String,
      default: 'auto'
    },
    height: {
      type: String,
      default: '300px'
    },
    option: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    option: {
      handler (n) {
        this.chart.setOption(n)
      },
      deep: true
    }
  },
  mounted () {
    this.chart = echarts.init(this.$el)
    this.chart.setOption(this.option)
    this.$emit('load', this.chart)
  }
}
</script>

<style scoped lang="less">

</style>
