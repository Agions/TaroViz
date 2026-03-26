/**
 * 词云图组件
 * 用于展示文本数据的词频分布
 */
import React from 'react';

import BaseChartWrapper from '../common/BaseChartWrapper';
import { WordCloudChartProps } from '../types';

/**
 * 词云图组件
 */
const WordCloudChart: React.FC<WordCloudChartProps> = (props) => (
  <BaseChartWrapper {...props} chartType="wordcloud-chart" />
);

export default WordCloudChart;
