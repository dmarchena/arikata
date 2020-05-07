import { parseCssCase, bemElement, bemBaseAndModifiers } from './bem';

describe('BEM', () => {
  describe('parseCssCase()', () => {
    it.each([
      ['VTestComponent', 'v-test-component'],
      ['right-class', 'right-class'],
      ['kebabCase', 'kebab-case'],
      ['low_hyphened_class', 'low-hyphened-class'],
    ])('should return a hyphenated classname (%s)', (input, expected) => {
      expect.assertions(1);
      expect(parseCssCase(input)).toBe(expected);
    });
  });

  describe('bemElement()', () => {
    it('should return a valid bem element class', () => {
      expect.assertions(2);
      expect(bemElement('block-name', 'element-name')).toBe(
        'block-name__element-name'
      );
      expect(bemElement('block-name')('element-name')).toBe(
        'block-name__element-name'
      );
    });
  });

  describe('bemBaseAndModifiers()', () => {
    it('should return a valid bem element class', () => {
      expect.hasAssertions();
      expect(bemBaseAndModifiers('base')).toStrictEqual(['base']);
      expect(bemBaseAndModifiers('base', 'visible')).toStrictEqual([
        'base',
        'base--visible',
      ]);
      expect(bemBaseAndModifiers('base', ['visible'])).toStrictEqual([
        'base',
        'base--visible',
      ]);
      expect(bemBaseAndModifiers('base', ['visible', 'open'])).toStrictEqual([
        'base',
        'base--visible',
        'base--open',
      ]);
      expect(
        bemBaseAndModifiers('base', [['visible'], ['open']])
      ).toStrictEqual(['base', 'base--visible', 'base--open']);
      expect(
        bemBaseAndModifiers('base', { visible: false, open: true })
      ).toStrictEqual(['base', 'base--open']);
      expect(
        bemBaseAndModifiers('base', [
          'not-hidden',
          [{ visible: false, open: true }],
          [{ clickable: false }, 'last'],
        ])
      ).toStrictEqual(['base', 'base--not-hidden', 'base--open', 'base--last']);
    });
  });
});
