import directive from './directive';
import directiveBlock from './directive-block';
import mixin from './mixin';

const vueBemPlugin = {
  install(Vue) {
    Vue.mixin(mixin);
    Vue.directive('bem-block', directiveBlock);
    Vue.directive('bem', directive);
  },
};

export default vueBemPlugin;
