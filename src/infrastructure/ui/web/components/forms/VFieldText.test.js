/**
 * @jest-environment jsdom
 */
import VFieldText from './VFieldText';
import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import vueBemPlugin from '../../plugins/vue-bem';

const localVue = createLocalVue();
localVue.use(vueBemPlugin);

describe('VFieldText', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(VFieldText, {
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
    const input = wrapper.find('input');
    expect(input.attributes('id')).toBe('id-test');
  });

  it('should generate an id if it is not passed', async () => {
    expect.hasAssertions();
    wrapper.setProps({
      id: '',
    });
    await Vue.nextTick();
    const id = wrapper.find('input').attributes('id');
    expect(id).not.toBe('id-test');
    expect(id.length).toBeGreaterThan(1);
  });

  it('should has name', () => {
    expect.hasAssertions();
    const input = wrapper.find('input');
    expect(input.attributes('name')).toBe('name-test');
  });

  it('should use slot as label', () => {
    expect.hasAssertions();
    expect(wrapper.find('.field-text__label').text()).toBe('Enter text');
  });

  it('should support v-model', async () => {
    expect.hasAssertions();

    const parent = mount({
      data: {
        text: 'default',
      },
      template: '<div><VFieldText v-model="text">Enter text</VFieldText></div>',
      components: { VFieldText },
    });

    await Vue.nextTick();
    expect(parent.vm.text).not.toBe('tested');
    parent.find('input').setValue('tested');
    await Vue.nextTick();
    expect(parent.vm.text).toBe('tested');
  });

  describe('when using it for a password', () => {
    it('should hide the input content', async () => {
      expect.assertions(2);
      await wrapper.setProps({
        password: true,
      });
      expect(wrapper.find('[type="password"').exists()).toBe(true);
      expect(wrapper.find('[type="text"').exists()).toBe(false);
    });
  });
});
