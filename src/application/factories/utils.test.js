import {
  isRequired,
  composedGetter,
  composedGetterAsync,
  composedSetter,
  composedSetterAsync,
} from './utils';

const returnResult = (res, async) => (async ? Promise.resolve(res) : res);

const composable = (hasValue = true, async = false) => ({
  getBool: jest.fn().mockImplementation(() => returnResult(hasValue, async)),
  getObj: jest.fn().mockImplementation(() => {
    const result = hasValue ? {} : null;
    return returnResult(result, async);
  }),
  setBool: jest.fn().mockImplementation((bool) => returnResult(bool, async)),
  setObj: jest.fn().mockImplementation((obj) => returnResult(obj, async)),
});

const setupComposition = (async = false) => {
  const first = composable(false, async);
  const firstValued = composable(true, async);
  const last = composable(false, async);
  const array = [first, composable(false, async), firstValued, last];
  const getter = async ? composedGetterAsync : composedGetter;
  const setter = async ? composedSetterAsync : composedSetter;
  const composed = {
    getBool: getter(array, 'getBool'),
    getObj: getter(array, 'getObj', null),
    setBool: setter(array, 'setBool'),
    setObj: setter(array, 'setObj'),
  };
  return {
    composed,
    first,
    firstValued,
    last,
  };
};

const setupAsyncComposition = () => setupComposition(true);

describe('when composing', () => {
  it('all setters should be called', () => {
    expect.hasAssertions();
    const { composed, first, last } = setupComposition();

    composed.setBool(true);
    expect(first.setBool).toHaveBeenCalledTimes(1);
    expect(last.setBool).toHaveBeenCalledTimes(1);

    composed.setObj({});
    expect(first.setObj).toHaveBeenCalledTimes(1);
    expect(last.setObj).toHaveBeenCalledTimes(1);
  });

  it('should return last setter result', () => {
    expect.hasAssertions();
    const { composed, last } = setupComposition();

    const resBool = composed.setBool(true);
    expect(last.setBool).toHaveBeenCalledTimes(1);
    expect(resBool).toBe(true);

    const resObj = composed.setObj({});
    expect(last.setObj).toHaveBeenCalledTimes(1);
    expect(resObj).toStrictEqual({});
  });

  it('should call only until one getter returns a value', () => {
    expect.hasAssertions();
    const { composed, first, firstValued, last } = setupComposition();
    const resBool = composed.getBool();

    expect(first.getBool).toHaveBeenCalledTimes(1);
    expect(firstValued.getBool).toHaveBeenCalledTimes(1);
    expect(last.getBool).toHaveBeenCalledTimes(0);
    expect(resBool).toBe(true);

    const resObj = composed.getObj();
    expect(first.getObj).toHaveBeenCalledTimes(1);
    expect(firstValued.getObj).toHaveBeenCalledTimes(1);
    expect(last.getObj).toHaveBeenCalledTimes(0);
    expect(resObj).toStrictEqual({});
  });
});

describe('when composing async objects', () => {
  it('all setters should be called', () => {
    expect.hasAssertions();
    const { composed, first, last } = setupAsyncComposition();

    composed.setBool(true);
    expect(first.setBool).toHaveBeenCalledTimes(1);
    expect(last.setBool).toHaveBeenCalledTimes(1);

    composed.setObj({});
    expect(first.setObj).toHaveBeenCalledTimes(1);
    expect(last.setObj).toHaveBeenCalledTimes(1);
  });

  it('should return last setter result', async () => {
    expect.hasAssertions();
    const { composed, last } = setupComposition();

    const resBool = await composed.setBool(true);
    expect(last.setBool).toHaveBeenCalledTimes(1);
    expect(resBool).toBe(true);

    const resObj = await composed.setObj({});
    expect(last.setObj).toHaveBeenCalledTimes(1);
    expect(resObj).toStrictEqual({});
  });

  it('should call only until one getter returns a value', async () => {
    expect.hasAssertions();
    const { composed, first, firstValued, last } = setupAsyncComposition();
    const resBool = await composed.getBool();

    expect(first.getBool).toHaveBeenCalledTimes(1);
    expect(firstValued.getBool).toHaveBeenCalledTimes(1);
    expect(last.getBool).toHaveBeenCalledTimes(0);
    expect(resBool).toBe(true);

    const resObj = await composed.getObj();
    expect(first.getObj).toHaveBeenCalledTimes(1);
    expect(firstValued.getObj).toHaveBeenCalledTimes(1);
    expect(last.getObj).toHaveBeenCalledTimes(0);
    expect(resObj).toStrictEqual({});
  });
});

describe('isRequired', () => {
  it('should throw an error', () => {
    expect.assertions(1);
    expect(() => {
      isRequired('test');
    }).toThrow('function "test" is required for Application Service');
  });
});
