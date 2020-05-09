/**
 * @jest-environment jsdom
 */
import VKataAdmin from './VKataAdmin';
import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
jest.mock('../application');
import application from '../application';

describe('VKataAdmin', () => {
  it('should render', () => {
    const wrapper = shallowMount(VKataAdmin);
    expect.hasAssertions();
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('should submit data', async () => {
    const spy = jest.spyOn(application.manageKataService, 'save');
    const wrapper = shallowMount(VKataAdmin, {
      data() {
        return {
          name: 'test-name',
          details: 'test-details',
          code: 'const code = true',
          test: '// tests',
          tags: ['new', 'perf'],
        };
      },
    });
    expect.hasAssertions();
    wrapper.find('form').trigger('submit');
    await Vue.nextTick();
    expect(spy).toHaveBeenNthCalledWith(1, {
      name: 'test-name',
      details: 'test-details',
      code: 'const code = true',
      test: '// tests',
      tags: ['new', 'perf'],
    });
    spy.mockRestore();
  });
});
