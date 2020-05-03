import testRunner from './test-runner';
const logSpy = jest.spyOn(global.console, 'log');
describe('Test runner', () => {
  let logSpy;
  let errorSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(global.console, 'log');
    errorSpy = jest.spyOn(global.console, 'error');
    testRunner.reset();
  });

  it('should run tests', () => {
    expect.hasAssertions();

    testRunner.it('should pass', () => {
      expect(true).toBe(true);
    });
    testRunner.it('should pass', () => {
      expect(1).toBeGreaterThan(0);
    });

    expect(testRunner.run()).toBe(true);
    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should fail if any test failed', () => {
    expect.hasAssertions();

    testRunner.it('should pass', () => {
      expect(true).toBe(true);
    });
    testRunner.it('should not pass', () => {
      expect(false).toBe(true);
    });
    testRunner.it('should fail too', () => {
      expect(1 - 1).not.toBe(0);
    });

    expect(testRunner.run()).toBe(false);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledTimes(2);
  });

  afterEach(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
  });
});
