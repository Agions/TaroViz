/**
 * TaroViz 字节跳动小程序适配器
 */
import { MiniAppAdapter, createMiniAppAdapter } from '../MiniAppAdapter';
import type { TTAdapterOptions } from '../types';

export class TTAdapter extends MiniAppAdapter {
  protected get platformName(): string {
    return 'TT';
  }
}

export const createTTAdapter = createMiniAppAdapter(TTAdapter);
export default TTAdapter;