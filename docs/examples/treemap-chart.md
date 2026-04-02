# 矩形树图 TreeMapChart

矩形树图通过矩形面积展示数据大小，适合展示带有层级结构的数据分布。

## 基本用法

```typescript
import React from 'react';
import { TreeMapChart } from '@agions/taroviz';

const option = {
  title: {
    text: '销售品类分布',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: (params: any) => {
      if (params.dataType === 'node') {
        return `${params.name}<br/>销售额: ¥${params.value.toLocaleString()}`;
      }
      return params.name;
    }
  },
  series: [
    {
      type: 'treemap',
      width: '100%',
      height: '85%',
      top: '10%',
      bottom: '5%',
      label: {
        show: true,
        formatter: '{b}\n¥{c}',
        fontSize: 12
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2,
        gapWidth: 2
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.3)'
        }
      },
      levels: [
        {
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 5,
            gapWidth: 5
          }
        },
        {
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 3,
            gapWidth: 3
          }
        },
        {
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 2,
            gapWidth: 2
          }
        }
      ],
      data: [
        {
          name: '电子产品',
          value: 500000,
          children: [
            { name: '手机', value: 200000 },
            { name: '电脑', value: 150000 },
            { name: '平板', value: 80000 },
            { name: '配件', value: 70000 }
          ]
        },
        {
          name: '服装',
          value: 350000,
          children: [
            { name: '男装', value: 120000 },
            { name: '女装', value: 150000 },
            { name: '童装', value: 80000 }
          ]
        },
        {
          name: '食品',
          value: 280000,
          children: [
            { name: '零食', value: 100000 },
            { name: '饮料', value: 90000 },
            { name: '生鲜', value: 90000 }
          ]
        },
        {
          name: '家居',
          value: 200000,
          children: [
            { name: '家具', value: 120000 },
            { name: '厨具', value: 80000 }
          ]
        }
      ]
    }
  ]
};

export default function App() {
  return <TreeMapChart chartId="treemap-basic" option={option} width="100%" height={500} />;
}
```

## 股票行业分布

```typescript
import React from 'react';
import { TreeMapChart } from '@agions/taroviz';

const option = {
  title: {
    text: '持仓行业分布',
    subtext: '矩形面积代表持仓市值',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: (params: any) => {
      const data = params.data;
      const percent = ((data.value / 1000000) * 100).toFixed(2);
      return `
        <strong>${data.name}</strong><br/>
        市值: ¥${data.value.toLocaleString()}<br/>
        占比: ${percent}%
      `;
    }
  },
  series: [
    {
      type: 'treemap',
      width: '100%',
      height: '85%',
      top: '12%',
      label: {
        show: true,
        formatter: '{b}',
        fontSize: 11,
        fontWeight: 'bold'
      },
      upperLabel: {
        show: true,
        height: 30,
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2,
        gapWidth: 2
      },
      visualMin: 0,
      visualMax: 500000,
      visualDimension: 0,
      color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272'],
      levels: [{}],
      data: [
        {
          name: '科技',
          value: 450000,
          children: [
            { name: '半导体', value: 180000 },
            { name: '软件', value: 150000 },
            { name: '通信', value: 120000 }
          ]
        },
        {
          name: '消费',
          value: 350000,
          children: [
            { name: '白酒', value: 150000 },
            { name: '食品', value: 100000 },
            { name: '家电', value: 100000 }
          ]
        },
        {
          name: '医药',
          value: 280000,
          children: [
            { name: '中药', value: 100000 },
            { name: '医疗器械', value: 100000 },
            { name: '生物制药', value: 80000 }
          ]
        },
        {
          name: '金融',
          value: 200000,
          children: [
            { name: '银行', value: 120000 },
            { name: '保险', value: 80000 }
          ]
        },
        {
          name: '新能源',
          value: 180000,
          children: [
            { name: '锂电池', value: 100000 },
            { name: '光伏', value: 80000 }
          ]
        }
      ]
    }
  ]
};

export default function App() {
  return <TreeMapChart chartId="treemap-stock" option={option} width="100%" height={500} />;
}
```

## 自定义颜色

```typescript
import React from 'react';
import { TreeMapChart } from '@agions/taroviz';

const option = {
  title: {
    text: '预算分配（自定义颜色）',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}: ¥{c}'
  },
  series: [
    {
      type: 'treemap',
      width: '100%',
      height: '85%',
      top: '12%',
      roam: false,
      nodeClick: 'zoomToNode',
      label: {
        show: true,
        formatter: '{b}',
        fontSize: 12,
        fontWeight: 'bold',
        textStyle: {
          color: '#fff'
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 3,
        gapWidth: 3,
        shadowBlur: 5,
        shadowColor: 'rgba(0,0,0,0.2)'
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 15,
          shadowColor: 'rgba(0,0,0,0.5)'
        }
      },
      color: [
        '#c23531', '#2f4554', '#61a0a8', '#d48265', '#749f83',
        '#ca8622', '#bda29a', '#6e7074', '#546570', '#4b5354'
      ],
      data: [
        {
          name: '运营成本',
          value: 4000000,
          children: [
            { name: '人力成本', value: 2000000 },
            { name: '营销费用', value: 1200000 },
            { name: '租金水电', value: 800000 }
          ]
        },
        {
          name: '研发投入',
          value: 3000000,
          children: [
            { name: '人员薪酬', value: 1800000 },
            { name: '设备采购', value: 700000 },
            { name: '云计算', value: 500000 }
          ]
        },
        {
          name: '行政管理',
          value: 1500000,
          children: [
            { name: '办公费用', value: 600000 },
            { name: '差旅费用', value: 500000 },
            { name: '培训费用', value: 400000 }
          ]
        },
        {
          name: '其他支出',
          value: 500000,
          children: [
            { name: '保险', value: 300000 },
            { name: '税费', value: 200000 }
          ]
        }
      ]
    }
  ]
};

export default function App() {
  return <TreeMapChart chartId="treemap-budget" option={option} width="100%" height={500} />;
}
```

## 磁盘使用分析

```typescript
import React from 'react';
import { TreeMapChart } from '@agions/taroviz';

const option = {
  title: {
    text: '磁盘空间使用分析',
    subtext: '点击可深入查看子目录',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: (params: any) => {
      const bytes = params.value;
      let size = '';
      if (bytes >= 1073741824) {
        size = (bytes / 1073741824).toFixed(2) + ' GB';
      } else if (bytes >= 1048576) {
        size = (bytes / 1048576).toFixed(2) + ' MB';
      } else if (bytes >= 1024) {
        size = (bytes / 1024).toFixed(2) + ' KB';
      } else {
        size = bytes + ' B';
      }
      return `${params.name}<br/>${size}`;
    }
  },
  series: [
    {
      type: 'treemap',
      width: '100%',
      height: '85%',
      top: '12%',
      nodeClick: 'zoomToNode',
      breadcrumb: {
        show: true,
        bottom: 5,
        left: 'center',
        itemStyle: {
          borderColor: '#ccc',
          borderWidth: 1,
          padding: 5
        }
      },
      label: {
        show: true,
        formatter: '{b}',
        fontSize: 11
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2,
        gapWidth: 1
      },
      levels: [
        {
          itemStyle: {
            borderColor: '#777',
            borderWidth: 2,
            gapWidth: 2
          },
          upperLabel: {
            show: true,
            color: '#fff',
            fontWeight: 'bold'
          }
        }
      ],
      data: [
        {
          name: 'C:\\',
          value: 500000000000,
          children: [
            {
              name: 'Windows',
              value: 80000000000,
              children: [
                { name: 'System32', value: 45000000000 },
                { name: 'SysWOW64', value: 25000000000 },
                { name: 'WinSxS', value: 10000000000 }
              ]
            },
            {
              name: 'Program Files',
              value: 60000000000,
              children: [
                { name: 'Microsoft Office', value: 3000000000 },
                { name: 'Visual Studio', value: 15000000000 },
                { name: 'Games', value: 42000000000 }
              ]
            },
            {
              name: 'Users',
              value: 200000000000,
              children: [
                {
                  name: 'Documents',
                  value: 50000000000,
                  children: [
                    { name: 'Photos', value: 25000000000 },
                    { name: 'Videos', value: 15000000000 },
                    { name: 'Downloads', value: 10000000000 }
                  ]
                },
                { name: 'Desktop', value: 30000000000 },
                {
                  name: 'Projects',
                  value: 120000000000,
                  children: [
                    { name: 'WebApp', value: 50000000000 },
                    { name: 'MobileApp', value: 40000000000 },
                    { name: 'DataAnalysis', value: 30000000000 }
                  ]
                }
              ]
            },
            {
              name: 'Temp',
              value: 15000000000
            }
          ]
        }
      ]
    }
  ]
};

export default function App() {
  return <TreeMapChart chartId="treemap-disk" option={option} width="100%" height={500} />;
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

- **销售分析**：展示产品类目销售分布
- **投资组合**：展示持仓行业分布
- **预算分配**：展示预算各项目分配
- **存储分析**：展示磁盘空间使用情况
- **文件统计**：展示文件夹大小分布

## 注意事项

1. 数据支持多层嵌套的树形结构
2. `nodeClick` 可以设置点击节点的行为：`zoomToNode`、`link`或`none`
3. 可以通过 `breadcrumb` 显示当前路径
4. `levels` 可以为不同层级设置不同的样式
5. 建议使用 `roam: false` 禁用缩放以获得更好的性能
