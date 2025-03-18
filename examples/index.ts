import InteractiveChart from './InteractiveChart'
import DynamicDataChart from './DynamicDataChart'
import ResponsiveLayout from './ResponsiveLayout'
import CustomChartConfig from './CustomChartConfig'

// 示例分类
export enum ExampleCategory {
  Basic = '基础示例',
  Advanced = '高级示例',
  Interactive = '交互示例',
  Responsive = '响应式示例'
}

// 示例项接口
export interface ExampleItem {
  id: string
  title: string
  description: string
  component: React.ComponentType
  category: ExampleCategory
  thumbnail?: string
}

// 所有示例
export const examples: ExampleItem[] = [
  {
    id: 'custom-config',
    title: '自定义配置',
    description: '使用自定义配置选项简化常见的图表配置',
    component: CustomChartConfig,
    category: ExampleCategory.Basic,
    thumbnail: 'custom_config.png'
  },
  {
    id: 'interactive-chart',
    title: '图表交互',
    description: '演示如何与图表进行交互，包括高亮、提示框控制和标记点添加',
    component: InteractiveChart,
    category: ExampleCategory.Interactive,
    thumbnail: 'interactive_chart.png'
  },
  {
    id: 'dynamic-data',
    title: '动态数据',
    description: '展示如何处理实时数据更新和动态加载数据',
    component: DynamicDataChart,
    category: ExampleCategory.Advanced,
    thumbnail: 'dynamic_data.png'
  },
  {
    id: 'responsive-layout',
    title: '响应式布局',
    description: '根据不同屏幕尺寸自动调整图表布局和样式',
    component: ResponsiveLayout,
    category: ExampleCategory.Responsive,
    thumbnail: 'responsive_layout.png'
  }
]

// 获取示例列表（可按类别过滤）
export const getExamples = (category?: ExampleCategory): ExampleItem[] => {
  if (category) {
    return examples.filter(example => example.category === category)
  }
  return examples
}

// 获取示例分类
export const getCategories = (): ExampleCategory[] => {
  const categories = new Set<ExampleCategory>()
  examples.forEach(example => categories.add(example.category))
  return Array.from(categories)
}

// 根据ID获取示例
export const getExampleById = (id: string): ExampleItem | undefined => {
  return examples.find(example => example.id === id)
}

export default {
  InteractiveChart,
  DynamicDataChart,
  ResponsiveLayout,
  CustomChartConfig
}
