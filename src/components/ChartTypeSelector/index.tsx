import React from 'react'
import { getChartTypesByCategory, type ChartType } from '../Chart/chartTypes'
import './index.scss'

interface ChartTypeSelectorProps {
  onSelect: (type: ChartType) => void
  selectedType?: string
}

export const ChartTypeSelector: React.FC<ChartTypeSelectorProps> = ({
  onSelect,
  selectedType
}) => {
  const categories = ['basic', 'statistical', 'relationship', 'hierarchical', 'geographic', 'special'] as const

  return (
    <div className="chart-type-selector">
      {categories.map(category => {
        const types = getChartTypesByCategory(category)
        if (types.length === 0) return null

        return (
          <div key={category} className="chart-type-category">
            <h3 className="category-title">
              {category === 'basic' && '基础图表'}
              {category === 'statistical' && '统计图表'}
              {category === 'relationship' && '关系图表'}
              {category === 'hierarchical' && '层级图表'}
              {category === 'geographic' && '地理图表'}
              {category === 'special' && '特殊图表'}
            </h3>
            <div className="chart-type-list">
              {types.map(type => (
                <div
                  key={type.name}
                  className={`chart-type-item ${selectedType === type.name ? 'selected' : ''}`}
                  onClick={() => onSelect(type)}
                >
                  <div className="chart-type-icon">
                    {type.icon || '📊'}
                  </div>
                  <div className="chart-type-info">
                    <div className="chart-type-name">{type.name}</div>
                    <div className="chart-type-description">{type.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
