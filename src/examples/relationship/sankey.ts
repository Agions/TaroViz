import { EChartsOption } from 'echarts';

const option: EChartsOption = {
  title: {
    text: '桑基图示例',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove'
  },
  series: [
    {
      type: 'sankey',
      data: [
        { name: '类别1' },
        { name: '类别2' },
        { name: '类别3' },
        { name: '类别4' },
        { name: '类别5' },
        { name: '类别6' }
      ],
      links: [
        { source: '类别1', target: '类别3', value: 5 },
        { source: '类别1', target: '类别4', value: 3 },
        { source: '类别1', target: '类别5', value: 8 },
        { source: '类别2', target: '类别4', value: 6 },
        { source: '类别2', target: '类别5', value: 2 },
        { source: '类别2', target: '类别6', value: 5 },
        { source: '类别3', target: '类别6', value: 3 },
        { source: '类别4', target: '类别6', value: 7 },
        { source: '类别5', target: '类别6', value: 4 }
      ],
      emphasis: {
        focus: 'adjacency'
      },
      lineStyle: {
        color: 'gradient',
        curveness: 0.5
      }
    }
  ]
};

export default {
  option,
  title: '桑基图',
  description: '展示数据流向和数量关系，适用于可视化流程和转化率',
};
