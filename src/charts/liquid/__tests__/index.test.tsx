/**
 * LiquidChart 测试
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import LiquidChart from '../index';

describe('LiquidChart', () => {
  const mockProps = {
    width: 200,
    height: 200,
    waveData: [0.6],
  };

  it('should render without crashing', () => {
    render(<LiquidChart {...mockProps} />);
    // LiquidChart renders a div with class taroviz-liquid
    expect(screen.getByTestId('liquid-chart')).toBeInTheDocument();
  });

  it('should render with different wave data', () => {
    render(<LiquidChart {...mockProps} waveData={[0.3, 0.5, 0.7]} />);
    expect(screen.getByTestId('liquid-chart')).toBeInTheDocument();
  });

  it('should handle shape prop', () => {
    render(<LiquidChart {...mockProps} shape="rect" />);
    expect(screen.getByTestId('liquid-chart')).toBeInTheDocument();
  });

  it('should handle amplitude prop', () => {
    render(<LiquidChart {...mockProps} amplitude={50} />);
    expect(screen.getByTestId('liquid-chart')).toBeInTheDocument();
  });

  it('should handle color prop', () => {
    render(<LiquidChart {...mockProps} color={['#ff0000', '#00ff00']} />);
    expect(screen.getByTestId('liquid-chart')).toBeInTheDocument();
  });

  it('should handle backgroundColor prop', () => {
    render(<LiquidChart {...mockProps} backgroundColor="#f0f0f0" />);
    expect(screen.getByTestId('liquid-chart')).toBeInTheDocument();
  });

  it('should handle showLabel prop', () => {
    render(<LiquidChart {...mockProps} showLabel={true} />);
    expect(screen.getByTestId('liquid-chart')).toBeInTheDocument();
  });
});
