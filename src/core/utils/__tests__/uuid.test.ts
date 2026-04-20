import { uuid, shortId, prefixedId } from '../uuid';

describe('UUID Utils', () => {
  describe('uuid', () => {
    it('should generate a valid UUID v4', () => {
      const generatedUuid = uuid();
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

      expect(uuidRegex.test(generatedUuid)).toBe(true);
    });

    it('should generate unique UUIDs', () => {
      const uuid1 = uuid();
      const uuid2 = uuid();
      const uuid3 = uuid();

      expect(uuid1).not.toBe(uuid2);
      expect(uuid2).not.toBe(uuid3);
      expect(uuid1).not.toBe(uuid3);
    });
  });

  describe('shortId', () => {
    it('should generate a short string', () => {
      const generatedShortId = shortId();

      expect(typeof generatedShortId).toBe('string');
      expect(generatedShortId.length).toBe(8);
    });

    it('should generate unique short IDs', () => {
      const shortId1 = shortId();
      const shortId2 = shortId();
      const shortId3 = shortId();

      expect(shortId1).not.toBe(shortId2);
      expect(shortId2).not.toBe(shortId3);
      expect(shortId1).not.toBe(shortId3);
    });

    it('should generate alphanumeric strings', () => {
      const generatedShortId = shortId();
      const alphanumericRegex = /^[a-zA-Z0-9]+$/;

      expect(alphanumericRegex.test(generatedShortId)).toBe(true);
    });
  });

  describe('prefixedId', () => {
    it('should generate a prefixed ID', () => {
      const prefix = 'test';
      const generatedPrefixedId = prefixedId(prefix);

      expect(generatedPrefixedId.startsWith(`${prefix}-`)).toBe(true);
    });

    it('should generate unique prefixed IDs with the same prefix', () => {
      const prefix = 'test';
      const prefixedId1 = prefixedId(prefix);
      const prefixedId2 = prefixedId(prefix);
      const prefixedId3 = prefixedId(prefix);

      expect(prefixedId1).not.toBe(prefixedId2);
      expect(prefixedId2).not.toBe(prefixedId3);
      expect(prefixedId1).not.toBe(prefixedId3);
    });

    it('should handle different prefixes correctly', () => {
      const prefix1 = 'test1';
      const prefix2 = 'test2';
      const prefixedId1 = prefixedId(prefix1);
      const prefixedId2 = prefixedId(prefix2);

      expect(prefixedId1.startsWith(`${prefix1}-`)).toBe(true);
      expect(prefixedId2.startsWith(`${prefix2}-`)).toBe(true);
    });
  });
});
