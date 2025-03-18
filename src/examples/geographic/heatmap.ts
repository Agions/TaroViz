import { EChartsOption } from 'echarts';

// 生成模拟数据
function generateData(len: number, min: number, max: number) {
  const hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a',
    '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'];
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

  const data: [number, number, number][] = [];

  for (let i = 0; i < len; i++) {
    const dayIndex = Math.floor(Math.random() * days.length);
    const hourIndex = Math.floor(Math.random() * hours.length);
    const value = Math.floor(Math.random() * (max - min)) + min;

    data.push([dayIndex, hourIndex, value]);
  }

  return {
    hours,
    days,
    data
  };
}

const { hours, days, data } = generateData(200, 0, 10);

const option: EChartsOption = {
  title: {
    text: '热力图示例',
    left: 'center'
  },
  tooltip: {
    position: 'top',
    formatter: function (params) {
      return '时间: ' + days[params.value[0]] + ' ' + hours[params.value[1]] + '<br>数值: ' + params.value[2];
    }
  },
  grid: {
    top: '10%',
    left: '3%',
    right: '10%',
    bottom: '12%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: hours,
    splitArea: {
      show: true
    }
  },
  yAxis: {
    type: 'category',
    data: days,
    splitArea: {
      show: true
    }
  },
  visualMap: {
    min: 0,
    max: 10,
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    bottom: '0%',
    inRange: {
      color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
    }
  },
  series: [
    {
      name: '热力值',
      type: 'heatmap',
      data: data,
      label: {
        show: false
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

export default {
  option,
  title: '热力图',
  description: '通过颜色变化展示数据密度分布，适用于地理或时间数据分析',
};
