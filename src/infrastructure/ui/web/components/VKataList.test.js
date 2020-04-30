/**
 * @jest-environment jsdom
 */
import VKataList from './VKataList';
import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';

jest.mock('../application');

describe('VKataList', () => {
  it('should render', () => {
    const wrapper = shallowMount(VKataList);
    expect.hasAssertions();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('should render a list of katas', async () => {
    const wrapper = shallowMount(VKataList);
    expect.hasAssertions();
    await Vue.nextTick();
    expect(wrapper.findAll('li').length).toBeGreaterThan(0);
  });
});
