import { EventEmitter } from '../eventEmitter';

describe('EventEmitter', () => {
  let emitter: EventEmitter;
  
  beforeEach(() => {
    emitter = new EventEmitter();
  });
  
  test('on 方法应该注册事件监听器', () => {
    const mockListener = jest.fn();
    
    emitter.on('test', mockListener);
    
    // 内部实现确认监听器注册成功
    expect((emitter as any).events.test).toBeDefined();
    expect((emitter as any).events.test).toContain(mockListener);
  });
  
  test('off 方法应该移除特定的事件监听器', () => {
    const mockListener1 = jest.fn();
    const mockListener2 = jest.fn();
    
    emitter.on('test', mockListener1);
    emitter.on('test', mockListener2);
    
    expect((emitter as any).events.test.length).toBe(2);
    
    emitter.off('test', mockListener1);
    
    expect((emitter as any).events.test.length).toBe(1);
    expect((emitter as any).events.test).not.toContain(mockListener1);
    expect((emitter as any).events.test).toContain(mockListener2);
  });
  
  test('off 方法在未指定监听器时应该移除所有该类型事件的监听器', () => {
    const mockListener1 = jest.fn();
    const mockListener2 = jest.fn();
    
    emitter.on('test', mockListener1);
    emitter.on('test', mockListener2);
    
    expect((emitter as any).events.test.length).toBe(2);
    
    emitter.off('test');
    
    expect((emitter as any).events.test).toBeUndefined();
  });
  
  test('emit 方法应该触发所有注册的事件监听器', () => {
    const mockListener1 = jest.fn();
    const mockListener2 = jest.fn();
    
    emitter.on('test', mockListener1);
    emitter.on('test', mockListener2);
    
    const eventData = { foo: 'bar' };
    emitter.emit('test', eventData);
    
    expect(mockListener1).toHaveBeenCalledWith(eventData);
    expect(mockListener2).toHaveBeenCalledWith(eventData);
  });
  
  test('emit 方法在没有监听器时不应该抛出错误', () => {
    expect(() => {
      emitter.emit('nonexistentEvent', { foo: 'bar' });
    }).not.toThrow();
  });
  
  test('on 方法在多次添加相同监听器时应该只添加一次', () => {
    const mockListener = jest.fn();
    
    emitter.on('test', mockListener);
    emitter.on('test', mockListener);
    emitter.on('test', mockListener);
    
    expect((emitter as any).events.test.length).toBe(1);
  });
  
  test('once 方法注册的监听器应该只被触发一次', () => {
    const mockListener = jest.fn();
    
    emitter.once('test', mockListener);
    
    emitter.emit('test', { first: true });
    emitter.emit('test', { second: true });
    
    expect(mockListener).toHaveBeenCalledTimes(1);
    expect(mockListener).toHaveBeenCalledWith({ first: true });
  });

  test('多种事件类型的监听器应该被正确注册和触发', () => {
    const mockListener1 = jest.fn();
    const mockListener2 = jest.fn();
    
    emitter.on('event1', mockListener1);
    emitter.on('event2', mockListener2);
    
    emitter.emit('event1', { event: 1 });
    
    expect(mockListener1).toHaveBeenCalledWith({ event: 1 });
    expect(mockListener2).not.toHaveBeenCalled();
    
    mockListener1.mockClear();
    
    emitter.emit('event2', { event: 2 });
    
    expect(mockListener1).not.toHaveBeenCalled();
    expect(mockListener2).toHaveBeenCalledWith({ event: 2 });
  });

  test('removeAllListeners 方法应该移除所有监听器', () => {
    const mockListener1 = jest.fn();
    const mockListener2 = jest.fn();
    
    emitter.on('event1', mockListener1);
    emitter.on('event2', mockListener2);
    
    emitter.removeAllListeners();
    
    emitter.emit('event1', { data: 'test' });
    emitter.emit('event2', { data: 'test' });
    
    expect(mockListener1).not.toHaveBeenCalled();
    expect(mockListener2).not.toHaveBeenCalled();
    expect((emitter as any).events).toEqual({});
  });

  test('removeAllListeners 方法在指定事件类型时应该只移除该类型的监听器', () => {
    const mockListener1 = jest.fn();
    const mockListener2 = jest.fn();
    
    emitter.on('event1', mockListener1);
    emitter.on('event2', mockListener2);
    
    emitter.removeAllListeners('event1');
    
    emitter.emit('event1', { data: 'test' });
    emitter.emit('event2', { data: 'test' });
    
    expect(mockListener1).not.toHaveBeenCalled();
    expect(mockListener2).toHaveBeenCalled();
    expect((emitter as any).events.event1).toBeUndefined();
    expect((emitter as any).events.event2).toBeDefined();
  });
}); 