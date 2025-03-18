import { EChartsOption } from 'echarts';

const option: EChartsOption = {
  title: {
    text: '网站流量来源分布',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['直接访问', '搜索引擎', '邮件营销', '社交媒体', '视频广告']
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '50%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '社交媒体' },
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

export default {
  option,
  title: '饼图',
  description: '用于展示不同分类的占比情况',
};
