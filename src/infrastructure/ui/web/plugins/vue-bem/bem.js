import { is, curry, chain, flatten, compose, map, ifElse } from 'ramda';
import { paramCase } from 'change-case';
import arrify from 'arrify';

const isObject = is(Object);
const flatMap = chain;

/**
 * Returns an array of class names that passes their condition
 * @param {Object} obj { classname: boolean } object
 * @returns {Array.<string>} Array of class names which has true as value in given object
 */
const classnamesArrayFromConditionalObject = (obj) =>
  Object.keys(obj).reduce((result, classname) => {
    let condition = obj[classname]; // value is a true or false condition
    if (condition) {
      result.push(classname);
    }
    return result;
  }, []);

const classnamesIterator = (iteratorFn) => {
  const processArrayItem = ifElse(is(String), iteratorFn, (any) =>
    recursion(any)
  );
  const processArray = compose(flatten, map(processArrayItem), flatten);
  const recursion = (classnames) => {
    let result;
    if (Array.isArray(classnames)) {
      result = processArray(classnames);
    } else if (isObject(classnames)) {
      result = recursion(classnamesArrayFromConditionalObject(classnames));
    } else {
      // string
      result = recursion(arrify(classnames));
    }
    return result;
  };
  return recursion;
};

/**
 * Returns a function to build a BEM element class
 * @param {string} block Block name
 * @returns {Function} Curried function that accepts an string and returns a bem element class
 */
const bemElement = curry((block, element) => `${block}__${element}`);

/**
 * Builds an array of modifier classes for a BEM block or element
 * @param {String} baseClass - base block or element
 * @param {Array|Object|String} modifiers - modifiers to apply
 * @returns {Array} - modifier classes for given base class
 */
const bemModifiers = (baseClass, modifiers) =>
  flatMap(
    classnamesIterator((mod) => `${baseClass}--${mod}`),
    arrify(modifiers)
  );

/**
 * Builds an array of classes which contains:
 * - The main class for a BEM block or element
 * - The modifier classes for that BEM block or element
 * @param {String} bemClassname - base block or element
 * @param {Array|Object|String} modifiers - modifiers to apply
 * @returns {Array} - modifier classes for given base class
 */
const bemBaseAndModifiers = (bemClassname, modifiers = []) => [
  bemClassname,
  ...bemModifiers(bemClassname, modifiers),
];

const parseCssCase = paramCase;

const exports = {
  parseCssCase,
  bemBaseAndModifiers,
  bemElement,
};

export { parseCssCase, bemBaseAndModifiers, bemElement };
export default exports;
