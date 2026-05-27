/**
 * Factory for charts that follow the buildXxxOption + render pattern.
 * Eliminates the repeated null-check + BaseChart wrapper code.
 */
import React from 'react';
import BaseChart from '@/core/components/BaseChart';
import type { BaseChartProps } from './types';

interface OptionBuilderProps {
  optionMerge?: Record<string, unknown>;
}

/**
 * Creates a chart component from a buildOption function.
 * @param displayName Component display name
 * @param buildOption Function that builds ECharts option from props, returns null if invalid
 */
export function createOptionChartComponent<
  Props extends OptionBuilderProps,
>(
  displayName: string,
  buildOption: (props: Props) => Record<string, unknown> | null,
): React.FC<Props & Omit<BaseChartProps, 'option' | 'data'>> {
  const Component: React.FC<Props & Omit<BaseChartProps, 'option' | 'data'>> = (props) => {
    const { optionMerge, ...rest } = props;
    const option = buildOption(props as Props);
    if (!option) {
      return null;
    }
    return <BaseChart option={option as any} {...(rest as BaseChartProps)} />;
  };
  Component.displayName = displayName;
  return Component;
}
