<template>
  <div class="charts"></div>
</template>

<script>
import echarts from 'echarts'
import { chartOption } from '../../utils/index'
let chart
export default {
  props: {
    data: Object
  },
  data () {
    return {

    }
  },
  mounted () {
    chart = echarts.init(this.$el);
    this.init()
  },
  methods: {
    init () {
      let data = {
        data: [{
          name: '张三',
          value: [90, 50, 39, 50, 89, 85, 43, 55, 90],
        }],
        yAxis: [['倾向平等', '重视自我', '直接沟通', '一直同仁', '任务向导', '直线思维', '事实导向', '严格时间观',], ['遵循等级', '重视集体', '婉转沟通', '上下有别', '关系向导', '曲线思维', '感觉导向', '弹性时间观']],
        maxValue: 100,//最大衡量
      }
      const options = chartOption(data)
      chart.setOption(options);
    }
  }
}
</script>

<style scoped>
.charts {
  width: 100%;
  height: 800px;
}
</style>
