# 树图 TreeChart

树图用于展示具有层级结构的数据，以树形结构展示父子节点关系，适合组织架构、文件系统、思维导图等场景。

## 基本用法

```typescript
import React from 'react';
import { TreeChart } from '@agions/taroviz';

const option = {
  series: [{
    type: 'tree',
    data: [{
      name: '根节点',
      children: [
        { name: '节点1' },
        { name: '节点2' }
      ]
    }]
  }]
};

export default function App() {
  return <TreeChart chartId="tree-basic" option={option} width="100%" height={400} />;
}
```

## 使用 treeData（推荐）

```typescript
import React from 'react';
import { TreeChart } from '@agions/taroviz';

const treeData = {
  name: '技术部',
  children: [
    {
      name: '前端组',
      children: [
        { name: 'React组' },
        { name: 'Vue组' }
      ]
    },
    { name: '后端组', children: [] },
    { name: '测试组' }
  ]
};

export default function App() {
  return <TreeChart chartId="tree-simple" treeData={treeData} width="100%" height={400} />;
}
```

## 水平树图

```typescript
import React from 'react';
import { TreeChart } from '@agions/taroviz';

export default function App() {
  const treeData = {
    name: '公司',
    children: [
      {
        name: '技术部',
        children: [
          { name: '前端', children: [{ name: 'React' }, { name: 'Vue' }] },
          { name: '后端', children: [{ name: 'Java' }, { name: 'Go' }] },
          { name: '运维' }
        ]
      },
      {
        name: '运营部',
        children: [
          { name: '市场', children: [{ name: '推广' }, { name: '品牌' }] },
          { name: '客服' }
        ]
      }
    ]
  };

  return (
    <TreeChart
      chartId="tree-horizontal"
      treeData={treeData}
      layout="orthogonal"
      orient="horizontal"
      width="100%"
      height={500}
    />
  );
}
```

## 垂直树图

```typescript
import React from 'react';
import { TreeChart } from '@agions/taroviz';

export default function App() {
  const treeData = {
    name: 'CEO',
    children: [
      {
        name: 'CTO',
        children: [
          { name: '前端负责人' },
          { name: '后端负责人' }
        ]
      },
      {
        name: 'COO',
        children: [
          { name: '运营负责人' },
          { name: '客服负责人' }
        ]
      }
    ]
  };

  return (
    <TreeChart
      chartId="tree-vertical"
      treeData={treeData}
      layout="orthogonal"
      orient="vertical"
      width="100%"
      height={500}
    />
  );
}
```

## 辐射状树图

```typescript
import React from 'react';
import { TreeChart } from '@agions/taroviz';

export default function App() {
  const treeData = {
    name: '核心',
    children: [
      { name: '节点A', children: [{ name: 'A1' }, { name: 'A2' }] },
      { name: '节点B', children: [{ name: 'B1' }, { name: 'B2' }] },
      { name: '节点C', children: [{ name: 'C1' }, { name: 'C2' }] }
    ]
  };

  return (
    <TreeChart
      chartId="tree-radial"
      treeData={treeData}
      layout="radial"
      width="100%"
      height={500}
    />
  );
}
```

## 自定义节点样式

```typescript
import React from 'react';
import { TreeChart } from '@agions/taroviz';

export default function App() {
  const treeData = {
    name: '根',
    itemStyle: { color: '#5470c6' },
    label: { color: '#fff', fontWeight: 'bold' },
    children: [
      {
        name: '部门A',
        itemStyle: { color: '#91cc75' },
        children: [
          { name: '组A1', itemStyle: { color: '#91cc75', borderColor: '#000' } },
          { name: '组A2' }
        ]
      },
      {
        name: '部门B',
        itemStyle: { color: '#fac858' },
        children: [
          { name: '组B1' },
          { name: '组B2' }
        ]
      }
    ]
  };

  return (
    <TreeChart
      chartId="tree-styled"
      treeData={treeData}
      width="100%"
      height={500}
      symbolSize={50}
      label={{ show: true, position: 'inside' }}
    />
  );
}
```

## 文件目录结构

```typescript
import React from 'react';
import { TreeChart } from '@agions/taroviz';

export default function App() {
  const fileTree = {
    name: 'src',
    children: [
      {
        name: 'components',
        children: [
          { name: 'Button.tsx' },
          { name: 'Input.tsx' },
          { name: 'Modal.tsx' }
        ]
      },
      {
        name: 'hooks',
        children: [
          { name: 'useCount.ts' },
          { name: 'useTheme.ts' }
        ]
      },
      {
        name: 'pages',
        children: [
          { name: 'Home.tsx' },
          { name: 'About.tsx' }
        ]
      },
      { name: 'App.tsx' },
      { name: 'index.tsx' }
    ]
  };

  return (
    <TreeChart
      chartId="tree-files"
      treeData={fileTree}
      orient="horizontal"
      symbol="rect"
      symbolSize={[80, 25]}
      width="100%"
      height={500}
    />
  );
}
```

## 思维导图

```typescript
import React from 'react';
import { TreeChart } from '@agions/taroviz';

export default function App() {
  const mindMapData = {
    name: '项目规划',
    children: [
      {
        name: '需求分析',
        children: [
          { name: '用户调研' },
          { name: '竞品分析' }
        ]
      },
      {
        name: '设计',
        children: [
          { name: 'UI设计' },
          { name: '原型设计' }
        ]
      },
      {
        name: '开发',
        children: [
          { name: '前端开发' },
          { name: '后端开发' },
          { name: '接口联调' }
        ]
      },
      {
        name: '测试',
        children: [
          { name: '单元测试' },
          { name: '集成测试' }
        ]
      },
      {
        name: '上线',
        children: [
          { name: '部署' },
          { name: '监控' }
        ]
      }
    ]
  };

  return (
    <TreeChart
      chartId="tree-mindmap"
      treeData={mindMapData}
      layout="radial"
      width="100%"
      height={600}
      initialTreeDepth={2}
    />
  );
}
```

## 带数值的节点

```typescript
import React from 'react';
import { TreeChart } from '@agions/taroviz';

export default function App() {
  const treeData = {
    name: '总计\n¥500万',
    value: 500,
    children: [
      {
        name: '部门A\n¥200万',
        value: 200,
        children: [
          { name: '组A1\n¥120万', value: 120 },
          { name: '组A2\n¥80万', value: 80 }
        ]
      },
      {
        name: '部门B\n¥180万',
        value: 180,
        children: [
          { name: '组B1\n¥100万', value: 100 },
          { name: '组B2\n¥80万', value: 80 }
        ]
      },
      {
        name: '部门C\n¥120万',
        value: 120,
        children: [
          { name: '组C1\n¥70万', value: 70 },
          { name: '组C2\n¥50万', value: 50 }
        ]
      }
    ]
  };

  return (
    <TreeChart
      chartId="tree-value"
      treeData={treeData}
      orient="horizontal"
      label={{ show: true, position: 'inside', formatter: '{b}' }}
      width="100%"
      height={500}
    />
  );
}
```

## API

| 属性 | 类型 | 默认值 | 说明 |
|:---|:---|:---|:---|
| chartId | `string` | 必填 | 图表唯一标识 |
| option | `object` | - | ECharts 配置项 |
| treeData | `TreeNode` | - | 树形数据 |
| width | `string \| number` | `'100%'` | 图表宽度 |
| height | `string \| number` | `400` | 图表高度 |
| layout | `'orthogonal' \| 'radial'` | `'orthogonal'` | 布局方式 |
| orient | `'horizontal' \| 'vertical'` | `'horizontal'` | 树的方向 |
| initialTreeDepth | `number` | `2` | 初始展开层级 |
| symbol | `string` | `'emptyCircle'` | 节点图形 |
| symbolSize | `number \| [number, number]` | `12` | 节点大小 |
| showLine | `boolean` | `true` | 是否显示连线 |
| lineCurveness | `number` | `0.5` | 连线弯曲度 |
| autoResize | `boolean` | `true` | 是否自动响应容器大小变化 |
| renderer | `'canvas' \| 'svg'` | `'canvas'` | 渲染器类型 |

## 使用场景

- **组织架构**：公司、部门、团队层级关系
- **文件目录**：文件夹和文件的树形结构
- **思维导图**：创意思维的发散结构
- **分类体系**：商品分类、学科分类等
- **决策树**：流程决策的分支结构

## 注意事项

1. `treeData` 是树的根节点，包含 `name` 和可选的 `children`
2. 设置 `initialTreeDepth` 控制默认展开层级
3. `radial` 布局适合展示辐射状的关系网络
4. 节点支持自定义 `itemStyle`、`label`、`icon` 等属性
