# 词云图 WordCloudChart

词云图用于展示文本数据中关键词的频率和重要性，常见于舆情分析、标签统计、搜索热词等场景。文字大小代表其重要性或频率。

## 基本用法

```typescript
import React from 'react';
import { WordCloudChart } from '@agions/taroviz';

const option = {
  title: {
    text: '用户评论关键词',
    left: 'center'
  },
  tooltip: {
    show: true,
    formatter: (params: any) => {
      return `${params.name}: ${params.value}次`;
    }
  },
  series: [
    {
      type: 'wordCloud',
      sizeRange: [14, 60],
      rotationRange: [-45, 45],
      rotationStep: 15,
      gridSize: 8,
      drawOutOfBound: false,
      textStyle: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        color: function() {
          return 'rgb(' + [
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160)
          ].join(',') + ')';
        }
      },
      emphasis: {
        textStyle: {
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      data: [
        { name: '性能优秀', value: 10000 },
        { name: '界面美观', value: 8080 },
        { name: '易于使用', value: 6980 },
        { name: '响应快速', value: 5830 },
        { name: '功能丰富', value: 4650 },
        { name: '稳定可靠', value: 3890 },
        { name: '文档完善', value: 2980 },
        { name: '社区活跃', value: 2100 },
        { name: '性价比高', value: 1850 },
        { name: '客服耐心', value: 1680 }
      ]
    }
  ]
};

export default function App() {
  return <WordCloudChart chartId="wordcloud-basic" option={option} width="100%" height={400} />;
}
```

## 自定义形状

```typescript
import React from 'react';
import { WordCloudChart } from '@agions/taroviz';

const option = {
  title: {
    text: '搜索热词（星形）',
    left: 'center'
  },
  tooltip: {
    show: true
  },
  series: [
    {
      type: 'wordCloud',
      shape: 'star',
      sizeRange: [16, 50],
      rotationRange: [-90, 90],
      rotationStep: 15,
      gridSize: 10,
      drawOutOfBound: false,
      textStyle: {
        fontFamily: 'Microsoft YaHei',
        fontWeight: 'bold'
      },
      data: [
        { name: '人工智能', value: 15000 },
        { name: '机器学习', value: 12000 },
        { name: '深度学习', value: 11000 },
        { name: '神经网络', value: 9500 },
        { name: '数据分析', value: 8800 },
        { name: '云计算', value: 7800 },
        { name: '大数据', value: 7500 },
        { name: '区块链', value: 6500 },
        { name: '物联网', value: 5800 },
        { name: '5G网络', value: 5200 },
        { name: '边缘计算', value: 4500 },
        { name: '量子计算', value: 3800 }
      ]
    }
  ]
};

export default function App() {
  return <WordCloudChart chartId="wordcloud-star" option={option} width="100%" height={400} />;
}
```

## 渐变色词云

```typescript
import React from 'react';
import { WordCloudChart } from '@agions/taroviz';

const option = {
  title: {
    text: '产品特性词云（渐变色）',
    left: 'center'
  },
  tooltip: {
    show: true
  },
  series: [
    {
      type: 'wordCloud',
      width: '100%',
      height: '100%',
      sizeRange: [14, 55],
      rotationRange: [0, 0],
      rotationStep: 45,
      gridSize: 12,
      drawOutOfBound: true,
      textStyle: {
        fontFamily: 'Microsoft YaHei',
        fontWeight: 'bold',
        color: function() {
          return 'rgb(' + [
            Math.round(Math.random() * 50),
            Math.round(Math.random() * 50),
            Math.round(Math.random() * 50) + 100
          ].join(',') + ')';
        }
      },
      emphasis: {
        textStyle: {
          shadowBlur: 10,
          shadowColor: '#00d4ff'
        }
      },
      data: [
        { name: '高性能', value: 20000 },
        { name: '低功耗', value: 18000 },
        { name: '高可靠', value: 16000 },
        { name: '易集成', value: 14000 },
        { name: '可扩展', value: 12000 },
        { name: '安全加密', value: 11000 },
        { name: '云原生', value: 10000 },
        { name: '微服务', value: 9000 },
        { name: '容器化', value: 8000 },
        { name: '自动化', value: 7000 },
        { name: '智能化', value: 6500 },
        { name: '可视化', value: 6000 }
      ]
    }
  ]
};

export default function App() {
  return <WordCloudChart chartId="wordcloud-gradient" option={option} width="100%" height={400} />;
}
```

## 品牌词云

```typescript
import React from 'react';
import { WordCloudChart } from '@agions/taroviz';

const option = {
  backgroundColor: '#f5f5f5',
  title: {
    text: '消费者品牌提及排行',
    left: 'center',
    textStyle: {
      color: '#333',
      fontSize: 18
    }
  },
  tooltip: {
    show: true,
    backgroundColor: 'rgba(50,50,50,0.9)',
    borderColor: '#333',
    textStyle: { color: '#fff' }
  },
  series: [
    {
      type: 'wordCloud',
      width: '100%',
      height: '100%',
      left: 'center',
      top: 'center',
      sizeRange: [18, 65],
      rotationRange: [-30, 30],
      rotationStep: 5,
      gridSize: 15,
      drawOutOfBound: false,
      textStyle: {
        fontFamily: 'Microsoft YaHei',
        fontWeight: 'bold'
      },
      itemStyle: {
        normal: {
          color: function() {
            const colors = [
              '#5470c6', '#91cc75', '#fac858', '#ee6666',
              '#73c0de', '#3ba272', '#fc8452', '#9a60b4'
            ];
            return colors[Math.floor(Math.random() * colors.length)];
          }
        },
        emphasis: {
          shadowBlur: 15,
          shadowColor: '#333'
        }
      },
      data: [
        { name: 'Apple', value: 50000 },
        { name: 'Samsung', value: 45000 },
        { name: 'Huawei', value: 42000 },
        { name: 'Xiaomi', value: 38000 },
        { name: 'Sony', value: 32000 },
        { name: 'LG', value: 28000 },
        { name: 'OPPO', value: 25000 },
        { name: 'Vivo', value: 23000 },
        { name: 'OnePlus', value: 18000 },
        { name: 'Google', value: 22000 },
        { name: 'Microsoft', value: 20000 },
        { name: 'Amazon', value: 19000 }
      ]
    }
  ]
};

export default function App() {
  return <WordCloudChart chartId="wordcloud-brand" option={option} width="100%" height={400} />;
}
```

## 动态词云

```typescript
import React, { useState, useEffect } from 'react';
import { WordCloudChart } from '@agions/taroviz';

function DynamicWordCloud() {
  const words = [
    { name: '性能', value: 8000 },
    { name: '速度', value: 6500 },
    { name: '稳定', value: 7200 },
    { name: '易用', value: 5800 },
    { name: '功能', value: 9000 },
    { name: '界面', value: 5500 },
    { name: '价格', value: 6200 },
    { name: '服务', value: 4800 },
    { name: '质量', value: 7500 },
    { name: '设计', value: 5200 }
  ];

  const [option, setOption] = useState({
    title: {
      text: '实时热点词云',
      left: 'center'
    },
    tooltip: {
      show: true
    },
    series: [{
      type: 'wordCloud',
      sizeRange: [14, 50],
      rotationRange: [-45, 45],
      rotationStep: 15,
      gridSize: 10,
      drawOutOfBound: false,
      textStyle: {
        fontFamily: 'Microsoft YaHei',
        fontWeight: 'bold'
      },
      data: words
    }]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedWords = words.map(word => ({
        ...word,
        value: Math.floor(Math.random() * 10000) + 3000
      }));

      setOption(prev => ({
        ...prev,
        series: [{
          ...prev.series[0],
          data: updatedWords.sort((a, b) => b.value - a.value)
        }]
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return <WordCloudChart chartId="wordcloud-dynamic" option={option} width="100%" height={400} />;
}

export default DynamicWordCloud;
```

## 多层颜色词云

```typescript
import React from 'react';
import { WordCloudChart } from '@agions/taroviz';

const option = {
  title: {
    text: '舆情分析词云（多层颜色）',
    left: 'center'
  },
  tooltip: {
    show: true
  },
  series: [
    {
      type: 'wordCloud',
      width: '100%',
      height: '100%',
      sizeRange: [16, 60],
      rotationRange: [0, 0],
      rotationStep: 90,
      gridSize: 12,
      drawOutOfBound: false,
      textStyle: {
        fontFamily: 'Microsoft YaHei',
        fontWeight: 'bold',
        color: function() {
          const colors = [
            '#5470c6', '#5470c6', '#5470c6',
            '#91cc75', '#91cc75',
            '#fac858',
            '#ee6666'
          ];
          return colors[Math.floor(Math.random() * colors.length)];
        }
      },
      emphasis: {
        textStyle: {
          shadowBlur: 8,
          shadowColor: '#333'
        }
      },
      // 按 value 大小分层显示
      data: [
        { name: '正面评价', value: 15000 },
        { name: '产品好用', value: 12000 },
        { name: '服务优质', value: 10000 },
        { name: '质量可靠', value: 9000 },
        { name: '价格实惠', value: 8000 },
        { name: '发货快速', value: 7000 },
        { name: '包装精美', value: 6000 },
        { name: '负面评价', value: -10000 },
        { name: '物流太慢', value: -8000 },
        { name: '包装破损', value: -6000 },
        { name: '服务态度差', value: -5000 },
        { name: '质量一般', value: -4000 }
      ].map(item => ({
        ...item,
        textStyle: {
          color: item.value > 0 ? '#5470c6' : '#ee6666'
        }
      }))
    }
  ]
};

export default function App() {
  return <WordCloudChart chartId="wordcloud-multi-color" option={option} width="100%" height={400} />;
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

## 形状选项

| 值 | 说明 |
|:---|:---|
| `'circle'` | 圆形（默认） |
| `'star'` | 星形 |
| `'cardioid'` | 心形 |
| `'diamond'` | 钻石形 |
| `'triangle'` | 三角形 |
| `'triangle-forward'` | 向前三角形 |

## 使用场景

- **舆情分析**：分析社交媒体上的用户评论和反馈
- **搜索热词**：展示搜索引擎或网站的热门搜索词
- **标签统计**：展示文章或商品的标签分布
- **新闻摘要**：快速展示新闻或文档的关键词
- **品牌监测**：追踪品牌在不同渠道的提及情况

## 注意事项

1. 词云需要安装 `echarts` 和 `echarts-wordcloud` 扩展
2. 词云组件可能不支持 SVG 渲染器，请使用 `canvas` 渲染器
3. `sizeRange` 控制文字大小的范围
4. `rotationRange` 控制文字旋转角度范围
5. `gridSize` 影响词云布局的密度，越小越密集
6. 大数据量时可能需要较长的布局计算时间
