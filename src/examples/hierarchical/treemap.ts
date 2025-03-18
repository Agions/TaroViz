import { EChartsOption } from 'echarts';

// 构建树形数据
const data = {
  name: '总体',
  children: [
    {
      name: '类别1',
      value: 40,
      children: [
        {
          name: '子类别1-1',
          value: 15
        },
        {
          name: '子类别1-2',
          value: 25
        }
      ]
    },
    {
      name: '类别2',
      value: 60,
      children: [
        {
          name: '子类别2-1',
          value: 20
        },
        {
          name: '子类别2-2',
          value: 25
        },
        {
          name: '子类别2-3',
          value: 15
        }
      ]
    },
    {
      name: '类别3',
      value: 30,
      children: [
        {
          name: '子类别3-1',
          value: 10
        },
        {
          name: '子类别3-2',
          value: 20
        }
      ]
    }
  ]
};

const option: EChartsOption = {
  title: {
    text: '矩形树图示例',
    left: 'center'
  },
  tooltip: {
    formatter: function (info) {
      const value = info.value;
      const treePathInfo = info.treePathInfo;
      const treePath = [];

      for (let i = 1; i < treePathInfo.length; i++) {
        treePath.push(treePathInfo[i].name);
      }

      return [
        '<div class="tooltip-title">' + treePath.join('/') + '</div>',
        '数值: ' + value
      ].join('');
    }
  },
  series: [
    {
      name: '矩形树图',
      type: 'treemap',
      visibleMin: 300,
      data: [data],
      leafDepth: 1,
      label: {
        show: true,
        formatter: '{b}'
      },
      upperLabel: {
        show: true,
        height: 30
      },
      itemStyle: {
        borderColor: '#fff'
      },
      levels: [
        {
          itemStyle: {
            borderColor: '#777',
            borderWidth: 3,
            gapWidth: 3
          },
          upperLabel: {
            show: false
          }
        },
        {
          itemStyle: {
            borderColor: '#aaa',
            borderWidth: 2,
            gapWidth: 2
          }
        },
        {
          colorSaturation: [0.35, 0.5],
          itemStyle: {
            borderWidth: 1,
            gapWidth: 1
          }
        }
      ]
    }
  ]
};

export default {
  option,
  title: '矩形树图',
  description: '以嵌套矩形的形式展示树形数据结构，矩形面积表示数值大小',
};
