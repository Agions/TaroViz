/**
 * Chart Download Utilities
 * 图表下载工具函数
 */

/**
 * 生成默认文件名
 */
export function generateFilename(prefix: string = 'chart'): string {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
  return `${prefix}_${timestamp}`;
}

/**
 * 下载 Blob 对象
 */
export function downloadBlob(blob: Blob, filename: string): void {
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
export function downloadDataUrl(dataUrl: string, filename: string): void {
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
export function csvToBlob(csv: string, _filename: string): Blob {
  return new Blob([csv], { type: 'text/csv;charset=utf-8;' });
}

/**
 * JSON 转 Blob
 */
export function jsonToBlob(json: string, _filename: string): Blob {
  return new Blob([json], { type: 'application/json;charset=utf-8;' });
}

/**
 * 将数据转换为 CSV 格式
 */
export function convertToCSV(data: unknown, options?: { includeLabels?: boolean }): string {
  if (!data) return '';

  // 处理 ECharts 格式的数据
  if (typeof data === 'object' && (data as { series?: unknown }).series) {
    return convertSeriesToCSV(
      data as {
        series?: unknown[];
        xAxis?: { data?: unknown[] };
        dataset?: { dimensions?: string[]; source?: unknown[][] };
      },
      options
    );
  }

  // 处理数组数据
  if (Array.isArray(data)) {
    return convertArrayToCSV(data);
  }

  // 处理普通对象
  if (typeof data === 'object') {
    return convertObjectToCSV(data as Record<string, unknown>);
  }

  return String(data);
}

/**
 * 将 ECharts series 数据转换为 CSV
 */
function convertSeriesToCSV(
  chartData: {
    series?: unknown[];
    xAxis?: { data?: unknown[] };
    dataset?: { dimensions?: string[]; source?: unknown[][] };
  },
  options?: { includeLabels?: boolean }
): string {
  const { series = [], xAxis, dataset } = chartData;
  const includeLabels = options?.includeLabels ?? true;

  if (!Array.isArray(series) || series.length === 0) return '';

  // 获取类别轴数据
  let categories: unknown[] = [];
  if (xAxis?.data && Array.isArray(xAxis.data)) {
    categories = xAxis.data;
  } else if (dataset?.dimensions && dataset?.source) {
    categories = dataset.source.map((row: unknown[]) => row[0]);
  } else if ((series[0] as { data?: unknown[] })?.data) {
    const firstSeries = series[0] as { data: unknown[] };
    categories = firstSeries.data.map((item: unknown, index: number) =>
      typeof item === 'object' && item !== null ? (item as unknown[])[0] || index : index
    );
  }

  // 构建 CSV 头
  const headers = includeLabels
    ? [
        'Category',
        ...series.map(
          (s: unknown) =>
            (s as { name?: string; seriesIndex?: number }).name ||
            (s as { seriesIndex?: number }).seriesIndex
        ),
      ]
    : [];

  // 构建 CSV 行
  const rows: unknown[][] = [];

  series.forEach((s: unknown, seriesIndex: number) => {
    const seriesObj = s as { data?: unknown[]; name?: string; seriesIndex?: number };
    const seriesData = seriesObj.data || [];
    seriesData.forEach((item: unknown, dataIndex: number) => {
      const value = typeof item === 'object' && item !== null ? (item as unknown[])[1] : item;
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
function convertArrayToCSV(data: unknown[]): string {
  if (data.length === 0) return '';

  // 检查是否为对象数组
  if (typeof data[0] === 'object' && data[0] !== null) {
    const keys = Object.keys(data[0]);
    const headers = keys.join(',');
    const rows = data.map((item) =>
      keys.map((key) => JSON.stringify((item as Record<string, unknown>)[key] ?? '')).join(',')
    );
    return [headers, ...rows].join('\n');
  }

  // 简单数组
  return data.join('\n');
}

/**
 * 将对象数据转换为 CSV
 */
function convertObjectToCSV(data: Record<string, unknown>): string {
  const entries = Object.entries(data);
  return entries.map(([key, value]) => `${key},${JSON.stringify(value)}`).join('\n');
}

/**
 * 将 ECharts 数据转换为 JSON
 */
export function convertToJSON(data: unknown): string {
  if (!data) return '{}';

  const dataObj = data as {
    series?: unknown[];
    title?: { text?: string };
    legend?: { data?: unknown };
    xAxis?: { data?: unknown[] };
  };

  // 如果是 ECharts 格式，简化数据
  if (dataObj.series) {
    const simplified = {
      title: dataObj.title?.text,
      legend: dataObj.legend?.data,
      xAxis: dataObj.xAxis?.data,
      series: dataObj.series.map((s: unknown) => {
        const seriesObj = s as { name?: string; type?: string; data?: unknown[] };
        return {
          name: seriesObj.name,
          type: seriesObj.type,
          data: seriesObj.data?.map((item: unknown) =>
            typeof item === 'object' && item !== null ? (item as unknown[])[1] : item
          ),
        };
      }),
    };
    return JSON.stringify(simplified, null, 2);
  }

  return JSON.stringify(data, null, 2);
}

/**
 * 从图片创建 PDF DataURL
 */
export async function createPdfFromImage(
  imageDataUrl: string,
  title?: string
): Promise<string | null> {
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
        let drawWidth: number, drawHeight: number;

        if (imgRatio > canvasRatio) {
          drawWidth = pdfWidth * 0.8;
          drawHeight = drawWidth / imgRatio;
        } else {
          drawHeight = pdfHeight * 0.6;
          drawWidth = drawHeight * imgRatio;
        }

        const offsetX = (pdfWidth - drawWidth) / 2;
        const offsetY = (pdfHeight - drawHeight) / 2;

        // 绘制图片
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        // 添加标题
        ctx.fillStyle = '#333333';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(title || 'Chart Export', pdfWidth / 2, offsetY - 20);

        // 输出为 PNG（实际应用中应该使用 jsPDF 生成真正的 PDF）
        resolve(canvas.toDataURL('image/png'));
      };

      img.onerror = () => {
        resolve(null);
      };

      img.src = imageDataUrl;
    } catch (e) {
      console.warn('[chartDownloadUtils] Failed to create PDF:', e);
      resolve(null);
    }
  });
}
