// jest setup file
require('@testing-library/jest-dom');
require('whatwg-fetch');

// 模拟 Taro 环境
global.wx = {};
global.my = {};
global.swan = {};
global.tt = {};

// 模拟 window 对象
global.window = {
  devicePixelRatio: 1,
};

// 模拟 document 对象
global.document = {
  createElement: jest.fn(() => ({
    style: {},
    getContext: jest.fn(() => ({
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
      scale: jest.fn(),
    })),
    appendChild: jest.fn(),
    removeChild: jest.fn(),
  })),
  body: {
    appendChild: jest.fn(),
    removeChild: jest.fn(),
  },
};

// 模拟 requestAnimationFrame
global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);

// 模拟 HTMLCanvasElement.prototype.getContext
global.HTMLCanvasElement.prototype.getContext = () => ({
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
  scale: jest.fn(),
});

// 模拟 echarts
const mockEcharts = {
  use: jest.fn(),
  init: jest.fn(() => ({
    setOption: jest.fn(),
    resize: jest.fn(),
    dispose: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
    getZr: () => ({
      on: jest.fn(),
      off: jest.fn(),
    }),
    getDataURL: jest.fn(() => 'data:image/png;base64,mock'),
    convertToPixel: jest.fn(),
    convertFromPixel: jest.fn(),
  })),
  registerTheme: jest.fn(),
  registerComponent: jest.fn(),
  registerChart: jest.fn(),
  getMap: jest.fn(),
  registerMap: jest.fn(),
  connect: jest.fn(),
  disconnect: jest.fn(),
  dispose: jest.fn(),
  disposeAll: jest.fn(),
};

jest.mock('echarts', () => mockEcharts);
jest.mock('echarts/core', () => mockEcharts);
jest.mock('echarts/renderers', () => ({ CanvasRenderer: 'CanvasRenderer' }));
jest.mock('echarts/charts', () => ({}));
jest.mock('echarts/components', () => ({}));

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
