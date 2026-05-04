/**
 * TaroViz 微信小程序适配器
 */
import { MiniAppAdapter, createMiniAppAdapter } from '../MiniAppAdapter';
import type { WeappAdapterOptions } from '../types';

export class WeappAdapter extends MiniAppAdapter {
  protected get platformName(): string {
    return 'Weapp';
  }
}

export const createWeappAdapter = createMiniAppAdapter(WeappAdapter);
export default WeappAdapter;