
import Highcharts from 'highcharts'
export const chartOption = (datas) => {
  const {yAxis} = datas
  let option ={
    chart: {
      type: 'spline',
      inverted: true // x y轴对调
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      floating: true,
      borderWidth: 1,
    },
    xAxis: [{
      plotLines:  yAxis[0].map((n,i)=>({
          color: '#c3c3c3',
          width: 1,
          value: i
      })),
      categories:  yAxis[0],
    },{
      opposite: true, 
      linkedTo: 0,
      categories:  yAxis[1],
    }],
    yAxis: {
      lineWidth: 1,
      labels:{
        enabled:false
      }
    },
    series: [{
      name: '小张',
      marker: {
        fillColor: 'white',
        lineWidth: 2,
        lineColor: Highcharts.getOptions().colors[0]
      },
      data: [3, 4, 3, 5, 4, 10, 12]
    }, {
      marker: {
        fillColor: 'white',
        lineWidth: 2,
        lineColor: Highcharts.getOptions().colors[0]
      },
      name: '小潘',
      data: [1, 3, 4, 3, 3, 5, 4]
    }]
  }
  return option
}