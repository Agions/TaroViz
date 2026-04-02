# 水球图 LiquidChart

水球图是一种表现百分比数据的图表类型，以液体填充的效果展示进度或比例，视觉上直观生动。常用于展示任务完成率、指标达成等场景。

## 基本用法

```typescript
import React from 'react';
import { LiquidChart } from '@agions/taroviz';

const option = {
  series: [{
    type: 'liquidFill',
    data: [0.6],
    color: ['#5470c6']
  }]
};

export default function App() {
  return <LiquidChart chartId="liquid-basic" option={option} width={300} height={300} />;
}
```

## 基础用法（使用 waveData）

```typescript
import React from 'react';
import { LiquidChart } from '@agions/taroviz';

export default function App() {
  return (
    <LiquidChart
      chartId="liquid-simple"
      waveData={[0.65]}
      width={300}
      height={300}
      color={['#5470c6']}
    />
  );
}
```

## 多层水球

```typescript
import React from 'react';
import { LiquidChart } from '@agions/taroviz';

export default function App() {
  return (
    <LiquidChart
      chartId="liquid-multi"
      waveData={[0.7, 0.5, 0.3]}
      width={400}
      height={300}
      color={['#5470c6', '#91cc75', '#fac858']}
      showLabel
    />
  );
}
```

## 自定义形状

```typescript
import React from 'react';
import { LiquidChart } from '@agions/taroviz';

export default function App() {
  return (
    <LiquidChart
      chartId="liquid-rect"
      waveData={[0.75]}
      width={300}
      height={200}
      shape="rect"
      color={['#91cc75']}
      backgroundColor="#f5f5f5"
    />
  );
}
```

## 圆角矩形

```typescript
import React from 'react';
import { LiquidChart } from '@agions/taroviz';

export default function App() {
  return (
    <LiquidChart
      chartId="liquid-roundRect"
      waveData={[0.8]}
      width={300}
      height={200}
      shape="roundRect"
      color={['#ee6666']}
      amplitude={8}
    />
  );
}
```

## 显示标签

```typescript
import React from 'react';
import { LiquidChart } from '@agions/taroviz';

export default function App() {
  return (
    <LiquidChart
      chartId="liquid-label"
      waveData={[0.68]}
      width={300}
      height={300}
      showLabel
      labelFormatter={(value) => `${(value * 100).toFixed(0)}%`}
      color={['#5470c6']}
    />
  );
}
```

## 自定义波浪参数

```typescript
import React from 'react';
import { LiquidChart } from '@agions/taroviz';

export default function App() {
  return (
    <LiquidChart
      chartId="liquid-params"
      waveData={[0.65]}
      width={300}
      height={300}
      amplitude={10}
      waveLength="50%"
      phase={0}
      period="double"
      color={['#fac858']}
    />
  );
}
```

## 多指标仪表盘

```typescript
import React from 'react';
import { LiquidChart } from '@agions/taroviz';

export default function App() {
  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <LiquidChart
        chartId="liquid-cpu"
        waveData={[0.85]}
        width={150}
        height={150}
        color={['#ee6666']}
        showLabel
        labelFormatter={(v) => 'CPU\n85%'}
      />
      <LiquidChart
        chartId="liquid-memory"
        waveData={[0.62]}
        width={150}
        height={150}
        color={['#5470c6']}
        showLabel
        labelFormatter={(v) => '内存\n62%'}
      />
      <LiquidChart
        chartId="liquid-disk"
        waveData={[0.45]}
        width={150}
        height={150}
        color={['#91cc75']}
        showLabel
        labelFormatter={(v) => '磁盘\n45%'}
      />
    </div>
  );
}
```

## 项目进度展示

```typescript
import React from 'react';
import { LiquidChart } from '@agions/taroviz';

const projects = [
  { name: '前端开发', progress: 0.85, color: '#5470c6' },
  { name: '后端开发', progress: 0.72, color: '#91cc75' },
  { name: '测试', progress: 0.45, color: '#fac858' },
  { name: '部署', progress: 0.2, color: '#ee6666' },
];

export default function App() {
  return (
    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
      {projects.map((project) => (
        <div key={project.name} style={{ textAlign: 'center' }}>
          <LiquidChart
            chartId={`liquid-${project.name}`}
            waveData={[project.progress]}
            width={180}
            height={180}
            color={[project.color]}
            showLabel
            labelFormatter={(v) => `${(v * 100).toFixed(0)}%`}
          />
          <p style={{ marginTop: '10px', fontWeight: 500 }}>{project.name}</p>
        </div>
      ))}
    </div>
  );
}
```

## 销售目标达成

```typescript
import React from 'react';
import { LiquidChart } from '@agions/taroviz';

export default function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <LiquidChart
        chartId="liquid-sales"
        waveData={[0.92]}
        width={350}
        height={350}
        color={['#5470c6', '#91cc75', '#fac858']}
        showLabel
        labelFormatter={(v) => `¥${(v * 1000000).toFixed(0)}`}
      />
      <p style={{ marginTop: '16px', fontSize: '16px', color: '#666' }}>
        年度销售目标达成
      </p>
    </div>
  );
}
```

## 电池电量

```typescript
import React from 'react';
import { LiquidChart } from '@agions/taroviz';

export default function App() {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div>
        <LiquidChart
          chartId="battery-high"
          waveData={[0.9]}
          width={100}
          height={200}
          shape="rect"
          color={['#91cc75']}
          showLabel
          labelFormatter={(v) => `${(v * 100).toFixed(0)}%`}
        />
        <p style={{ textAlign: 'center' }}>高电量</p>
      </div>
      <div>
        <LiquidChart
          chartId="battery-medium"
          waveData={[0.45]}
          width={100}
          height={200}
          shape="rect"
          color={['#fac858']}
          showLabel
          labelFormatter={(v) => `${(v * 100).toFixed(0)}%`}
        />
        <p style={{ textAlign: 'center' }}>中电量</p>
      </div>
      <div>
        <LiquidChart
          chartId="battery-low"
          waveData={[0.12]}
          width={100}
          height={200}
          shape="rect"
          color={['#ee6666']}
          showLabel
          labelFormatter={(v) => `${(v * 100).toFixed(0)}%`}
        />
        <p style={{ textAlign: 'center' }}>低电量</p>
      </div>
    </div>
  );
}
```

## 内存使用

```typescript
import React from 'react';
import { LiquidChart } from '@agions/taroviz';

export default function App() {
  return (
    <div style={{ display: 'flex', gap: '30px' }}>
      <LiquidChart
        chartId="liquid-memory1"
        waveData={[0.35]}
        width={150}
        height={150}
        color={['#5470c6']}
        shape="circle"
        showLabel
        labelFormatter={(v) => `可用\n${(v * 100).toFixed(0)}%`}
      />
      <LiquidChart
        chartId="liquid-memory2"
        waveData={[0.65]}
        width={150}
        height={150}
        color={['#ee6666']}
        shape="circle"
        showLabel
        labelFormatter={(v) => `已用\n${(v * 100).toFixed(0)}%`}
      />
    </div>
  );
}
```

## API

| 属性 | 类型 | 默认值 | 说明 |
|:---|:---|:---|:---|
| chartId | `string` | 必填 | 图表唯一标识 |
| option | `object` | - | ECharts 配置项 |
| waveData | `number[]` | `[0.5]` | 水球数据，值范围 [0, 1] |
| width | `string \| number` | `'100%'` | 图表宽度 |
| height | `string \| number` | `300` | 图表高度 |
| shape | `'circle' \| 'rect' \| 'roundRect'` | `'circle'` | 水球形状 |
| amplitude | `number` | 8 | 振幅（相对于半径的比例）|
| waveLength | `number \| string` | `'50%'` | 波长（相对于画布宽度）|
| phase | `number` | 0 | 相位偏移 |
| period | `number \| 'double'` | `'double'` | 周期时间 |
| color | `string[]` | 内置色板 | 颜色数组 |
| backgroundColor | `string` | `'transparent'` | 背景色 |
| showLabel | `boolean` | `true` | 是否显示标签 |
| labelFormatter | `(value: number) => string` | - | 标签格式化函数 |
| autoResize | `boolean` | `true` | 是否自动响应容器大小变化 |
| renderer | `'canvas' \| 'svg'` | `'canvas'` | 渲染器类型 |

## 使用场景

- **任务完成率**：展示项目、计划的完成进度
- **指标达成**：展示销售、收入等目标达成情况
- **系统监控**：展示 CPU、内存、磁盘等资源使用率
- **电池电量**：移动端设备电量展示
- **容量分析**：存储空间、流量配额使用情况

## 注意事项

1. 水球图的数据值范围是 [0, 1]，会自动转换为百分比显示
2. 使用多个数据项可以创建多层水球效果
3. 水球图不支持 SVG 渲染器，需要使用 Canvas 渲染器
4. `echarts-liquidfill` 库需要额外引入作为依赖
