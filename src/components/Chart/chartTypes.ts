import type { EChartsOption } from 'echarts'

export interface ChartType {
  name: string
  category: 'basic' | 'statistical' | 'relationship' | 'hierarchical' | 'geographic' | 'special'
  description: string
  defaultOption: EChartsOption
  icon?: string
}

export const chartTypes: Record<string, ChartType> = {
  // 基础图表
  line: {
    name: '折线图',
    category: 'basic',
    description: '用于展示数据随时间或类别的变化趋势',
    defaultOption: {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    }
  },
  bar: {
    name: '柱状图',
    category: 'basic',
    description: '用于展示不同类别的数值对比',
    defaultOption: {
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
    }
  },
  pie: {
    name: '饼图',
    category: 'basic',
    description: '用于展示整体中各部分的占比',
    defaultOption: {
      series: [{
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '搜索引擎' },
          { value: 735, name: '直接访问' },
          { value: 580, name: '邮件营销' },
          { value: 484, name: '联盟广告' },
          { value: 300, name: '视频广告' }
        ]
      }]
    }
  },
  area: {
    name: '面积图',
    category: 'basic',
    description: '用于展示数据随时间的变化趋势，并强调数据量',
    defaultOption: {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {
          opacity: 0.3
        }
      }]
    }
  },
  stackedBar: {
    name: '堆叠柱状图',
    category: 'basic',
    description: '用于展示不同类别的数据堆叠效果',
    defaultOption: {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
      },
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '邮件营销',
          type: 'bar',
          stack: 'total',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'bar',
          stack: 'total',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'bar',
          stack: 'total',
          data: [150, 232, 201, 154, 190, 330, 410]
        }
      ]
    }
  },
  donut: {
    name: '环形图',
    category: 'basic',
    description: '用于展示整体中各部分的占比，中间可显示重要信息',
    defaultOption: {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [{
        name: '访问来源',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '搜索引擎' },
          { value: 735, name: '直接访问' },
          { value: 580, name: '邮件营销' },
          { value: 484, name: '联盟广告' },
          { value: 300, name: '视频广告' }
        ]
      }]
    }
  },

  // 统计图表
  scatter: {
    name: '散点图',
    category: 'statistical',
    description: '用于展示两个变量之间的关系',
    defaultOption: {
      xAxis: {},
      yAxis: {},
      series: [{
        symbolSize: 20,
        data: [
          [10.0, 8.04],
          [8.07, 6.95],
          [13.0, 7.58],
          [9.05, 8.81],
          [11.0, 8.33],
          [14.0, 7.66],
          [13.4, 6.81],
          [10.0, 6.33]
        ],
        type: 'scatter'
      }]
    }
  },
  radar: {
    name: '雷达图',
    category: 'statistical',
    description: '用于展示多维度的数据对比',
    defaultOption: {
      radar: {
        indicator: [
          { name: '销售', max: 6500 },
          { name: '管理', max: 16000 },
          { name: '信息技术', max: 30000 },
          { name: '客服', max: 38000 },
          { name: '研发', max: 52000 },
          { name: '市场', max: 25000 }
        ]
      },
      series: [{
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: '预算 vs 开销'
          }
        ]
      }]
    }
  },
  boxplot: {
    name: '箱线图',
    category: 'statistical',
    description: '用于展示数据的分布特征，包括中位数、四分位数和异常值',
    defaultOption: {
      xAxis: {
        type: 'category',
        data: ['类别1', '类别2', '类别3', '类别4', '类别5']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        type: 'boxplot',
        data: [
          [650, 850, 940, 980, 1070],
          [760, 800, 845, 885, 960],
          [780, 840, 855, 880, 940],
          [720, 767, 814, 870, 918],
          [740, 807, 870, 918, 1000]
        ]
      }]
    }
  },
  candlestick: {
    name: 'K线图',
    category: 'statistical',
    description: '用于展示股票、期货等金融数据的开盘价、收盘价、最高价和最低价',
    defaultOption: {
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        type: 'candlestick',
        data: [
          [20, 34, 10, 38],
          [40, 35, 30, 50],
          [31, 38, 33, 44],
          [38, 15, 5, 42],
          [34, 35, 32, 38],
          [40, 40, 38, 44],
          [35, 42, 30, 45]
        ]
      }]
    }
  },

  // 关系图表
  graph: {
    name: '关系图',
    category: 'relationship',
    description: '用于展示节点之间的关系',
    defaultOption: {
      series: [{
        type: 'graph',
        layout: 'force',
        data: [
          { name: 'Node 1' },
          { name: 'Node 2' },
          { name: 'Node 3' },
          { name: 'Node 4' },
          { name: 'Node 5' }
        ],
        links: [
          { source: 'Node 1', target: 'Node 2' },
          { source: 'Node 2', target: 'Node 3' },
          { source: 'Node 3', target: 'Node 4' },
          { source: 'Node 4', target: 'Node 5' }
        ],
        roam: true,
        label: {
          show: true
        },
        force: {
          repulsion: 100
        }
      }]
    }
  },
  sankey: {
    name: '桑基图',
    category: 'relationship',
    description: '用于展示数据流向和数量关系',
    defaultOption: {
      series: {
        type: 'sankey',
        emphasis: {
          focus: 'adjacency'
        },
        data: [
          { name: '节点1' },
          { name: '节点2' },
          { name: '节点3' },
          { name: '节点4' },
          { name: '节点5' }
        ],
        links: [
          { source: '节点1', target: '节点2', value: 100 },
          { source: '节点2', target: '节点3', value: 80 },
          { source: '节点2', target: '节点4', value: 20 },
          { source: '节点3', target: '节点5', value: 60 },
          { source: '节点4', target: '节点5', value: 20 }
        ]
      }
    }
  },
  chord: {
    name: '和弦图',
    category: 'relationship',
    description: '用于展示矩阵数据之间的关系',
    defaultOption: {
      series: {
        type: 'chord',
        data: [
          { name: '类别1' },
          { name: '类别2' },
          { name: '类别3' },
          { name: '类别4' }
        ],
        matrix: [
          [0, 5, 6, 4],
          [5, 0, 5, 1],
          [6, 5, 0, 2],
          [4, 1, 2, 0]
        ]
      } as any
    }
  },

  // 层级图表
  tree: {
    name: '树图',
    category: 'hierarchical',
    description: '用于展示层级结构数据',
    defaultOption: {
      series: [{
        type: 'tree',
        data: [{
          name: 'root',
          children: [
            {
              name: 'child1',
              children: [
                { name: 'grandchild1' },
                { name: 'grandchild2' }
              ]
            },
            {
              name: 'child2',
              children: [
                { name: 'grandchild3' }
              ]
            }
          ]
        }],
        top: '5%',
        left: '5%',
        bottom: '5%',
        right: '5%',
        symbolSize: 7,
        label: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right'
        },
        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left'
          }
        },
        emphasis: {
          focus: 'descendant'
        },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750
      }]
    }
  },
  treemap: {
    name: '矩形树图',
    category: 'hierarchical',
    description: '用于展示层级数据的占比关系',
    defaultOption: {
      series: {
        type: 'treemap',
        data: [{
          name: '根节点',
          children: [
            {
              name: '类别1',
              value: 100,
              children: [
                { name: '子项1', value: 60 },
                { name: '子项2', value: 40 }
              ]
            },
            {
              name: '类别2',
              value: 80,
              children: [
                { name: '子项3', value: 50 },
                { name: '子项4', value: 30 }
              ]
            }
          ]
        }]
      }
    }
  },
  sunburst: {
    name: '旭日图',
    category: 'hierarchical',
    description: '用于展示层级数据的占比关系，支持多层级展示',
    defaultOption: {
      series: {
        type: 'sunburst',
        radius: ['0%', '90%'],
        data: [{
          name: '根节点',
          children: [
            {
              name: '类别1',
              value: 100,
              children: [
                { name: '子项1', value: 60 },
                { name: '子项2', value: 40 }
              ]
            },
            {
              name: '类别2',
              value: 80,
              children: [
                { name: '子项3', value: 50 },
                { name: '子项4', value: 30 }
              ]
            }
          ]
        }]
      }
    }
  },

  // 地理图表
  map: {
    name: '地图',
    category: 'geographic',
    description: '用于展示地理数据',
    defaultOption: {
      geo: {
        map: 'china',
        roam: true,
        label: {
          show: true
        }
      },
      series: [{
        type: 'scatter',
        coordinateSystem: 'geo',
        data: [
          { name: '北京', value: [116.405285, 39.904989] },
          { name: '上海', value: [121.472644, 31.231706] },
          { name: '广州', value: [113.280637, 23.125178] }
        ]
      }]
    }
  },
  heatmap: {
    name: '热力图',
    category: 'geographic',
    description: '用于展示地理数据的密度分布',
    defaultOption: {
      visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        inRange: {
          color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027']
        }
      },
      geo: {
        map: 'china',
        roam: true,
        label: {
          show: true
        }
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'geo',
        data: [
          { name: '北京', value: [116.405285, 39.904989, 9] },
          { name: '上海', value: [121.472644, 31.231706, 8] },
          { name: '广州', value: [113.280637, 23.125178, 7] }
        ] as any
      }
    }
  },
  lines: {
    name: '线图',
    category: 'geographic',
    description: '用于展示地理位置的连线关系',
    defaultOption: {
      geo: {
        map: 'china',
        roam: true,
        label: {
          show: true
        }
      },
      series: {
        type: 'lines',
        coordinateSystem: 'geo',
        data: [
          {
            coords: [[116.405285, 39.904989], [121.472644, 31.231706]],
            lineStyle: {
              color: '#ff0000',
              width: 1
            }
          },
          {
            coords: [[121.472644, 31.231706], [113.280637, 23.125178]],
            lineStyle: {
              color: '#00ff00',
              width: 1
            }
          }
        ]
      }
    }
  },

  // 特殊图表
  gauge: {
    name: '仪表盘',
    category: 'special',
    description: '用于展示进度或完成度',
    defaultOption: {
      series: [{
        type: 'gauge',
        progress: {
          show: true,
          width: 18
        },
        axisLine: {
          lineStyle: {
            width: 18
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          length: 15,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        pointer: {
          show: false
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 25,
          itemStyle: {
            borderWidth: 10
          }
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          fontSize: '30px',
          offsetCenter: [0, '70%']
        },
        data: [{
          value: 70
        }]
      }]
    }
  },
  liquid: {
    name: '水球图',
    category: 'special',
    description: '用于展示百分比数据，具有动态效果',
    defaultOption: {
      series: {
        type: 'liquidFill',
        data: [0.6],
        radius: '80%',
        color: ['#1890ff'],
        backgroundStyle: {
          color: '#fff'
        },
        label: {
          normal: {
            formatter: (0.6 * 100).toFixed(0) + '%',
            textStyle: {
              fontSize: 28,
              color: '#333'
            }
          }
        }
      } as any
    }
  },
  wordCloud: {
    name: '词云图',
    category: 'special',
    description: '用于展示文本数据的词频分布',
    defaultOption: {
      series: {
        type: 'wordCloud',
        shape: 'circle',
        left: 'center',
        top: 'center',
        width: '70%',
        height: '80%',
        right: null,
        bottom: null,
        sizeRange: [12, 60],
        rotationRange: [-90, 90],
        rotationStep: 45,
        gridSize: 8,
        drawOutOfBound: false,
        textStyle: {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          color: function () {
            return 'rgb(' + [
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160)
            ].join(',') + ')'
          }
        },
        emphasis: {
          focus: 'self',
          textStyle: {
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        data: [
          { name: '数据', value: 100 },
          { name: '可视化', value: 80 },
          { name: '图表', value: 60 },
          { name: '分析', value: 40 },
          { name: '展示', value: 30 }
        ]
      } as any
    }
  }
}

export const getChartType = (type: string): ChartType | undefined => {
  return chartTypes[type]
}

export const getChartTypesByCategory = (category: ChartType['category']) => {
  return Object.values(chartTypes).filter(type => type.category === category)
}

export const getAllChartTypes = () => {
  return Object.values(chartTypes)
}
