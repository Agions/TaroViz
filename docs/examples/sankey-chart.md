# 桑基图 SankeyChart

桑基图用于展示数据流向和转移关系，常见于能量流转、用户行为路径、资金流向等场景。线条的宽度代表流量的大小。

## 基本用法

```typescript
import React from 'react';
import { SankeyChart } from '@agions/taroviz';

const option = {
  title: {
    text: '用户行为流向',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: (params: any) => {
      if (params.dataType === 'edge') {
        return `${params.data.source} → ${params.data.target}<br/>流量: ${params.data.value}`;
      }
      return params.name;
    }
  },
  series: [
    {
      type: 'sankey',
      layout: 'none',
      emphasis: {
        focus: 'adjacency'
      },
      nodeAlign: 'left',
      nodeGap: 12,
      nodeWidth: 20,
      lineStyle: {
        curveness: 0.5,
        color: 'gradient',
        opacity: 0.6
      },
      label: {
        position: 'right',
        fontSize: 11
      },
      data: [
        { name: '首页访问' },
        { name: '商品列表' },
        { name: '商品详情' },
        { name: '加入购物车' },
        { name: '提交订单' },
        { name: '支付成功' },
        { name: '支付失败' },
        { name: '离开' }
      ],
      links: [
        { source: '首页访问', target: '商品列表', value: 1000 },
        { source: '首页访问', target: '离开', value: 200 },
        { source: '商品列表', target: '商品详情', value: 600 },
        { source: '商品列表', target: '离开', value: 150 },
        { source: '商品详情', target: '加入购物车', value: 400 },
        { source: '商品详情', target: '离开', value: 100 },
        { source: '加入购物车', target: '提交订单', value: 350 },
        { source: '加入购物车', target: '离开', value: 50 },
        { source: '提交订单', target: '支付成功', value: 300 },
        { source: '提交订单', target: '支付失败', value: 50 }
      ]
    }
  ]
};

export default function App() {
  return <SankeyChart chartId="sankey-basic" option={option} width="100%" height={450} />;
}
```

## 能源流转图

```typescript
import React from 'react';
import { SankeyChart } from '@agions/taroviz';

const option = {
  title: {
    text: '能源流转示意图',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: (params: any) => {
      if (params.dataType === 'edge') {
        return `${params.data.source} → ${params.data.target}<br/>${params.data.value} 万吨标准煤`;
      }
      return params.name;
    }
  },
  series: [
    {
      type: 'sankey',
      layout: 'none',
      emphasis: {
        focus: 'adjacency'
      },
      nodeAlign: 'justify',
      nodeGap: 8,
      nodeWidth: 25,
      lineStyle: {
        curveness: 0.4,
        opacity: 0.5
      },
      label: {
        position: 'right',
        fontSize: 12
      },
      itemStyle: {
        borderWidth: 0
      },
      data: [
        { name: '原煤', itemStyle: { color: '#5470c6' } },
        { name: '洗精煤', itemStyle: { color: '#5470c6' } },
        { name: '焦炭', itemStyle: { color: '#5470c6' } },
        { name: '原油', itemStyle: { color: '#91cc75' } },
        { name: '汽油', itemStyle: { color: '#91cc75' } },
        { name: '柴油', itemStyle: { color: '#91cc75' } },
        { name: '天然气', itemStyle: { color: '#fac858' } },
        { name: '电力', itemStyle: { color: '#ee6666' } },
        { name: '热力', itemStyle: { color: '#ee6666' } },
        { name: '工业', itemStyle: { color: '#73c0de' } },
        { name: '建筑业', itemStyle: { color: '#73c0de' } },
        { name: '交通', itemStyle: { color: '#73c0de' } },
        { name: '生活', itemStyle: { color: '#73c0de' } }
      ],
      links: [
        { source: '原煤', target: '洗精煤', value: 800 },
        { source: '原煤', target: '焦炭', value: 500 },
        { source: '原煤', target: '电力', value: 1200 },
        { source: '原煤', target: '热力', value: 400 },
        { source: '原油', target: '汽油', value: 600 },
        { source: '原油', target: '柴油', value: 800 },
        { source: '原油', target: '电力', value: 300 },
        { source: '天然气', target: '工业', value: 500 },
        { source: '天然气', target: '生活', value: 300 },
        { source: '天然气', target: '电力', value: 200 },
        { source: '电力', target: '工业', value: 1000 },
        { source: '电力', target: '建筑业', value: 300 },
        { source: '电力', target: '交通', value: 200 },
        { source: '电力', target: '生活', value: 500 },
        { source: '热力', target: '建筑业', value: 200 },
        { source: '热力', target: '生活', value: 300 },
        { source: '焦炭', target: '工业', value: 500 },
        { source: '汽油', target: '交通', value: 600 },
        { source: '柴油', target: '交通', value: 700 },
        { source: '柴油', target: '工业', value: 100 }
      ]
    }
  ]
};

export default function App() {
  return <SankeyChart chartId="sankey-energy" option={option} width="100%" height={500} />;
}
```

## 用户漏斗转化

```typescript
import React from 'react';
import { SankeyChart } from '@agions/taroviz';

const option = {
  title: {
    text: '用户转化漏斗',
    subtext: '从访问到付费的转化路径',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: (params: any) => {
      if (params.dataType === 'edge') {
        const转化率 = ((params.data.value / 10000) * 100).toFixed(2);
        return `${params.data.source} → ${params.data.target}<br/>用户数: ${params.data.value.toLocaleString()}<br/>转化率: ${转化率}%`;
      }
      return params.name;
    }
  },
  series: [
    {
      type: 'sankey',
      layout: 'none',
      orient: 'horizontal',
      emphasis: {
        focus: 'adjacency'
      },
      nodeAlign: 'left',
      nodeWidth: 80,
      nodeGap: 20,
      lineStyle: {
        curveness: 0.5,
        opacity: 0.4
      },
      label: {
        position: 'inside',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff'
      },
      data: [
        { name: '网站访问\n100,000', itemStyle: { color: '#5470c6' } },
        { name: '注册用户\n50,000', itemStyle: { color: '#5470c6' } },
        { name: '浏览商品\n40,000', itemStyle: { color: '#91cc75' } },
        { name: '加入购物车\n25,000', itemStyle: { color: '#91cc75' } },
        { name: '提交订单\n15,000', itemStyle: { color: '#fac858' } },
        { name: '支付成功\n10,000', itemStyle: { color: '#ee6666' } },
        { name: '复购用户\n6,000', itemStyle: { color: '#ee6666' } }
      ],
      links: [
        { source: '网站访问\n100,000', target: '注册用户\n50,000', value: 50000 },
        { source: '网站访问\n100,000', target: '浏览商品\n40,000', value: 40000 },
        { source: '网站访问\n100,000', target: '离开', value: 10000 },
        { source: '注册用户\n50,000', target: '浏览商品\n40,000', value: 40000 },
        { source: '注册用户\n50,000', target: '离开', value: 10000 },
        { source: '浏览商品\n40,000', target: '加入购物车\n25,000', value: 25000 },
        { source: '浏览商品\n40,000', target: '离开', value: 15000 },
        { source: '加入购物车\n25,000', target: '提交订单\n15,000', value: 15000 },
        { source: '加入购物车\n25,000', target: '离开', value: 10000 },
        { source: '提交订单\n15,000', target: '支付成功\n10,000', value: 10000 },
        { source: '提交订单\n15,000', target: '离开', value: 5000 },
        { source: '支付成功\n10,000', target: '复购用户\n6,000', value: 6000 }
      ]
    }
  ]
};

export default function App() {
  return <SankeyChart chartId="sankey-funnel" option={option} width="100%" height={450} />;
}
```

## 资金流向图

```typescript
import React from 'react';
import { SankeyChart } from '@agions/taroviz';

const option = {
  title: {
    text: '项目资金流向',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: (params: any) => {
      if (params.dataType === 'edge') {
        return `${params.data.source} → ${params.data.target}<br/>金额: ¥${params.data.value.toLocaleString()}`;
      }
      return params.name;
    }
  },
  series: [
    {
      type: 'sankey',
      layout: 'none',
      emphasis: {
        focus: 'adjacency'
      },
      nodeAlign: 'left',
      nodeGap: 15,
      nodeWidth: 30,
      layoutIterations: 0,
      lineStyle: {
        curveness: 0.6,
        opacity: 0.5
      },
      label: {
        position: 'right',
        fontSize: 11
      },
      itemStyle: {
        borderWidth: 0
      },
      data: [
        { name: '政府拨款', itemStyle: { color: '#5470c6' } },
        { name: '企业捐赠', itemStyle: { color: '#91cc75' } },
        { name: '社会募捐', itemStyle: { color: '#fac858' } },
        { name: '项目A', itemStyle: { color: '#ee6666' } },
        { name: '项目B', itemStyle: { color: '#73c0de' } },
        { name: '项目C', itemStyle: { color: '#3ba272' } },
        { name: '运营费用', itemStyle: { color: '#fc8452' } },
        { name: '设备采购', itemStyle: { color: '#9a60b4' } },
        { name: '人员培训', itemStyle: { color: '#ea7ccc' } },
        { name: '项目管理', itemStyle: { color: '#5470c6' } }
      ],
      links: [
        { source: '政府拨款', target: '项目A', value: 5000000 },
        { source: '政府拨款', target: '项目B', value: 3000000 },
        { source: '政府拨款', target: '运营费用', value: 2000000 },
        { source: '企业捐赠', target: '项目A', value: 2000000 },
        { source: '企业捐赠', target: '项目C', value: 1500000 },
        { source: '企业捐赠', target: '设备采购', value: 1500000 },
        { source: '社会募捐', target: '项目A', value: 800000 },
        { source: '社会募捐', target: '项目B', value: 600000 },
        { source: '社会募捐', target: '人员培训', value: 600000 },
        { source: '项目A', target: '项目管理', value: 500000 },
        { source: '项目B', target: '项目管理', value: 300000 },
        { source: '项目C', target: '项目管理', value: 200000 },
        { source: '项目A', target: '设备采购', value: 2000000 },
        { source: '项目C', target: '设备采购', value: 1000000 },
        { source: '项目B', target: '人员培训', value: 800000 },
        { source: '项目C', target: '人员培训', value: 400000 }
      ]
    }
  ]
};

export default function App() {
  return <SankeyChart chartId="sankey-funds" option={option} width="100%" height={500} />;
}
```

## 自定义样式

```typescript
import React from 'react';
import { SankeyChart } from '@agions/taroviz';

const option = {
  backgroundColor: '#1a1a2e',
  title: {
    text: '供应链流向（暗色主题）',
    left: 'center',
    textStyle: {
      color: '#eee',
      fontSize: 16
    }
  },
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(50,50,50,0.9)',
    borderColor: '#555',
    textStyle: { color: '#fff' }
  },
  series: [
    {
      type: 'sankey',
      layout: 'none',
      emphasis: {
        focus: 'adjacency'
      },
      nodeAlign: 'left',
      nodeGap: 12,
      nodeWidth: 25,
      lineStyle: {
        curveness: 0.5,
        opacity: 0.6,
        color: function(params: any) {
          const colors = [
            '#00da9c', '#5470c6', '#91cc75', '#fac858',
            '#ee6666', '#73c0de', '#3ba272'
          ];
          return colors[params.dataIndex % colors.length];
        }
      },
      label: {
        position: 'right',
        fontSize: 11,
        color: '#ccc'
      },
      itemStyle: {
        borderWidth: 0
      },
      emphasis: {
        lineStyle: {
          opacity: 0.8,
          width: 3
        }
      },
      data: [
        { name: '原材料', itemStyle: { color: '#5470c6' } },
        { name: '半成品', itemStyle: { color: '#91cc75' } },
        { name: '成品', itemStyle: { color: '#fac858' } },
        { name: '仓库A', itemStyle: { color: '#ee6666' } },
        { name: '仓库B', itemStyle: { color: '#73c0de' } },
        { name: '门店X', itemStyle: { color: '#3ba272' } },
        { name: '门店Y', itemStyle: { color: '#00da9c' } },
        { name: '门店Z', itemStyle: { color: '#fc8452' } }
      ],
      links: [
        { source: '原材料', target: '半成品', value: 500 },
        { source: '半成品', target: '成品', value: 450 },
        { source: '成品', target: '仓库A', value: 300 },
        { source: '成品', target: '仓库B', value: 200 },
        { source: '仓库A', target: '门店X', value: 150 },
        { source: '仓库A', target: '门店Y', value: 100 },
        { source: '仓库A', target: '门店Z', value: 50 },
        { source: '仓库B', target: '门店Y', value: 100 },
        { source: '仓库B', target: '门店Z', value: 80 }
      ]
    }
  ]
};

export default function App() {
  return <SankeyChart chartId="sankey-supply" option={option} width="100%" height={450} />;
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

- **用户行为分析**：分析用户从访问到转化的路径
- **能源流转分析**：展示能源在不同环节的分配
- **资金流向分析**：追踪资金在不同项目间的流转
- **供应链可视化**：展示原材料到成品的流转过程
- **数据迁移路径**：展示数据在不同系统间的迁移

## 注意事项

1. 桑基图需要 `layout: 'none'` 才能使用自定义的节点位置
2. `nodeAlign` 可以设置节点对齐方式：`'left'`、`'right'`、`'justify'`
3. `curveness` 控制连线弯曲程度，范围 0-1
4. 可以通过 `lineStyle.color` 设置为 `'gradient'` 实现渐变色
5. `focus` 可以设置鼠标悬停时的聚焦行为：`'adjacency'`（相邻节点）、`'all'`（所有连接）或`'none'`
6. 建议使用 `layoutIterations: 0` 当布局固定时提升性能
