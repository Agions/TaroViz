# TaroViz 图表类型示例

本文档提供TaroViz支持的各种图表类型示例。

## 基础图表

### 折线图

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { Chart } from 'taroviz';

export default function LineChart() {
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }]
  };

  return <Chart option={option} />;
}
```

### 柱状图

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { Chart } from 'taroviz';

export default function BarChart() {
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

  return <Chart option={option} />;
}
```

### 饼图

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { Chart } from 'taroviz';

export default function PieChart() {
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '搜索引擎' },
          { value: 735, name: '直接访问' },
          { value: 580, name: '邮件营销' },
          { value: 484, name: '联盟广告' },
          { value: 300, name: '视频广告' }
        ]
      }
    ]
  };

  return <Chart option={option} />;
}
```

## 统计图表

### 散点图

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { Chart } from 'taroviz';

export default function ScatterChart() {
  const option = {
    xAxis: {},
    yAxis: {},
    series: [{
      symbolSize: 20,
      data: [
        [10, 8.04],
        [8, 6.95],
        [13, 7.58],
        [9, 8.81],
        [11, 8.33],
        [14, 9.96],
        [6, 7.24],
        [4, 4.26],
        [12, 10.84],
        [7, 4.82],
        [5, 5.68]
      ],
      type: 'scatter'
    }]
  };

  return <Chart option={option} />;
}
```

### 雷达图

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { Chart } from 'taroviz';

export default function RadarChart() {
  const option = {
    radar: {
      indicator: [
        { name: '销售', max: 10000 },
        { name: '管理', max: 10000 },
        { name: '技术', max: 10000 },
        { name: '客服', max: 10000 },
        { name: '研发', max: 10000 },
        { name: '市场', max: 10000 }
      ]
    },
    series: [{
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 8500, 5500, 7500, 3200],
          name: '预算分配'
        },
        {
          value: [5000, 4000, 4500, 7500, 6000, 5000],
          name: '实际开销'
        }
      ]
    }]
  };

  return <Chart option={option} />;
}
```

## 关系图表

### 关系图

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { Chart } from 'taroviz';

export default function GraphChart() {
  const option = {
    series: [{
      type: 'graph',
      layout: 'force',
      data: [
        { name: '节点1', symbolSize: 20 },
        { name: '节点2', symbolSize: 15 },
        { name: '节点3', symbolSize: 30 },
        { name: '节点4', symbolSize: 10 },
        { name: '节点5', symbolSize: 25 }
      ],
      links: [
        { source: 0, target: 1 },
        { source: 0, target: 2 },
        { source: 0, target: 3 },
        { source: 1, target: 2 },
        { source: 2, target: 3 },
        { source: 2, target: 4 },
        { source: 3, target: 4 }
      ],
      force: {
        repulsion: 100
      }
    }]
  };

  return <Chart option={option} />;
}
```

## 地理图表

### 地图

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { Chart } from 'taroviz';
import chinaJson from 'taroviz/maps/china.json';

export default function MapChart() {
  // 注册地图数据
  React.useEffect(() => {
    Chart.registerMap('china', chinaJson);
  }, []);

  const option = {
    series: [{
      type: 'map',
      map: 'china',
      label: {
        show: true
      },
      data: [
        { name: '北京', value: 100 },
        { name: '上海', value: 200 },
        { name: '广东', value: 300 }
      ]
    }]
  };

  return <Chart option={option} />;
}
```

## 特殊图表

### 仪表盘

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { Chart } from 'taroviz';

export default function GaugeChart() {
  const option = {
    series: [{
      type: 'gauge',
      progress: {
        show: true
      },
      detail: {
        formatter: '{value}%'
      },
      data: [{
        value: 50,
        name: '完成率'
      }]
    }]
  };

  return <Chart option={option} />;
}
```

### 水球图

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { Chart } from 'taroviz';
import 'echarts-liquidfill';

export default function LiquidFillChart() {
  const option = {
    series: [{
      type: 'liquidFill',
      data: [0.6, 0.5, 0.4, 0.3],
      color: ['#5470c6', '#91cc75', '#fac858', '#ee6666'],
      label: {
        formatter: '{a}\n{b}\n{c}',
        fontSize: 28
      }
    }]
  };

  return <Chart option={option} />;
}
```

## 复合图表

### 折线柱状图

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { Chart } from 'taroviz';

export default function LineBarChart() {
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['蒸发量', '降水量', '平均温度']
    },
    xAxis: [
      {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '水量',
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          formatter: '{value} ml'
        }
      },
      {
        type: 'value',
        name: '温度',
        min: 0,
        max: 25,
        interval: 5,
        axisLabel: {
          formatter: '{value} °C'
        }
      }
    ],
    series: [
      {
        name: '蒸发量',
        type: 'bar',
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
      },
      {
        name: '降水量',
        type: 'bar',
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
      },
      {
        name: '平均温度',
        type: 'line',
        yAxisIndex: 1,
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      }
    ]
  };

  return <Chart option={option} />;
}
```

## 高级功能

### 图表交互

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { Chart } from 'taroviz';

export default function InteractiveChart() {
  const [data, setData] = React.useState([5, 20, 36, 10, 10, 20]);
  
  const option = {
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [{
      name: '销量',
      type: 'bar',
      data: data
    }]
  };
  
  const handleEvents = {
    click: (params) => {
      // 更新数据
      const newData = [...data];
      newData[params.dataIndex] += 10;
      setData(newData);
    }
  };

  return <Chart option={option} onEvents={handleEvents} />;
}
```

### 图表主题切换

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { Chart } from 'taroviz';
import { Button } from '@tarojs/components';

export default function ThemeChangeChart() {
  const [theme, setTheme] = React.useState('default');
  
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
  
  const changeTheme = () => {
    const themes = ['default', 'dark', 'vintage', 'macarons', 'westeros'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <View>
      <Button onClick={changeTheme}>切换主题</Button>
      <Chart option={option} theme={theme} />
    </View>
  );
}
``` 