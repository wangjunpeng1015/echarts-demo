//线条颜色
const color = ['#024280', '#d2f8c8', '#ffbfc1', '#ffe3ba', '#ffd3ff', '#c1dbff']
//
export const chartOption = async (datas) => {
  const { maxValue, yAxis, data } = JSON.parse(JSON.stringify(datas))

  await Promise.all(data.map((n, i) => borderPic(n, color[i])))

  const lineitemStyle = {
    normal: {
      label: {
        formatter: function (params) {
          return maxValue - params.value;
        },
        fontSize: 40,
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
      symbolSize: 1,
      symbol: item.symbol,
      z: 6,
      itemStyle: lineitemStyle,
      markPoint: {
        data: [{
          symbol: item.icon,
          // symbol: borderPic(item.icon, color[i]),
          symbolSize: 50,
          value: item.name,
          symbolOffset: [0, '-35%'],
          itemStyle: {
            normal: {
              // color: 各异，
              // borderColor: 各异,     // 标注边线颜色，优先于color 
              borderWidth: 20,            // 标注边线线宽，单位px，默认为1
              label: {
                show: true,
                position: 'top' // 可选为'left'|'right'|'top'|'bottom'
                // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
              }
            },
            emphasis: {
              // color: 各异
              label: {
                show: true
                // position: 'inside'  // 'left'|'right'|'top'|'bottom'
                // textStyle: null     // 默认使用全局文本样式，详见TEXTSTYLE
              }
            }
          },
          coord: [xPos, yAxis[0].length],
          label: {
            position: "top",
            fontSize: 18,
            color: '#000',
            formatter (data) {
              return data.value;
            }
          },
        }],
      },

      data: item.value.concat('_')
    }, {
      name: item.name,
      type: 'line',
      symbolSize: 1,
      itemStyle: lineitemStyle,
      showAllSymbol: false,
      markLine: {
        silent: true,
        symbol: 'none', //去掉箭头
        label: {
          show: false,
        },
        lineStyle: {
          color: '#cacaca',
          type: 'solid',
        },
        data: item.value.map((n, i) => ({
          yAxis: i
          // yAxis: i
        }))
      },
      lineStyle: {
        normal: {
          type: 'dotted'
        }
      },
      data: new Array(num).fill('_').concat([item.value[num], xPos])
    })
  })
  const yAxisData = yAxis.map((item, i) => {
    return {
      type: 'category',
      boundaryGap: true,
      axisTick: {
        show: true,
        alignWithLabel: true
      },
      //两侧线条
      axisLine: {
        onZero: false,
        lineStyle: {
          color: '#cacaca'
        },
      },
      axisLabel: {
        margin: 28,
        fontSize: 16,
        color: '#000'
      },
      // minorTick: {
      //   show: true,
      // },
      data: item.concat(['']),
    }
  })
  let option = {
    color,
    tooltip: {
      show: false,
      trigger: 'axis',
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
      min: -100,
      max: 100,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
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
//给图片加边框base64（用背景色模拟边框）
const borderPic = (data, color) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = data.icon
    img.setAttribute("crossOrigin", 'Anonymous')//避免部分bug
    img.onload = () => {
      const { width, height } = img
      const canvas = document.createElement('canvas')
      const border = 100
      canvas.width = width + border//留边用
      canvas.height = height + border//留边用
      const ctx = canvas.getContext('2d')
      //设置圆角边线
      ctx.lineJoin = "round";
      ctx.lineWidth = border;
      ctx.strokeStyle = color;
      ctx.strokeRect(border / 2, border / 2, width, height);
      // 将图片画到canvas上面上去！
      ctx.drawImage(img, border / 2, border / 2);
      const url = canvas.toDataURL("image/png");
      data.icon = `image://${url}`
      resolve()
    }
  })
}
