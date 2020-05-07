/**
 * @jest-environment jsdom
 */
import directive from './directive';
import mixin from './mixin';
import { shallowMount, createLocalVue } from '@vue/test-utils';

const localVue = createLocalVue();
localVue.directive('bem', directive);

describe('v-bem directive', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(
      {
        name: 'VTestList',
        data() {
          return {
            disabled: false,
          };
        },
        template: `<ul>
            <li v-bem:item></li>
            <li v-bem:item.not-first.not-last></li>
            <li v-bem:item.last>
              <button v-bem:btn.primary="{ active: !disabled }">add</button>
            </li>
          </ul>`,
        mixins: [mixin],
      },
      {
        localVue,
      }
    );
  });

  it('should add right class to element', () => {
    expect.hasAssertions();
    const firstLi = wrapper.find('li');
    expect(firstLi.classes()).toContain('v-test-list__item');
  });

  it('should add right class and modifiers to element', () => {
    expect.hasAssertions();
    const lastLi = wrapper.findAll('li').at(2);
    expect(lastLi.classes()).toIncludeSameMembers([
      'v-test-list__item',
      'v-test-list__item--last',
    ]);
  });

  it('should add right class and various modifiers to element', () => {
    expect.hasAssertions();
    const secondLi = wrapper.findAll('li').at(1);
    expect(secondLi.classes()).toIncludeSameMembers([
      'v-test-list__item',
      'v-test-list__item--not-first',
      'v-test-list__item--not-last',
    ]);
  });

  it('should accept complex modifiers', () => {
    expect.hasAssertions();
    const btn = wrapper.find('button');
    expect(btn.classes()).toIncludeSameMembers([
      'v-test-list__btn',
      'v-test-list__btn--primary',
      'v-test-list__btn--active',
    ]);
  });

  it('should update complex modifiers', async () => {
    expect.hasAssertions();
    wrapper.setData({
      disabled: true,
    });
    await localVue.nextTick();
    const btn = wrapper.find('button');
    expect(btn.classes()).toIncludeSameMembers([
      'v-test-list__btn',
      'v-test-list__btn--primary',
    ]);
  });
});
