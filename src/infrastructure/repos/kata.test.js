import apiRepo from './api/kata';
import dbRepo from './db/kata';
import mockAxios from 'jest-mock-axios';

jest.mock('../db');

describe.each([
  [{ type: 'api', repo: apiRepo }],
  [{ type: 'db', repo: dbRepo }],
])('KataRepo (global)', ({ type, repo }) => {
  describe(type, () => {
    it('should be a Kata repository', () => {
      expect(repo).toBeKataRepo();
    });
  });
});

describe('KataRepo (api)', () => {
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

describe('KataRepo (db)', () => {
  it('should request all katas', async () => {
    expect.assertions(2);
    await expect(dbRepo.allKatas()).resolves.toBeArray();
    await expect(dbRepo.allKatas()).resolves.not.toBeEmpty();
  });
  it('should request katas by tag', async () => {
    expect.assertions(1);
    await expect(dbRepo.katasOfTag('test')).resolves.toBeArray();
    /*
    TODO: Sequelize-mock does not support association query via include
    await expect(dbRepo.katasOfTag('test')).resolves.not.toBeEmpty();
    await expect(dbRepo.katasOfTag('wontFind')).resolves.toBeArray();
    await expect(dbRepo.katasOfTag('wontFind')).resolves.toBeEmpty();
    */
  });
});
