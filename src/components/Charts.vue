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
  data () {
    return {
      chartOptions: {},
    };
  },
  mounted () {
    chart = echarts.init(this.$el);
    this.init();
  },
  methods: {
    async init () {
      let data = {
        data: [
          {
            name: "自己",
            symbol: "emptyRect",
            icon:
              "https://iknow-pic.cdn.bcebos.com/32fa828ba61ea8d3ec8bdf94940a304e241f58f0", //或者base64
            value: [-50, 80, 50, 20, 15, 65, 33, 75],
          },
          {
            name: "美国",
            symbol: "emptyCircle",
            icon:
              "https://i-1-lanrentuku.qqxzb-img.com/2020/11/10/35d1e503-7436-4a09-b669-9e444c5c2df9.jpg?imageView2/2/w/1024/", //或者base64
            value: [40, 50, 30, 20, 15, 35, 43, 25],
          },
          {
            name: "德国",
            symbol: "emptyCircle",
            icon:
              "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=316329990,361704271&fm=26&gp=0.jpg", //或者base64
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
        maxValue: 20, //最大衡量
      };
      const options = await chartOption(data);
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
