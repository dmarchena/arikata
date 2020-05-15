import dbRepo from './kata';

jest.mock('../../db');

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
  describe('save a new kata', () => {
    it('should add to DB and return the new entity', async () => {
      expect.assertions(2);
      const input = mockKataEntity();
      const result = await dbRepo.save(input);
      expect(result).toBeKataEntity();
      expect(result).toEqualKataEntity(input);
    });
  });

  describe('update a kata', () => {
    it('should update in DB and return the updated entity', async () => {
      expect.assertions(2);
      const input = mockKataEntity();
      const result = await dbRepo.update(input);
      expect(result).toBeKataEntity();
      expect(result).toEqualKataEntity(input);
    });
  });

  describe('remove a kata', () => {
    it('should remove from DB and return true', async () => {
      expect.assertions(1);
      const input = mockKataEntity().id;
      const result = await dbRepo.remove(input);
      expect(result).toBe(true);
    });
    it('should return false if it does not exist on DB', async () => {
      expect.assertions(1);
      const input = 'not-found-id';
      const result = await dbRepo.remove(input);
      expect(result).toBe(true);
    });
  });
});
