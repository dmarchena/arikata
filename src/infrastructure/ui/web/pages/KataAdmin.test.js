/**
 * @jest-environment jsdom
 */
import { shallowMount, mount } from '@vue/test-utils';
import Vue from 'vue';

import KataAdmin from './KataAdmin';

jest.mock('../application');
import application from '../application';

const localVue = createCustomLocalVue();

describe('KataAdmin', () => {
  it('should render', () => {
    const wrapper = shallowMount(KataAdmin);
    expect.hasAssertions();
    expect(wrapper.exists()).toBe(true);
  });

  describe('Save new kata', () => {
    it('should submit data', async () => {
      expect.hasAssertions();
      const spy = jest.spyOn(application.manageKataService, 'save');
      const wrapper = mount(KataAdmin, {
        data() {
          return mockKataData();
        },
        localVue,
      });
      await wrapper.find('#save').trigger('click');
      expect(spy).toHaveBeenNthCalledWith(1, mockKataData());
      spy.mockRestore();
    });
  });

  describe('Edit a existing kata', () => {
    let spyGetKata;

    beforeEach(() => {
      spyGetKata = jest
        .spyOn(application.manageKataService, 'getKataWithId')
        .mockImplementation(() => Promise.resolve(mockKataDto()));
    });

    afterEach(() => {
      spyGetKata.mockRestore();
    });

    it('should load kata data', async () => {
      expect.hasAssertions();
      const wrapper = shallowMount(KataAdmin, {
        propsData: {
          id: 'foo-uuid-001',
        },
      });
      await wrapper.setProps({
        id: 'foo-uuid-002',
      });
      expect(spyGetKata).toHaveBeenCalledTimes(2);
    });

    it('should submit modified kata data', async () => {
      expect.hasAssertions();
      const spyUpdate = jest.spyOn(application.manageKataService, 'update');

      const kata = mockKataDto();
      const wrapper = mount(KataAdmin, {
        propsData: {
          id: kata.id,
        },
        localVue,
      });
      await wrapper.vm.$nextTick();
      await wrapper.setData({
        name: 'New name',
      });
      await wrapper.find('#save').trigger('click');
      expect(spyUpdate).toHaveBeenNthCalledWith(1, {
        ...kata,
        name: 'New name',
      });
    });
  });
});
