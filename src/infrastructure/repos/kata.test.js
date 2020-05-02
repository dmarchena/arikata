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
    apiRepo.allKatas();
    expect(mockAxios.get).toHaveBeenCalledWith('/api/katas/');
  });
  it('should request katas by tag', () => {
    expect.hasAssertions();
    apiRepo.katasOfTag('newbie');
    expect(mockAxios.get).toHaveBeenCalledWith('/api/katas/newbie');
  });
});

describe('kataRepo (db)', () => {
  it('should request all katas', async () => {
    expect.assertions(2);
    expect(await dbRepo.allKatas()).toBeArray();
    expect(await dbRepo.allKatas()).not.toBeEmpty();
  });
  it('should request katas by tag', async () => {
    expect.assertions(1);
    expect(await dbRepo.katasOfTag('test')).toBeArray();
    /*
    TODO: Sequelize-mock does not support association query via include
    await expect(dbRepo.katasOfTag('test')).resolves.not.toBeEmpty();
    await expect(dbRepo.katasOfTag('wontFind')).resolves.toBeArray();
    await expect(dbRepo.katasOfTag('wontFind')).resolves.toBeEmpty();
    */
  });
});
