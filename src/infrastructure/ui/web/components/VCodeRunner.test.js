/**
 * @jest-environment jsdom
 */
import { shallowMount } from '@vue/test-utils';
import VCodeRunner from './VCodeRunner';
import Vue from 'vue';

describe('VCodeRunner', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallowMount(VCodeRunner, {
      code: `
        var sum = 0;
        sum = 1 + 2;
        console.log(3);
      `,
    });
  });

  it('should render', () => {
    expect.hasAssertions();
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it.skip('should emit a log event when running code', () => {
    // Apparently this component functionality is not supported by JSDOM
    expect.hasAssertions();
    expect(() => wrapper.vm.run()).toEmit(wrapper, 'log');
    expect(() => wrapper.vm.run()).toEmit(wrapper, 'log', 3);
  });
});
