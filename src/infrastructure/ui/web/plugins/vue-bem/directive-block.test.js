/**
 * @jest-environment jsdom
 */
import directiveBlock from './directive-block';
import directive from './directive';
import mixin from './mixin';
import { shallowMount, createLocalVue } from '@vue/test-utils';

const localVue = createLocalVue();
localVue.directive('bem-block', directiveBlock);
localVue.directive('bem', directive);

describe('v-bem-block directive', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(
      {
        name: 'VTestList',
        template: `<ul v-bem-block="['custom-block']" v-bem.visible>
          <li v-bem:item></li>
        </ul>`,
        mixins: [mixin],
      },
      {
        localVue,
      }
    );
  });

  it('should add extra block names to root element', () => {
    expect.hasAssertions();
    expect(wrapper.find('ul').classes()).toContain('custom-block');
  });

  it('should add modifiers for all block names', () => {
    expect.hasAssertions();
    const classes = wrapper.find('ul').classes();
    expect(classes).toIncludeSameMembers([
      'v-test-list',
      'v-test-list--visible',
      'custom-block',
      'custom-block--visible',
    ]);
  });

  it('should add extra classes to element', () => {
    expect.hasAssertions();
    expect(wrapper.find('li').classes()).toIncludeSameMembers([
      'v-test-list__item',
      'custom-block__item',
    ]);
  });
});
