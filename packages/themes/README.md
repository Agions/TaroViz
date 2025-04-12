# @agions/taroviz-themes

TaroViz 主题系统，提供丰富的主题定制和样式管理能力。

## 特性

- 🎨 丰富的预设主题
- 🛠️ 灵活的主题定制
- 🔄 动态主题切换
- 📱 多端适配支持
- 🎯 主题继承与覆盖

## 安装

```bash
# npm
npm install @agions/taroviz-themes

# yarn
yarn add @agions/taroviz-themes

# pnpm
pnpm add @agions/taroviz-themes
```

## 要求

- React >= 16.13.0
- @tarojs/taro >= 3.4.0

## 使用

```typescript
import { ThemeProvider, useTheme, createTheme } from '@agions/taroviz-themes';

// 创建自定义主题
const customTheme = createTheme({
  palette: {
    primary: '#1890ff',
    secondary: '#13c2c2',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d'
  },
  typography: {
    fontSize: 14,
    fontFamily: 'Roboto, sans-serif'
  }
});

// 使用主题提供者
const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <MyComponent />
    </ThemeProvider>
  );
};

// 在组件中使用主题
const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <div style={{ color: theme.palette.primary }}>
      Themed Component
    </div>
  );
};
```

## API 文档

### 主题创建

#### createTheme(options)

创建自定义主题。

```typescript
interface ThemeOptions {
  palette: {
    primary: string;
    secondary?: string;
    success?: string;
    warning?: string;
    error?: string;
    [key: string]: string;
  };
  typography: {
    fontSize: number;
    fontFamily?: string;
    lineHeight?: number;
  };
  spacing: {
    unit: number;
    [key: string]: number;
  };
  breakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

const theme = createTheme(options);
```

### 主题组件

#### ThemeProvider

主题提供者组件。

```typescript
<ThemeProvider theme={theme}>
  {children}
</ThemeProvider>
```

### Hooks

#### useTheme

获取当前主题的 Hook。

```typescript
const theme = useTheme();
```

### 工具函数

#### mergeThemes

合并多个主题。

```typescript
import { mergeThemes } from '@agions/taroviz-themes';

const theme = mergeThemes(baseTheme, overrides);
```

## 预设主题

### 内置主题

```typescript
import { lightTheme, darkTheme } from '@agions/taroviz-themes';

// 使用内置主题
<ThemeProvider theme={lightTheme}>
  <App />
</ThemeProvider>
```

### 主题定制

```typescript
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#1890ff',
      light: '#40a9ff',
      dark: '#096dd9'
    }
  },
  // 扩展现有主题
  extends: lightTheme
});
```

## 开发指南

### 本地开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build
```

### 目录结构

```
src/
  ├── themes/        # 预设主题
  ├── components/    # 主题组件
  ├── hooks/         # React Hooks
  ├── utils/         # 工具函数
  ├── types/         # TypeScript 类型定义
  └── index.ts       # 入口文件
```

## 最佳实践

### 响应式主题

```typescript
const responsiveTheme = createTheme({
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
  },
  typography: {
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16
    }
  }
});
```

### 主题切换

```typescript
const ThemeSwitcher = () => {
  const [isDark, setIsDark] = useState(false);
  
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <button onClick={() => setIsDark(!isDark)}>
        切换主题
      </button>
      <App />
    </ThemeProvider>
  );
};
```

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交改动 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

## 许可证

MIT License © 2024 Agions 