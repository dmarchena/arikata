const addBlockNames = (bindings, vnode) => {
  const { value } = bindings;
  vnode.context.bemBlocks = vnode.context.bemBlocks.concat(value);
};

const directive = {
  bind(el, bindings, vnode) {
    addBlockNames(bindings, vnode);
  },
};

export default directive;
