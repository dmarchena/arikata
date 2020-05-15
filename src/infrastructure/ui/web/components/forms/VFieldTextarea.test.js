/**
 * @jest-environment jsdom
 */
import VFieldTextarea from './VFieldTextarea';
import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import vueBemPlugin from '../../plugins/vue-bem';

const localVue = createLocalVue();
localVue.use(vueBemPlugin);

describe('VFieldTextarea', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(VFieldTextarea, {
      propsData: {
        id: 'id-test',
        name: 'name-test',
      },
      slots: {
        default: 'Enter text',
      },
      localVue,
    });
  });

  it('should render', () => {
    expect.hasAssertions();
    expect(wrapper.isEmpty()).not.toBe(true);
  });

  it('should has id', () => {
    expect.hasAssertions();
    const textarea = wrapper.find('textarea');
    expect(textarea.attributes('id')).toBe('id-test');
  });

  it('should generate an id if it is not passed', async () => {
    expect.hasAssertions();
    wrapper.setProps({
      id: '',
    });
    await Vue.nextTick();
    const id = wrapper.find('textarea').attributes('id');
    expect(id).not.toBe('id-test');
    expect(id.length).toBeGreaterThan(1);
  });

  it('should has name', () => {
    expect.hasAssertions();
    const textarea = wrapper.find('textarea');
    expect(textarea.attributes('name')).toBe('name-test');
  });

  it('should use slot as label', () => {
    expect.hasAssertions();
    expect(wrapper.find('.field-textarea__label').text()).toBe('Enter text');
  });

  it('should support v-model', async () => {
    expect.hasAssertions();

    const parent = mount({
      data: {
        text: 'default',
      },
      template:
        '<div><VFieldTextarea v-model="text">Enter text</VFieldTextarea></div>',
      components: { VFieldTextarea },
      localVue,
    });

    await Vue.nextTick();
    expect(parent.vm.text).not.toBe('tested');
    parent.find('textarea').setValue('tested');
    await Vue.nextTick();
    expect(parent.vm.text).toBe('tested');
  });
});
