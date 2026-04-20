# 关系图 GraphChart

关系图用于展示实体之间的关系网络，适用于社交网络、组织架构、知识图谱、数据流向等场景。

## 基本用法

```typescript
import React from 'react';
import { GraphChart } from '@agions/taroviz';

const option = {
  title: {
    text: '社交关系网络',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: (params: any) => {
      if (params.dataType === 'edge') {
        return `${params.data.source} → ${params.data.target}`;
      }
      return params.name;
    }
  },
  series: [
    {
      type: 'graph',
      layout: 'force',
      symbolSize: 50,
      roam: true,
      draggable: true,
      label: {
        show: true,
        position: 'bottom',
        formatter: '{b}'
      },
      edgeSymbol: ['circle', 'arrow'],
      edgeSymbolSize: [4, 10],
      data: [
        { id: '0', name: 'Alice', category: 0 },
        { id: '1', name: 'Bob', category: 0 },
        { id: '2', name: 'Charlie', category: 0 },
        { id: '3', name: 'David', category: 1 },
        { id: '4', name: 'Eve', category: 1 },
        { id: '5', name: 'Frank', category: 1 },
        { id: '6', name: 'Grace', category: 2 }
      ],
      links: [
        { source: '0', target: '1', value: 5 },
        { source: '0', target: '2', value: 3 },
        { source: '1', target: '2', value: 8 },
        { source: '0', target: '3', value: 2 },
        { source: '1', target: '4', value: 6 },
        { source: '2', target: '5', value: 4 },
        { source: '3', target: '4', value: 3 },
        { source: '4', target: '5', value: 5 },
        { source: '5', target: '6', value: 7 }
      ],
      categories: [
        { name: '核心成员', itemStyle: { color: '#5470c6' } },
        { name: '活跃用户', itemStyle: { color: '#91cc75' } },
        { name: '普通用户', itemStyle: { color: '#fac858' } }
      ],
      lineStyle: {
        width: 2,
        curveness: 0.3,
        opacity: 0.7
      },
      force: {
        repulsion: 2000,
        edgeLength: [50, 150],
        layoutAnimation: true
      }
    }
  ]
};

export default function App() {
  return <GraphChart chartId="graph-basic" option={option} width="100%" height={500} />;
}
```

## 组织架构图

```typescript
import React from 'react';
import { GraphChart } from '@agions/taroviz';

const option = {
  title: {
    text: '公司组织架构',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}'
  },
  series: [
    {
      type: 'graph',
      layout: 'tree',
      orient: 'TB',
      symbolSize: [80, 40],
      symbol: 'rect',
      roam: true,
      label: {
        show: true,
        position: 'inside',
        formatter: '{b}',
        fontSize: 12,
        color: '#fff'
      },
      data: [
        {
          name: 'CEO\n张总',
          children: [
            {
              name: '技术部\n李总',
              children: [
                { name: '前端组\n王主管' },
                { name: '后端组\n刘主管' },
                { name: '测试组\n陈主管' }
              ]
            },
            {
              name: '运营部\n赵总',
              children: [
                { name: '市场组\n周主管' },
                { name: '客服组\n吴主管' }
              ]
            },
            {
              name: '财务部\n孙总',
              children: [
                { name: '会计组\n郑主管' }
              ]
            }
          ]
        }
      ],
      lineStyle: {
        width: 2,
        curveness: 0.5,
        color: 'source'
      },
      itemStyle: {
        color: function(params: any) {
          const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'];
          const depth = params.data.depth || 0;
          return colors[depth % colors.length];
        },
        borderColor: '#fff',
        borderWidth: 2
      },
      leaves: {
        label: {
          position: 'inside'
        }
      },
      emphasis: {
        focus: 'ancestor',
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.3)'
        }
      }
    }
  ]
};

export default function App() {
  return <GraphChart chartId="graph-org" option={option} width="100%" height={600} />;
}
```

## 知识图谱

```typescript
import React from 'react';
import { GraphChart } from '@agions/taroviz';

const option = {
  title: {
    text: '技术知识图谱',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(50,50,50,0.8)',
    borderColor: '#333',
    textStyle: { color: '#fff' }
  },
  series: [
    {
      type: 'graph',
      layout: 'force',
      animation: false,
      symbolSize: 45,
      roam: true,
      nodeScaleRatio: 0.6,
      label: {
        show: true,
        position: 'right',
        formatter: '{b}',
        fontSize: 11,
        color: '#333'
      },
      lineStyle: {
        width: 1.5,
        color: 'source',
        curveness: 0.1,
        opacity: 0.6
      },
      emphasis: {
        lineStyle: {
          width: 3,
          opacity: 1
        }
      },
      data: [
        { name: 'JavaScript', category: 0 },
        { name: 'TypeScript', category: 0 },
        { name: 'React', category: 1 },
        { name: 'Vue', category: 1 },
        { name: 'Angular', category: 1 },
        { name: 'Node.js', category: 2 },
        { name: 'Express', category: 2 },
        { name: 'Koa', category: 2 },
        { name: 'Webpack', category: 3 },
        { name: 'Vite', category: 3 },
        { name: 'Taro', category: 4 },
        { name: 'ECharts', category: 4 }
      ],
      links: [
        { source: 'JavaScript', target: 'TypeScript', value: 1 },
        { source: 'JavaScript', target: 'React', value: 1 },
        { source: 'JavaScript', target: 'Vue', value: 1 },
        { source: 'JavaScript', target: 'Node.js', value: 1 },
        { source: 'TypeScript', target: 'React', value: 1 },
        { source: 'TypeScript', target: 'Angular', value: 1 },
        { source: 'TypeScript', target: 'Vue', value: 1 },
        { source: 'Node.js', target: 'Express', value: 1 },
        { source: 'Node.js', target: 'Koa', value: 1 },
        { source: 'JavaScript', target: 'Webpack', value: 1 },
        { source: 'JavaScript', target: 'Vite', value: 1 },
        { source: 'React', target: 'Taro', value: 1 },
        { source: 'JavaScript', target: 'ECharts', value: 1 }
      ],
      categories: [
        { name: '语言', itemStyle: { color: '#5470c6' } },
        { name: '框架', itemStyle: { color: '#91cc75' } },
        { name: '运行时', itemStyle: { color: '#fac858' } },
        { name: '构建工具', itemStyle: { color: '#ee6666' } },
        { name: '库', itemStyle: { color: '#73c0de' } }
      ],
      force: {
        repulsion: 3000,
        gravity: 0.1,
        edgeLength: 80,
        layoutAnimation: true
      }
    }
  ]
};

export default function App() {
  return <GraphChart chartId="graph-knowledge" option={option} width="100%" height={500} />;
}
```

## 圆形布局

```typescript
import React from 'react';
import { GraphChart } from '@agions/taroviz';

const option = {
  title: {
    text: '项目依赖关系',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      type: 'graph',
      layout: 'circular',
      symbolSize: 40,
      roam: true,
      rotateLabel: true,
      label: {
        show: true,
        position: 'inside',
        formatter: '{b}',
        fontSize: 10,
        color: '#fff'
      },
      data: [
        { name: '项目', itemStyle: { color: '#5470c6' } },
        { name: '组件A', itemStyle: { color: '#91cc75' } },
        { name: '组件B', itemStyle: { color: '#91cc75' } },
        { name: '组件C', itemStyle: { color: '#91cc75' } },
        { name: '工具1', itemStyle: { color: '#fac858' } },
        { name: '工具2', itemStyle: { color: '#fac858' } },
        { name: '工具3', itemStyle: { color: '#fac858' } },
        { name: '类型', itemStyle: { color: '#ee6666' } },
        { name: '常量', itemStyle: { color: '#73c0de' } }
      ],
      links: [
        { source: '项目', target: '组件A', value: 2 },
        { source: '项目', target: '组件B', value: 2 },
        { source: '项目', target: '组件C', value: 2 },
        { source: '组件A', target: '工具1', value: 1 },
        { source: '组件A', target: '工具2', value: 1 },
        { source: '组件B', target: '工具2', value: 1 },
        { source: '组件B', target: '工具3', value: 1 },
        { source: '组件C', target: '工具1', value: 1 },
        { source: '组件C', target: '类型', value: 1 },
        { source: '工具1', target: '常量', value: 1 },
        { source: '工具2', target: '常量', value: 1 }
      ],
      lineStyle: {
        width: 1.5,
        curveness: 0.3,
        opacity: 0.6
      },
      force: {
        repulsion: 1500,
        edgeLength: 100
      }
    }
  ]
};

export default function App() {
  return <GraphChart chartId="graph-circular" option={option} width="100%" height={500} />;
}
```

## 动态关系图

```typescript
import React, { useState, useEffect } from 'react';
import { GraphChart } from '@agions/taroviz';

function DynamicGraph() {
  const [option, setOption] = useState({
    title: {
      text: '实时网络状态',
      left: 'center'
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        symbolSize: 30,
        roam: true,
        label: {
          show: true,
          position: 'right',
          formatter: '{b}'
        },
        data: [
          { name: '中心节点', id: '0' },
          { name: '节点1', id: '1' },
          { name: '节点2', id: '2' },
          { name: '节点3', id: '3' },
          { name: '节点4', id: '4' }
        ],
        links: [
          { source: '0', target: '1' },
          { source: '0', target: '2' },
          { source: '0', target: '3' },
          { source: '0', target: '4' }
        ],
        lineStyle: {
          width: 2,
          curveness: 0.3
        },
        force: {
          repulsion: 2000
        }
      }
    ]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const nodes = ['中心节点', '节点1', '节点2', '节点3', '节点4'];
      const nodeId = Math.floor(Math.random() * 4) + 1;
      const newData = nodes.map((name, index) => ({
        name,
        id: String(index),
        value: Math.random() * 50
      }));

      setOption(prev => ({
        ...prev,
        series: [{
          ...prev.series[0],
          data: newData,
          links: nodes.map((_, i) => ({
            source: '0',
            target: String(i),
            value: Math.random() * 10
          }))
        }]
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return <GraphChart chartId="graph-dynamic" option={option} width="100%" height={500} />;
}

export default DynamicGraph;
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

## 布局类型

| 布局 | 说明 |
|:---|:---|
| `'force'` | 力导向布局，自动计算节点位置 |
| `'circular'` | 圆形布局，节点沿圆周分布 |
| `'none'` | 不自动布局，使用 data 中的 x, y 坐标 |
| `'tree'` | 树形布局，适合层级结构 |

## 使用场景

- **社交网络**：展示用户之间的关系和互动
- **组织架构**：清晰展示公司或团队的结构
- **知识图谱**：展示概念之间的关联
- **网络拓扑**：系统架构、网络设备关系
- **数据流向**：展示数据在不同系统间的流转

## 注意事项

1. 使用力导向布局时，建议设置 `roam: true` 允许用户拖拽节点
2. 节点和边的样式都支持回调函数动态设置
3. 对于大数据量的关系图，考虑使用 `large: true` 开启大数据模式
4. 使用 `edgeSymbol` 可以为边设置起点和终点的符号
