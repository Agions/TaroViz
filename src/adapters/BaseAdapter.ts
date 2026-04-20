/**
 * TaroViz 适配器基类
 * 提供通用方法，减少子类重复代码
 * 注意：这是一个工具基类，不直接实现 Adapter 接口
 * 子类负责实现真正的 Adapter 接口
 */

export abstract class BaseAdapter {
  protected config: Record<string, unknown>;
  protected chartInstance: unknown = null;

  constructor(config: Record<string, unknown> = {}) {
    this.config = config;
  }

  getInstance(): unknown {
    return this.chartInstance;
  }

  setOption(option: unknown, opts?: unknown): void {
    if (this.chartInstance) {
      (this.chartInstance as { setOption: (opt: unknown, o?: unknown) => void }).setOption(
        option,
        opts
      );
    } else {
      this.config['option'] = option;
    }
  }

  setTheme(theme: string | object): void {
    this.config['theme'] = theme;
    const instance = this.chartInstance as { setTheme?: (t: string | object) => void };
    if (instance?.setTheme) {
      instance.setTheme(theme);
    }
  }

  getWidth(): number {
    const w = this.config['width'];
    if (typeof w === 'number') return w;
    if (typeof w === 'string') {
      const parsed = parseInt(w, 10);
      if (!isNaN(parsed)) return parsed;
    }
    return 300;
  }

  getHeight(): number {
    const h = this.config['height'];
    if (typeof h === 'number') return h;
    if (typeof h === 'string') {
      const parsed = parseInt(h, 10);
      if (!isNaN(parsed)) return parsed;
    }
    return 300;
  }

  getDom(): HTMLElement | null {
    return null;
  }

  convertToDataURL(opts?: unknown): string | undefined {
    return (this.chartInstance as { getDataURL?: (o?: unknown) => string })?.getDataURL?.(opts);
  }

  clear(): void {
    (this.chartInstance as { clear?: () => void })?.clear?.();
  }

  on(event: string, handler: (params: unknown) => void): void {
    (this.chartInstance as { on?: (e: string, h: (p: unknown) => void) => void })?.on?.(
      event,
      handler
    );
  }

  off(event: string, handler?: (params: unknown) => void): void {
    (this.chartInstance as { off?: (e: string, h?: (p: unknown) => void) => void })?.off?.(
      event,
      handler
    );
  }

  showLoading(opts?: object): void {
    (this.chartInstance as { showLoading?: (o?: object) => void })?.showLoading?.(opts);
  }

  hideLoading(): void {
    (this.chartInstance as { hideLoading?: () => void })?.hideLoading?.();
  }

  dispose(): void {
    if (this.chartInstance) {
      (this.chartInstance as { dispose?: () => void })?.dispose?.();
      this.chartInstance = null;
    }
  }

  resize(opts?: unknown): void {
    (this.chartInstance as { resize?: (o?: unknown) => void })?.resize?.(opts);
  }

  setComponent(component: unknown): void {
    this.config['component'] = component;
  }

  protected parseSize(value: number | string | undefined, defaultValue: number): number {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseInt(value, 10);
      if (!isNaN(parsed)) return parsed;
    }
    return defaultValue;
  }
}
