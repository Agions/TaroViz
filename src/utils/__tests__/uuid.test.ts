import { generateUUID, generateShortId } from '../uuid';

describe('UUID Utilities', () => {
  test('generateUUID 应该生成有效的UUID v4格式', () => {
    const uuid = generateUUID();
    
    // UUID v4格式正则表达式
    const uuidV4Pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    
    expect(uuid).toMatch(uuidV4Pattern);
  });
  
  test('generateUUID 生成的UUID应该是唯一的', () => {
    const uuids = new Set();
    
    // 生成多个UUID并检查唯一性
    for (let i = 0; i < 1000; i++) {
      uuids.add(generateUUID());
    }
    
    // 如果所有UUID都是唯一的，则Set的大小应该为1000
    expect(uuids.size).toBe(1000);
  });
  
  test('generateShortId 应该生成指定长度的ID', () => {
    const shortId = generateShortId();
    
    // 默认长度应该为8
    expect(shortId.length).toBe(8);
    
    // 自定义长度
    const customLengthId = generateShortId(12);
    expect(customLengthId.length).toBe(12);
  });
  
  test('generateShortId 生成的ID应该只包含期望的字符', () => {
    const shortId = generateShortId();
    
    // 默认应该只包含字母和数字
    const alphanumericPattern = /^[0-9a-zA-Z]+$/;
    
    expect(shortId).toMatch(alphanumericPattern);
  });
  
  test('generateShortId 生成的ID应该是随机的', () => {
    const ids = new Set();
    
    // 生成多个短ID并检查唯一性
    for (let i = 0; i < 1000; i++) {
      ids.add(generateShortId());
    }
    
    // 对于8位字符的短ID，有一定概率出现重复
    // 但在1000个样本中，重复的概率应该很低
    // 此测试是概率性的，但在实际环境中工作良好
    expect(ids.size).toBeGreaterThan(990);
  });
  
  test('generateShortId 应该对长度参数进行合理限制', () => {
    // 负数应该使用默认值
    const negativeLength = generateShortId(-5);
    expect(negativeLength.length).toBe(8);
    
    // 非常大的长度应该使用最大值
    const tooLargeLength = generateShortId(1000);
    expect(tooLargeLength.length).toBeLessThanOrEqual(36);
  });
  
  test('generateShortId 可以使用自定义字符集', () => {
    // 仅使用数字
    const numericOnlyId = generateShortId(10, '0123456789');
    const numericPattern = /^[0-9]+$/;
    expect(numericOnlyId).toMatch(numericPattern);
    expect(numericOnlyId.length).toBe(10);
    
    // 使用自定义字符集
    const customChars = 'ABC123';
    const customId = generateShortId(15, customChars);
    const customPattern = /^[ABC123]+$/;
    expect(customId).toMatch(customPattern);
    expect(customId.length).toBe(15);
  });
}); 