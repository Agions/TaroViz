/**
 * TaroViz 百度小程序适配器
 */
import { MiniAppAdapter, createMiniAppAdapter } from '../MiniAppAdapter';
import type { _SwanAdapterOptions } from '../types';

export class SwanAdapter extends MiniAppAdapter {
  protected get platformName(): string {
    return 'Swan';
  }
}

export const createSwanAdapter = createMiniAppAdapter(SwanAdapter);
export default SwanAdapter;
