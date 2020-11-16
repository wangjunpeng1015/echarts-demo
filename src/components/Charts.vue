<template>
  <div class="charts"></div>
  <!-- <highcharts :options="chartOptions"></highcharts> -->
</template>

<script>
import echarts from "echarts";
// import Highcharts from "highcharts";
// 在 Highcharts 加载之后加载功能模块
// import * as Exporting from "highcharts/modules/exporting";
// Exporting(Highcharts);
import { chartOption } from "../../utils/index";
let chart;
export default {
  props: {
    data: Object,
  },
  data() {
    return {
      chartOptions: {},
    };
  },
  mounted() {
    chart = echarts.init(this.$el);
    this.init();
  },
  methods: {
    init() {
      let data = {
        data: [
          {
            name: "美国",
            icon:
              "image://http://attachment.tpooo.com/forum/201406/17/165048czb6rract12t176i.jpg", //或者base64
            value: [40, 50, 30, 20, 15, 35, 43, 25],
          },
          {
            name: "德国",
            icon:
              "image://https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=316329990,361704271&fm=26&gp=0.jpg", //或者base64
            value: [95, 30, 10, 56, 45, 35, 53, 85],
          },
        ],
        yAxis: [
          [
            "倾向平等",
            "重视自我",
            "直接沟通",
            "一直同仁",
            "任务向导",
            "直线思维",
            "事实导向",
            "严格时间观",
          ],
          [
            "遵循等级",
            "重视集体",
            "婉转沟通",
            "上下有别",
            "关系向导",
            "曲线思维",
            "感觉导向",
            "弹性时间观",
          ],
        ],
        maxValue: 100, //最大衡量
      };
      const options = chartOption(data);
      chart.setOption(options);
    },
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 800px;
}
</style>
