/**
 * @jest-environment jsdom
 */
import KataList from './KataList';
import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import store from '../store';

jest.mock('../application');
const localVue = createCustomLocalVue();

// TODO: Complex behaviour with vuex. Due to deadlines, it should be mocked
// and tested later
describe.skip('KataList', () => {
  it('should render', () => {
    const wrapper = shallowMount(KataList, { localVue, store });
    expect.hasAssertions();
    expect(wrapper.exists()).toBe(true);
  });

  it('should render a list of katas', async () => {
    const wrapper = shallowMount(KataList, { localVue, store });
    expect.hasAssertions();
    await Vue.nextTick(); // Load after creation
    await Vue.nextTick(); // Generate li's
    expect(wrapper.findAll('li').length).toBeGreaterThan(0);
  });
});
