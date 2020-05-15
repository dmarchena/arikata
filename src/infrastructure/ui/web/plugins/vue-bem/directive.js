import {
  keys,
  partition,
  compose,
  symmetricDifference,
  includes,
  __,
  equals,
} from 'ramda';

const classnames = ({ arg, modifiers, value }, vnode, oldBlocks = false) => {
  const isElement = arg !== undefined;
  const component = vnode.context;
  const bemMods = keys(modifiers);
  bemMods.push(value);
  return isElement
    ? component.bem(arg, bemMods, oldBlocks)
    : component.bemBlock(bemMods, oldBlocks);
};

const diffClassnames = (oldClassnames) =>
  compose(
    partition(includes(__, oldClassnames)),
    symmetricDifference(oldClassnames)
  );

const isElementNode = (el, vnode) => !el.isSameNode(vnode.context.$el);

const directive = {
  bind(el, bindings, vnode) {
    const initialClassnames = classnames(bindings, vnode);
    el.classList.add(...initialClassnames);
  },
  update(el, bindings, vnode) {
    const { value, oldValue } = bindings;

    if (
      equals(value, oldValue) &&
      equals(vnode.context.bemBlocks, vnode.context.bemBlocksOld)
    ) {
      return;
    }

    const newClassnames = classnames(bindings, vnode);
    const oldClassnames = classnames(
      {
        ...bindings,
        value: oldValue,
      },
      vnode,
      true
    );
    const [remove, add] = diffClassnames(oldClassnames)(newClassnames);
    el.classList.add(...add);
    el.classList.remove(...remove);
  },
};

export default directive;
