/**
 * TaroViz 主题系统
 * 支持 CSS 变量、动态主题切换、自定义主题
 */

// ============================================================================
// 类型定义
// ============================================================================

/**
 * 主题类型
 */
export type ThemeType = 'light' | 'dark' | 'custom';

/**
 * 主题配置
 */
export interface ThemeConfig {
  /** 主题名称 */
  name: string;
  /** 主题类型 */
  type: ThemeType;
  /** 主题变量 */
  variables: ThemeVariables;
  /** ECharts 主题配置 */
  echartsTheme?: Record<string, unknown>;
  /** 是否为暗色主题 */
  isDark?: boolean;
}

/**
 * 主题变量 (CSS 变量)
 */
export interface ThemeVariables {
  /** 背景色 */
  '--tv-bg-color': string;
  '--tv-bg-color-secondary': string;
  /** 文字颜色 */
  '--tv-text-color': string;
  '--tv-text-color-secondary': string;
  /** 主色调 */
  '--tv-primary-color': string;
  '--tv-primary-color-hover': string;
  '--tv-primary-color-active': string;
  /** 成功色 */
  '--tv-success-color': string;
  /** 警告色 */
  '--tv-warning-color': string;
  /** 错误色 */
  '--tv-error-color': string;
  /** 边框颜色 */
  '--tv-border-color': string;
  /** 分割线颜色 */
  '--tv-divider-color': string;
  /** 阴影颜色 */
  '--tv-shadow-color': string;
  /** 图表颜色系列 */
  '--tv-chart-color-1': string;
  '--tv-chart-color-2': string;
  '--tv-chart-color-3': string;
  '--tv-chart-color-4': string;
  '--tv-chart-color-5': string;
  '--tv-chart-color-6': string;
  '--tv-chart-color-7': string;
  '--tv-chart-color-8': string;
  /** 字体 */
  '--tv-font-family': string;
  '--tv-font-size': string;
  '--tv-font-size-small': string;
  '--tv-font-size-large': string;
  /** 圆角 */
  '--tv-border-radius': string;
  '--tv-border-radius-small': string;
  /** 动画 */
  '--tv-transition-duration': string;
}

/**
 * 预设主题
 */
export type PresetThemeName =
  | 'default'
  | 'dark'
  | 'vintage'
  | 'macarons'
  | 'infographic'
  | 'helianthus'
  | 'blue'
  | 'red'
  | 'green'
  | 'purple';

// ============================================================================
// 预设主题配置
// ============================================================================

const PRESET_THEMES: Record<PresetThemeName, ThemeConfig> = {
  default: {
    name: 'default',
    type: 'light',
    isDark: false,
    variables: {
      '--tv-bg-color': '#ffffff',
      '--tv-bg-color-secondary': '#fafafa',
      '--tv-text-color': '#333333',
      '--tv-text-color-secondary': '#666666',
      '--tv-primary-color': '#1890ff',
      '--tv-primary-color-hover': '#40a9ff',
      '--tv-primary-color-active': '#096dd9',
      '--tv-success-color': '#52c41a',
      '--tv-warning-color': '#faad14',
      '--tv-error-color': '#ff4d4f',
      '--tv-border-color': '#d9d9d9',
      '--tv-divider-color': '#f0f0f0',
      '--tv-shadow-color': 'rgba(0, 0, 0, 0.1)',
      '--tv-chart-color-1': '#5470c6',
      '--tv-chart-color-2': '#91cc75',
      '--tv-chart-color-3': '#fac858',
      '--tv-chart-color-4': '#ee6666',
      '--tv-chart-color-5': '#73c0de',
      '--tv-chart-color-6': '#3ba272',
      '--tv-chart-color-7': '#fc8452',
      '--tv-chart-color-8': '#9a60b4',
      '--tv-font-family':
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      '--tv-font-size': '14px',
      '--tv-font-size-small': '12px',
      '--tv-font-size-large': '16px',
      '--tv-border-radius': '4px',
      '--tv-border-radius-small': '2px',
      '--tv-transition-duration': '0.3s',
    },
  },
  dark: {
    name: 'dark',
    type: 'dark',
    isDark: true,
    variables: {
      '--tv-bg-color': '#1a1a2e',
      '--tv-bg-color-secondary': '#16213e',
      '--tv-text-color': '#e0e0e0',
      '--tv-text-color-secondary': '#a0a0a0',
      '--tv-primary-color': '#1890ff',
      '--tv-primary-color-hover': '#40a9ff',
      '--tv-primary-color-active': '#096dd9',
      '--tv-success-color': '#52c41a',
      '--tv-warning-color': '#faad14',
      '--tv-error-color': '#ff4d4f',
      '--tv-border-color': '#404040',
      '--tv-divider-color': '#303030',
      '--tv-shadow-color': 'rgba(0, 0, 0, 0.3)',
      '--tv-chart-color-1': '#5470c6',
      '--tv-chart-color-2': '#91cc75',
      '--tv-chart-color-3': '#fac858',
      '--tv-chart-color-4': '#ee6666',
      '--tv-chart-color-5': '#73c0de',
      '--tv-chart-color-6': '#3ba272',
      '--tv-chart-color-7': '#fc8452',
      '--tv-chart-color-8': '#9a60b4',
      '--tv-font-family':
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      '--tv-font-size': '14px',
      '--tv-font-size-small': '12px',
      '--tv-font-size-large': '16px',
      '--tv-border-radius': '4px',
      '--tv-border-radius-small': '2px',
      '--tv-transition-duration': '0.3s',
    },
  },
  vintage: {
    name: 'vintage',
    type: 'custom',
    isDark: false,
    variables: {
      '--tv-bg-color': '#fef9ef',
      '--tv-bg-color-secondary': '#fcf5e9',
      '--tv-text-color': '#5c4d3d',
      '--tv-text-color-secondary': '#8b7355',
      '--tv-primary-color': '#d4a574',
      '--tv-primary-color-hover': '#c49566',
      '--tv-primary-color-active': '#b8895a',
      '--tv-success-color': '#8db78e',
      '--tv-warning-color': '#e6c87a',
      '--tv-error-color': '#c97c6d',
      '--tv-border-color': '#e0d5c7',
      '--tv-divider-color': '#f0e8de',
      '--tv-shadow-color': 'rgba(92, 77, 61, 0.1)',
      '--tv-chart-color-1': '#d4a574',
      '--tv-chart-color-2': '#8db78e',
      '--tv-chart-color-3': '#e6c87a',
      '--tv-chart-color-4': '#c97c6d',
      '--tv-chart-color-5': '#9ab5a8',
      '--tv-chart-color-6': '#c9b8d4',
      '--tv-chart-color-7': '#a8c4d4',
      '--tv-chart-color-8': '#d4c49a',
      '--tv-font-family':
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      '--tv-font-size': '14px',
      '--tv-font-size-small': '12px',
      '--tv-font-size-large': '16px',
      '--tv-border-radius': '4px',
      '--tv-border-radius-small': '2px',
      '--tv-transition-duration': '0.3s',
    },
  },
  macarons: {
    name: 'macarons',
    type: 'custom',
    isDark: false,
    variables: {
      '--tv-bg-color': '#fefcf9',
      '--tv-bg-color-secondary': '#f9f6f2',
      '--tv-text-color': '#505050',
      '--tv-text-color-secondary': '#757575',
      '--tv-primary-color': '#60acf2',
      '--tv-primary-color-hover': '#4d9de0',
      '--tv-primary-color-active': '#3d8bd0',
      '--tv-success-color': '#62d17a',
      '--tv-warning-color': '#f7c752',
      '--tv-error-color': '#f4645a',
      '--tv-border-color': '#e8e4e0',
      '--tv-divider-color': '#f0ece8',
      '--tv-shadow-color': 'rgba(80, 80, 80, 0.08)',
      '--tv-chart-color-1': '#60acf2',
      '--tv-chart-color-2': '#62d17a',
      '--tv-chart-color-3': '#f7c752',
      '--tv-chart-color-4': '#f4645a',
      '--tv-chart-color-5': '#95d9f2',
      '--tv-chart-color-6': '#a8e6cf',
      '--tv-chart-color-7': '#ffd3b6',
      '--tv-chart-color-8': '#ffaaa5',
      '--tv-font-family':
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      '--tv-font-size': '14px',
      '--tv-font-size-small': '12px',
      '--tv-font-size-large': '16px',
      '--tv-border-radius': '12px',
      '--tv-border-radius-small': '8px',
      '--tv-transition-duration': '0.3s',
    },
  },
  infographic: {
    name: 'infographic',
    type: 'custom',
    isDark: false,
    variables: {
      '--tv-bg-color': '#ffffff',
      '--tv-bg-color-secondary': '#f5f7fa',
      '--tv-text-color': '#1a1a1a',
      '--tv-text-color-secondary': '#666666',
      '--tv-primary-color': '#277 ace',
      '--tv-primary-color-hover': '#3a8ee6',
      '--tv-primary-color-active': '#146bb3',
      '--tv-success-color': '#2fc25b',
      '--tv-warning-color': '#fbd438',
      '--tv-error-color': '#e8352e',
      '--tv-border-color': '#e0e6ed',
      '--tv-divider-color': '#f0f2f5',
      '--tv-shadow-color': 'rgba(26, 26, 26, 0.06)',
      '--tv-chart-color-1': '#277ace',
      '--tv-chart-color-2': '#31cce8',
      '--tv-chart-color-3': '#23d3a2',
      '--tv-chart-color-4': '#fbd438',
      '--tv-chart-color-5': '#f87f50',
      '--tv-chart-color-6': '#e8352e',
      '--tv-chart-color-7': '#b02ad3',
      '--tv-chart-color-8': '#6475d4',
      '--tv-font-family':
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      '--tv-font-size': '14px',
      '--tv-font-size-small': '12px',
      '--tv-font-size-large': '16px',
      '--tv-border-radius': '2px',
      '--tv-border-radius-small': '1px',
      '--tv-transition-duration': '0.2s',
    },
  },
  helianthus: {
    name: 'helianthus',
    type: 'custom',
    isDark: false,
    variables: {
      '--tv-bg-color': '#fffbf5',
      '--tv-bg-color-secondary': '#fef7f0',
      '--tv-text-color': '#5c4d3d',
      '--tv-text-color-secondary': '#8b7355',
      '--tv-primary-color': '#f5c242',
      '--tv-primary-color-hover': '#e6b53e',
      '--tv-primary-color-active': '#d4a435',
      '--tv-success-color': '#7ec890',
      '--tv-warning-color': '#f5a623',
      '--tv-error-color': '#e74c3c',
      '--tv-border-color': '#e8dccf',
      '--tv-divider-color': '#f0e8de',
      '--tv-shadow-color': 'rgba(92, 77, 61, 0.08)',
      '--tv-chart-color-1': '#f5c242',
      '--tv-chart-color-2': '#7ec890',
      '--tv-chart-color-3': '#5eb8d9',
      '--tv-chart-color-4': '#e74c3c',
      '--tv-chart-color-5': '#9b7ed4',
      '--tv-chart-color-6': '#f5a623',
      '--tv-chart-color-7': '#6dd3ce',
      '--tv-chart-color-8': '#d4778b',
      '--tv-font-family':
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      '--tv-font-size': '14px',
      '--tv-font-size-small': '12px',
      '--tv-font-size-large': '16px',
      '--tv-border-radius': '6px',
      '--tv-border-radius-small': '4px',
      '--tv-transition-duration': '0.3s',
    },
  },
  blue: {
    name: 'blue',
    type: 'custom',
    isDark: false,
    variables: {
      '--tv-bg-color': '#f0f7ff',
      '--tv-bg-color-secondary': '#e6f0ff',
      '--tv-text-color': '#1a3a5c',
      '--tv-text-color-secondary': '#4a6a8c',
      '--tv-primary-color': '#1890ff',
      '--tv-primary-color-hover': '#40a9ff',
      '--tv-primary-color-active': '#096dd9',
      '--tv-success-color': '#52c41a',
      '--tv-warning-color': '#faad14',
      '--tv-error-color': '#ff4d4f',
      '--tv-border-color': '#bfd9f2',
      '--tv-divider-color': '#d9e8fc',
      '--tv-shadow-color': 'rgba(24, 144, 255, 0.15)',
      '--tv-chart-color-1': '#1890ff',
      '--tv-chart-color-2': '#91cc75',
      '--tv-chart-color-3': '#fac858',
      '--tv-chart-color-4': '#ee6666',
      '--tv-chart-color-5': '#73c0de',
      '--tv-chart-color-6': '#3ba272',
      '--tv-chart-color-7': '#fc8452',
      '--tv-chart-color-8': '#9a60b4',
      '--tv-font-family':
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      '--tv-font-size': '14px',
      '--tv-font-size-small': '12px',
      '--tv-font-size-large': '16px',
      '--tv-border-radius': '4px',
      '--tv-border-radius-small': '2px',
      '--tv-transition-duration': '0.3s',
    },
  },
  red: {
    name: 'red',
    type: 'custom',
    isDark: false,
    variables: {
      '--tv-bg-color': '#fff5f5',
      '--tv-bg-color-secondary': '#ffe6e6',
      '--tv-text-color': '#5c1a1a',
      '--tv-text-color-secondary': '#8c4a4a',
      '--tv-primary-color': '#ff4d4f',
      '--tv-primary-color-hover': '#ff7875',
      '--tv-primary-color-active': '#d9363e',
      '--tv-success-color': '#52c41a',
      '--tv-warning-color': '#faad14',
      '--tv-error-color': '#ff4d4f',
      '--tv-border-color': '#f2bfbf',
      '--tv-divider-color': '#fcd9d9',
      '--tv-shadow-color': 'rgba(255, 77, 79, 0.15)',
      '--tv-chart-color-1': '#ff4d4f',
      '--tv-chart-color-2': '#ffd700',
      '--tv-chart-color-3': '#ff7c4d',
      '--tv-chart-color-4': '#9c4dff',
      '--tv-chart-color-5': '#00d0ff',
      '--tv-chart-color-6': '#52c41a',
      '--tv-chart-color-7': '#faad14',
      '--tv-chart-color-8': '#8b5cf6',
      '--tv-font-family':
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      '--tv-font-size': '14px',
      '--tv-font-size-small': '12px',
      '--tv-font-size-large': '16px',
      '--tv-border-radius': '4px',
      '--tv-border-radius-small': '2px',
      '--tv-transition-duration': '0.3s',
    },
  },
  green: {
    name: 'green',
    type: 'custom',
    isDark: false,
    variables: {
      '--tv-bg-color': '#f5fff5',
      '--tv-bg-color-secondary': '#e6ffe6',
      '--tv-text-color': '#1a3d1a',
      '--tv-text-color-secondary': '#4a6c4a',
      '--tv-primary-color': '#52c41a',
      '--tv-primary-color-hover': '#73d13d',
      '--tv-primary-color-active': '#389e0d',
      '--tv-success-color': '#52c41a',
      '--tv-warning-color': '#faad14',
      '--tv-error-color': '#ff4d4f',
      '--tv-border-color': '#bff2bf',
      '--tv-divider-color': '#d9fcd9',
      '--tv-shadow-color': 'rgba(82, 196, 26, 0.15)',
      '--tv-chart-color-1': '#52c41a',
      '--tv-chart-color-2': '#1890ff',
      '--tv-chart-color-3': '#faad14',
      '--tv-chart-color-4': '#ff4d4f',
      '--tv-chart-color-5': '#722ed1',
      '--tv-chart-color-6': '#13c2c2',
      '--tv-chart-color-7': '#fa8c16',
      '--tv-chart-color-8': '#eb2f96',
      '--tv-font-family':
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      '--tv-font-size': '14px',
      '--tv-font-size-small': '12px',
      '--tv-font-size-large': '16px',
      '--tv-border-radius': '4px',
      '--tv-border-radius-small': '2px',
      '--tv-transition-duration': '0.3s',
    },
  },
  purple: {
    name: 'purple',
    type: 'custom',
    isDark: false,
    variables: {
      '--tv-bg-color': '#faf5ff',
      '--tv-bg-color-secondary': '#f0e6ff',
      '--tv-text-color': '#3d1a5c',
      '--tv-text-color-secondary': '#6a4a8c',
      '--tv-primary-color': '#722ed1',
      '--tv-primary-color-hover': '#9254de',
      '--tv-primary-color-active': '#531dab',
      '--tv-success-color': '#52c41a',
      '--tv-warning-color': '#faad14',
      '--tv-error-color': '#ff4d4f',
      '--tv-border-color': '#d9bff2',
      '--tv-divider-color': '#ecd9fc',
      '--tv-shadow-color': 'rgba(114, 46, 209, 0.15)',
      '--tv-chart-color-1': '#722ed1',
      '--tv-chart-color-2': '#eb2f96',
      '--tv-chart-color-3': '#1890ff',
      '--tv-chart-color-4': '#52c41a',
      '--tv-chart-color-5': '#faad14',
      '--tv-chart-color-6': '#ff4d4f',
      '--tv-chart-color-7': '#13c2c2',
      '--tv-chart-color-8': '#fa8c16',
      '--tv-font-family':
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      '--tv-font-size': '14px',
      '--tv-font-size-small': '12px',
      '--tv-font-size-large': '16px',
      '--tv-border-radius': '4px',
      '--tv-border-radius-small': '2px',
      '--tv-transition-duration': '0.3s',
    },
  },
};

// ============================================================================
// 主题管理器
// ============================================================================

class ThemeManager {
  private static instance: ThemeManager | null = null;
  private currentTheme: ThemeConfig = PRESET_THEMES.default;
  private listeners: Set<(theme: ThemeConfig) => void> = new Set();
  private cssVarPrefix = '--tv-';

  private constructor() {}

  /**
   * 获取单例实例
   */
  public static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  /**
   * 获取当前主题
   */
  public getCurrentTheme(): ThemeConfig {
    return this.currentTheme;
  }

  /**
   * 获取预设主题
   */
  public getPresetTheme(name: PresetThemeName): ThemeConfig | undefined {
    return PRESET_THEMES[name];
  }

  /**
   * 获取所有预设主题名称
   */
  public getPresetThemeNames(): PresetThemeName[] {
    return Object.keys(PRESET_THEMES) as PresetThemeName[];
  }

  /**
   * 设置主题
   */
  public setTheme(name: PresetThemeName | ThemeConfig): void {
    const theme = typeof name === 'string' ? PRESET_THEMES[name] : name;
    if (theme) {
      this.currentTheme = theme;
      this.applyThemeVariables(theme);
      this.notifyListeners();
    }
  }

  /**
   * 应用主题变量到 CSS
   */
  public applyThemeVariables(theme: ThemeConfig): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const variables = theme.variables;

    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // 设置 data 属性用于 JavaScript 检测
    root.setAttribute('data-theme', theme.name);
    root.setAttribute('data-theme-type', theme.type);

    if (theme.isDark) {
      root.setAttribute('data-theme-dark', 'true');
    } else {
      root.removeAttribute('data-theme-dark');
    }
  }

  /**
   * 应用 ECharts 主题
   */
  public getEChartsTheme(): Record<string, unknown> {
    const theme = this.currentTheme;
    return {
      color: [
        theme.variables['--tv-chart-color-1'],
        theme.variables['--tv-chart-color-2'],
        theme.variables['--tv-chart-color-3'],
        theme.variables['--tv-chart-color-4'],
        theme.variables['--tv-chart-color-5'],
        theme.variables['--tv-chart-color-6'],
        theme.variables['--tv-chart-color-7'],
        theme.variables['--tv-chart-color-8'],
      ],
      backgroundColor: theme.variables['--tv-bg-color'],
      textStyle: {
        color: theme.variables['--tv-text-color'],
        fontFamily: theme.variables['--tv-font-family'],
      },
    };
  }

  /**
   * 切换暗色/亮色主题
   */
  public toggleDarkMode(): void {
    if (this.currentTheme.type === 'dark') {
      this.setTheme('default');
    } else {
      this.setTheme('dark');
    }
  }

  /**
   * 判断是否为暗色主题
   */
  public isDarkMode(): boolean {
    return this.currentTheme.isDark || this.currentTheme.type === 'dark';
  }

  /**
   * 检测系统 prefers-color-scheme 是否为暗色
   */
  public getSystemPrefersDark(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  /**
   * 订阅系统主题变化，自动切换匹配的主题
   * @returns 取消订阅的函数
   */
  public watchSystemTheme(): () => void {
    if (typeof window === 'undefined') return () => {};

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      // 当系统主题切换时，自动应用对应主题
      this.setTheme(e.matches ? 'dark' : 'default');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }

  /**
   * 应用初始主题（根据系统偏好自动选择 dark/default）
   * 必须在 DOM 加载后调用
   */
  public applyInitialTheme(): void {
    const prefersDark = this.getSystemPrefersDark();
    this.setTheme(prefersDark ? 'dark' : 'default');
  }

  /**
   * 注册主题变更监听器
   */
  public onThemeChange(listener: (theme: ThemeConfig) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * 通知所有监听器
   */
  private notifyListeners(): void {
    this.listeners.forEach((listener) => {
      try {
        listener(this.currentTheme);
      } catch (error) {
        console.error('[TaroViz] Theme change listener error:', error);
      }
    });
  }

  /**
   * 创建自定义主题
   */
  public createCustomTheme(options: Partial<ThemeVariables>, name = 'custom'): ThemeConfig {
    return {
      name,
      type: 'custom',
      isDark: false,
      variables: {
        ...PRESET_THEMES.default.variables,
        ...options,
      },
    };
  }

  /**
   * 导出主题变量为 CSS 字符串
   */
  public exportThemeAsCSS(theme?: ThemeConfig): string {
    const targetTheme = theme || this.currentTheme;
    const variables = targetTheme.variables;

    return `:root[data-theme="${targetTheme.name}"] {\n${Object.entries(variables)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join('\n')}\n}`;
  }

  /**
   * 导出主题变量为 JSON
   */
  public exportThemeAsJSON(theme?: ThemeConfig): string {
    const targetTheme = theme || this.currentTheme;
    return JSON.stringify(targetTheme, null, 2);
  }
}

// 导出单例实例
export const themeManager = ThemeManager.getInstance();

// 导出预设主题
export { PRESET_THEMES };

export default themeManager;
