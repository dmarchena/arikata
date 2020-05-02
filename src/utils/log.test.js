import { log, logMsg } from './log';

describe('log', () => {
  const consoleSpy = jest.spyOn(global.console, 'log');

  it('should log', () => {
    expect.hasAssertions();
    log('test');
    expect(consoleSpy).toHaveBeenCalledWith('test');
  });

  it('should return the received param in order to include it an a compose chain', () => {
    expect.hasAssertions();
    expect(log('test')).toBe('test');
    expect(log({ payload: 'test' })).toStrictEqual({ payload: 'test' });
  });
});

describe('logMsg', () => {
  const consoleSpy = jest.spyOn(global.console, 'log');
  const logResult = logMsg('Result: ');

  it('should log with a custom message', () => {
    expect.hasAssertions();
    logResult('test');
    expect(consoleSpy).toHaveBeenCalledWith('Result: ', 'test');
  });

  it('should return the received param in order to include it an a compose chain', () => {
    expect.hasAssertions();
    expect(logResult('test')).toBe('test');
    expect(logResult({ payload: 'test' })).toStrictEqual({ payload: 'test' });
  });
});
