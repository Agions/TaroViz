/**
 * useChartDownload - 图表下载 Hook
 * 支持下载图表为图片（PNG/JPEG/SVG/PDF）或原始数据（CSV/JSON）
 */
import { useRef, useCallback } from 'react';
import type { ChartInstance } from './index';

// ============================================================================
// 类型定义
// ============================================================================

/** 下载格式 */
export type DownloadFormat = 'png' | 'jpeg' | 'svg' | 'pdf';

/** 图片下载选项 */
export interface UseChartDownloadOptions {
  /** 文件名（不含扩展名） */
  filename?: string;
  /** 图片像素比，默认2 */
  pixelRatio?: number;
  /** 背景色 */
  backgroundColor?: string;
  /** 默认格式 */
  format?: DownloadFormat;
  /** 是否包含标签 */
  includeLabels?: boolean;
  /** 图表实例 */
  instance?: ChartInstance | null;
  /** 导出前回调 */
  beforeExport?: (instance: ChartInstance) => void;
  /** 导出后回调 */
  afterExport?: (blob: Blob | string) => void;
}

/** 图片下载选项 */
export interface DownloadImageOptions {
  filename?: string;
  pixelRatio?: number;
  backgroundColor?: string;
  format?: 'png' | 'jpeg' | 'svg';
}

/** 数据下载选项 */
export interface DownloadDataOptions {
  filename?: string;
  /** 数据键名（用于 JSON 导出） */
  dataKey?: string;
}

/** 下载返回值 */
export interface UseChartDownloadReturn {
  /** 下载图片 */
  downloadImage: (options?: Partial<DownloadImageOptions>) => Promise<void>;
  /** 下载 CSV */
  downloadCSV: (options?: Partial<DownloadDataOptions>) => Promise<void>;
  /** 下载 JSON */
  downloadJSON: (options?: Partial<DownloadDataOptions>) => Promise<void>;
  /** 下载 PDF */
  downloadPDF: (options?: Partial<DownloadImageOptions>) => Promise<void>;
  /** 获取图片 DataURL */
  getImageDataUrl: (format?: 'png' | 'jpeg' | 'svg') => string | undefined;
  /** 获取图表数据 */
  getChartData: () => any;
  /** 获取 SVG 数据 */
  getSvgData: () => string | undefined;
  /** 直接导出（自动选择格式） */
  exportChart: (options?: Partial<UseChartDownloadOptions>) => Promise<void>;
}

// ============================================================================
// 工具函数
// ============================================================================

/**
 * 生成默认文件名
 */
function generateFilename(prefix: string = 'chart'): string {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
  return `${prefix}_${timestamp}`;
}

/**
 * 下载 Blob 对象
 */
function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * 下载数据 URL
 */
function downloadDataUrl(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * CSV 转 Blob
 */
function csvToBlob(csv: string, filename: string): Blob {
  return new Blob([csv], { type: 'text/csv;charset=utf-8;' });
}

/**
 * JSON 转 Blob
 */
function jsonToBlob(json: string, filename: string): Blob {
  return new Blob([json], { type: 'application/json;charset=utf-8;' });
}

/**
 * 将数据转换为 CSV 格式
 */
function convertToCSV(data: any, options?: { includeLabels?: boolean }): string {
  if (!data) return '';

  // 处理 ECharts 格式的数据
  if (data.series) {
    return convertSeriesToCSV(data, options);
  }

  // 处理数组数据
  if (Array.isArray(data)) {
    return convertArrayToCSV(data);
  }

  // 处理普通对象
  if (typeof data === 'object') {
    return convertObjectToCSV(data);
  }

  return String(data);
}

/**
 * 将 ECharts series 数据转换为 CSV
 */
function convertSeriesToCSV(chartData: any, options?: { includeLabels?: boolean }): string {
  const { series = [], xAxis, dataset } = chartData;
  const includeLabels = options?.includeLabels ?? true;

  if (series.length === 0) return '';

  // 获取类别轴数据
  let categories: any[] = [];
  if (xAxis?.data) {
    categories = xAxis.data;
  } else if (dataset?.dimensions && dataset.source) {
    categories = dataset.source.map((row: any[]) => row[0]);
  } else if (series[0]?.data) {
    categories = series[0].data.map((item: any, index: number) =>
      typeof item === 'object' ? item[0] || index : index
    );
  }

  // 构建 CSV 头
  const headers = includeLabels ? ['Category', ...series.map((s: any) => s.name || s.seriesIndex)] : [];

  // 构建 CSV 行
  const rows: string[][] = [];

  series.forEach((s: any, seriesIndex: number) => {
    const seriesData = s.data || [];
    seriesData.forEach((item: any, dataIndex: number) => {
      const value = typeof item === 'object' ? item[1] : item;
      const category = categories[dataIndex] || dataIndex;

      if (includeLabels) {
        if (seriesIndex === 0) {
          rows[dataIndex] = [category, value];
        } else {
          rows[dataIndex] = rows[dataIndex] || [category];
          rows[dataIndex].push(value);
        }
      } else {
        if (seriesIndex === 0) {
          rows[dataIndex] = [value];
        } else {
          rows[dataIndex] = rows[dataIndex] || [];
          rows[dataIndex].push(value);
        }
      }
    });
  });

  // 生成 CSV 字符串
  const csvRows = includeLabels
    ? [headers.join(','), ...rows.map((row) => row.join(','))]
    : rows.map((row) => row.join(','));

  return csvRows.join('\n');
}

/**
 * 将数组数据转换为 CSV
 */
function convertArrayToCSV(data: any[]): string {
  if (data.length === 0) return '';

  // 检查是否为对象数组
  if (typeof data[0] === 'object' && data[0] !== null) {
    const keys = Object.keys(data[0]);
    const headers = keys.join(',');
    const rows = data.map((item) => keys.map((key) => JSON.stringify(item[key] ?? '')).join(','));
    return [headers, ...rows].join('\n');
  }

  // 简单数组
  return data.join('\n');
}

/**
 * 将对象数据转换为 CSV
 */
function convertObjectToCSV(data: Record<string, any>): string {
  const entries = Object.entries(data);
  return entries.map(([key, value]) => `${key},${JSON.stringify(value)}`).join('\n');
}

/**
 * 将 ECharts 数据转换为 JSON
 */
function convertToJSON(data: any): string {
  if (!data) return '{}';

  // 如果是 ECharts 格式，简化数据
  if (data.series) {
    const simplified: any = {
      title: data.title?.text,
      legend: data.legend?.data,
      xAxis: data.xAxis?.data,
      series: data.series.map((s: any) => ({
        name: s.name,
        type: s.type,
        data: s.data?.map((item: any) => (typeof item === 'object' ? item[1] : item)),
      })),
    };
    return JSON.stringify(simplified, null, 2);
  }

  return JSON.stringify(data, null, 2);
}

// ============================================================================
// Hook 实现
// ============================================================================

/**
 * 使用图表下载
 * @param instance 图表实例
 * @param options 默认选项
 * @returns 下载操作接口
 */
export function useChartDownload(
  instance: ChartInstance | null,
  options: UseChartDownloadOptions = {}
): UseChartDownloadReturn {
  const {
    filename,
    pixelRatio = 2,
    backgroundColor = '#ffffff',
    format = 'png',
    includeLabels = true,
    beforeExport,
    afterExport,
  } = options;

  // Refs
  const chartRef = useRef<ChartInstance | null>(null);
  chartRef.current = instance;

  /**
   * 执行导出前回调
   */
  const executeBeforeExport = useCallback(() => {
    const chart = chartRef.current;
    if (chart && beforeExport) {
      try {
        beforeExport(chart);
      } catch (e) {
        console.warn('[useChartDownload] beforeExport error:', e);
      }
    }
  }, [beforeExport]);

  /**
   * 执行导出后回调
   */
  const executeAfterExport = useCallback(
    (result: Blob | string) => {
      if (afterExport) {
        try {
          afterExport(result);
        } catch (e) {
          console.warn('[useChartDownload] afterExport error:', e);
        }
      }
    },
    [afterExport]
  );

  /**
   * 获取图片 DataURL
   */
  const getImageDataUrl = useCallback(
    (imgFormat?: 'png' | 'jpeg' | 'svg'): string | undefined => {
      const chart = chartRef.current;
      if (!chart) return undefined;

      const fmt = imgFormat || format;

      try {
        // SVG 格式
        if (fmt === 'svg') {
          const svgData = chart.getSvgData?.();
          if (svgData) {
            return `data:image/svg+xml;base64,${btoa(svgData)}`;
          }
          return undefined;
        }

        // PNG/JPEG 格式
        if (chart.getDataURL) {
          return chart.getDataURL({
            type: fmt,
            pixelRatio,
            backgroundColor,
          });
        }

        console.warn('[useChartDownload] getDataURL not supported');
        return undefined;
      } catch (e) {
        console.warn('[useChartDownload] Failed to get image data URL:', e);
        return undefined;
      }
    },
    [format, pixelRatio, backgroundColor]
  );

  /**
   * 下载图片
   */
  const downloadImage = useCallback(
    async (downloadOptions?: Partial<DownloadImageOptions>): Promise<void> => {
      executeBeforeExport();

      const chart = chartRef.current;
      if (!chart) {
        console.warn('[useChartDownload] No chart instance available');
        return;
      }

      const {
        filename: customFilename,
        pixelRatio: customPixelRatio,
        backgroundColor: customBg,
        format: customFormat,
      } = downloadOptions || {};

      const fmt = customFormat || format;
      const ratio = customPixelRatio ?? pixelRatio;
      const bg = customBg ?? backgroundColor;
      const name = customFilename || filename || generateFilename('chart');

      try {
        let dataUrl: string | undefined;

        if (fmt === 'svg') {
          const svgData = chart.getSvgData?.();
          if (svgData) {
            dataUrl = `data:image/svg+xml;base64,${btoa(svgData)}`;
          }
        } else {
          dataUrl = chart.getDataURL?.({
            type: fmt,
            pixelRatio: ratio,
            backgroundColor: bg,
          });
        }

        if (dataUrl) {
          downloadDataUrl(dataUrl, `${name}.${fmt}`);
          executeAfterExport(dataUrl);
        } else {
          console.warn('[useChartDownload] Failed to generate image data URL');
        }
      } catch (e) {
        console.warn('[useChartDownload] Failed to download image:', e);
      }
    },
    [format, pixelRatio, backgroundColor, filename, executeBeforeExport, executeAfterExport]
  );

  /**
   * 下载 PDF
   * 注意：PDF 导出需要额外的库支持，这里提供基础实现
   */
  const downloadPDF = useCallback(
    async (downloadOptions?: Partial<DownloadImageOptions>): Promise<void> => {
      executeBeforeExport();

      const chart = chartRef.current;
      if (!chart) {
        console.warn('[useChartDownload] No chart instance available');
        return;
      }

      const {
        filename: customFilename,
        pixelRatio: customPixelRatio,
        backgroundColor: customBg,
      } = downloadOptions || {};

      const ratio = customPixelRatio ?? pixelRatio;
      const bg = customBg ?? backgroundColor;
      const name = customFilename || filename || generateFilename('chart');

      try {
        // 获取图片数据
        const dataUrl = chart.getDataURL?.({
          type: 'png',
          pixelRatio: ratio,
          backgroundColor: bg,
        });

        if (!dataUrl) {
          console.warn('[useChartDownload] Failed to get image data for PDF');
          return;
        }

        // 创建 PDF（使用 canvas 转换）
        // 注意：在实际环境中，可能需要使用 jsPDF 或其他 PDF 库
        const pdfDataUrl = await createPdfFromImage(dataUrl);
        if (pdfDataUrl) {
          downloadDataUrl(pdfDataUrl, `${name}.pdf`);
          executeAfterExport(pdfDataUrl);
        }
      } catch (e) {
        console.warn('[useChartDownload] Failed to download PDF:', e);
      }
    },
    [filename, pixelRatio, backgroundColor, executeBeforeExport, executeAfterExport]
  );

  /**
   * 从图片创建 PDF DataURL
   */
  const createPdfFromImage = async (imageDataUrl: string): Promise<string | null> => {
    return new Promise((resolve) => {
      try {
        // 创建画布
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }

        // 加载图片
        const img = new Image();
        img.onload = () => {
          // 设置 PDF 尺寸（A4 纵向）
          const pdfWidth = 595.28; // A4 width in points
          const pdfHeight = 841.89; // A4 height in points

          canvas.width = pdfWidth;
          canvas.height = pdfHeight;

          // 填充背景
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, pdfWidth, pdfHeight);

          // 计算图片位置和尺寸（居中）
          const imgRatio = img.width / img.height;
          const canvasRatio = pdfWidth / pdfHeight;
          let drawWidth, drawHeight, offsetX, offsetY;

          if (imgRatio > canvasRatio) {
            drawWidth = pdfWidth * 0.8;
            drawHeight = drawWidth / imgRatio;
          } else {
            drawHeight = pdfHeight * 0.6;
            drawWidth = drawHeight * imgRatio;
          }

          offsetX = (pdfWidth - drawWidth) / 2;
          offsetY = (pdfHeight - drawHeight) / 2;

          // 绘制图片
          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

          // 添加标题
          ctx.fillStyle = '#333333';
          ctx.font = '16px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(filename || 'Chart Export', pdfWidth / 2, offsetY - 20);

          // 输出为 PNG（实际应用中应该使用 jsPDF 生成真正的 PDF）
          resolve(canvas.toDataURL('image/png'));
        };

        img.onerror = () => {
          resolve(null);
        };

        img.src = imageDataUrl;
      } catch (e) {
        console.warn('[useChartDownload] Failed to create PDF:', e);
        resolve(null);
      }
    });
  };

  /**
   * 获取图表数据
   */
  const getChartData = useCallback((): any => {
    const chart = chartRef.current;
    if (!chart) return null;

    try {
      return chart.getOption?.() || null;
    } catch (e) {
      console.warn('[useChartDownload] Failed to get chart data:', e);
      return null;
    }
  }, []);

  /**
   * 获取 SVG 数据
   */
  const getSvgData = useCallback((): string | undefined => {
    const chart = chartRef.current;
    if (!chart) return undefined;

    try {
      return chart.getSvgData?.();
    } catch (e) {
      console.warn('[useChartDownload] Failed to get SVG data:', e);
      return undefined;
    }
  }, []);

  /**
   * 下载 CSV
   */
  const downloadCSV = useCallback(
    async (downloadOptions?: Partial<DownloadDataOptions>): Promise<void> => {
      executeBeforeExport();

      const chart = chartRef.current;
      if (!chart) {
        console.warn('[useChartDownload] No chart instance available');
        return;
      }

      const { filename: customFilename, dataKey } = downloadOptions || {};
      const name = customFilename || filename || generateFilename('data');

      try {
        const option = chart.getOption?.();
        if (!option) {
          console.warn('[useChartDownload] No chart data available');
          return;
        }

        // 提取数据
        let data = option;
        if (dataKey && typeof data === 'object') {
          data = (data as any)[dataKey] || data;
        }

        // 转换为 CSV
        const csv = convertToCSV(data, { includeLabels });

        if (csv) {
          const blob = csvToBlob(csv, `${name}.csv`);
          downloadBlob(blob, `${name}.csv`);
          executeAfterExport(blob);
        }
      } catch (e) {
        console.warn('[useChartDownload] Failed to download CSV:', e);
      }
    },
    [filename, executeBeforeExport, executeAfterExport]
  );

  /**
   * 下载 JSON
   */
  const downloadJSON = useCallback(
    async (downloadOptions?: Partial<DownloadDataOptions>): Promise<void> => {
      executeBeforeExport();

      const chart = chartRef.current;
      if (!chart) {
        console.warn('[useChartDownload] No chart instance available');
        return;
      }

      const { filename: customFilename, dataKey } = downloadOptions || {};
      const name = customFilename || filename || generateFilename('data');

      try {
        const option = chart.getOption?.();
        if (!option) {
          console.warn('[useChartDownload] No chart data available');
          return;
        }

        // 提取数据
        let data = option;
        if (dataKey && typeof data === 'object') {
          data = (data as any)[dataKey] || data;
        }

        // 转换为 JSON
        const json = convertToJSON(data);

        if (json) {
          const blob = jsonToBlob(json, `${name}.json`);
          downloadBlob(blob, `${name}.json`);
          executeAfterExport(blob);
        }
      } catch (e) {
        console.warn('[useChartDownload] Failed to download JSON:', e);
      }
    },
    [filename, executeBeforeExport, executeAfterExport]
  );

  /**
   * 直接导出（自动选择格式）
   */
  const exportChart = useCallback(
    async (exportOptions?: Partial<UseChartDownloadOptions>): Promise<void> => {
      const {
        format: exportFormat,
        filename: exportFilename,
        pixelRatio: exportRatio,
        backgroundColor: exportBg,
      } = exportOptions || {};

      const fmt = exportFormat || format;

      switch (fmt) {
        case 'png':
        case 'jpeg':
          await downloadImage({ format: fmt, filename: exportFilename, pixelRatio: exportRatio, backgroundColor: exportBg });
          break;
        case 'svg':
          await downloadImage({ format: 'svg', filename: exportFilename });
          break;
        case 'pdf':
          await downloadPDF({ filename: exportFilename, pixelRatio: exportRatio, backgroundColor: exportBg });
          break;
        default:
          console.warn(`[useChartDownload] Unsupported format: ${fmt}`);
      }
    },
    [format, downloadImage, downloadPDF]
  );

  return {
    downloadImage,
    downloadCSV,
    downloadJSON,
    downloadPDF,
    getImageDataUrl,
    getChartData,
    getSvgData,
    exportChart,
  };
}

// ============================================================================
// 导出
// ============================================================================

export default useChartDownload;
