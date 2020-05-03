let testList = [];
let testCount = 0;

const test = (should, fn) => {
  const i = ++testCount;
  testList.push(() => {
    try {
      fn();
      console.log(`[PASS] (${i}) > ${should}`);
      return true;
    } catch (e) {
      console.error(`[FAIL] (${i}) > ${should}\r\n${e.message}`);
      return false;
    }
  });
};

const reset = () => {
  testList = [];
  testCount = 0;
};

const run = () => testList.reduce((res, t) => t() && res, true);

const it = test;

const lib = {
  it,
  reset,
  run,
  test,
};

export { it, reset, run, test };
export default lib;
