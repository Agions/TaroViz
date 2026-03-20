/**
 * TaroViz 图表导出工具
 * 支持导出为 PNG、JPEG、SVG、PDF 等格式
 */
import type { ECharts } from 'echarts';

// ============================================================================
// 类型定义
// ============================================================================

/**
 * 图片导出选项
 */
export interface ExportImageOptions {
  /** 图片类型 */
  type?: 'png' | 'jpeg' | 'webp';
  /** 设备像素比 */
  pixelRatio?: number;
  /** 背景色 */
  backgroundColor?: string;
  /** 质量 (仅对 jpeg/webp 有效) */
  quality?: number;
}

/**
 * SVG 导出选项
 */
export interface ExportSVGOptions {
  /** 是否压缩 */
  compress?: boolean;
}

/**
 * PDF 导出选项
 */
export interface ExportPDFOptions {
  /** 页面方向 */
  orientation?: 'portrait' | 'landscape';
  /** 页面大小 */
  pageSize?: 'a4' | 'letter' | 'legal' | 'tabloid';
  /** 标题 */
  title?: string;
  /** 作者 */
  author?: string;
  /** 图表与页面边缘的距离 */
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  /** 是否包含标题 */
  includeTitle?: boolean;
  /** 是否包含图例说明 */
  includeLegend?: boolean;
}

/**
 * 批量导出选项
 */
export interface BatchExportOptions {
  /** 导出格式 */
  format: 'png' | 'jpeg' | 'pdf';
  /** 文件名前缀 */
  filenamePrefix?: string;
  /** 是否压缩 */
  compress?: boolean;
}

/**
 * 导出结果
 */
export interface ExportResult {
  /** 导出的数据 */
  data: string | Blob;
  /** 文件名 */
  filename: string;
  /** MIME 类型 */
  mimeType: string;
  /** 数据大小 (字节) */
  size?: number;
}

// ============================================================================
// 工具函数
// ============================================================================

/**
 * 将 Data URL 转换为 Blob
 */
function dataURLToBlob(dataURL: string): Blob {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * 下载文件
 */
function downloadFile(data: string | Blob, filename: string, mimeType: string): void {
  const blob = typeof data === 'string' ? dataURLToBlob(data) : data;
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();

  // 清理
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
}

/**
 * 生成文件名
 */
function generateFilename(name: string, format: string): string {
  const timestamp = new Date().toISOString().slice(0, 10);
  const sanitizedName = name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_');
  return `${sanitizedName}_${timestamp}.${format}`;
}

// ============================================================================
// 导出类
// ============================================================================

/**
 * 图表导出工具类
 */
class ChartExporter {
  /**
   * 导出图表为图片
   */
  static exportImage(
    chart: ECharts,
    options: ExportImageOptions = {}
  ): ExportResult {
    const {
      type = 'png',
      pixelRatio = 2,
      backgroundColor = '#ffffff',
      quality = 0.8,
    } = options;

    const mimeType = `image/${type}`;
    const data = chart.getDataURL({
      type,
      pixelRatio,
      backgroundColor,
      quality,
    });

    return {
      data,
      filename: generateFilename('chart', type),
      mimeType,
    };
  }

  /**
   * 导出图表为 SVG
   */
  static exportSVG(chart: ECharts, options: ExportSVGOptions = {}): ExportResult {
    const { compress = false } = options;

    const svgData = chart.getSvgData();
    if (!svgData) {
      throw new Error('SVG export is not supported. Please use canvas renderer.');
    }

    let data = svgData;
    let mimeType = 'image/svg+xml';

    if (compress) {
      // 简单的 SVG 压缩：移除空格和换行
      data = data.replace(/>\s+</g, '><').replace(/\s+/g, ' ');
      mimeType += ';charset=utf-8';
    }

    return {
      data,
      filename: generateFilename('chart', 'svg'),
      mimeType,
    };
  }

  /**
   * 导出图表为 PDF (需要 jspdf 库支持)
   */
  static async exportPDF(
    chart: ECharts,
    options: ExportPDFOptions = {}
  ): Promise<ExportResult> {
    const {
      orientation = 'portrait',
      pageSize = 'a4',
      title = 'Chart Export',
      author = 'TaroViz',
      margin = { top: 40, right: 40, bottom: 40, left: 40 },
      includeTitle = true,
    } = options;

    // 获取图表图片
    const imageData = chart.getDataURL({
      type: 'png',
      pixelRatio: 2,
      backgroundColor: '#ffffff',
    });

    // 动态导入 jspdf
    let jsPDF: any;
    try {
      // 尝试使用动态导入，使用 webpackIgnore 注释避免预解析
      // @ts-ignore - 动态导入
      jsPDF = (await import(/* webpackIgnore: true */ 'jspdf')).default;
    } catch {
      // 如果没有 jspdf，提供备选方案
      console.warn('[TaroViz] jspdf not found, falling back to image download');
      return {
        data: imageData,
        filename: generateFilename('chart', 'png'),
        mimeType: 'image/png',
      };
    }

    // 页面尺寸映射 (单位: mm)
    const pageSizes: Record<string, { width: number; height: number }> = {
      a4: { width: 210, height: 297 },
      letter: { width: 216, height: 279 },
      legal: { width: 216, height: 356 },
      tabloid: { width: 279, height: 432 },
    };

    const size = pageSizes[pageSize];
    const isLandscape = orientation === 'landscape';

    // 创建 PDF
    const doc = new jsPDF({
      orientation,
      unit: 'mm',
      format: pageSize,
    });

    // 设置文档属性
    doc.setProperties({
      title,
      author,
      subject: 'Chart Export',
      keywords: 'chart, taroviz, echarts',
    });

    // 计算图表尺寸和位置
    const chartWidth = isLandscape ? size.height : size.width;
    const chartHeight = chartWidth * 0.6; // 保持 5:3 比例
    const pageWidth = isLandscape ? size.height : size.width;
    const pageHeight = isLandscape ? size.width : size.height;

    const marginTop = margin.top || 40;
    const marginLeft = margin.left || 40;

    // 添加标题
    if (includeTitle) {
      doc.setFontSize(16);
      doc.setTextColor(51, 51, 51);
      doc.text(title, marginLeft, marginTop);
    }

    // 添加图表
    const chartY = includeTitle ? marginTop + 15 : marginTop;
    const chartX = (pageWidth - chartWidth) / 2;

    doc.addImage(imageData, 'PNG', chartX, chartY, chartWidth, chartHeight);

    // 添加页脚
    const footerY = pageHeight - margin.bottom / 2;
    doc.setFontSize(10);
    doc.setTextColor(153, 153, 153);
    doc.text(`Generated by TaroViz on ${new Date().toLocaleDateString()}`, marginLeft, footerY);

    // 导出为 Blob
    const pdfBlob = doc.output('blob');

    return {
      data: pdfBlob,
      filename: generateFilename(title.replace(/\s+/g, '_'), 'pdf'),
      mimeType: 'application/pdf',
      size: pdfBlob.size,
    };
  }

  /**
   * 批量导出多个图表
   */
  static async exportBatch(
    charts: Array<{ name: string; chart: ECharts }>,
    options: BatchExportOptions
  ): Promise<ExportResult[]> {
    const { format, filenamePrefix = 'chart', compress } = options;

    const results: ExportResult[] = [];

    for (const { name, chart } of charts) {
      try {
        let result: ExportResult;

        if (format === 'pdf') {
          result = await this.exportPDF(chart, { title: name });
        } else {
          result = this.exportImage(chart, { type: format });
        }

        // 如果需要压缩，重命名文件
        if (compress && result.filename) {
          result.filename = result.filename.replace(/\.(\w+)$/, '.$1');
        }

        results.push(result);
      } catch (error) {
        console.error(`[TaroViz] Failed to export chart "${name}":`, error);
      }
    }

    return results;
  }

  /**
   * 下载导出结果
   */
  static download(result: ExportResult): void {
    downloadFile(result.data, result.filename, result.mimeType);
  }

  /**
   * 复制到剪贴板
   */
  static async copyToClipboard(chart: ECharts, options: ExportImageOptions = {}): Promise<boolean> {
    try {
      const result = this.exportImage(chart, { ...options, type: 'png' });
      const blob = dataURLToBlob(result.data);

      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);

      return true;
    } catch (error) {
      console.error('[TaroViz] Failed to copy to clipboard:', error);
      return false;
    }
  }

  /**
   * 获取导出尺寸 (基于 DPI 计算)
   */
  static calculateExportSize(
    chart: ECharts,
    targetDPI: number = 300
  ): { width: number; height: number } {
    const width = chart.getWidth();
    const height = chart.getHeight();
    const pixelRatio = targetDPI / 96; // 96 DPI 是屏幕默认 DPI

    return {
      width: Math.round(width * pixelRatio),
      height: Math.round(height * pixelRatio),
    };
  }
}

export const exportChart = ChartExporter;

export default ChartExporter;
