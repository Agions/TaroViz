import { EChartsOption } from 'echarts'

// 基础图表
import line from './basic/line'
import bar from './basic/bar'
import pie from './basic/pie'
import area from './basic/area'
import stackedBar from './basic/stacked-bar'
import donut from './basic/donut'

// 统计图表
import boxplot from './statistical/boxplot'
import candlestick from './statistical/candlestick'

// 关系图表
import sankey from './relationship/sankey'
import chord from './relationship/chord'

// 层级图表
import treemap from './hierarchical/treemap'
import sunburst from './hierarchical/sunburst'

// 地理图表
import heatmap from './geographic/heatmap'
import lines from './geographic/lines'

// 特殊图表
import liquid from './special/liquid'
import wordcloud from './special/wordcloud'

// 示例分类
export enum ExampleCategory {
  Basic = '基础图表',
  Statistical = '统计图表',
  Relationship = '关系图表',
  Hierarchical = '层级图表',
  Geographic = '地理图表',
  Special = '特殊图表'
}

// 示例项接口
export interface ExampleItem {
  id: string
  title: string
  description: string
  option: EChartsOption
  category: ExampleCategory
}

// 所有示例
export const examples: ExampleItem[] = [
  // 基础图表示例
  {
    id: 'line',
    title: line.title,
    description: line.description,
    option: line.option,
    category: ExampleCategory.Basic
  },
  {
    id: 'bar',
    title: bar.title,
    description: bar.description,
    option: bar.option,
    category: ExampleCategory.Basic
  },
  {
    id: 'pie',
    title: pie.title,
    description: pie.description,
    option: pie.option,
    category: ExampleCategory.Basic
  },
  {
    id: 'area',
    title: area.title,
    description: area.description,
    option: area.option,
    category: ExampleCategory.Basic
  },
  {
    id: 'stacked-bar',
    title: stackedBar.title,
    description: stackedBar.description,
    option: stackedBar.option,
    category: ExampleCategory.Basic
  },
  {
    id: 'donut',
    title: donut.title,
    description: donut.description,
    option: donut.option,
    category: ExampleCategory.Basic
  },

  // 统计图表示例
  {
    id: 'boxplot',
    title: boxplot.title,
    description: boxplot.description,
    option: boxplot.option,
    category: ExampleCategory.Statistical
  },
  {
    id: 'candlestick',
    title: candlestick.title,
    description: candlestick.description,
    option: candlestick.option,
    category: ExampleCategory.Statistical
  },

  // 关系图表示例
  {
    id: 'sankey',
    title: sankey.title,
    description: sankey.description,
    option: sankey.option,
    category: ExampleCategory.Relationship
  },
  {
    id: 'chord',
    title: chord.title,
    description: chord.description,
    option: chord.option,
    category: ExampleCategory.Relationship
  },

  // 层级图表示例
  {
    id: 'treemap',
    title: treemap.title,
    description: treemap.description,
    option: treemap.option,
    category: ExampleCategory.Hierarchical
  },
  {
    id: 'sunburst',
    title: sunburst.title,
    description: sunburst.description,
    option: sunburst.option,
    category: ExampleCategory.Hierarchical
  },

  // 地理图表示例
  {
    id: 'heatmap',
    title: heatmap.title,
    description: heatmap.description,
    option: heatmap.option,
    category: ExampleCategory.Geographic
  },
  {
    id: 'lines',
    title: lines.title,
    description: lines.description,
    option: lines.option,
    category: ExampleCategory.Geographic
  },

  // 特殊图表示例
  {
    id: 'liquid',
    title: liquid.title,
    description: liquid.description,
    option: liquid.option,
    category: ExampleCategory.Special
  },
  {
    id: 'wordcloud',
    title: wordcloud.title,
    description: wordcloud.description,
    option: wordcloud.option,
    category: ExampleCategory.Special
  }
]

// 获取特定分类的示例
export const getExamplesByCategory = (category: ExampleCategory): ExampleItem[] => {
  return examples.filter(example => example.category === category)
}

// 获取特定ID的示例
export const getExampleById = (id: string): ExampleItem | undefined => {
  return examples.find(example => example.id === id)
}

// 获取所有示例
export const getAllExamples = (): ExampleItem[] => {
  return examples
}

// 获取所有分类
export const getAllCategories = (): ExampleCategory[] => {
  const categories = new Set<ExampleCategory>()
  examples.forEach(example => categories.add(example.category))
  return Array.from(categories)
}

export default {
  examples,
  getExamplesByCategory,
  getExampleById,
  getAllExamples,
  getAllCategories
}
