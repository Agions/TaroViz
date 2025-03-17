import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import BasicBarChart from '../components/charts/BasicBarChart';
import BasicLineChart from '../components/charts/BasicLineChart';

// 各类图表示例组件
const BarChartExamples = () => (
  <div className="chart-examples">
    <h2>柱状图示例</h2>
    <div className="chart-container">
      <h3>基础柱状图</h3>
      <div className="chart">
        <BasicBarChart />
      </div>
      <div className="code-example">
        <pre>
          {`// 基础柱状图示例代码
import React from 'react';
import ECharts from 'taroviz';

export default function BasicBarChart() {
  const option = {
    title: {
      text: '月度销售数据'
    },
    tooltip: {},
    legend: {
      data: ['销售额']
    },
    xAxis: {
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {},
    series: [
      {
        name: '销售额',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  };

  return <ECharts option={option} height="300px" />;
}`}
        </pre>
      </div>
    </div>
  </div>
);

const LineChartExamples = () => (
  <div className="chart-examples">
    <h2>折线图示例</h2>
    <div className="chart-container">
      <h3>基础折线图</h3>
      <div className="chart">
        <BasicLineChart />
      </div>
      <div className="code-example">
        <pre>
          {`// 基础折线图示例代码
import React from 'react';
import ECharts from 'taroviz';

export default function BasicLineChart() {
  const option = {
    title: {
      text: '季度温度变化'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['最高温度', '最低温度']
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} °C'
      }
    },
    series: [
      {
        name: '最高温度',
        type: 'line',
        data: [3, 5, 10, 15, 22, 28, 32, 30, 25, 18, 12, 5]
      },
      {
        name: '最低温度',
        type: 'line',
        data: [-2, -1, 2, 5, 12, 18, 22, 20, 15, 8, 2, -1]
      }
    ]
  };

  return <ECharts option={option} height="300px" />;
}`}
        </pre>
      </div>
    </div>
  </div>
);

const PieChartExamples = () => (
  <div className="chart-examples">
    <h2>饼图示例</h2>
    <div className="chart-container">
      <h3>基础饼图</h3>
      <div className="chart">
        {/* 这里需要实现基础饼图组件 */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          饼图示例待实现
        </div>
      </div>
      <div className="code-example">
        <pre>
          {`// 基础饼图示例代码
import React from 'react';
import ECharts from 'taroviz';

export default function BasicPieChart() {
  const option = {
    title: {
      text: '用户访问来源',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' },
          { value: 135, name: '视频广告' },
          { value: 1548, name: '搜索引擎' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return <ECharts option={option} height="300px" />;
}`}
        </pre>
      </div>
    </div>
  </div>
);

const ChartExamples: React.FC = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[2] || 'bar';

  return (
    <div className="container">
      <h1 className="page-title">图表示例</h1>
      <p className="page-description">以下是 TaroViz 支持的各种图表类型的示例，包含了基本用法和示例代码。</p>

      <div className="chart-types">
        <Link to="/examples/bar" className={path === 'bar' ? 'active' : ''}>柱状图</Link>
        <Link to="/examples/line" className={path === 'line' ? 'active' : ''}>折线图</Link>
        <Link to="/examples/pie" className={path === 'pie' ? 'active' : ''}>饼图</Link>
      </div>

      <Routes>
        <Route path="/" element={<BarChartExamples />} />
        <Route path="/bar" element={<BarChartExamples />} />
        <Route path="/line" element={<LineChartExamples />} />
        <Route path="/pie" element={<PieChartExamples />} />
      </Routes>

      <div className="platform-note">
        <h3>多平台支持</h3>
        <p>TaroViz 支持在 H5、微信小程序、支付宝小程序和鸿蒙OS平台上运行。以上所有示例代码均可在所有支持的平台上运行，无需修改。</p>
      </div>
    </div>
  );
};

export default ChartExamples;
