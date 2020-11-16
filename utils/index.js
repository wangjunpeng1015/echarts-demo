
const color = ['#024280','#d2f8c8','#ffbfc1','#ffe3ba','#ffd3ff','#c1dbff']
export const chartOption = (datas) => {
  const { maxValue, yAxis, data } = datas

  var lineitemStyle = {
    normal: {
      label: {
        formatter: function (params) {
          return maxValue - params.value;
        },
        fontSize: 40,
        // padding: [90, 0, 0, 0],
      },
      borderWidth: 10
    }
  };

  let series = []
  data.map((item, i) => {
    const num = item.value.length - 1
    const split = maxValue / (data.length + 1)
    const xPos = split * (i + 1)
    series.push({
      name: item.name,
      type: 'line',
      symbolSize: 5,
      symbol: 'emptyCircle',
      itemStyle: lineitemStyle,
      markPoint:{
        data:[{
          symbol:item.icon,
          symbolSize:'50',
          value:item.name,
          symbolOffset:[0,'-35%'],
          symbolKeepAspect:true,
          coord:[xPos,yAxis[0].length],
          label:{
              position: "top",
              fontSize:18,
              color:'#000',
              formatter(data){
                  return data.value;
              }
          },
        }],
      },
      markLine:{
        symbol: 'none', //去掉箭头
        label:{
          show:false,
        },
        lineStyle:{
          color:'#cacaca',
          type:'solid'
        },
        data: item.value.map((n,i)=>({
            yAxis: i
        }))
      },
      data: item.value.concat('_')
    }, {
      name: item.name,
      type: 'line',
      itemStyle: lineitemStyle,
      showAllSymbol: false,
      lineStyle: {
        normal: {
          type: 'dotted'
        }
      },
      data: (() => {
        return new Array(num).fill('_').concat([item.value[num], xPos])
      })()
    })
  })
  const yAxisData = yAxis.map((item, i) => {
    return {
      type: 'category',
      boundaryGap:true,
      axisTick: {
        show:true,
        alignWithLabel:true
      },
      //两侧线条
      axisLine: {
        lineStyle: {
          color: '#cacaca'
        },
      },
      axisLabel: {
        margin:28,
        fontSize: 16,
        color: '#000'
      },
      minorTick:{
        show:true,
      },
      data: item.concat(['']),
    }
  })
  let option = {
    color,
    tooltip: {
      show: true,
      trigger: 'item'
    },
    grid: {
      left: '4%',
      right: '4%',
      top: '25%',
      bottom: '4%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisTick: {
        show: false,
      },
      axisLine: {
        show:false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: yAxisData,
    series: series
  };
  return option
}