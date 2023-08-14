import { assert } from 'chai';
import postSize from '../public/assets/post_size.js';

describe('Функция проверки расчета размера поста', function () {
  it('без ссылок', function () {
    const expectedResult = 12;
    const result = postSize('Всем привет!');
    assert.equal(expectedResult, result);
  });
});