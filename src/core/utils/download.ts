/**
 * 公共下载工具函数
 * 统一 chartDownloadUtils.ts 和 ExportUtils.ts 中的重复逻辑
 */

/**
 * 生成默认文件名
 * @param prefix 文件名前缀
 * @returns 带时间戳的文件名
 */
export function generateFilename(prefix: string = 'chart'): string {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
  return `${prefix}_${timestamp}`;
}

/**
 * 生成带格式的文件名
 * @param name 文件名
 * @param format 文件格式
 * @returns 格式化的文件名
 */
export function generateFormattedFilename(name: string, format: string): string {
  const timestamp = new Date().toISOString().slice(0, 10);
  const sanitizedName = name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_');
  return `${sanitizedName}_${timestamp}.${format}`;
}

/**
 * 下载 Blob 对象
 * @param blob Blob 数据
 * @param filename 文件名
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();

  // 延迟清理，确保下载对话框已打开
  setTimeout(() => {
    if (link.parentNode) {
      document.body.removeChild(link);
    }
    URL.revokeObjectURL(url);
  }, 100);
}

/**
 * 下载数据 URL
 * @param dataUrl 数据 URL
 * @param filename 文件名
 */
export function downloadDataUrl(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();

  // 延迟清理
  setTimeout(() => {
    if (link.parentNode) {
      document.body.removeChild(link);
    }
  }, 100);
}

/**
 * 下载文件（支持 string | Blob）
 * @param data 数据（string 或 Blob）
 * @param filename 文件名
 * @param mimeType MIME 类型（仅当 data 为 string 时使用）
 */
export function downloadFile(data: string | Blob, filename: string, _mimeType?: string): void {
  const blob =
    typeof data === 'string' ? new Blob([data], { type: _mimeType || 'text/plain' }) : data;
  downloadBlob(blob, filename);
}

/**
 * DataURL 转 Blob
 * @param dataUrl 数据 URL
 * @returns Blob 对象
 */
export function dataURLToBlob(dataUrl: string): Blob {
  const arr = dataUrl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/png';
  const bstr = atob(arr[1]);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * CSV 转 Blob
 * @param csv CSV 字符串
 * @returns Blob 对象
 */
export function csvToBlob(csv: string): Blob {
  return new Blob([csv], { type: 'text/csv;charset=utf-8;' });
}

/**
 * JSON 转 Blob
 * @param json JSON 字符串
 * @returns Blob 对象
 */
export function jsonToBlob(json: string): Blob {
  return new Blob([json], { type: 'application/json;charset=utf-8;' });
}
