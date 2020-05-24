/**
 * @jest-environment jsdom
 */
import SignIn from './SignIn';
import { shallowMount, mount } from '@vue/test-utils';
import Vue from 'vue';

jest.mock('../application');
const localVue = createCustomLocalVue();

describe('SignIn', () => {
  it('should render', () => {
    const wrapper = shallowMount(SignIn, { localVue });
    expect.hasAssertions();
    expect(wrapper.exists()).toBe(true);
  });
});
