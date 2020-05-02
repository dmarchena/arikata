import { publish, subscribe } from './event-bus';

describe('EventBus', () => {
  it('should allow to publish and subscribe to events', () => {
    expect.hasAssertions();
    const listener = jest.fn();
    publish('test', 10);
    expect(listener).not.toHaveBeenCalled();
    subscribe('test', listener);
    publish('test', 10, 20);
    expect(listener).toHaveBeenCalledWith(10, 20);
    publish('test', { name: 'example' });
    expect(listener).toHaveBeenCalledWith({ name: 'example' });
  });
});
