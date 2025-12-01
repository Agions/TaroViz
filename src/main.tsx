import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import type { ChartOptions, EChartsType } from './core/types';

import { BaseChart, LineChart, BarChart, PieChart } from './index';

// Type assertion helper
const asChartOptions = <T extends Record<string, any>>(options: T): ChartOptions => {
  return options as ChartOptions;
};

// Example data for various chart types
const lineOption = {
  title: {
    text: 'Line Chart Example',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Series 1', 'Series 2'],
    bottom: 10,
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Series 1',
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'line',
      smooth: true,
    },
    {
      name: 'Series 2',
      data: [90, 150, 120, 100, 80, 130, 150],
      type: 'line',
      smooth: true,
    },
  ],
};

const barOption = {
  title: {
    text: 'Bar Chart Example',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Series A', 'Series B'],
    bottom: 10,
  },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Series A',
      data: [200, 300, 400, 350, 500, 450],
      type: 'bar',
      itemStyle: {
        color: '#5470c6',
      },
    },
    {
      name: 'Series B',
      data: [150, 250, 350, 300, 450, 400],
      type: 'bar',
      itemStyle: {
        color: '#91cc75',
      },
    },
  ],
};

const pieOption = {
  title: {
    text: 'Pie Chart Example',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      name: 'Pie Data',
      type: 'pie',
      radius: '60%',
      center: ['50%', '50%'],
      data: [
        { value: 350, name: 'Category A' },
        { value: 250, name: 'Category B' },
        { value: 200, name: 'Category C' },
        { value: 150, name: 'Category D' },
        { value: 50, name: 'Category E' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
};

const TestApp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentChart, setCurrentChart] = useState('line');

  // Toggle loading state
  const toggleLoading = () => {
    setLoading(!loading);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Update chart data randomly
  const updateData = () => {
    // This would normally update the chart options state
    console.log('Updating chart data...');
  };

  return (
    <div>
      {/* Controls Section */}
      <div className="controls">
        <h3>Chart Controls</h3>
        <div>
          <button onClick={() => setCurrentChart('line')}>Line Chart</button>
          <button onClick={() => setCurrentChart('bar')}>Bar Chart</button>
          <button onClick={() => setCurrentChart('pie')}>Pie Chart</button>
          <button onClick={updateData}>Update Data</button>
          <button onClick={toggleLoading}>{loading ? 'Hide Loading' : 'Show Loading'}</button>
          <button onClick={toggleDarkMode}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
        </div>
      </div>

      {/* Theme Switcher */}
      <div className="theme-switcher">
        <label htmlFor="theme">Current Theme:</label>
        <select
          id="theme"
          value={darkMode ? 'dark' : 'light'}
          onChange={e => setDarkMode(e.target.value === 'dark')}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      {/* Chart Sections */}
      <h2>BaseChart Component</h2>
      <div className="chart-container">
        <div className="chart-title">BaseChart with {currentChart} data</div>
        <BaseChart
          option={asChartOptions(
            currentChart === 'line' ? lineOption : currentChart === 'bar' ? barOption : pieOption
          )}
          width="100%"
          height="400px"
          theme={darkMode ? 'dark' : 'default'}
          loading={loading}
          onReady={(chart: EChartsType) => {
            console.log('BaseChart is ready:', chart);
          }}
        />
      </div>

      <h2>Specialized Chart Components</h2>

      {/* LineChart Example */}
      <div className="chart-container">
        <div className="chart-title">LineChart Component</div>
        <LineChart
          option={asChartOptions(lineOption)}
          width="100%"
          height="300px"
          theme={darkMode ? 'dark' : 'default'}
        />
      </div>

      {/* BarChart Example */}
      <div className="chart-container">
        <div className="chart-title">BarChart Component</div>
        <BarChart
          option={asChartOptions(barOption)}
          width="100%"
          height="300px"
          theme={darkMode ? 'dark' : 'default'}
        />
      </div>

      {/* PieChart Example */}
      <div className="chart-container">
        <div className="chart-title">PieChart Component</div>
        <PieChart
          option={asChartOptions(pieOption)}
          width="100%"
          height="300px"
          theme={darkMode ? 'dark' : 'default'}
        />
      </div>

      <h2>Responsive Charts</h2>
      <div className="chart-container">
        <div className="chart-title">Responsive BaseChart (50% width)</div>
        <BaseChart
          option={asChartOptions(lineOption)}
          width="50%"
          height="300px"
          theme={darkMode ? 'dark' : 'default'}
        />
      </div>
    </div>
  );
};

// Render the test application
const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>
);
