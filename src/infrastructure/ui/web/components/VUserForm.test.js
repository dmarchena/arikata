/**
 * @jest-environment jsdom
 */
import VUserForm from './VUserForm';
import { shallowMount, mount } from '@vue/test-utils';
import Vue from 'vue';

jest.mock('../application');
const localVue = createCustomLocalVue();

describe('VUserForm', () => {
  it('should render', () => {
    const wrapper = shallowMount(VUserForm, { localVue });
    expect.hasAssertions();
    expect(wrapper.exists()).toBe(true);
  });
});
