# K线图 CandlestickChart

K线图用于展示金融数据的开盘价、收盘价、最高价、最低价（OHLC），常用于股票、期货、外汇等金融市场的技术分析。

## 基本用法

```typescript
import React from 'react';
import { CandlestickChart } from '@agions/taroviz';

const option = {
  title: {
    text: '股票日K线图',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    formatter: (params: any) => {
      const data = params[0];
      const [open, close, low, high] = data.value;
      return `
        <strong>${data.axisValue}</strong><br/>
        开盘: ${open}<br/>
        收盘: ${close}<br/>
        最低: ${low}<br/>
        最高: ${high}
      `;
    }
  },
  grid: {
    left: '10%',
    right: '10%',
    bottom: '15%'
  },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周一', '周二', '周三', '周四', '周五'],
    boundaryGap: true,
    axisLine: { onZero: false },
    splitLine: { show: false }
  },
  yAxis: {
    scale: true,
    splitArea: {
      show: true,
      areaStyle: {
        color: ['#f8f8f8', '#fff']
      }
    }
  },
  series: [
    {
      type: 'candlestick',
      name: '股价',
      data: [
        [20, 22, 18, 25],   // [open, close, low, high]
        [21, 24, 19, 26],
        [23, 25, 22, 28],
        [22, 20, 18, 24],
        [19, 21, 17, 23],
        [20, 23, 19, 25],
        [22, 26, 21, 27],
        [25, 24, 23, 28],
        [23, 25, 22, 27],
        [24, 27, 23, 29]
      ],
      itemStyle: {
        color: '#ec0000',       // 上涨颜色（阳线）
        color0: '#00da3c',      // 下跌颜色（阴线）
        borderColor: '#ec0000',
        borderColor0: '#00da3c',
        borderWidth: 2
      },
      emphasis: {
        itemStyle: {
          color: '#eb5151',
          color0: '#24e5a0',
          borderColor: '#eb5151',
          borderColor0: '#24e5a0',
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.3)'
        }
      }
    }
  ]
};

export default function App() {
  return <CandlestickChart chartId="candlestick-basic" option={option} width="100%" height={450} />;
}
```

## 股票技术分析

```typescript
import React from 'react';
import { CandlestickChart } from '@agions/taroviz';

const option = {
  title: {
    text: '股票技术分析',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: { color: '#999' }
    }
  },
  legend: {
    data: ['K线', 'MA5', 'MA10', 'MA20'],
    top: 10
  },
  grid: [
    { left: '10%', right: '10%', top: '15%', height: '50%' },
    { left: '10%', right: '10%', bottom: '20%', height: '20%' }
  ],
  xAxis: [
    {
      type: 'category',
      data: ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日'],
      gridIndex: 0,
      boundaryGap: false,
      axisLine: { onZero: false }
    },
    {
      type: 'category',
      data: ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日'],
      gridIndex: 1,
      boundaryGap: false,
      axisLine: { onZero: false }
    }
  ],
  yAxis: [
    {
      scale: true,
      gridIndex: 0,
      splitLine: { show: false }
    },
    {
      scale: true,
      gridIndex: 1,
      splitNumber: 3
    }
  ],
  series: [
    {
      name: 'K线',
      type: 'candlestick',
      xAxisIndex: 0,
      yAxisIndex: 0,
      data: [
        [20, 22, 18, 25],
        [21, 24, 19, 26],
        [23, 25, 22, 28],
        [22, 20, 18, 24],
        [19, 21, 17, 23],
        [20, 23, 19, 25],
        [22, 26, 21, 27],
        [25, 24, 23, 28],
        [23, 25, 22, 27],
        [24, 27, 23, 29]
      ],
      itemStyle: {
        color: '#ec0000',
        color0: '#00da3c',
        borderColor: '#ec0000',
        borderColor0: '#00da3c'
      },
      markLine: {
        symbol: ['none', 'none'],
        data: [
          {
            name: '最高价',
            yAxis: 29,
            lineStyle: { color: '#ee6666' },
            label: { formatter: '最高: {c}' }
          },
          {
            name: '最低价',
            yAxis: 17,
            lineStyle: { color: '#91cc75' },
            label: { formatter: '最低: {c}' }
          }
        ]
      }
    },
    {
      name: '成交量',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: [45, 52, 48, 55, 42, 50, 58, 62, 48, 55],
      itemStyle: {
        color: function(params: any) {
          const data = option.series[0].data[params.dataIndex];
          return data[1] >= data[0] ? '#ec0000' : '#00da3c';
        }
      }
    }
  ]
};

export default function App() {
  return <CandlestickChart chartId="candlestick-technical" option={option} width="100%" height={500} />;
}
```

## 日K线与周K线对比

```typescript
import React from 'react';
import { CandlestickChart } from '@agions/taroviz';

const option = {
  title: {
    text: '多周期K线对比',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'cross' }
  },
  legend: {
    data: ['日K', '周K'],
    top: 10
  },
  grid: {
    left: '10%',
    right: '10%',
    bottom: '15%'
  },
  xAxis: {
    type: 'category',
    data: ['1周', '2周', '3周', '4周', '5周', '6周', '7周', '8周'],
    boundaryGap: true
  },
  yAxis: {
    scale: true
  },
  series: [
    {
      name: '日K',
      type: 'candlestick',
      data: [
        [20, 22, 18, 25],
        [21, 24, 19, 26],
        [23, 25, 22, 28],
        [22, 20, 18, 24],
        [19, 21, 17, 23],
        [20, 23, 19, 25],
        [22, 26, 21, 27],
        [25, 24, 23, 28]
      ],
      itemStyle: {
        color: '#5470c6',
        color0: '#91cc75',
        borderColor: '#5470c6',
        borderColor0: '#91cc75'
      }
    },
    {
      name: '周K',
      type: 'candlestick',
      data: [
        [18, 24, 16, 26],
        [20, 25, 18, 27],
        [19, 23, 17, 25],
        [21, 26, 19, 28]
      ],
      itemStyle: {
        color: '#ee6666',
        color0: '#fac858',
        borderColor: '#ee6666',
        borderColor0: '#fac858'
      },
      barWidth: '40%'
    }
  ]
};

export default function App() {
  return <CandlestickChart chartId="candlestick-multi-period" option={option} width="100%" height={450} />;
}
```

## 自定义样式

```typescript
import React from 'react';
import { CandlestickChart } from '@agions/taroviz';

const option = {
  backgroundColor: '#1a1a2e',
  title: {
    text: '夜间交易K线图',
    left: 'center',
    textStyle: { color: '#eee' }
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(50,50,50,0.9)',
    borderColor: '#555',
    textStyle: { color: '#fff' }
  },
  grid: {
    left: '8%',
    right: '8%',
    bottom: '15%'
  },
  xAxis: {
    type: 'category',
    data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    axisLine: { lineStyle: { color: '#555' } },
    axisLabel: { color: '#999' },
    splitLine: { show: false }
  },
  yAxis: {
    scale: true,
    axisLine: { lineStyle: { color: '#555' } },
    axisLabel: { color: '#999' },
    splitLine: { lineStyle: { color: '#333' } },
    splitArea: {
      show: true,
      areaStyle: {
        color: ['rgba(30,30,50,0.5)', 'transparent']
      }
    }
  },
  series: [
    {
      type: 'candlestick',
      data: [
        [100, 105, 95, 110],
        [102, 108, 98, 112],
        [105, 110, 100, 115],
        [108, 105, 98, 112],
        [103, 107, 96, 110],
        [105, 112, 102, 116],
        [110, 108, 102, 115]
      ],
      itemStyle: {
        color: '#00da9c',
        color0: '#ff4d6a',
        borderColor: '#00da9c',
        borderColor0: '#ff4d6a',
        borderWidth: 1.5,
        shadowBlur: 5,
        shadowColor: 'rgba(0,217,156,0.3)',
        shadowOffsetX: 0,
        shadowOffsetY: 0
      },
      emphasis: {
        itemStyle: {
          color: '#00ffb8',
          color0: '#ff6680',
          borderColor: '#00ffb8',
          borderColor0: '#ff6688',
          shadowBlur: 15,
          shadowColor: 'rgba(0,255,150,0.5)'
        }
      }
    }
  ]
};

export default function App() {
  return <CandlestickChart chartId="candlestick-dark" option={option} width="100%" height={400} />;
}
```

## 期货K线图

```typescript
import React from 'react';
import { CandlestickChart } from '@agions/taroviz';

const option = {
  title: {
    text: '原油期货主力合约',
    subtext: '连续合约',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'cross' },
    formatter: (params: any) => {
      const data = params[0];
      const [open, close, low, high] = data.value;
      const change = close - open;
      const changePercent = ((change / open) * 100).toFixed(2);
      const isUp = change >= 0;
      return `
        <strong>${data.axisValue}</strong><br/>
        开盘价: ${open}<br/>
        收盘价: ${close}<br/>
        最高价: ${high}<br/>
        最低价: ${low}<br/>
        涨跌额: <span style="color:${isUp ? '#ec0000' : '#00da3c'}">${change >= 0 ? '+' : ''}${change.toFixed(2)}</span><br/>
        涨跌幅: <span style="color:${isUp ? '#ec0000' : '#00da3c'}">${change >= 0 ? '+' : ''}${changePercent}%</span>
      `;
    }
  },
  grid: {
    left: '12%',
    right: '8%',
    bottom: '18%'
  },
  xAxis: {
    type: 'category',
    data: ['03-01', '03-02', '03-03', '03-04', '03-05', '03-06', '03-07', '03-08', '03-09', '03-10'],
    boundaryGap: true
  },
  yAxis: {
    scale: true,
    name: '美元/桶',
    nameLocation: 'middle',
    nameGap: 40,
    axisLabel: {
      formatter: '${value}'
    }
  },
  series: [
    {
      type: 'candlestick',
      data: [
        [78.5, 80.2, 77.0, 81.5],
        [79.8, 82.0, 78.5, 83.2],
        [81.5, 79.8, 78.0, 82.5],
        [80.0, 81.5, 79.2, 83.0],
        [81.0, 84.5, 80.5, 85.0],
        [83.8, 82.0, 81.0, 84.5],
        [82.5, 85.0, 81.5, 86.0],
        [84.5, 86.8, 83.5, 87.5],
        [86.0, 84.2, 83.0, 86.5],
        [84.5, 83.8, 82.0, 85.5]
      ],
      itemStyle: {
        color: '#ef5350',
        color0: '#26a69a',
        borderColor: '#ef5350',
        borderColor0: '#26a69a'
      },
      markPoint: {
        symbol: 'pin',
        symbolSize: 40,
        data: [
          {
            name: '最高价',
            type: 'max',
            valueDim: 'highest',
            label: { formatter: '高: {c}' }
          },
          {
            name: '最低价',
            type: 'min',
            valueDim: 'lowest',
            label: { formatter: '低: {c}' }
          }
        ]
      }
    }
  ]
};

export default function App() {
  return <CandlestickChart chartId="candlestick-futures" option={option} width="100%" height={450} />;
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

## 数据格式

K线图数据为四元组数组：`[open, close, low, high]`

| 索引 | 名称 | 说明 |
|:---:|:---|:---|
| 0 | open | 开盘价 |
| 1 | close | 收盘价 |
| 2 | low | 最低价 |
| 3 | high | 最高价 |

## 使用场景

- **股票交易**：展示股票价格走势，支持技术分析
- **期货交易**：展示期货合约价格变化
- **外汇交易**：展示汇率波动
- **加密货币**：展示币种价格走势
- **经济数据**：展示经济指标的时间序列

## 注意事项

1. 数据格式必须为 `[开盘价, 收盘价, 最低价, 最高价]`
2. 阳线（收盘价>开盘价）使用 `color` 设置颜色
3. 阴线（收盘价<开盘价）使用 `color0` 设置颜色
4. 建议配合 `dataZoom` 实现缩放和平移功能
5. 大数据量时建议使用 `canvas` 渲染器
