/**
 * 统一导出ECharts组件
 * 根据不同平台导出不同实现
 */
import { getAdapter } from './adapters'

const EChartsComponent = getAdapter()

export default EChartsComponent
