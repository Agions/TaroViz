---
layout: page
title: 交互式示例
titleTemplate: 动态演示各种图表功能
---

<script setup>
import { ref, computed, onMounted } from 'vue'

// 模拟数据
const lineData = ref([
  { month: '1月', sales: 120, profit: 80 },
  { month: '2月', sales: 200, profit: 140 },
  { month: '3月', sales: 150, profit: 100 },
  { month: '4月', sales: 80, profit: 50 },
  { month: '5月', sales: 70, profit: 40 },
  { month: '6月', sales: 110, profit: 70 },
])

const updateData = () => {
  lineData.value = lineData.value.map(item => ({
    month: item.month,
    sales: Math.floor(Math.random() * 200) + 50,
    profit: Math.floor(Math.random() * 150) + 30
  }))
}

// 主题切换
const themes = ['default', 'dark', 'neon', 'glass', 'ocean']
const currentTheme = ref('default')

// 动画开关
const animationEnabled = ref(true)

// 暗色模式
const isDark = ref(false)

const toggleTheme = () => {
  const idx = themes.indexOf(currentTheme.value)
  currentTheme.value = themes[(idx + 1) % themes.length]
}

const toggleDark = () => {
  isDark.value = !isDark.value
}

const toggleAnimation = () => {
  animationEnabled.value = !animationEnabled.value
}
</script>

# 交互式示例

本页面展示 TaroViz 的各种交互式功能。您可以实时调整参数来体验图表的变化。

## 1. 动态数据更新

点击「刷新数据」按钮，模拟实时数据变化。

<div class="demo-section">

### 预览

<div class="chart-container">
<div class="mock-chart">

| 月份 | 销售额 | 利润 |
|:---:|:---:|:---:|
| 1月 | {{ lineData[0].sales }} | {{ lineData[0].profit }} |
| 2月 | {{ lineData[1].sales }} | {{ lineData[1].profit }} |
| 3月 | {{ lineData[2].sales }} | {{ lineData[2].profit }} |
| 4月 | {{ lineData[3].sales }} | {{ lineData[3].profit }} |
| 5月 | {{ lineData[4].sales }} | {{ lineData[4].profit }} |
| 6月 | {{ lineData[5].sales }} | {{ lineData[5].profit }} |

</div>
</div>

### 控制面板

<button class="demo-btn primary" @click="updateData">
🔄 刷新数据
</button>

### 代码示例

```tsx
import { useState } from 'react'
import { LineChart } from 'taroviz'

function DynamicDataChart() {
  const [data, setData] = useState(initialData)

  const refreshData = () => {
    setData(prev => prev.map(item => ({
      ...item,
      sales: Math.random() * 200 + 50,
      profit: Math.random() * 150 + 30
    })))
  }

  return (
    <>
      <LineChart data={data} />
      <button onClick={refreshData}>刷新数据</button>
    </>
  )
}
```

</div>

## 2. 主题切换

点击按钮切换不同主题风格。

<div class="demo-section">

### 预览

<div class="theme-preview" :class="currentTheme">
  <div class="chart-mock">
    <div class="bar" style="height: 70%"></div>
    <div class="bar" style="height: 50%"></div>
    <div class="bar" style="height: 85%"></div>
    <div class="bar" style="height: 60%"></div>
    <div class="bar" style="height: 90%"></div>
  </div>
</div>

### 控制面板

<div class="btn-group">
  <button 
    v-for="theme in themes" 
    :key="theme"
    :class="['demo-btn', { active: currentTheme === theme }]"
    @click="currentTheme = theme"
  >
    {{ theme }}
  </button>
</div>

### 代码示例

```tsx
import { LineChart } from 'taroviz'

function ThemeChart() {
  return (
    <LineChart 
      theme="neon"
      data={data}
    />
  )
}

// 或使用主题对象
import { neonTheme } from 'taroviz/themes'

function ThemeChart2() {
  return (
    <LineChart 
      theme={neonTheme}
      data={data}
    />
  )
}
```

</div>

## 3. 暗色模式

支持跟随系统或手动切换暗色模式。

<div class="demo-section">

### 预览

<div class="preview-toggle">
  <label class="toggle">
    <input type="checkbox" v-model="isDark">
    <span class="slider"></span>
    <span class="label-text">{{ isDark ? '🌙 暗色模式' : '☀️ 浅色模式' }}</span>
  </label>
</div>

<div class="chart-container" :class="{ dark: isDark }">
  <div class="mock-content">
    <div class="chart-title">销售趋势</div>
    <div class="chart-bars">
      <div class="bar" style="height: 60%"></div>
      <div class="bar" style="height: 80%"></div>
      <div class="bar" style="height: 45%"></div>
      <div class="bar" style="height: 90%"></div>
      <div class="bar" style="height: 70%"></div>
    </div>
  </div>
</div>

### 代码示例

```tsx
import { LineChart } from 'taroviz'
import { useTheme } from 'taroviz/hooks'

function DarkModeChart() {
  const { isDark, toggleDark } = useTheme()

  return (
    <>
      <button onClick={toggleDark}>
        {{ isDark ? '切换浅色' : '切换暗色' }}
      </button>
      <LineChart 
        :dark-mode="isDark"
        data={data}
      />
    </>
  )
}
```

</div>

## 4. 动画控制

控制图表动画的开关和配置。

<div class="demo-section">

### 预览

<div class="preview-toggle">
  <label class="toggle">
    <input type="checkbox" v-model="animationEnabled">
    <span class="slider"></span>
    <span class="label-text">{{ animationEnabled ? '✅ 动画启用' : '❌ 动画禁用' }}</span>
  </label>
</div>

<div class="chart-container">
  <div class="animation-preview" :class="{ animating: animationEnabled }">
    <div class="bar" style="height: 60%"></div>
    <div class="bar" style="height: 80%"></div>
    <div class="bar" style="height: 45%"></div>
    <div class="bar" style="height: 90%"></div>
  </div>
</div>

### 代码示例

```tsx
import { LineChart } from 'taroviz'

function AnimatedChart() {
  return (
    <LineChart 
      animation={{
        enabled: true,
        duration: 800,
        easing: 'cubicOut'
      }}
      data={data}
    />
  )
}
```

</div>

## 5. 响应式图表

图表自动适应容器大小变化。

<div class="demo-section">

### 预览

<div class="resize-demo">
  <div class="resize-box">
    <div class="mock-content">
      <div class="chart-title">响应式图表</div>
      <div class="chart-bars small">
        <div class="bar" style="height: 70%"></div>
        <div class="bar" style="height: 50%"></div>
        <div class="bar" style="height: 85%"></div>
      </div>
    </div>
  </div>
</div>

### 代码示例

```tsx
import { LineChart } from 'taroviz'

function ResponsiveChart() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <LineChart 
        autoResize={true}
        data={data}
      />
    </div>
  )
}
```

</div>

<style scoped>

.demo-section {
  margin: 32px 0;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
}

.demo-section h3 {
  margin-top: 0;
  margin-bottom: 16px;
}

.chart-container {
  padding: 24px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  margin: 16px 0;
}

.chart-container.dark {
  background: #1a1a2e;
  border-color: #2d2d44;
}

.chart-container.dark .chart-title,
.chart-container.dark .mock-content {
  color: #e8e8e8;
}

.chart-title {
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--vp-c-text-1);
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  height: 120px;
}

.chart-bars.small {
  height: 80px;
}

.bar {
  flex: 1;
  background: linear-gradient(180deg, #2d8a8a 0%, #1a5a5a 100%);
  border-radius: 4px 4px 0 0;
  transition: height 0.3s ease;
}

.chart-container.dark .bar {
  background: linear-gradient(180deg, #4992ff 0%, #2d6aa3 100%);
}

.mock-chart {
  padding: 16px;
}

.mock-chart table {
  width: 100%;
  border-collapse: collapse;
}

.mock-chart th,
.mock-chart td {
  padding: 8px 16px;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

.mock-chart th {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.mock-chart td {
  color: var(--vp-c-text-2);
}

.demo-btn {
  padding: 10px 20px;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  margin: 4px;
}

.demo-btn:hover {
  border-color: var(--vp-c-brand-2);
}

.demo-btn.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.demo-btn.primary {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.demo-btn.primary:hover {
  background: var(--vp-c-brand-2);
}

.btn-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
}

.theme-preview {
  padding: 32px;
  border-radius: 8px;
  margin: 16px 0;
}

.theme-preview.default {
  background: #faf9f7;
}
.theme-preview.dark {
  background: #1a1a2e;
}
.theme-preview.neon {
  background: #0d0d1a;
}
.theme-preview.glass {
  background: linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4));
}
.theme-preview.ocean {
  background: linear-gradient(180deg, #e0f2fe, #bae6fd);
}

.chart-mock {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 12px;
  height: 120px;
}

.chart-mock .bar {
  width: 40px;
}

.preview-toggle {
  margin: 16px 0;
}

.toggle {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.toggle input {
  display: none;
}

.slider {
  width: 48px;
  height: 24px;
  background: var(--vp-c-border);
  border-radius: 24px;
  position: relative;
  transition: background 0.3s ease;
}

.slider::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  top: 2px;
  left: 2px;
  transition: transform 0.3s ease;
}

.toggle input:checked + .slider {
  background: var(--vp-c-brand-1);
}

.toggle input:checked + .slider::after {
  transform: translateX(24px);
}

.label-text {
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.animation-preview {
  display: flex;
  align-items: flex-end;
  gap: 16px;
  height: 120px;
}

.animation-preview .bar {
  transition: none;
}

.animation-preview.animating .bar {
  animation: growUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.animation-preview.animating .bar:nth-child(1) { animation-delay: 0s; }
.animation-preview.animating .bar:nth-child(2) { animation-delay: 0.1s; }
.animation-preview.animating .bar:nth-child(3) { animation-delay: 0.2s; }
.animation-preview.animating .bar:nth-child(4) { animation-delay: 0.3s; }

@keyframes growUp {
  from {
    height: 0;
  }
  to {
    /* 保持原有高度 */
  }
}

.resize-demo {
  margin: 16px 0;
}

.resize-box {
  max-width: 400px;
  padding: 16px;
  border: 2px dashed var(--vp-c-border);
  border-radius: 8px;
}

.resize-box .chart-bars {
  height: 80px;
}

.resize-box .bar {
  width: 30px;
}

</style>
