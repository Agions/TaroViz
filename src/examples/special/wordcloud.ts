import { EChartsOption } from 'echarts';

// 词云数据
const data = [
  { name: '技术', value: 1446 },
  { name: '研发', value: 928 },
  { name: '数据', value: 906 },
  { name: '产品', value: 825 },
  { name: '设计', value: 814 },
  { name: '用户体验', value: 732 },
  { name: '算法', value: 622 },
  { name: '运营', value: 516 },
  { name: '市场', value: 467 },
  { name: '前端', value: 434 },
  { name: '后端', value: 417 },
  { name: '测试', value: 382 },
  { name: '客户端', value: 324 },
  { name: '移动', value: 278 },
  { name: '服务器', value: 252 },
  { name: '云计算', value: 248 },
  { name: '人工智能', value: 235 },
  { name: '大数据', value: 234 },
  { name: '安全', value: 214 },
  { name: '架构', value: 204 },
  { name: '项目管理', value: 203 },
  { name: '开发工具', value: 157 },
  { name: '数据分析', value: 144 },
  { name: '网络', value: 136 },
  { name: '系统', value: 132 },
  { name: '客服', value: 119 },
  { name: '区块链', value: 113 },
  { name: 'UI', value: 112 },
  { name: 'UX', value: 94 },
  { name: '敏捷开发', value: 92 },
  { name: '业务', value: 86 },
  { name: '版本控制', value: 77 },
  { name: '集成', value: 73 },
  { name: '部署', value: 66 },
  { name: '支付', value: 62 },
  { name: '微服务', value: 60 },
  { name: '运维', value: 58 },
  { name: '接口', value: 57 },
  { name: '调优', value: 51 },
  { name: '合规', value: 48 }
];

const option: EChartsOption = {
  title: {
    text: '词云图示例',
    left: 'center'
  },
  tooltip: {
    show: true,
    formatter: function(params) {
      return params.name + ': ' + params.value;
    }
  },
  series: [
    {
      type: 'wordCloud',
      shape: 'circle',
      // 词云图的大小
      left: 'center',
      top: 'center',
      width: '80%',
      height: '80%',
      // 字体设置
      textStyle: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        color: function() {
          // 随机颜色
          return 'rgb(' + [
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160)
          ].join(',') + ')';
        }
      },
      emphasis: {
        focus: 'self',
        textStyle: {
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      // 词的旋转范围和步长
      rotationRange: [-90, 90],
      rotationStep: 45,
      // 词的大小范围
      sizeRange: [12, 60],
      // 词间距
      gridSize: 8,
      // 词云形状
      shape: 'circle',
      // 数据
      data: data.sort(function(a, b) {
        return b.value - a.value;
      })
    }
  ]
};

export default {
  option,
  title: '词云图',
  description: '根据词语出现频率展示文本数据，词语大小表示重要程度',
  // 注意：词云图需要额外引入 echarts-wordcloud 库
};
