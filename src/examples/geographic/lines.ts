import { EChartsOption } from 'echarts';

// 模拟中国主要城市坐标
const geoCoordMap = {
  '北京': [116.4551, 40.2539],
  '上海': [121.4648, 31.2891],
  '广州': [113.5107, 23.2196],
  '深圳': [114.0579, 22.5431],
  '成都': [104.0679, 30.5723],
  '杭州': [120.2052, 30.2526],
  '武汉': [114.3013, 30.5951],
  '西安': [108.9402, 34.3416],
  '重庆': [107.7539, 30.1904],
  '南京': [118.8062, 31.9208],
  '长沙': [113.0823, 28.2568],
  '济南': [117.1200, 36.6512],
  '青岛': [120.4651, 36.3373],
  '沈阳': [123.1238, 42.1216],
  '哈尔滨': [126.6425, 45.7570]
};

// 数据
const BJData = [
  [{name: '北京'}, {name: '上海', value: 95}],
  [{name: '北京'}, {name: '广州', value: 90}],
  [{name: '北京'}, {name: '深圳', value: 80}],
  [{name: '北京'}, {name: '成都', value: 70}],
  [{name: '北京'}, {name: '杭州', value: 60}],
  [{name: '北京'}, {name: '武汉', value: 50}],
  [{name: '北京'}, {name: '西安', value: 40}],
  [{name: '北京'}, {name: '重庆', value: 30}]
];

// 转换数据格式
function convertData(data) {
  const res:any = [];
  for (let i = 0; i < data.length; i++) {
    const dataItem = data[i];
    const fromCoord = geoCoordMap[dataItem[0].name];
    const toCoord = geoCoordMap[dataItem[1].name];
    if (fromCoord && toCoord) {
      res.push({
        fromName: dataItem[0].name,
        toName: dataItem[1].name,
        coords: [fromCoord, toCoord],
        value: dataItem[1].value
      });
    }
  }
  return res;
}

const color = ['#a6c84c', '#ffa022', '#46bee9'];
const series:any[] = [];

series.push({
  name: '北京 Top8',
  type: 'lines',
  coordinateSystem: 'geo',
  zlevel: 1,
  effect: {
    show: true,
    period: 6,
    trailLength: 0.7,
    color: '#fff',
    symbolSize: 3
  },
  lineStyle: {
    color: color[0],
    width: 0,
    curveness: 0.2
  },
  data: convertData(BJData)
}, {
  name: '北京 Top8',
  type: 'lines',
  coordinateSystem: 'geo',
  zlevel: 2,
  effect: {
    show: true,
    period: 6,
    trailLength: 0,
    symbol: 'arrow',
    symbolSize: 10
  },
  lineStyle: {
    color: color[0],
    width: 1.5,
    opacity: 0.4,
    curveness: 0.2
  },
  data: convertData(BJData)
}, {
  name: '北京 Top8',
  type: 'effectScatter',
  coordinateSystem: 'geo',
  zlevel: 2,
  rippleEffect: {
    brushType: 'stroke'
  },
  label: {
    show: true,
    position: 'right',
    formatter: '{b}'
  },
  symbolSize: function (val) {
    return val[2] / 8;
  },
  itemStyle: {
    color: color[0]
  },
  data: BJData.map(function (dataItem) {
    return {
      name: dataItem[1].name,
      value: [...geoCoordMap[dataItem[1].name], dataItem[1].value]
    };
  })
});

const option: EChartsOption = {
  title: {
    text: '地理连线图示例',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: function (params) {
      if (params.seriesType === 'effectScatter') {
        return '城市：' + params.data.name + '<br>数值：' + params.data.value[2];
      } else if (params.seriesType === 'lines') {
        return params.data.fromName + ' → ' + params.data.toName + '<br>数值：' + params.data.value;
      }
      return params.name;
    }
  },
  geo: {
    map: 'china',
    label: {
      show: false
    },
    roam: true,
    itemStyle: {
      areaColor: '#323c48',
      borderColor: '#404a59'
    },
    emphasis: {
      itemStyle: {
        areaColor: '#2a333d'
      }
    }
  },
  series: series
};

export default {
  option,
  title: '地理连线图',
  description: '在地图上展示点与点之间的连线关系，用于展示流向或路径',
};
