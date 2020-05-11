import mockAxios from 'jest-mock-axios';
import apiRepo from './api/kata';
import dbRepo from './db/kata';

jest.mock('../db');

describe.each([
  [{ type: 'api', repo: apiRepo }],
  [{ type: 'db', repo: dbRepo }],
])('KataRepo (global)', ({ type, repo }) => {
  describe(`${type}`, () => {
    it('should be a Kata repository', () => {
      expect.assertions(1);
      expect(repo).toBeKataRepo();
    });
  });
});

describe('kataRepo (api)', () => {
  it('should request all katas', () => {
    expect.hasAssertions();
    apiRepo.getAllKatas();
    expect(mockAxios.get).toHaveBeenCalledWith('/api/katas/');
  });

  it('should request katas by tag', () => {
    expect.hasAssertions();
    apiRepo.getAllKatasWithTag('newbie');
    expect(mockAxios.get).toHaveBeenCalledWith('/api/katas/', {
      params: {
        tag: 'newbie',
      },
    });
  });

  it('should request kata by id', () => {
    expect.hasAssertions();
    apiRepo.getKataWithId('id-xxx-xxx-xxx');
    expect(mockAxios.get).toHaveBeenCalledWith('/api/katas/id-xxx-xxx-xxx');
  });
});

describe('kataRepo (db)', () => {
  it('should request all katas', async () => {
    expect.assertions(2);
    expect(await dbRepo.getAllKatas()).toBeArray();
    expect(await dbRepo.getAllKatas()).not.toBeEmpty();
  });

  it('should request katas by tag', async () => {
    expect.assertions(1);
    expect(await dbRepo.getAllKatasWithTag('test')).toBeArray();
    /*
    TODO: Sequelize-mock does not support association query via include
    await expect(dbRepo.getAllKatasWithTag('test')).resolves.not.toBeEmpty();
    await expect(dbRepo.getAllKatasWithTag('wontFind')).resolves.toBeArray();
    await expect(dbRepo.getAllKatasWithTag('wontFind')).resolves.toBeEmpty();
    */
  });

  /*
  it seems that Sequelize-mock does not support creation with association
  */
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should save katas', async () => {
    expect.assertions(1);
    expect(await dbRepo.save(mockKataEntity())).toBeKataEntity();
  });
});
