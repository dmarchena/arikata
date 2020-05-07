/**
 * @jest-environment jsdom
 */
import mixin from './mixin';
import { mount, shallowMount } from '@vue/test-utils';
import Vue from 'vue';

describe('BEM mixin', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount({
      name: 'VTestList',
      template: `<ul>
        <li :class="bem('item')"></li>
        <li :class="bem('item', 'last')"></li>
      </ul>`,
      mixins: [mixin],
    });
  });

  it('should capture component name', () => {
    expect.hasAssertions();
    expect(wrapper.vm.bemBlocks).toBeArrayOfSize(1);
    expect(wrapper.vm.bemBlocks).toContain('v-test-list');
  });

  it('should add block name to root element', () => {
    expect.hasAssertions();
    expect(wrapper.find('ul').classes()).toContain('v-test-list');
  });

  it('should add right class to element', () => {
    expect.hasAssertions();
    const firstLi = wrapper.find('li');
    expect(firstLi.classes()).toContain('v-test-list__item');
  });

  it('should add right class and modifiers to element', () => {
    expect.hasAssertions();
    const secondLi = wrapper.findAll('li').at(1);
    expect(secondLi.classes()).toIncludeSameMembers([
      'v-test-list__item',
      'v-test-list__item--last',
    ]);
  });

  describe('Various block names', () => {
    beforeEach(async () => {
      wrapper.vm.bemBlocks = wrapper.vm.bemBlocks.concat(['custom-block']);
      await Vue.nextTick();
    });

    it('should add extra classes to block', async () => {
      expect.hasAssertions();
      expect(wrapper.find('ul').classes()).toIncludeSameMembers([
        'v-test-list',
        'custom-block',
      ]);
    });

    it('should add extra classes to elements', async () => {
      expect.hasAssertions();
      expect(wrapper.find('li').classes()).toIncludeSameMembers([
        'v-test-list__item',
        'custom-block__item',
      ]);
    });
  });
});
