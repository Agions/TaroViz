# 平行坐标图 ParallelChart

平行坐标图用于展示高维数据各维度之间的关系，适合多指标对比分析。每个垂直轴代表一个维度，数据通过折线连接各个轴上的值。

## 基本用法

```typescript
import React from 'react';
import { ParallelChart } from '@agions/taroviz';

const option = {
  title: {
    text: '产品多维度评估',
    left: 'center'
  },
  parallel: {
    left: '5%',
    right: '10%',
    bottom: '10%',
    top: '20%',
    height: '55%'
  },
  parallelAxisDefault: {
    type: 'value',
    name: '指标',
    nameLocation: 'end',
    nameTextStyle: {
      fontSize: 12
    },
    axisLine: {
      lineStyle: {
        color: '#999'
      }
    },
    axisTick: {
      show: true
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#eee',
        type: 'dashed'
      }
    }
  },
  series: [
    {
      type: 'parallel',
      lineStyle: {
        width: 2,
        opacity: 0.6
      },
      data: [
        [1, 55, 9, 56, 0.46, 2, 35],
        [2, 25, 11, 21, 0.65, 2, 33],
        [3, 56, 7, 63, 0.92, 3, 45],
        [4, 33, 12, 31, 0.32, 1, 28],
        [5, 42, 8, 42, 0.55, 2, 38],
        [6, 68, 5, 72, 0.78, 3, 48]
      ]
    }
  ]
};

export default function App() {
  return <ParallelChart chartId="parallel-basic" option={option} width="100%" height={450} />;
}
```

## 自定义坐标轴

```typescript
import React from 'react';
import { ParallelChart } from '@agions/taroviz';

const option = {
  title: {
    text: '用户画像分析',
    left: 'center'
  },
  parallelAxis: [
    {
      dim: 0,
      name: '活跃度',
      data: ['高', '中', '低'],
      type: 'category'
    },
    {
      dim: 1,
      name: '消费能力',
      min: 0,
      max: 100
    },
    {
      dim: 2,
      name: '社交指数',
      min: 0,
      max: 100
    },
    {
      dim: 3,
      name: '信用评分',
      min: 300,
      max: 900
    },
    {
      dim: 4,
      name: '忠诚度',
      min: 0,
      max: 100
    }
  ],
  parallel: {
    left: '8%',
    right: '10%',
    bottom: '15%',
    top: '20%',
    height: '50%'
  },
  series: [
    {
      type: 'parallel',
      lineStyle: {
        width: 2,
        opacity: 0.5
      },
      data: [
        ['高', 85, 92, 780, 88],
        ['高', 72, 88, 720, 75],
        ['中', 45, 60, 650, 55],
        ['中', 58, 72, 680, 62],
        ['低', 22, 35, 450, 30],
        ['低', 15, 28, 380, 22]
      ]
    }
  ]
};

export default function App() {
  return <ParallelChart chartId="parallel-custom-axis" option={option} width="100%" height={450} />;
}
```

## 多数据系列对比

```typescript
import React from 'react';
import { ParallelChart } from '@agions/taroviz';

const option = {
  title: {
    text: '不同类型产品对比',
    left: 'center'
  },
  legend: {
    top: 10,
    data: ['电子产品', '服装', '食品'],
    textStyle: {
      fontSize: 12
    }
  },
  parallelAxis: [
    { dim: 0, name: '价格' },
    { dim: 1, name: '销量' },
    { dim: 2, name: '满意度' },
    { dim: 3, name: '复购率' }
  ],
  parallel: {
    left: '10%',
    right: '10%',
    bottom: '15%',
    top: '25%',
    height: '45%'
  },
  series: [
    {
      name: '电子产品',
      type: 'parallel',
      lineStyle: {
        width: 3,
        color: '#5470c6',
        opacity: 0.7
      },
      data: [
        [80, 1200, 92, 65],
        [75, 1100, 88, 60],
        [85, 1350, 95, 72]
      ]
    },
    {
      name: '服装',
      type: 'parallel',
      lineStyle: {
        width: 3,
        color: '#91cc75',
        opacity: 0.7
      },
      data: [
        [60, 2000, 78, 45],
        [55, 1800, 75, 42],
        [65, 2200, 82, 48]
      ]
    },
    {
      name: '食品',
      type: 'parallel',
      lineStyle: {
        width: 3,
        color: '#fac858',
        opacity: 0.7
      },
      data: [
        [40, 3500, 85, 80],
        [35, 3200, 82, 78],
        [45, 3800, 88, 85]
      ]
    }
  ]
};

export default function App() {
  return <ParallelChart chartId="parallel-multi-series" option={option} width="100%" height={450} />;
}
```

## 交互式平行坐标图

```typescript
import React from 'react';
import { ParallelChart } from '@agions/taroviz';

const option = {
  title: {
    text: '学生综合评估（可筛选）',
    subtext: '点击轴线可筛选数据',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    padding: [10, 15],
    textStyle: {
      fontSize: 12
    }
  },
  parallelAxis: [
    { dim: 0, name: '语文', inverse: true },
    { dim: 1, name: '数学', inverse: true },
    { dim: 2, name: '英语', inverse: true },
    { dim: 3, name: '物理' },
    { dim: 4, name: '化学' },
    { dim: 5, name: '体育' }
  ],
  parallel: {
    left: '8%',
    right: '10%',
    bottom: '12%',
    top: '25%',
    height: '48%'
  },
  series: [
    {
      type: 'parallel',
      lineStyle: {
        width: 1.5,
        opacity: 0.5
      },
      emphasis: {
        lineStyle: {
          width: 3,
          opacity: 1
        }
      },
      data: [
        [120, 135, 118, 95, 88, 92],
        [108, 142, 105, 88, 92, 85],
        [135, 118, 128, 92, 85, 95],
        [95, 108, 98, 140, 92, 88],
        [122, 128, 115, 85, 95, 90],
        [118, 125, 112, 90, 88, 78],
        [105, 118, 108, 135, 88, 82],
        [128, 138, 122, 88, 92, 88],
        [112, 105, 118, 92, 142, 95],
        [98, 112, 102, 138, 85, 80]
      ]
    }
  ]
};

export default function App() {
  return <ParallelChart chartId="parallel-interactive" option={option} width="100%" height={450} />;
}
```

## 高亮与动画

```typescript
import React from 'react';
import { ParallelChart } from '@agions/taroviz';

const option = {
  title: {
    text: '城市发展指标',
    left: 'center'
  },
  parallelAxis: [
    { dim: 0, name: 'GDP (亿)' },
    { dim: 1, name: '人口 (万)' },
    { dim: 2, name: '绿化率 (%)' },
    { dim: 3, name: '房价 (万/㎡)' },
    { dim: 4, name: '就业率 (%)' }
  ],
  parallel: {
    left: '8%',
    right: '10%',
    bottom: '12%',
    top: '20%',
    height: '50%'
  },
  series: [
    {
      type: 'parallel',
      lineStyle: {
        width: 2,
        color: function(params: any) {
          const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'];
          return colors[params.dataIndex % colors.length];
        },
        opacity: 0.7
      },
      emphasis: {
        lineStyle: {
          width: 4,
          opacity: 1
        }
      },
      data: [
        [18600, 2154, 45, 6.5, 96],
        [24500, 2247, 48, 8.2, 94],
        [12800, 1300, 52, 4.8, 98],
        [8900, 850, 55, 3.5, 99],
        [31200, 2420, 42, 9.8, 93],
        [15200, 1850, 50, 5.5, 97],
        [19800, 2100, 47, 7.2, 95]
      ]
    }
  ]
};

export default function App() {
  return <ParallelChart chartId="parallel-styled" option={option} width="100%" height={450} />;
}
```

## API

| 属性 | 类型 | 默认值 | 说明 |
|:---|:---|:---|:---|
| chartId | `string` | 必填 | 图表唯一标识 |
| option | `object` | 必填 | ECharts 配置项 |
| width | `string \| number` | `'100%'` | 图表宽度 |
| height | `string \| number` | `400` | 图表高度 |
| autoResize | `boolean` | `true` | 是否自动响应容器大小变化 |
| theme | `string` | `'default'` | 主题名称 |
| renderer | `'canvas' \| 'svg'` | `'canvas'` | 渲染器类型 |

## 使用场景

- **产品评估**：从多个维度对比产品性能
- **用户分析**：多维度用户画像对比
- **城市对比**：多个城市多指标综合对比
- **人才评估**：候选人多项能力评估对比
- **质量分析**：产品多质量指标分析

## 注意事项

1. 平行坐标图适合展示维度不超过10个的数据，过多维度会影响可读性
2. 使用 `inverse: true` 可以反转某个轴的方向
3. 可以通过 `parallelAxis` 的 `type: 'category'` 将数值轴转换为类目轴
4. 数据线条颜色可以使用回调函数根据数据动态设置
