// jest setup file
import '@testing-library/jest-dom';
import 'whatwg-fetch';

// 模拟 Taro 环境
global.wx = {};
global.my = {};
global.swan = {};

// 模拟 canvas 环境
class MockCanvas {
  getContext() {
    return {
      measureText: () => ({ width: 100 }),
      fillText: jest.fn(),
      fill: jest.fn(),
      beginPath: jest.fn(),
      stroke: jest.fn(),
      clearRect: jest.fn(),
      setTransform: jest.fn(),
      drawImage: jest.fn(),
      save: jest.fn(),
      restore: jest.fn(),
      translate: jest.fn(),
      rotate: jest.fn(),
      scale: jest.fn()
    };
  }
}

// 模拟 DOM 环境
global.HTMLCanvasElement.prototype.getContext = () => {
  return {
    measureText: () => ({ width: 100 }),
    fillText: jest.fn(),
    fill: jest.fn(),
    beginPath: jest.fn(),
    stroke: jest.fn(),
    clearRect: jest.fn(),
    setTransform: jest.fn(),
    drawImage: jest.fn(),
    save: jest.fn(),
    restore: jest.fn(),
    translate: jest.fn(),
    rotate: jest.fn(),
    scale: jest.fn()
  };
};

// 忽略 ECharts 动画
jest.mock('echarts', () => {
  const echarts = jest.requireActual('echarts');
  echarts.init = () => ({
    setOption: jest.fn(),
    resize: jest.fn(),
    dispose: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
    getZr: () => ({
      on: jest.fn(),
      off: jest.fn()
    })
  });
  return echarts;
});

// 解决 ResizeObserver 错误
window.ResizeObserver = class ResizeObserver {
  constructor(cb) {
    this.cb = cb;
  }
  observe() {
    this.cb([{ contentRect: { width: 100, height: 100 } }]);
  }
  unobserve() {}
  disconnect() {}
}; 