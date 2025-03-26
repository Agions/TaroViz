import { exportChart, exportCSV } from '../index';
import { ExportOptions } from '../index';
import type { EChartsOption } from 'echarts';

// 模拟浏览器环境中的文件下载
global.URL.createObjectURL = jest.fn();
global.URL.revokeObjectURL = jest.fn();

describe('Export System', () => {
  // 模拟ECharts实例
  const mockEChartsInstance = {
    getOption: jest.fn(() => ({
      series: [
        {
          type: 'line',
          name: '销售额',
          data: [100, 200, 300, 400]
        },
        {
          type: 'bar',
          name: '利润',
          data: [50, 100, 150, 200]
        }
      ],
      xAxis: {
        type: 'category',
        data: ['Q1', 'Q2', 'Q3', 'Q4']
      }
    })),
    getWidth: jest.fn(() => 500),
    getHeight: jest.fn(() => 300),
    getRenderedCanvas: jest.fn(() => ({
      toDataURL: jest.fn(() => 'data:image/png;base64,mockbase64data')
    }))
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // 模拟document.createElement
    const originalCreateElement = document.createElement;
    jest.spyOn(document, 'createElement').mockImplementation((tagName) => {
      if (tagName === 'a') {
        return {
          style: {},
          setAttribute: jest.fn(),
          click: jest.fn(),
          download: '',
          href: ''
        } as unknown as HTMLElement;
      }
      return originalCreateElement(tagName);
    });
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });
  
  test('exportChart 应该导出图表为图片', async () => {
    const options: ExportOptions = {
      type: 'png',
      filename: 'test-chart',
      pixelRatio: 2
    };
    
    const spy = jest.spyOn(document, 'createElement');
    
    await exportChart(mockEChartsInstance as any, options);
    
    // 验证canvas方法被调用
    expect(mockEChartsInstance.getRenderedCanvas).toHaveBeenCalledWith({
      pixelRatio: 2,
      backgroundColor: undefined
    });
    
    // 验证创建了下载链接
    expect(spy).toHaveBeenCalledWith('a');
    
    // 验证链接属性设置正确
    const linkElement = spy.mock.results[0].value;
    expect(linkElement.setAttribute).toHaveBeenCalledWith('href', 'data:image/png;base64,mockbase64data');
    expect(linkElement.download).toBe('test-chart.png');
    expect(linkElement.click).toHaveBeenCalled();
  });
  
  test('exportChart 应该使用默认选项', async () => {
    await exportChart(mockEChartsInstance as any);
    
    // 验证使用了默认的像素比率
    expect(mockEChartsInstance.getRenderedCanvas).toHaveBeenCalledWith({
      pixelRatio: 1,
      backgroundColor: undefined
    });
    
    // 验证默认文件名是否正确（包含日期格式）
    const linkElement = document.createElement('a');
    expect(linkElement.download).toMatch(/chart-\d{4}-\d{2}-\d{2}.png/);
  });
  
  test('exportChart 应该支持自定义背景颜色', async () => {
    const options: ExportOptions = {
      type: 'png',
      backgroundColor: '#ffffff'
    };
    
    await exportChart(mockEChartsInstance as any, options);
    
    expect(mockEChartsInstance.getRenderedCanvas).toHaveBeenCalledWith({
      pixelRatio: 1,
      backgroundColor: '#ffffff'
    });
  });
  
  test('exportCSV 应该从图表数据导出CSV文件', async () => {
    const spy = jest.spyOn(document, 'createElement');
    
    await exportCSV(mockEChartsInstance as any, { filename: 'test-data' });
    
    // 验证创建了下载链接
    expect(spy).toHaveBeenCalledWith('a');
    
    // 验证链接属性设置正确
    const linkElement = spy.mock.results[0].value;
    expect(linkElement.setAttribute).toHaveBeenCalledWith('href', expect.stringContaining('data:text/csv'));
    expect(linkElement.download).toBe('test-data.csv');
    expect(linkElement.click).toHaveBeenCalled();
    
    // 验证CSV内容（模拟的Blob）
    const hrefArg = linkElement.setAttribute.mock.calls[0][1];
    expect(hrefArg).toContain('data:text/csv');
  });
  
  test('exportCSV 应该正确处理多系列数据', async () => {
    // 使用一个全局变量来捕获CSV内容，因为无法直接从Blob中获取内容
    let capturedCSVContent = '';
    
    // 模拟URL.createObjectURL以捕获Blob内容
    (global.URL.createObjectURL as jest.Mock).mockImplementation((blob: Blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        capturedCSVContent = reader.result as string;
      };
      reader.readAsText(blob);
      return 'mock-blob-url';
    });
    
    await exportCSV(mockEChartsInstance as any);
    
    // 使用setTimeout等待异步读取完成
    await new Promise(resolve => setTimeout(resolve, 0));
    
    // 验证CSV内容包含正确的标题行和数据行
    expect(capturedCSVContent).toContain('类别,销售额,利润');
    expect(capturedCSVContent).toContain('Q1,100,50');
    expect(capturedCSVContent).toContain('Q2,200,100');
    expect(capturedCSVContent).toContain('Q3,300,150');
    expect(capturedCSVContent).toContain('Q4,400,200');
  });
  
  test('exportCSV 应该处理空数据集', async () => {
    mockEChartsInstance.getOption.mockReturnValueOnce({
      series: [],
      xAxis: { type: 'category', data: [] }
    });
    
    await exportCSV(mockEChartsInstance as any);
    
    // 验证仍然创建了下载链接，但内容应该是空CSV
    const linkElement = document.createElement('a');
    expect(linkElement.setAttribute).toHaveBeenCalledWith('href', expect.stringContaining('data:text/csv'));
    expect(linkElement.download).toMatch(/data-\d{4}-\d{2}-\d{2}.csv/);
  });
  
  test('exportCSV 应该处理没有类别数据的情况', async () => {
    // 使用any类型忽略类型检查 
    mockEChartsInstance.getOption.mockReturnValueOnce({
      series: [
        {
          type: 'pie',
          name: '分布',
          data: [
            { name: '类别1', value: 100 },
            { name: '类别2', value: 200 },
            { name: '类别3', value: 300 }
          ]
        }
      ]
    } as any);
    
    let capturedCSVContent = '';
    (global.URL.createObjectURL as jest.Mock).mockImplementation((blob: Blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        capturedCSVContent = reader.result as string;
      };
      reader.readAsText(blob);
      return 'mock-blob-url';
    });
    
    await exportCSV(mockEChartsInstance as any);
    
    // 使用setTimeout等待异步读取完成
    await new Promise(resolve => setTimeout(resolve, 0));
    
    // 验证CSV内容包含饼图的数据
    expect(capturedCSVContent).toContain('类别,数值');
    expect(capturedCSVContent).toContain('类别1,100');
    expect(capturedCSVContent).toContain('类别2,200');
    expect(capturedCSVContent).toContain('类别3,300');
  });
}); 