import { EChartsOption } from 'echarts';

const option: EChartsOption = {
  title: {
    text: '折线图示例',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '销量',
      type: 'line',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      smooth: true,
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' }
        ]
      },
      markLine: {
        data: [
          { type: 'average', name: '平均值' }
        ]
      }
    },
    {
      name: '收益',
      type: 'line',
      data: [320, 432, 501, 634, 790, 1130, 1220],
      smooth: true,
      markPoint: {
        data: [
          { name: '周最高', value: 1130, xAxis: 5, yAxis: 1130 },
          { name: '周最低', value: 320, xAxis: 0, yAxis: 320 }
        ]
      },
      markLine: {
        data: [
          { type: 'average', name: '平均值' },
          { symbol: 'none', x: '90%', yAxis: 'max' }
        ]
      }
    }
  ]
};

export default {
  option,
  title: '折线图',
  description: '用于展示数据随时间或类别的变化趋势',
};
