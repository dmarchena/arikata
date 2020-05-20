/**
 * @jest-environment jsdom
 */
import KataList from './KataList';
import { shallowMount, mount } from '@vue/test-utils';
import Vue from 'vue';

jest.mock('../application');
const localVue = createCustomLocalVue();

describe('KataList', () => {
  it('should render', () => {
    const wrapper = shallowMount(KataList, { localVue });
    expect.hasAssertions();
    expect(wrapper.exists()).toBe(true);
  });

  it('should render a list of katas', async () => {
    const wrapper = shallowMount(KataList, { localVue });
    expect.hasAssertions();
    await Vue.nextTick(); // Load after creation
    await Vue.nextTick(); // Generate li's
    expect(wrapper.findAll('li').length).toBeGreaterThan(0);
  });
});
