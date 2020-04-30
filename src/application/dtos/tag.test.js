import tagDto from './tag';

describe('tag DTO', () => {
  it('should return an string', () => {
    expect.assertions(2);
    const dto = tagDto('test');
    expect(dto).toBe('test');
    expect(typeof dto).toBe('string');
  });
  it('should return undefined if a non-string param is passed', () => {
    expect.assertions(5);
    expect(tagDto(10)).toBeUndefined();
    expect(tagDto([])).toBeUndefined();
    expect(tagDto({})).toBeUndefined();
    expect(tagDto({ tag: 'test ' })).toBeUndefined();
    expect(tagDto(null)).toBeUndefined();
  });
  it('should return undefined if it is called without params', () => {
    expect.assertions(1);
    expect(tagDto()).toBeUndefined();
  });
});
