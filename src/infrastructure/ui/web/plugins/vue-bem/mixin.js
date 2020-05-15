import { bemBaseAndModifiers, bemElement, parseCssCase } from './bem';
import { chain } from 'ramda';

export default {
  data() {
    return {
      bemBlocks: [],
      bemBlocksOld: [],
    };
  },

  created() {
    const name = this.$options.name;
    const hasName = name && name !== '';
    const blockName = hasName && parseCssCase(name);
    blockName && this.bemBlocks.push(blockName);
  },

  watch: {
    bemBlocks(newValue, oldValue) {
      this.bemBlocksOld = oldValue;
      if (this.$el && this.$el.classList) {
        this.$el.classList.add(...newValue);
      }
    },
  },

  methods: {
    bem(elementName, modifiers = [], old = false) {
      const blocks = old ? this.bemBlocksOld : this.bemBlocks;
      let bemElementClassnames = blocks.map((b) => bemElement(b, elementName));
      return chain(
        (element) => bemBaseAndModifiers(element, modifiers),
        bemElementClassnames
      );
    },
    bemBlock(modifiers = [], old = false) {
      const blocks = old ? this.bemBlocksOld : this.bemBlocks;
      return chain((block) => bemBaseAndModifiers(block, modifiers), blocks);
    },
  },
};
