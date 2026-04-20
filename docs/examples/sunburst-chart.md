# 旭日图 SunburstChart

旭日图是一种增强版的饼图，能展示多层级数据的占比关系，支持交互式下钻。中心展示整体，外圈展示细节。

## 基本用法

```typescript
import React from 'react';
import { SunburstChart } from '@agions/taroviz';

const option = {
  title: {
    text: '公司部门结构',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: (params: any) => {
      const treePath = params.treePathInfo.map(item => item.name);
      const value = params.value;
      return `
        <strong>${treePath.join(' > ')}</strong><br/>
        人数: ${value}人
      `;
    }
  },
  series: [
    {
      type: 'sunburst',
      data: [
        {
          name: '技术部',
          value: 120,
          children: [
            { name: '前端组', value: 40 },
            { name: '后端组', value: 45 },
            { name: '测试组', value: 20 },
            { name: '运维组', value: 15 }
          ]
        },
        {
          name: '运营部',
          value: 80,
          children: [
            { name: '市场组', value: 30 },
            { name: '客服组', value: 35 },
            { name: '策划组', value: 15 }
          ]
        },
        {
          name: '财务部',
          value: 30,
          children: [
            { name: '会计组', value: 15 },
            { name: '出纳组', value: 15 }
          ]
        },
        {
          name: '人事部',
          value: 20,
          children: [
            { name: '招聘组', value: 10 },
            { name: '培训组', value: 10 }
          ]
        }
      ],
      radius: ['15%', '90%'],
      label: {
        rotate: 'radial',
        fontSize: 10
      },
      itemStyle: {
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#fff'
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
  return <SunburstChart chartId="sunburst-basic" option={option} width="100%" height={500} />;
}
```

## 销售区域分布

```typescript
import React from 'react';
import { SunburstChart } from '@agions/taroviz';

const option = {
  title: {
    text: '全国销售分布',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: (params: any) => {
      const treePath = params.treePathInfo.map(item => item.name);
      const percent = ((params.value / params.rootValue) * 100).toFixed(1);
      return `
        <strong>${treePath.join(' > ')}</strong><br/>
        销售额: ¥${params.value.toLocaleString()}<br/>
        占比: ${percent}%
      `;
    }
  },
  series: [
    {
      type: 'sunburst',
      radius: ['20%', '90%'],
      sort: undefined,
      label: {
        rotate: 0,
        fontSize: 11,
        color: '#fff'
      },
      itemStyle: {
        borderRadius: 3,
        borderWidth: 2,
        borderColor: '#fff'
      },
      emphasis: {
        focus: 'ancestor',
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.4)'
        }
      },
      levels: [
        {},
        {
          r0: '20%',
          r: '45%',
          label: {
            rotate: 0,
            fontSize: 12,
            fontWeight: 'bold'
          },
          itemStyle: {
            borderWidth: 3
          }
        },
        {
          r0: '45%',
          r: '70%',
          label: {
            align: 'right',
            fontSize: 10
          },
          itemStyle: {
            borderWidth: 2
          }
        },
        {
          r0: '70%',
          r: '90%',
          label: {
            position: 'outside',
            fontSize: 9,
            padding: 3,
            silent: false,
            color: '#333'
          },
          itemStyle: {
            borderWidth: 1
          }
        }
      ],
      data: [
        {
          name: '华东',
          value: 4500,
          children: [
            { name: '上海', value: 1500 },
            { name: '杭州', value: 1200 },
            { name: '南京', value: 900 },
            { name: '苏州', value: 500 },
            { name: '其他', value: 400 }
          ]
        },
        {
          name: '华南',
          value: 3800,
          children: [
            { name: '深圳', value: 1400 },
            { name: '广州', value: 1200 },
            { name: '东莞', value: 600 },
            { name: '其他', value: 600 }
          ]
        },
        {
          name: '华北',
          value: 3200,
          children: [
            { name: '北京', value: 1800 },
            { name: '天津', value: 700 },
            { name: '青岛', value: 400 },
            { name: '其他', value: 300 }
          ]
        },
        {
          name: '西南',
          value: 2000,
          children: [
            { name: '成都', value: 900 },
            { name: '重庆', value: 700 },
            { name: '其他', value: 400 }
          ]
        },
        {
          name: '华中',
          value: 1500,
          children: [
            { name: '武汉', value: 800 },
            { name: '长沙', value: 400 },
            { name: '其他', value: 300 }
          ]
        }
      ]
    }
  ]
};

export default function App() {
  return <SunburstChart chartId="sunburst-sales" option={option} width="100%" height={500} />;
}
```

## 电影类型分布

```typescript
import React from 'react';
import { SunburstChart } from '@agions/taroviz';

const option = {
  title: {
    text: '电影类型分布',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: (params: any) => {
      const treePath = params.treePathInfo.map(item => item.name);
      return `<strong>${treePath.join(' / ')}</strong><br/>影片数: ${params.value}`;
    }
  },
  series: [
    {
      type: 'sunburst',
      data: [
        {
          name: '动作片',
          value: 280,
          children: [
            { name: '枪战', value: 80 },
            { name: '格斗', value: 95 },
            { name: '飞车', value: 55 },
            { name: '战争', value: 50 }
          ]
        },
        {
          name: '喜剧片',
          value: 320,
          children: [
            { name: '情景喜剧', value: 120 },
            { name: '浪漫喜剧', value: 100 },
            { name: '黑色幽默', value: 50 },
            { name: '无厘头', value: 50 }
          ]
        },
        {
          name: '科幻片',
          value: 180,
          children: [
            { name: '硬科幻', value: 60 },
            { name: '软科幻', value: 50 },
            { name: '超级英雄', value: 40 },
            { name: '机甲', value: 30 }
          ]
        },
        {
          name: '动画片',
          value: 200,
          children: [
            { name: '2D动画', value: 80 },
            { name: '3D动画', value: 90 },
            { name: '定格动画', value: 20 },
            { name: 'CG电影', value: 10 }
          ]
        },
        {
          name: '悬疑片',
          value: 150,
          children: [
            { name: '推理', value: 60 },
            { name: '惊悚', value: 50 },
            { name: '恐怖', value: 40 }
          ]
        }
      ],
      radius: ['0%', '90%'],
      label: {
        rotate: 'radial',
        fontSize: 10
      },
      itemStyle: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#fff'
      },
      emphasis: {
        focus: 'ancestor'
      }
    }
  ]
};

export default function App() {
  return <SunburstChart chartId="sunburst-movie" option={option} width="100%" height={500} />;
}
```

## 自定义颜色和样式

```typescript
import React from 'react';
import { SunburstChart } from '@agions/taroviz';

const option = {
  backgroundColor: '#1a1a2e',
  title: {
    text: '学习时间分布',
    left: 'center',
    textStyle: {
      color: '#fff',
      fontSize: 18
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
      type: 'sunburst',
      radius: ['10%', '85%'],
      sort: undefined,
      textStyle: {
        color: '#fff',
        fontWeight: 'bold'
      },
      label: {
        rotate: 'radial',
        fontSize: 11
      },
      itemStyle: {
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#1a1a2e'
      },
      emphasis: {
        focus: 'ancestor',
        itemStyle: {
          shadowBlur: 15,
          shadowColor: 'rgba(255,255,255,0.3)'
        }
      },
      levels: [
        {},
        {
          r0: '10%',
          r: '40%',
          itemStyle: {
            borderWidth: 3
          },
          label: {
            fontSize: 14
          }
        },
        {
          r0: '40%',
          r: '65%',
          itemStyle: {
            borderWidth: 2
          },
          label: {
            fontSize: 11
          }
        },
        {
          r0: '65%',
          r: '85%',
          label: {
            position: 'outside',
            fontSize: 9,
            padding: 2,
            silent: false,
            color: '#ccc'
          },
          itemStyle: {
            borderWidth: 1
          }
        }
      ],
      data: [
        {
          name: '编程',
          value: 45,
          itemStyle: { color: '#5470c6' },
          children: [
            { name: '前端', value: 18, itemStyle: { color: '#91cc75' }, children: [
              { name: 'React', value: 8 },
              { name: 'Vue', value: 6 },
              { name: 'CSS', value: 4 }
            ]},
            { name: '后端', value: 17, itemStyle: { color: '#fac858' }, children: [
              { name: 'Node.js', value: 10 },
              { name: 'Python', value: 7 }
            ]},
            { name: '数据库', value: 10, itemStyle: { color: '#ee6666' } }
          ]
        },
        {
          name: '英语',
          value: 25,
          itemStyle: { color: '#73c0de' },
          children: [
            { name: '口语', value: 12 },
            { name: '听力', value: 8 },
            { name: '阅读', value: 5 }
          ]
        },
        {
          name: '数学',
          value: 20,
          itemStyle: { color: '#3ba272' },
          children: [
            { name: '高数', value: 10 },
            { name: '线代', value: 6 },
            { name: '概率', value: 4 }
          ]
        },
        {
          name: '其他',
          value: 10,
          itemStyle: { color: '#fc8452' },
          children: [
            { name: '历史', value: 4 },
            { name: '经济', value: 3 },
            { name: '心理', value: 3 }
          ]
        }
      ]
    }
  ]
};

export default function App() {
  return <SunburstChart chartId="sunburst-study" option={option} width="100%" height={500} />;
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

- **组织架构**：展示公司部门层级结构
- **地理分布**：展示区域-省份-城市销售分布
- **分类统计**：展示商品、内容的层级分类
- **时间分配**：展示学习、工作时间分配
- **食谱/成分**：展示配方或成分的层级关系

## 注意事项

1. 旭日图支持多层嵌套数据结构，最多可达十几层
2. `radius` 属性控制内圈和外圈的半径比例
3. `focus` 可以设置鼠标悬停时的聚焦行为：`'ancestor'`（聚焦祖先）、`'descendant'`（聚焦后代）或`'self'`
4. `levels` 可以为不同层级设置不同的样式
5. 中心空白区域的大小可以通过调整 `radius[0]` 来控制
