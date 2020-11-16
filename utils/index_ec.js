
export const chartOption = (datas) => {
  var firstLineData = [90, 50, 39, 50, 120, 85, '_'];
  var firstLineDottedData = ['_', '_', '_', '_', '_', 85, 100];

  var sendLineData = [70, 50, 50, 87, 90, 42, '_'];
  var sendLineDottedData = ['_', '_', '_', '_', '_', 42, 65];

  var threeLineData = [220, 182, 191, 234, 290, 78, '_'];
  var threeLineDottedData = ['_', '_', '_', '_', '_', 78, 180];
  const { maxValue, yAxis, data } = datas

  var lineitemStyle2 = {
    normal: {
      label: {
        formatter: function (params) {
          return maxValue - params.value;
        },
        fontSize: 40,
        padding: [90, 0, 0, 0],
        color: '#000',
        textStyle: {
          baseline: 'top'
        }
      },
      color: '#66ff00',
      borderColor: 'rgba(102, 255, 0, 0.5)',
      borderWidth: 10
    }
  };
  var lineitemStyle1 = {
    normal: {
      label: {
        formatter: function (params) {
          return maxValue - params.value;
        },
        fontSize: 40,
        padding: [90, 0, 0, 0],
        color: '#000',
        textStyle: {
          baseline: 'top'
        }
      },
      color: '#ffea00',
      borderColor: 'rgba(255, 234, 0, 0.5)',
      borderWidth: 10
    }
  };
  var lineitemStyle = {
    normal: {
      label: {
        formatter: function (params) {
          return maxValue - params.value;
        },
        fontSize: 40,
        padding: [90, 0, 0, 0],
        color: '#',
        textStyle: {
          baseline: 'top'
        }
      },
      color: '#01f2ee',
      borderColor: 'rgba(1, 242, 238, 0.5)',
      borderWidth: 10
    }
  };

  let series = []
  data.map((item, i) => {
    series.push({
      name: item.name,
      type: 'line',
      symbolSize: 5,
      symbol: 'emptyCircle',
      itemStyle: lineitemStyle,
      markLine: {
        itemStyle: {
          normal: {
            lineStyle: {
              width: 1,
              color: '#c3c3c3',
              type: 'solid',
            },
          },
        },
        // symbol: 'none', //去掉箭头
        // data: [[{ coord: [item.name, 0] }, { coord: [item.name, 100] }]],
      },
      data: item.value.concat('_')
    }, {
      name: item.name,
      type: 'line',
      symbolSize: 20,
      symbol: 'image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7',
      itemStyle: lineitemStyle,
      showAllSymbol: false,
      lineStyle: {
        normal: {
          type: 'dotted'
        }
      },
      // tooltip: {
      //   formatter: '{b0},{a0}: {c0}<br />{b2}'
      // },
      data: (() => {
        const num = item.value.length - 2
        const split = maxValue / item.value.length + 1
        return new Array(num + 1).fill('_').concat([item.value[num + 1], split * i + 1])
      })()
    })
  })
  const yAxisData = yAxis.map((item, i) => {
    return {
      type: 'category',
      axisTick: {
        show:false,
        lineStyle: {
          color: i === 0 ? 'red' : 'green',
          shadowOffsetY: i === 0 ? 10 : 0
        }
      },
      axisLine: {
        lineStyle: {
          color: '#c3c3c3'
        },
        // onZero: false
      },
      axisLabel: {
        fontSize: 14,
        color: '#000'
      },
      splitLine: {
        show: false,
        lineStyle: {
          // shadowOffsetY:-29,
          // opacity : 0,
          // color: '#c3c3c3',
        }
      },
      data: item.concat(['', '']),
      // scale: true
    }
  })
  let option = {
    // backgroundColor: '#293042',
    legend:{
      data: data.map(item=>{
        return {
          name:item.name,
          icon:item.icon
        }
      }),
    },
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
      // boundaryGap: true,
      axisTick: {
        show: false,
      },
      axisLine: {
        show:true,
        lineStyle: {
          color: '#c3c3c3'
        },
        onZero: true
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