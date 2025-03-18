import { EChartsOption } from 'echarts';

// 构建旭日图数据
const data = [
  {
    name: '类别1',
    itemStyle: { color: '#da0d68' },
    children: [
      {
        name: '子类别1-1',
        value: 15,
        itemStyle: { color: '#975e6d' }
      },
      {
        name: '子类别1-2',
        value: 25,
        itemStyle: { color: '#e0719c' }
      }
    ]
  },
  {
    name: '类别2',
    itemStyle: { color: '#da1d23' },
    children: [
      {
        name: '子类别2-1',
        value: 20,
        itemStyle: { color: '#dd4c51' }
      },
      {
        name: '子类别2-2',
        value: 25,
        itemStyle: { color: '#c94a44' }
      },
      {
        name: '子类别2-3',
        value: 15,
        itemStyle: { color: '#e87897' }
      }
    ]
  },
  {
    name: '类别3',
    itemStyle: { color: '#f7a128' },
    children: [
      {
        name: '子类别3-1',
        value: 10,
        itemStyle: { color: '#f26355' }
      },
      {
        name: '子类别3-2',
        value: 20,
        itemStyle: { color: '#f99b7d' }
      }
    ]
  }
];

const option: EChartsOption = {
  title: {
    text: '旭日图示例',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c}'
  },
  series: [
    {
      type: 'sunburst',
      data: data,
      radius: ['15%', '80%'],
      label: {
        rotate: 'radial',
        minAngle: 15
      },
      levels: [
        {},
        {
          r0: '15%',
          r: '45%',
          itemStyle: {
            borderWidth: 2
          },
          label: {
            rotate: 'tangential'
          }
        },
        {
          r0: '45%',
          r: '80%',
          label: {
            align: 'right'
          }
        }
      ]
    }
  ]
};

export default {
  option,
  title: '旭日图',
  description: '展示层级数据的占比关系，以同心圆的形式进行多层级的数据展示',
};
