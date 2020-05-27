/**
 * @jest-environment jsdom
 */
import SigningPage from './SigningPage';
import { shallowMount, mount } from '@vue/test-utils';
import Vue from 'vue';

jest.mock('../application');
const localVue = createCustomLocalVue();

describe('SigningPage', () => {
  it('should render', () => {
    const wrapper = shallowMount(SigningPage, { localVue });
    expect.hasAssertions();
    expect(wrapper.exists()).toBe(true);
  });
});
