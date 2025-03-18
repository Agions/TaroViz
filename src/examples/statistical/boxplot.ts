import { EChartsOption } from 'echarts';

// 准备数据
const data = [
  [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
  [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880, 880, 830, 800, 790, 760, 800],
  [880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870, 840, 840, 850, 840, 840, 840],
  [890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920, 890, 860, 880, 720, 840, 850, 850, 780],
  [890, 840, 780, 810, 760, 810, 790, 810, 820, 850, 870, 870, 810, 740, 810, 940, 950, 800, 810, 870]
];

// 计算箱线图数据
const boxplotData = [];
const categoryData = [];
for (let i = 0; i < data.length; i++) {
  const sorted = data[i].sort((a, b) => a - b);
  const q1 = sorted[Math.floor(sorted.length / 4)];
  const q2 = sorted[Math.floor(sorted.length / 2)];
  const q3 = sorted[Math.floor(sorted.length * 3 / 4)];
  const iqr = q3 - q1;
  const min = q1 - 1.5 * iqr > sorted[0] ? q1 - 1.5 * iqr : sorted[0];
  const max = q3 + 1.5 * iqr < sorted[sorted.length - 1] ? q3 + 1.5 * iqr : sorted[sorted.length - 1];
  boxplotData.push([min, q1, q2, q3, max]);
  categoryData.push('类别' + (i + 1));
}

const option: EChartsOption = {
  title: {
    text: '箱线图示例',
    left: 'center'
  },
  dataset: {
    source: [
      boxplotData[0],
      boxplotData[1],
      boxplotData[2],
      boxplotData[3],
      boxplotData[4]
    ]
  },
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'shadow'
    },
    formatter: function (params) {
      return [
        `类别: ${categoryData[params.dataIndex]}`,
        `最大值: ${params.data[4]}`,
        `上四分位: ${params.data[3]}`,
        `中位数: ${params.data[2]}`,
        `下四分位: ${params.data[1]}`,
        `最小值: ${params.data[0]}`
      ].join('<br/>');
    }
  },
  grid: {
    left: '10%',
    right: '10%',
    bottom: '15%'
  },
  xAxis: {
    type: 'category',
    data: categoryData,
    boundaryGap: true,
    nameGap: 30,
    splitLine: {
      show: false
    },
    axisLabel: {
      formatter: '{value}'
    }
  },
  yAxis: {
    type: 'value',
    name: '数值',
    splitLine: {
      show: true
    }
  },
  series: [
    {
      name: '箱线图',
      type: 'boxplot',
      datasetIndex: 0,
      tooltip: {
        formatter: function (param) {
          return [
            `类别: ${categoryData[param.dataIndex]}`,
            `最大值: ${param.data[4]}`,
            `上四分位: ${param.data[3]}`,
            `中位数: ${param.data[2]}`,
            `下四分位: ${param.data[1]}`,
            `最小值: ${param.data[0]}`
          ].join('<br/>');
        }
      },
      itemStyle: {
        borderColor: '#61a0a8',
        borderWidth: 2
      }
    }
  ]
};

export default {
  option,
  title: '箱线图',
  description: '用于显示数据分布特征，包括中位数、四分位数和异常值',
};
