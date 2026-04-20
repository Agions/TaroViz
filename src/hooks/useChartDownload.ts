/**
 * useChartDownload - 图表下载 Hook
 * 支持下载图表为图片（PNG/JPEG/SVG/PDF）或原始数据（CSV/JSON）
 */
import { useCallback } from 'react';
import type { ChartInstance } from './index';
import {
  generateFilename,
  downloadBlob,
  downloadDataUrl,
  csvToBlob,
  jsonToBlob,
  convertToCSV,
  convertToJSON,
  createPdfFromImage,
} from './utils/chartDownloadUtils';

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
  getChartData: () => unknown;
  /** 获取 SVG 数据 */
  getSvgData: () => string | undefined;
  /** 直接导出（自动选择格式） */
  exportChart: (options?: Partial<UseChartDownloadOptions>) => Promise<void>;
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
        const pdfDataUrl = await createPdfFromImage(dataUrl, name);
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
   * 获取图表数据
   */
  const getChartData = useCallback((): unknown => {
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
        let data: unknown = option;
        if (dataKey && typeof data === 'object') {
          data = (data as Record<string, unknown>)[dataKey] || data;
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
        let data: unknown = option;
        if (dataKey && typeof data === 'object') {
          data = (data as Record<string, unknown>)[dataKey] || data;
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
