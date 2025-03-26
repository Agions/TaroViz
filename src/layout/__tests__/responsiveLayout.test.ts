import '@testing-library/jest-dom';
import { 
  autoResponsiveLayout, 
  configResponsive, 
  BreakPoint, 
  ResponsiveRule
} from '../responsiveLayout';
import { EChartsOption } from 'echarts';

describe('Responsive Layout System', () => {
  // 模拟窗口宽度
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;
  
  afterAll(() => {
    // 恢复窗口大小
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth
    });
    
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: originalInnerHeight
    });
  });
  
  beforeEach(() => {
    // 重置为默认配置
    configResponsive([]);
  });
  
  test('autoResponsiveLayout 应该根据窗口大小调整图表配置', () => {
    // 设置窗口为小屏幕
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500
    });
    
    const initialOption = {
      title: {
        text: '测试图表',
        textStyle: {
          fontSize: 16
        }
      },
      legend: {
        show: true,
        type: 'scroll'
      },
      grid: {
        left: '10%',
        right: '10%'
      }
    };
    
    const optimized = autoResponsiveLayout(initialOption);
    
    // 在小屏幕上，应该调整字体大小更小，简化图例
    expect((optimized as any).title.textStyle.fontSize).toBeLessThan(16);
    expect((optimized as any).legend.type).toBe('plain');
  });
  
  test('autoResponsiveLayout 应该在大屏幕上保持配置或增强显示效果', () => {
    // 设置窗口为大屏幕
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1500
    });
    
    const initialOption = {
      title: {
        text: '测试图表',
        textStyle: {
          fontSize: 16
        }
      },
      legend: {
        show: true
      },
      grid: {
        left: '10%',
        right: '10%'
      }
    };
    
    const optimized = autoResponsiveLayout(initialOption);
    
    // 在大屏幕上，应保持或增加字体大小
    expect((optimized as any).title.textStyle.fontSize).toBeGreaterThanOrEqual(16);
  });
  
  test('configResponsive 应该允许自定义断点配置', () => {
    const customBreakpoints: BreakPoint[] = [
      {
        minWidth: 0,
        maxWidth: 599
      },
      {
        minWidth: 600,
        maxWidth: 999
      },
      {
        minWidth: 1000
      }
    ];
    
    // 模拟规则
    const rules: ResponsiveRule[] = customBreakpoints.map(bp => ({
      query: bp,
      option: {}
    }));
    
    configResponsive(rules);
    
    // 设置窗口宽度在自定义断点范围内
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800
    });
    
    const initialOption = {
      title: {
        text: '测试图表'
      }
    };
    
    // 应该能够正确应用自定义断点
    const optimized = autoResponsiveLayout(initialOption);
    expect(optimized).toBeDefined();
  });
  
  test('autoResponsiveLayout 应该支持自定义响应式规则', () => {
    // 自定义响应式规则
    const customRules: ResponsiveRule[] = [
      {
        // 在小屏幕上移除图例
        query: {
          maxWidth: 499
        },
        option: {
          legend: {
            show: false
          }
        }
      },
      {
        // 在中等屏幕上调整网格布局
        query: {
          minWidth: 500,
          maxWidth: 899
        },
        option: {
          grid: {
            left: '5%',
            right: '5%'
          }
        }
      }
    ];
    
    configResponsive(customRules);
    
    // 小屏幕测试
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 400
    });
    
    let initialOption:any = {
      legend: {
        show: true
      }
    };
    
    let optimized:any = autoResponsiveLayout(initialOption);
    expect((optimized as any).legend.show).toBe(false);
    
    // 中等屏幕测试
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 700
    });
    
    initialOption = {
      grid: {
        left: '10%',
        right: '10%'
      }
    };
    
    optimized = autoResponsiveLayout(initialOption);
    expect((optimized as any).grid.left).toBe('5%');
    expect((optimized as any).grid.right).toBe('5%');
  });
  
  test('autoResponsiveLayout 应该根据屏幕高度调整图表布局', () => {
    // 设置窗口为低高度
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 500
    });
    
    const initialOption = {
      title: {
        show: true
      },
      toolbox: {
        show: true
      },
      dataZoom: [
        {
          type: 'slider',
          show: true
        }
      ]
    };
    
    const optimized = autoResponsiveLayout(initialOption);
    
    // 在低高度屏幕上，应该简化UI元素
    expect((optimized as any).toolbox.show).toBe(false);
  });
  
  test('autoResponsiveLayout 不应修改原始配置对象', () => {
    const initialOption = {
      title: {
        text: '测试图表',
        textStyle: {
          fontSize: 16
        }
      }
    };
    
    // 保存原始对象的深拷贝用于比较
    const originalCopy = JSON.parse(JSON.stringify(initialOption));
    
    autoResponsiveLayout(initialOption);
    
    // 确保原始对象未被修改
    expect(initialOption).toEqual(originalCopy);
  });
  
  test('autoResponsiveLayout 应该处理不同类型图表的特殊需求', () => {
    // 饼图在小屏幕上应该有特殊处理
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 320
    });
    
    const pieOption: EChartsOption = {
      series: [
        {
          type: 'pie',
          radius: ['30%', '70%'],
          label: {
            show: true
          }
        }
      ]
    };
    
    const optimizedPie = autoResponsiveLayout(pieOption);
    
    // 在小屏幕上，饼图应该调整大小并简化标签
    expect((optimizedPie as any).series[0].radius[1]).toBeLessThan('70%' as any);
    expect((optimizedPie as any).series[0].label.show).toBe(false);
    
    // 散点图在小屏幕上同样需要调整
    const scatterOption: EChartsOption = {
      series: [
        {
          type: 'scatter',
          symbolSize: 10
        }
      ]
    };
    
    const optimizedScatter = autoResponsiveLayout(scatterOption);
    
    // 在小屏幕上，散点图标记应该变小
    expect((optimizedScatter as any).series[0].symbolSize).toBeLessThan(10);
  });
  
  test('autoResponsiveLayout 应该智能处理文本溢出', () => {
    // 模拟窄屏幕
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 300
    });
    
    const option = {
      xAxis: {
        type: 'category' as const,
        data: ['非常长的标签文本用于测试溢出处理', '另一个长标签', '第三个长标签']
      }
    };
    
    const optimized = autoResponsiveLayout(option);
    
    // 应该对x轴标签进行旋转或截断处理
    expect((optimized as any).xAxis.axisLabel).toBeDefined();
    expect((optimized as any).xAxis.axisLabel.rotate || (optimized as any).xAxis.axisLabel.formatter).toBeDefined();
  });
  
  test('autoResponsiveLayout 应该为移动设备优化触摸交互', () => {
    // 模拟移动设备
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375
    });
    
    const option = {
      tooltip: {
        trigger: 'axis' as const
      },
      series: [
        {
          type: 'line' as const,
          data: [1, 2, 3, 4, 5]
        }
      ]
    };
    
    const optimized = autoResponsiveLayout(option);
    
    // 应该为移动设备优化提示框
    expect((optimized as any).tooltip.trigger).toBe('item');
    expect((optimized as any).series[0].emphasis).toBeDefined();
    expect((optimized as any).series[0].emphasis.scale).toBe(true);
  });
}); 