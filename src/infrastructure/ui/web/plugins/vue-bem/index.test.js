/**
 * @jest-environment jsdom
 */
import vueBemPlugin from './index';
import { createLocalVue, shallowMount, mount } from '@vue/test-utils';

describe('bem plugin installation', () => {
  it('should be installed', async () => {
    const localVue = createLocalVue();
    localVue.use(vueBemPlugin);
    const wrapper = shallowMount(
      {
        name: 'TestBlock',
        template: `<div><span :class="bem('elem')"></span></div>`,
      },
      { localVue }
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.find('span').classes()).toContain('test-block__elem');
    expect(wrapper.find('div').classes()).toContain('test-block');
  });
});
