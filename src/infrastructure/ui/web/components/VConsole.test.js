/**
 * @jest-environment jsdom
 */
import { shallowMount } from '@vue/test-utils';
import VConsole from './VConsole';
import Vue from 'vue';

describe('VConsole', () => {
  let wrapper;
  let output;

  beforeAll(() => {
    wrapper = shallowMount(VConsole, { localVue: createCustomLocalVue() });
    output = wrapper.find('pre');
  });

  it('should render', () => {
    expect.hasAssertions();
    expect(wrapper.exists()).toBe(true);
  });

  it('should log', async () => {
    expect.hasAssertions();
    expect(output.text()).toBe('');

    wrapper.vm.log('line 1');
    await Vue.nextTick();
    expect(output.text()).toContain('line 1');

    wrapper.vm.log('line 2');
    await Vue.nextTick();
    expect(output.text()).toContain('line 1');
    expect(output.text()).toContain('line 2');
  });

  it('should clear', async () => {
    expect(wrapper.text()).not.toBeEmpty();
    wrapper.vm.clear();
    await Vue.nextTick();
    expect(output.text()).toBeEmpty();
  });
});
