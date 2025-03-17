import React from 'react';

const Installation: React.FC = () => {
  return (
    <div className="container installation-guide">
      <h1 className="page-title">安装指南</h1>

      <section className="guide-section">
        <h2>安装 TaroViz</h2>
        <p>你可以通过 npm、yarn 或 pnpm 安装 TaroViz：</p>
        <div className="code-block">
          <pre>
            {`# 使用 npm
npm install taroviz echarts --save

# 使用 yarn
yarn add taroviz echarts

# 使用 pnpm
pnpm add taroviz echarts`}
          </pre>
        </div>
      </section>

      <section className="guide-section">
        <h2>前置要求</h2>
        <p>TaroViz 基于 Taro 框架开发，需要以下依赖：</p>
        <ul>
          <li>Taro 3.6+</li>
          <li>React 18+</li>
          <li>ECharts 5.4+</li>
        </ul>
        <p>确保您的项目已经安装了这些依赖。</p>
      </section>

      <section className="guide-section">
        <h2>基本用法</h2>
        <p>下面是一个简单的示例：</p>
        <div className="code-block">
          <pre>
            {`import React from 'react';
import { View } from '@tarojs/components';
import ECharts from 'taroviz';

class MyChart extends React.Component {
  render() {
    // ECharts 配置项
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }]
    };

    return (
      <View className='chart-container'>
        <ECharts
          option={option}
          width='100%'
          height='300px'
        />
      </View>
    );
  }
}`}
          </pre>
        </div>
      </section>

      <section className="guide-section">
        <h2>多平台配置</h2>
        <p>TaroViz 支持多个平台，不同平台的配置略有不同。</p>

        <h3>H5</h3>
        <p>H5平台不需要特殊配置，可以直接使用。</p>

        <h3>微信小程序</h3>
        <p>确保在项目的 <code>app.config.ts</code> 中添加：</p>
        <div className="code-block">
          <pre>
            {`export default {
  // ...其他配置
  renderer: 'skyline',  // 建议使用skyline渲染引擎以获得更好性能
  rendererOptions: {
    skyline: {
      defaultComponents: ['ec-canvas']
    }
  }
}`}
          </pre>
        </div>

        <h3>支付宝小程序</h3>
        <p>确保在项目中安装了支付宝小程序相关依赖：</p>
        <div className="code-block">
          <pre>
            {`npm install @tarojs/plugin-platform-alipay --save`}
          </pre>
        </div>

        <h3>鸿蒙OS</h3>
        <p>确保在项目中安装了鸿蒙OS相关依赖：</p>
        <div className="code-block">
          <pre>
            {`npm install @tarojs/plugin-platform-harmony --save`}
          </pre>
        </div>
      </section>

      <section className="guide-section">
        <h2>使用示例</h2>
        <p>下面是一个完整的使用示例，展示了如何获取图表实例并进行操作：</p>
        <div className="code-block">
          <pre>
            {`import React, { createRef } from 'react';
import { View, Button } from '@tarojs/components';
import ECharts from 'taroviz';
import type { EChartsRef } from 'taroviz';

export default class ChartDemo extends React.Component {
  // 创建引用
  chartRef = createRef<EChartsRef>();

  // 更新数据
  updateData = () => {
    const chartInstance = this.chartRef.current?.getEchartsInstance();
    if (chartInstance) {
      // 直接操作图表实例
      chartInstance.setOption({
        series: [{
          data: [Math.random() * 200, Math.random() * 200, Math.random() * 200,
                 Math.random() * 200, Math.random() * 200, Math.random() * 200,
                 Math.random() * 200]
        }]
      });
    }
  };

  render() {
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }]
    };

    return (
      <View className='chart-demo'>
        <ECharts
          ref={this.chartRef}
          option={option}
          width='100%'
          height='300px'
          onChartReady={(chart) => {
            console.log('Chart is ready!');
          }}
        />
        <Button onClick={this.updateData}>更新数据</Button>
      </View>
    );
  }
}`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default Installation;
