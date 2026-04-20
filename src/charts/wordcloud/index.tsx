/**
 * WordCloudChart组件
 */
import React, { memo } from 'react';
import BaseChartWrapper from '../common/BaseChartWrapper';
import { WordCloudChartProps } from '../types';

const WordCloudChart: React.FC<WordCloudChartProps> = memo((props) => (
  <BaseChartWrapper {...props} chartType="wordcloud-chart" />
));
WordCloudChart.displayName = 'WordCloudChart';

export default WordCloudChart;
