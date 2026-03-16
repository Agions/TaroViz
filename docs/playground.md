---
layout: page
title: Playground
titleTemplate: 交互式图表配置器
---

<script setup>
import { ref, computed } from 'vue'

const chartType = ref('line')
const showCode = ref(true)

const chartTypes = [
  { value: 'line', label: '折线图', icon: '📈' },
  { value: 'bar', label: '柱状图', icon: '📊' },
  { value: 'pie', label: '饼图', icon: '🥧' },
  { value: 'radar', label: '雷达图', icon: '🕸️' },
  { value: 'gauge', label: '仪表盘', icon: '⚡' }
]

const sampleData = computed(() => {
  const dataMap = {
    line: `[{
  name: '销量',
  data: [820, 932, 901, 934, 1290, 1330, 1320]
}]`,
    bar: `[{
  name: '月份',
  data: ['一月', '二月', '三月', '四月', '五月', '六月']
}, {
  name: '销量',
  data: [820, 932, 901, 934, 1290, 1330]
}]`,
    pie: `[{
  name: '访问来源',
  data: [
    { value: 1048, name: '搜索引擎' },
    { value: 735, name: '直接访问' },
    { value: 580, name: '邮件营销' },
    { value: 484, name: '联盟广告' },
    { value: 300, name: '视频广告' }
  ]
}]`,
    radar: `[{
  name: '预算分配',
  data: [{
    name: '研发',
    value: 420
  }, {
    name: '市场',
    value: 380
  }, {
    name: '运营',
    value: 280
  }, {
    name: '客服',
    value: 180
  }, {
    name: '行政',
    value: 120
  }]
}]`,
    gauge: `[{
  name: '完成率',
  value: 75
}]`
  }
  return dataMap[chartType.value] || dataMap.line
})

const codeExample = computed(() => {
return `\`\`\`tsx
import { ${chartType.value.charAt(0).toUpperCase() + chartType.value.slice(1)}Chart } from '@agions/taroviz'

export default function App() {
  return (
    <${chartType.value.charAt(0).toUpperCase() + chartType.value.slice(1)}Chart
      title="示例图表"
      data=${sampleData.value}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 800,
          easing: 'cubicOut'
        }
      }}
    />
  )
}
\`\`\`
`})
</script>

# 图表配置 Playground

<div class="playground">

## 选择图表类型

<div class="chart-selector">

<button 
  v-for="type in chartTypes" 
  :key="type.value"
  :class="['chart-btn', { active: chartType === type.value }]"
  @click="chartType = type.value"
>
  <span class="icon">{{ type.icon }}</span>
  <span class="label">{{ type.label }}</span>
</button>

</div>

## 预览

<div class="preview-area">

<div class="chart-preview" :data-type="chartType">

<div class="mock-chart">
  <div class="chart-title">示例图表 - {{ chartTypes.find(t => t.value === chartType)?.label }}</div>
  <div class="chart-content">
    <template v-if="chartType === 'line'">
      <svg viewBox="0 0 400 150" class="line-svg">
        <polyline fill="none" stroke="#2d8a8a" stroke-width="3" points="20,120 70,80 120,95 170,50 220,40 270,45 320,30"/>
        <circle fill="#2d8a8a" cx="20" cy="120" r="4"/>
        <circle fill="#2d8a8a" cx="70" cy="80" r="4"/>
        <circle fill="#2d8a8a" cx="120" cy="95" r="4"/>
        <circle fill="#2d8a8a" cx="170" cy="50" r="4"/>
        <circle fill="#2d8a8a" cx="220" cy="40" r="4"/>
        <circle fill="#2d8a8a" cx="270" cy="45" r="4"/>
        <circle fill="#2d8a8a" cx="320" cy="30" r="4"/>
      </svg>
    </template>
    <template v-else-if="chartType === 'bar'">
      <div class="bar-container">
        <div class="bar" style="height: 60%"><span>60%</span></div>
        <div class="bar" style="height: 75%"><span>75%</span></div>
        <div class="bar" style="height: 55%"><span>55%</span></div>
        <div class="bar" style="height: 90%"><span>90%</span></div>
        <div class="bar" style="height: 45%"><span>45%</span></div>
        <div class="bar" style="height: 82%"><span>82%</span></div>
      </div>
    </template>
    <template v-else-if="chartType === 'pie'">
      <svg viewBox="0 0 100 100" class="pie-svg">
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#4a90d9" stroke-width="20" stroke-dasharray="100 251" transform="rotate(-90 50 50)"/>
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#2d8a8a" stroke-width="20" stroke-dasharray="60 291" stroke-dashoffset="-100" transform="rotate(-90 50 50)"/>
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e07a5f" stroke-width="20" stroke-dasharray="50 301" stroke-dashoffset="-160" transform="rotate(-90 50 50)"/>
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#d4a056" stroke-width="20" stroke-dasharray="40 311" stroke-dashoffset="-210" transform="rotate(-90 50 50)"/>
      </svg>
    </template>
    <template v-else-if="chartType === 'radar'">
      <svg viewBox="0 0 100 100" class="radar-svg">
        <polygon points="50,10 90,35 80,75 20,75 10,35" fill="none" stroke="#ddd" stroke-width="1"/>
        <polygon points="50,20 75,35 70,60 30,60 25,35" fill="rgba(45,138,138,0.3)" stroke="#2d8a8a" stroke-width="2"/>
      </svg>
    </template>
    <template v-else-if="chartType === 'gauge'">
      <svg viewBox="0 0 100 60" class="gauge-svg">
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#eee" stroke-width="8" stroke-linecap="round"/>
        <path d="M 10 50 A 40 40 0 0 1 78 20" fill="none" stroke="#2d8a8a" stroke-width="8" stroke-linecap="round"/>
        <circle cx="78" cy="20" r="5" fill="#2d8a8a"/>
        <text x="50" y="55" text-anchor="middle" class="gauge-text">75%</text>
      </svg>
    </template>
  </div>
</div>

</div>

## 代码示例

<div class="code-toggle">
<button :class="{ active: showCode }" @click="showCode = true">React</button>
<button :class="{ active: !showCode }" @click="showCode = false">Taro</button>
</div>

<div v-if="showCode" class="code-block">

```tsx
import { LineChart } from '@agions/taroviz'

export default function App() {
  return (
    <LineChart
      title="销售趋势"
      data={[
        {
          name: '销量',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        xAxis: {
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {},
        series: [{
          type: 'line',
          smooth: true,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(45, 138, 138, 0.3)' },
                { offset: 1, color: 'rgba(45, 138, 138, 0.05)' }
              ]
            }
          }
        }]
      }}
    />
  )
}
```

</div>

<div v-else class="code-block">

```tsx
import { LineChart } from '@agions/taroviz'

export default function App() {
  return (
    <LineChart
      title="销售趋势"
      data={[
        {
          name: '销量',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]}
      options={{
        responsive: true,
        xAxis: {
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        series: [{
          type: 'line',
          smooth: true
        }]
      }}
    />
  )
}
```

</div>

</div>

</div>

<style scoped>

.playground {
  max-width: 900px;
  margin: 0 auto;
}

.chart-selector {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin: 24px 0;
}

.chart-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
}

.chart-btn:hover {
  border-color: var(--vp-c-brand-2);
}

.chart-btn.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.chart-btn .icon {
  font-size: 18px;
}

.preview-area {
  margin: 32px 0;
}

.chart-preview {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 32px;
}

.mock-chart {
  max-width: 400px;
  margin: 0 auto;
}

.chart-title {
  text-align: center;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 24px;
}

.chart-content {
  height: 180px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

/* Line chart SVG */
.line-svg {
  width: 100%;
  height: 100%;
}

/* Bar chart */
.bar-container {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  height: 100%;
  width: 100%;
  justify-content: center;
}

.bar {
  width: 36px;
  background: linear-gradient(180deg, #2d8a8a 0%, #1a5a5a 100%);
  border-radius: 4px 4px 0 0;
  position: relative;
  transition: all 0.3s ease;
}

.bar:hover {
  background: linear-gradient(180deg, #3d9a9a 0%, #2d6a6a 100%);
}

.bar span {
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: var(--vp-c-text-2);
}

/* Pie chart */
.pie-svg {
  width: 160px;
  height: 160px;
}

/* Radar */
.radar-svg {
  width: 140px;
  height: 140px;
}

/* Gauge */
.gauge-svg {
  width: 160px;
  height: 96px;
}

.gauge-text {
  font-size: 16px;
  font-weight: 600;
  fill: var(--vp-c-text-1);
}

/* Code toggle */
.code-toggle {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.code-toggle button {
  padding: 8px 16px;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 13px;
}

.code-toggle button.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.code-block {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
}

</style>
