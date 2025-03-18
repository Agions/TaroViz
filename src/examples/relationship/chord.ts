import { EChartsOption } from 'echarts';

const option: EChartsOption = {
  title: {
    text: '和弦图示例',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: function (params) {
      return params.name + '的数据';
    }
  },
  series: [
    {
      type: 'chord',
      data: [
        { name: '类别1' },
        { name: '类别2' },
        { name: '类别3' },
        { name: '类别4' },
        { name: '类别5' },
        { name: '类别6' }
      ],
      matrix: [
        [0, 30, 25, 10, 5, 15],
        [30, 0, 0, 20, 25, 5],
        [25, 0, 0, 35, 0, 10],
        [10, 20, 35, 0, 10, 15],
        [5, 25, 0, 10, 0, 20],
        [15, 5, 10, 15, 20, 0]
      ],
      label: {
        show: true,
        position: 'outside',
        margin: 8,
        fontSize: 14
      },
      ribbonStyle: {
        opacity: 0.7,
        borderWidth: 1,
        borderColor: '#000'
      }
    }
  ]
};

export default {
  option,
  title: '和弦图',
  description: '展示矩阵数据间的关系，适合展示复杂的相互引用关系',
};
