import kataTransformer from './kataTransformer';

describe('kata transform to DTO', () => {
  it('should return an object', () => {
    expect.assertions(1);
    expect(kataTransformer.toKataDto({})).toStrictEqual(expect.any(Object));
  });

  it('should return a kata DTO', () => {
    expect.assertions(1);
    expect(kataTransformer.toKataDto({})).toBeKataDto();
  });

  it('should return valid kata DTO', () => {
    expect.hasAssertions();
    const model = {
      name: 'Test kata',
      details: 'Mocked kata details',
      code: 'console.log("Hello World!")',
      test: 'spec code',
      tags: [
        { id: '?', tag: 'first' },
        { id: '?', tag: 'second' },
      ],
      save: () => {},
    };
    const dto = kataTransformer.toKataDto(model);
    expect(dto.name).toBe(model.name);
    expect(dto.details).toBe(model.details);
    expect(dto.test).toBe(model.test);
    expect(dto.code).toBe(model.code);
    expect(dto.tags).toContain('first');
    expect(dto.tags).toContain('second');
    expect(dto).not.toHaveProperty('save');
  });
});
