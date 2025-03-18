import { EChartsOption } from 'echarts';

const option: EChartsOption = {
  title: {
    text: '水球图示例',
    left: 'center'
  },
  series: [
    {
      type: 'liquidFill',
      radius: '70%',
      center: ['50%', '50%'],
      data: [0.6, 0.5, 0.4, 0.3],
      color: ['#1e90ff', '#22c3aa', '#7fbe9e', '#c4ddc8'],
      outline: {
        show: true,
        borderDistance: 5,
        itemStyle: {
          color: 'none',
          borderColor: '#294D99',
          borderWidth: 2,
          shadowBlur: 20,
          shadowColor: 'rgba(0, 0, 0, 0.25)'
        }
      },
      label: {
        show: true,
        color: '#294D99',
        insideColor: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        formatter: function(param) {
          return Math.floor(param.value * 100) + '%';
        }
      },
      backgroundStyle: {
        color: 'rgba(255, 255, 255, 0.4)'
      },
      itemStyle: {
        opacity: 0.95,
        shadowBlur: 50,
        shadowColor: 'rgba(0, 0, 0, 0.4)'
      },
      emphasis: {
        itemStyle: {
          opacity: 0.8
        }
      }
    }
  ] as any,
};

export default {
  option,
  title: '水球图',
  description: '用于展示百分比数据，具有流动效果的特殊图表',
  // 注意：水球图需要额外引入 echarts-liquidfill 库
};
