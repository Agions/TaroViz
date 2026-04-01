---
title: 主题预览
titleTemplate: 内置主题展示
---

<script setup>
import { ref } from 'vue'

const themes = ref([
  { key: 'default', name: 'Default', desc: '简洁现代', preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { key: 'dark', name: 'Dark', desc: '深色优雅', preview: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', dark: true },
  { key: 'neon', name: 'Neon', desc: '赛博霓虹', preview: 'linear-gradient(135deg, #00fff5 0%, #ff00ff 100%)', dark: true },
  { key: 'glass', name: 'Glass', desc: '玻璃质感', preview: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)', glass: true },
  { key: 'pastel', name: 'Pastel', desc: '粉彩柔和', preview: 'linear-gradient(135deg, #ffb3ba 0%, #ffffba 100%)' },
  { key: 'sunset', name: 'Sunset', desc: '日落余晖', preview: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)' },
  { key: 'ocean', name: 'Ocean', desc: '深海蓝调', preview: 'linear-gradient(180deg, #0077b6 0%, #90e0ef 100%)' },
  { key: 'cyber', name: 'Cyber', desc: '未来科技', preview: 'linear-gradient(135deg, #00f5ff 0%, #ff00ff 100%)', dark: true },
  { key: 'retro', name: 'Retro', desc: '怀旧复古', preview: 'linear-gradient(135deg, #d63031 0%, #fdcb6e 100%)' },
  { key: 'elegant', name: 'Elegant', desc: '雅致简约', preview: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)', dark: true },
])

const selectedTheme = ref('default')
const showCode = ref(false)

const copyCode = (theme) => {
  const code = `import { Chart } from 'taroviz'
import { ${theme.charAt(0).toUpperCase() + theme.slice(1)}Theme } from 'taroviz/themes'

export default function App() {
  return (
    <Chart
      theme="${theme}"
      // 或使用主题对象
      // theme={${theme.charAt(0).toUpperCase() + theme.slice(1)}Theme}
    />
  )
}`
  navigator.clipboard.writeText(code)
}
</script>

# 主题预览

TaroViz 内置 **10+** 精美主题，满足不同场景的视觉需求。

## 选择主题

<div class="theme-grid">
  <div
    v-for="theme in themes"
    :key="theme.key"
    :class="['theme-card', { active: selectedTheme === theme.key, dark: theme.dark, glass: theme.glass }]"
    @click="selectedTheme = theme.key"
  >
    <div class="theme-preview" :style="{ background: theme.preview }">
      <div class="chart-mock">
        <div class="bar" style="height: 60%"></div>
        <div class="bar" style="height: 80%"></div>
        <div class="bar" style="height: 45%"></div>
        <div class="bar" style="height: 90%"></div>
        <div class="bar" style="height: 70%"></div>
      </div>
    </div>
    <div class="theme-info">
      <div class="theme-name">{{ theme.name }}</div>
      <div class="theme-desc">{{ theme.desc }}</div>
    </div>
    <div v-if="selectedTheme === theme.key" class="check-mark">✓</div>
  </div>
</div>

## 使用方式

<div class="code-tabs">
  <button :class="{ active: !showCode }" @click="showCode = false">按名称</button>
  <button :class="{ active: showCode }" @click="showCode = true">按对象</button>
</div>

<div v-if="!showCode" class="code-block">

```tsx
import { LineChart } from 'taroviz'

export default function App() {
  return (
    <LineChart
      data={[...]}
      theme="${selectedTheme}"
    />
  )
}
```

</div>

<div v-else class="code-block">

```tsx
import { LineChart, ${selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)}Theme } from 'taroviz'

export default function App() {
  return (
    <LineChart
      data={[...]}
      theme={${selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)}Theme}
    />
  )
}
```

</div>

## 主题对比

| 主题 | 风格 | 适用场景 |
|:---:|:---:|:---|
| Default | 简洁现代 | 通用场景 |
| Dark | 深色优雅 | 夜间模式 |
| Neon | 赛博霓虹 | 数据大屏 |
| Glass | 玻璃态 | 现代 Web |
| Pastel | 粉彩柔和 | 温馨场景 |
| Sunset | 日落暖色 | 报表展示 |
| Ocean | 海洋蓝调 | 企业后台 |
| Cyber | 赛博科技 | 数据分析 |
| Retro | 怀旧复古 | 特殊风格 |
| Elegant | 雅致简约 | 高端产品 |

<style scoped>

.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  margin: 24px 0;
}

.theme-card {
  position: relative;
  border: 2px solid var(--vp-c-border);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--vp-c-bg);
}

.theme-card:hover {
  border-color: var(--vp-c-brand-2);
  transform: translateY(-2px);
}

.theme-card.active {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(45, 138, 138, 0.2);
}

.theme-preview {
  height: 100px;
  padding: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 8px;
}

.chart-mock {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 60px;
}

.bar {
  width: 16px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 2px;
}

.theme-card.dark .bar {
  background: rgba(255, 255, 255, 0.85);
}

.theme-card.glass .bar {
  background: rgba(255, 255, 255, 0.7);
}

.theme-info {
  padding: 12px;
  text-align: center;
  background: var(--vp-c-bg);
}

.theme-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.theme-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.check-mark {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  background: var(--vp-c-brand-1);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.code-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.code-tabs button {
  padding: 8px 16px;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 13px;
}

.code-tabs button.active {
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

table {
  width: 100%;
  margin-top: 24px;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

th {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

td {
  color: var(--vp-c-text-2);
}

</style>
