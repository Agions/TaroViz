import React from 'react';
import { Link } from 'react-router-dom';
import BasicBarChart from '../components/charts/BasicBarChart';
import BasicLineChart from '../components/charts/BasicLineChart';

const HomePage: React.FC = () => {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>TaroViz</h1>
          <p>多端兼容的 Apache ECharts 图表组件，专为 Taro 框架打造。支持在 H5、微信小程序、支付宝小程序和鸿蒙OS 等多个平台下无缝使用 ECharts 强大的可视化能力。</p>
          <div className="buttons">
            <Link to="/installation" className="button primary">快速开始</Link>
            <a href="https://github.com/agions/taroviz" target="_blank" rel="noopener noreferrer" className="button secondary">GitHub</a>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>产品特性</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>多平台支持</h3>
              <p>同一套代码，支持 H5、微信小程序、支付宝小程序和鸿蒙OS，真正实现"一次编写，到处运行"。</p>
            </div>
            <div className="feature-card">
              <h3>完整 ECharts 能力</h3>
              <p>支持 ECharts 提供的所有图表类型和交互特性，包括折线图、柱状图、饼图、散点图、地图等。</p>
            </div>
            <div className="feature-card">
              <h3>高性能渲染</h3>
              <p>针对不同平台优化的渲染性能，确保在各种设备上都能流畅展示复杂的数据可视化效果。</p>
            </div>
            <div className="feature-card">
              <h3>灵活的配置项</h3>
              <p>与原生 ECharts 配置保持一致，易于上手，同时提供平台特定的优化选项。</p>
            </div>
            <div className="feature-card">
              <h3>丰富的事件处理</h3>
              <p>支持点击、缩放、选中等交互事件处理，让您的图表更具交互性。</p>
            </div>
            <div className="feature-card">
              <h3>主题定制</h3>
              <p>支持自定义主题，满足不同设计需求，轻松实现品牌一致性。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="chart-demo">
        <div className="container">
          <h2>图表示例</h2>
          <div className="chart-container">
            <h3>基础柱状图</h3>
            <div className="chart">
              <BasicBarChart />
            </div>
          </div>
          <div className="chart-container">
            <h3>基础折线图</h3>
            <div className="chart">
              <BasicLineChart />
            </div>
          </div>
          <div className="text-center">
            <Link to="/examples" className="button primary">查看更多示例</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
