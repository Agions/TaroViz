import { PlatformType } from '../index';

describe('Platform Core Tests', () => {
  describe('PlatformType', () => {
    it('should have correct enum values', () => {
      // 测试PlatformType枚举值
      expect(PlatformType.H5).toBe('h5');
      expect(PlatformType.WEAPP).toBe('weapp');
      expect(PlatformType.ALIPAY).toBe('alipay');
      expect(PlatformType.SWAN).toBe('swan');
      expect(PlatformType.TT).toBe('tt');
      expect(PlatformType.QQ).toBe('qq');
      expect(PlatformType.JD).toBe('jd');
      expect(PlatformType.DD).toBe('dd');
      expect(PlatformType.QYWX).toBe('qywx');
      expect(PlatformType.LARK).toBe('lark');
      expect(PlatformType.HARMONY).toBe('harmony');
    });

    it('should have all expected platform types', () => {
      // 测试所有预期的平台类型都存在
      const expectedPlatforms = [
        'h5',
        'weapp',
        'alipay',
        'swan',
        'tt',
        'qq',
        'jd',
        'dd',
        'qywx',
        'lark',
        'harmony',
      ];

      const actualPlatforms = Object.values(PlatformType);
      expectedPlatforms.forEach(platform => {
        expect(actualPlatforms).toContain(platform);
      });
    });

    it('should be usable as a type', () => {
      // 测试PlatformType作为类型的使用
      const platform: PlatformType = PlatformType.H5;
      expect(platform).toBe('h5');
    });
  });
});
