import { unique } from './unique';

const arr = [0, 0, "0", "0", true, true, "true", "true", null, null, "NaN", NaN, NaN, undefined, undefined, 4, 4, "a", "b", "a", "c", {}, {}, { a: 1 }, { a: 1 }, "", ""];

const result = [0, "0", true, "true", null, "NaN", NaN, undefined, 4, "a", "b", "c", {}, { a: 1 }, ""];

describe('测试数组去重功能', () => {
  it('测试[1, 2, "a", 2, 3, "a", 4, 3]是否能去重', () => {
    expect(unique([1, 2, "a", 2, 3, "a", 4, 3])).toEqual([1, 2, "a", 3, 4]);
  });

  it('测试[[1, 2, "2", "2", 2, 3, 4, 3]是否能去重', () => {
    expect(unique([1, 2, "2", "2", 2, 3, 4, 3])).toEqual([1, 2, "2", 3, 4]);
  });

  it('测试[0, "0", 2, 3, 2, "a", "a", 3, "a"]是否能去重', () => {
    expect(unique([0, "0", 2, 3, 2, "a", "a", 3, "a"])).toEqual([0, "0", 2, 3, "a"]);
  });

  it('测试[true, true, "true", "true"]是否能去重', () => {
    expect(unique([true, true, "true", "true"])).toEqual([true, "true"]);
  });

  it('测试null, null, "null", "null", "undefined", "undefined", undefined, undefined]是否能去重', () => {
    expect(unique([null, null, "null", "null", "undefined", "undefined", undefined, undefined])).toEqual([null, "null", "undefined", undefined]);
  });

  it('测试[NaN, NaN, "NaN", "NaN", {}, {}, { a: 1 }, { a: 1 }]是否能去重', () => {
    expect(unique([NaN, NaN, "NaN", "NaN", {}, {}, { a: 1 }, { a: 1 }])).toEqual([NaN, "NaN", {}, { a: 1 }]);
  });

  it('测试[[1, 2, 3], [1, 2, 3], [1, [2, 3]], [1, [2, 3]]]是否能去重', () => {
    expect(unique([[1, 2, 3], [1, 2, 3], [1, [2, 3]], [1, [2, 3]]])).toEqual([[1, 2, 3], [1, [2, 3]]]);
  });

  /* it('测试超级数组是否能去重', () => {
    expect(unique(arr)).toEqual(result);
  }); */



})
