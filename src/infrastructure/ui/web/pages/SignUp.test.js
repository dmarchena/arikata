/**
 * @jest-environment jsdom
 */
import SignUp from './SignUp';
import { shallowMount, mount } from '@vue/test-utils';
import Vue from 'vue';

jest.mock('../application');
const localVue = createCustomLocalVue();

describe('SignUp', () => {
  it('should render', () => {
    const wrapper = shallowMount(SignUp, { localVue });
    expect.hasAssertions();
    expect(wrapper.exists()).toBe(true);
  });
});
