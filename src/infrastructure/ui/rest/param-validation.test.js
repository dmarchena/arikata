import {
  isStringWithValue,
  hasReceivedQueryStringParam,
} from './param-validation';

describe('api param validation', () => {
  describe('isStringWithValue()', () => {
    it('should return true if a non-empty string is passed', () => {
      expect.assertions(1);
      expect(isStringWithValue('a')).toBe(true);
    });

    it.each([[undefined], [''], [['']], [{ a: 'b' }]])(
      'should return false if it receives: %s',
      (input) => {
        expect(isStringWithValue(input)).toBe(false);
      }
    );

    it('should return false if it receives no params', () => {
      expect.assertions(1);
      expect(isStringWithValue()).toBe(false);
    });
  });

  describe('hasReceivedQueryStringParam()', () => {
    const req = (val) => ({ query: { p: val } });
    const hasReceivedQueryStringParamP = hasReceivedQueryStringParam('p');

    it('should return true if request receives the query string param with value', () => {
      expect.assertions(1);
      expect(hasReceivedQueryStringParamP(req('test'))).toBe(true);
    });

    it.each([[undefined], [''], [['']], [{ a: 'b' }]])(
      'should return false if request receives: %s',
      (input) => {
        expect(hasReceivedQueryStringParamP(req(input))).toBe(false);
      }
    );
    it('should return false if request has no query string', () => {
      expect.assertions(1);
      expect(hasReceivedQueryStringParamP({})).toBe(false);
    });
  });
});
