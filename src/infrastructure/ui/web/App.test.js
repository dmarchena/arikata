/**
 * @jest-environment jsdom
 */
import App from './App';
import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';

jest.mock('./application');

describe('App', () => {
  it('should render', () => {
    const wrapper = shallowMount(App);
    expect.hasAssertions();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
