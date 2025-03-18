import { EChartsOption } from 'echarts';

const option: EChartsOption = {
  title: {
    text: '2023年各季度销售额',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: {
    type: 'category',
    data: ['第一季度', '第二季度', '第三季度', '第四季度']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} 万元'
    }
  },
  series: [
    {
      name: '销售额',
      type: 'bar',
      data: [
        {
          value: 120,
          itemStyle: {
            color: '#91cc75'
          }
        },
        {
          value: 200,
          itemStyle: {
            color: '#fac858'
          }
        },
        {
          value: 150,
          itemStyle: {
            color: '#ee6666'
          }
        },
        {
          value: 280,
          itemStyle: {
            color: '#73c0de'
          }
        }
      ],
      label: {
        show: true,
        position: 'top',
        formatter: '{c} 万元'
      }
    }
  ]
};

export default {
  option,
  title: '柱状图',
  description: '用于展示不同类别的数值对比',
};
