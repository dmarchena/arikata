import arrify from 'arrify';

const addBlockNames = (bindings, vnode) => {
  const { arg, value } = bindings;
  if (arg) {
    vnode.context.bemBlocks = vnode.context.bemBlocks.concat(arrify(arg));
  }
  if (value) {
    vnode.context.bemBlocks = vnode.context.bemBlocks.concat(arrify(value));
  }
};

const directive = {
  bind(el, bindings, vnode) {
    addBlockNames(bindings, vnode);
  },
};

export default directive;
