import { parser, stringify, removeNode } from './qs';

describe('测试qs库', () => {
  it('测试 parser 是否能正常解析结果', () => {
    expect(parser(`name=jack`)).toEqual({ name: 'jack' });
  });

  it('测试 stingify 是否能正常解析结果', () => {
    expect(stringify({ name: 'jack' })).toEqual(`name=jack`);
  });

  it('测试删除节点', ()=> {
    document.body.innerHTML = `<div><button data-btn="btn"></button></div>`;
    let btn = document.querySelector('[data-btn="btn"]');
    expect(btn).not.toBeNull();
    removeNode(btn);
    btn = document.querySelector('[data-btn="btn"]');
    expect(btn).toBeNull();
  });
})



