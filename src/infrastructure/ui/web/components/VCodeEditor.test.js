/**
 * @jest-environment jsdom
 */
import { shallowMount, mount } from '@vue/test-utils';
import VCodeEditor from './VCodeEditor';
import { codemirror } from 'vue-codemirror';
import Vue from 'vue';

jest.mock('../application');
jest.mock('vue-codemirror');

describe('VCodeEditor', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallowMount(VCodeEditor);
  });

  it('should render', () => {
    expect.hasAssertions();
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('should support v-model', async () => {
    expect.hasAssertions();

    const parent = mount({
      data: { code: null },
      template: '<div><VCodeEditor v-model="code"></VCodeEditor></div>',
      components: { VCodeEditor },
    });

    expect(parent.vm.code).not.toBe('new code');

    parent.find(codemirror).setValue('new code');
    await Vue.nextTick();

    expect(parent.vm.code).toBe('new code');
  });
});
