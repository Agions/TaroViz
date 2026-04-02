# 箱线图 BoxPlotChart

箱线图用于展示数据分布，包含最小值、Q1、中位数、Q3、最大值五个统计量，适合进行多组数据的统计对比。

## 基本用法

```typescript
import React from 'react';
import { BoxplotChart } from '@agions/taroviz';

const option = {
  title: {
    text: '班级成绩分布对比',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '10%',
    right: '10%',
    bottom: '15%'
  },
  xAxis: {
    type: 'category',
    data: ['一班', '二班', '三班', '四班'],
    name: '班级',
    nameLocation: 'middle',
    nameGap: 30
  },
  yAxis: {
    type: 'value',
    name: '分数',
    nameLocation: 'middle',
    nameGap: 40,
    min: 600,
    max: 1200
  },
  series: [
    {
      type: 'boxplot',
      data: [
        [850, 940, 980, 1050, 1130],   // 一班
        [920, 1000, 1050, 1150, 1200], // 二班
        [780, 850, 920, 1050, 1150],   // 三班
        [880, 950, 990, 1080, 1160]    // 四班
      ],
      itemStyle: {
        color: '#5470c6',
        borderColor: '#5470c6'
      }
    }
  ]
};

export default function App() {
  return <BoxplotChart chartId="boxplot-basic" option={option} width="100%" height={400} />;
}
```

## 多指标箱线图

```typescript
import React from 'react';
import { BoxplotChart } from '@agions/taroviz';

const option = {
  title: {
    text: '各科目成绩分布',
    left: 'center'
  },
  legend: {
    top: 10,
    data: ['语文', '数学', '英语']
  },
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: {
    type: 'category',
    data: ['一班', '二班', '三班']
  },
  yAxis: {
    type: 'value',
    name: '分数'
  },
  series: [
    {
      name: '语文',
      type: 'boxplot',
      data: [
        [75, 82, 88, 92, 98],
        [72, 80, 85, 90, 96],
        [78, 85, 90, 95, 100]
      ]
    },
    {
      name: '数学',
      type: 'boxplot',
      data: [
        [80, 88, 93, 97, 100],
        [85, 90, 94, 98, 100],
        [82, 89, 92, 96, 99]
      ]
    },
    {
      name: '英语',
      type: 'boxplot',
      data: [
        [70, 78, 85, 90, 95],
        [75, 82, 88, 93, 98],
        [72, 80, 86, 91, 96]
      ]
    }
  ]
};

export default function App() {
  return <BoxplotChart chartId="boxplot-multi" option={option} width="100%" height={450} />;
}
```

## 水平箱线图

```typescript
import React from 'react';
import { BoxplotChart } from '@agions/taroviz';

const option = {
  title: {
    text: '产品评分分布（水平方向）',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: {
    type: 'value',
    name: '评分',
    min: 0,
    max: 10
  },
  yAxis: {
    type: 'category',
    data: ['产品A', '产品B', '产品C', '产品D', '产品E'],
    name: '产品'
  },
  series: [
    {
      type: 'boxplot',
      data: [
        [6.5, 7.5, 8.2, 8.8, 9.5],
        [5.8, 6.8, 7.5, 8.2, 9.0],
        [7.2, 8.0, 8.5, 9.0, 9.6],
        [6.0, 7.0, 7.8, 8.5, 9.2],
        [7.8, 8.5, 9.0, 9.4, 9.8]
      ]
    }
  ]
};

export default function App() {
  return <BoxplotChart chartId="boxplot-horizontal" option={option} width="100%" height={400} />;
}
```

## 自定义样式

```typescript
import React from 'react';
import { BoxplotChart } from '@agions/taroviz';

const option = {
  title: {
    text: '城市温度分布（箱线图）',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: (param: any) => {
      return [
        `${param.name}:`,
        `最高: ${param.data.value[4]}°C`,
        `上四分位: ${param.data.value[3]}°C`,
        `中位数: ${param.data.value[2]}°C`,
        `下四分位: ${param.data.value[1]}°C`,
        `最低: ${param.data.value[0]}°C`
      ].join('<br/>');
    }
  },
  xAxis: {
    type: 'category',
    data: ['北京', '上海', '广州', '深圳', '成都']
  },
  yAxis: {
    type: 'value',
    name: '温度 (°C)',
    min: -10,
    max: 40
  },
  series: [
    {
      type: 'boxplot',
      data: [
        [-5, 5, 15, 25, 35],   // 北京
        [5, 15, 22, 28, 35],   // 上海
        [10, 20, 26, 32, 38],  // 广州
        [12, 22, 28, 33, 38],  // 深圳
        [0, 10, 18, 25, 32]    // 成都
      ],
      itemStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#ff6b6b' },
            { offset: 1, color: '#4ecdc4' }
          ]
        },
        borderColor: '#555',
        borderWidth: 1,
        shadowBlur: 5,
        shadowColor: 'rgba(0,0,0,0.3)'
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.5)'
        }
      }
    }
  ]
};

export default function App() {
  return <BoxplotChart chartId="boxplot-styled" option={option} width="100%" height={400} />;
}
```

## 与散点图结合

```typescript
import React from 'react';
import { BoxplotChart } from '@agions/taroviz';

const option = {
  title: {
    text: '成绩分布与异常值',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    top: 10,
    data: ['箱线图', '异常值']
  },
  xAxis: {
    type: 'category',
    data: ['一班', '二班', '三班']
  },
  yAxis: {
    type: 'value',
    name: '分数'
  },
  series: [
    {
      name: '箱线图',
      type: 'boxplot',
      data: [
        [780, 850, 920, 1050, 1150],
        [820, 900, 960, 1100, 1180],
        [750, 840, 900, 1020, 1120]
      ]
    },
    {
      name: '异常值',
      type: 'scatter',
      symbolSize: 10,
      data: [
        [0, 650],   // 一班异常低分
        [0, 1180],  // 一班异常高分
        [1, 700],   // 二班异常低分
        [2, 620],   // 三班异常低分
        [2, 1150]   // 三班异常高分
      ],
      itemStyle: {
        color: '#ff6b6b'
      }
    }
  ]
};

export default function App() {
  return <BoxplotChart chartId="boxplot-with-scatter" option={option} width="100%" height={400} />;
}
```

## API

| 属性 | 类型 | 默认值 | 说明 |
|:---|:---|:---|:---|
| chartId | `string` |必填 | 图表唯一标识 |
| option | `object` | 必填 | ECharts 配置项 |
| width | `string \| number` | `'100%'` | 图表宽度 |
| height | `string \| number` | `400` | 图表高度 |
| autoResize | `boolean` | `true` | 是否自动响应容器大小变化 |
| theme | `string` | `'default'` | 主题名称 |
| renderer | `'canvas' \| 'svg'` | `'canvas'` | 渲染器类型 |

## 使用场景

- **教育领域**：展示学生成绩分布，对比不同班级或年级的成绩情况
- **质量控制**：展示产品尺寸、重量等指标的分布情况
- **市场分析**：对比不同地区、不同时间段的销售数据分布
- **医学统计**：展示患者各项指标的分布特征

## 注意事项

1. 箱线图的每组数据应包含5个值：`[min, Q1, median, Q3, max]`
2. 如果数据不足5个值，组件会尝试计算缺失的统计量
3. 大数据集建议使用 `canvas` 渲染器以获得更好的性能
