import { toKataDto } from './kata';

describe('kata transform to DTO', () => {
  it('should return an object', () => {
    expect.assertions(1);
    expect(toKataDto({})).toStrictEqual(expect.any(Object));
  });

  it('should return a kata DTO', () => {
    expect.assertions(1);
    expect(toKataDto({})).toBeKataDto();
  });

  it('should return valid kata DTO', () => {
    expect.hasAssertions();
    const model = {
      name: 'Test kata',
      details: 'Mocked kata details',
      code: 'console.log("Hello World!")',
      test: 'spec code',
      tags: ['first', 'second'],
      save: () => {},
    };
    const dto = toKataDto(model);
    expect(dto.name).toBe(model.name);
    expect(dto.details).toBe(model.details);
    expect(dto.test).toBe(model.test);
    expect(dto.code).toBe(model.code);
    expect(dto.tags).toContain('first');
    expect(dto.tags).toContain('second');
    expect(dto).not.toHaveProperty('save');
  });
});
