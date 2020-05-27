import mockAxios from 'jest-mock-axios';
import apiRepo from './kata';

describe('kataRepo (api)', () => {
  // eslint-disable-next-line jest/no-hooks
  afterEach(() => {
    mockAxios.reset();
  });

  describe('get all katas', () => {
    it('should call to GET endpoint of the api', () => {
      expect.hasAssertions();
      apiRepo.getAllKatas();
      expect(mockAxios.get).toHaveBeenCalledWith('/api/katas/');
    });
  });

  describe('get all katas tagged with a tag', () => {
    it('should call to GET endpoint of the api with a tag param', () => {
      expect.hasAssertions();
      apiRepo.getAllKatasWithTag('newbie');
      expect(mockAxios.get).toHaveBeenCalledWith('/api/katas/', {
        params: {
          tag: 'newbie',
        },
      });
    });
  });

  describe('get a single kata', () => {
    it('should call to GET endpoint of the api plus an id', () => {
      expect.hasAssertions();
      const kata = mockKataEntity();
      apiRepo.getKataWithId(kata.id);
      expect(mockAxios.get).toHaveBeenCalledWith(`/api/katas/${kata.id}`);
    });
  });

  describe('save a new kata', () => {
    it('should call to save endpoint of the api', () => {
      expect.hasAssertions();
      const kata = mockKataEntity();
      const kataDto = mockKataDto();
      apiRepo.save(kata);
      expect(mockAxios.post).toHaveBeenCalledWith('/api/katas/', kataDto);
    });
  });

  describe('update a kata', () => {
    it('should call to update endpoint of the api', () => {
      expect.hasAssertions();
      const kata = mockKataEntity();
      const kataData = mockKataData();
      apiRepo.update(kata);
      expect(mockAxios.put).toHaveBeenCalledWith(
        `/api/katas/${kata.id}`,
        kataData
      );
    });
  });

  describe('when removing a kata', () => {
    const kata = mockKataEntity();

    it('should call to update endpoint of the api', () => {
      expect.hasAssertions();
      apiRepo.remove(kata.id);
      expect(mockAxios.delete).toHaveBeenCalledWith(`/api/katas/${kata.id}`);
    });

    it('should return true if kata has been deleted', async () => {
      expect.hasAssertions();
      const promise = apiRepo.remove(kata.id);
      mockAxios.mockResponse({
        status: 204,
      });
      const deleted = await promise;
      expect(deleted).toBe(true);
    });
  });
});
