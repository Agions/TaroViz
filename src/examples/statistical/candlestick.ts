import { EChartsOption } from 'echarts';

// 准备数据 [开盘价, 收盘价, 最低价, 最高价]
const data = [
  ['2021/1/4', 2320.26, 2320.26, 2287.3, 2362.94],
  ['2021/1/5', 2300, 2291.3, 2288.26, 2308.38],
  ['2021/1/6', 2295.35, 2346.5, 2295.35, 2346.92],
  ['2021/1/7', 2347.22, 2358.98, 2337.35, 2363.8],
  ['2021/1/8', 2360.75, 2382.48, 2347.89, 2383.76],
  ['2021/1/11', 2383.43, 2385.42, 2371.23, 2391.82],
  ['2021/1/12', 2377.41, 2419.02, 2369.57, 2421.15],
  ['2021/1/13', 2425.92, 2428.15, 2417.58, 2440.38],
  ['2021/1/14', 2411, 2433.13, 2403.3, 2437.42],
  ['2021/1/15', 2432.68, 2434.48, 2427.7, 2441.73],
  ['2021/1/18', 2430.69, 2418.53, 2394.22, 2433.89],
  ['2021/1/19', 2416.62, 2432.4, 2414.4, 2443.03],
  ['2021/1/20', 2441.91, 2421.56, 2415.43, 2444.8],
  ['2021/1/21', 2420.26, 2382.91, 2373.53, 2427.07],
  ['2021/1/22', 2383.49, 2397.18, 2370.61, 2397.94],
  ['2021/1/25', 2378.82, 2325.95, 2309.17, 2378.82],
  ['2021/1/26', 2322.94, 2314.16, 2308.76, 2330.88],
  ['2021/1/27', 2320.62, 2325.82, 2315.01, 2338.78],
  ['2021/1/28', 2313.74, 2293.34, 2289.89, 2340.71],
  ['2021/1/29', 2297.77, 2313.22, 2292.03, 2324.63],
  ['2021/2/1', 2322.32, 2365.59, 2308.92, 2366.16],
  ['2021/2/2', 2364.54, 2359.51, 2330.86, 2369.65],
  ['2021/2/3', 2332.08, 2273.4, 2259.25, 2333.54],
  ['2021/2/4', 2274.81, 2326.31, 2270.1, 2328.14],
  ['2021/2/5', 2333.61, 2347.18, 2321.6, 2351.44],
  ['2021/2/8', 2340.44, 2324.29, 2304.27, 2352.02],
  ['2021/2/9', 2326.42, 2318.61, 2314.59, 2333.67],
  ['2021/2/10', 2314.68, 2310.59, 2296.58, 2320.96]
];

// 计算MA指标
function calculateMA(dayCount: number): (number | string)[] {
  const result: (number | string)[] = [];
  for (let i = 0; i < data.length; i++) {
    if (i < dayCount - 1) {
      result.push('-');
      continue;
    }
    let sum = 0;
    for (let j = 0; j < dayCount; j++) {
      sum += Number(data[i - j][1]);
    }
    result.push(Math.round(sum / dayCount * 100) / 100);
  }
  return result;
}

const option: EChartsOption = {
  title: {
    text: 'K线图示例',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    data: ['K线', 'MA5', 'MA10', 'MA20', 'MA30'],
    top: 30
  },
  grid: {
    left: '10%',
    right: '10%',
    bottom: '15%'
  },
  xAxis: {
    type: 'value',
    boundaryGap: ['0%', '0%'],
    axisLine: { onZero: false },
    splitLine: { show: false },
    splitNumber: 20
  },
  yAxis: {
    scale: true,
    splitArea: {
      show: true
    }
  },
  dataZoom: [
    {
      type: 'inside',
      start: 50,
      end: 100
    },
    {
      show: true,
      type: 'slider',
      top: '90%',
      start: 50,
      end: 100
    }
  ],
  series: [
    {
      name: 'K线',
      type: 'candlestick',
      data: data.map(item => item.slice(1)),
      itemStyle: {
        color: '#c23531',
        color0: '#00a800',
        borderColor: '#c23531',
        borderColor0: '#00a800'
      },
      markPoint: {
        label: {
          formatter: function (param) {
            return param != null ? Math.round(param?.value as any)  + '' : '';
          }
        },
        data: [
          {
            name: '年最高',
            type: 'max',
            valueDim: 'highest'
          },
          {
            name: '年最低',
            type: 'min',
            valueDim: 'lowest'
          }
        ],
        tooltip: {
          formatter: function (param) {
            return param.name + '<br>' + (param.data.coord || '');
          }
        }
      }
    },
    {
      name: 'MA5',
      type: 'line',
      data: calculateMA(5),
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    },
    {
      name: 'MA10',
      type: 'line',
      data: calculateMA(10),
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    },
    {
      name: 'MA20',
      type: 'line',
      data: calculateMA(20),
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    },
    {
      name: 'MA30',
      type: 'line',
      data: calculateMA(30),
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    }
  ]
};

export default {
  option,
  title: 'K线图',
  description: '用于展示金融证券数据的价格变动',
};
