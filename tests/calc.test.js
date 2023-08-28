/* eslint-disable mocha/max-top-level-suites */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
import { assert } from 'chai';
import postSize from '../public/assets/post_size.js';
import postWithLinks from '../public/assets/postWithLinks.js';

describe('Функция проверки расчета размера поста', function () {
  it('без ссылок', function () {
    const expectedResult = 12;
    const result = postSize('Всем привет!');
    assert.equal(expectedResult, result);
  });

  it('Использование нескольких протоколов, перечисление через "," и "."', function () {
    const expectedResult = 5;
    const result = postSize('https://github/vab, http://github/vab, www.github/vab.');
    assert.equal(expectedResult, result);
  });

  it('Использование протокола "www." c доменным окончанием', function () {
    const expectedResult = 13;
    const result = postSize('Всем привет! www.koshky.org');
    assert.equal(expectedResult, result);
  });

  it('Длинная ссылка заканчивающаяся запятой "," " "', function () {
    const expectedResult = 2;
    const result = postSize('http://the.way.to.make.money/c/a9b52c69-50ea-473e-840e-16ff35538480, ');
    assert.equal(expectedResult, result);
  });

  it('Текст с символами, но без ссылок', function () {
    const expectedResult = 33;
    const result = postSize('Текст с ! @ # $ % ^ & * символами');
    assert.equal(expectedResult, result);
  });

  it('Ссылки и текст в произвольном порядке', function () {
    const expectedResult = 20;
    const result = postSize('Привет! https://example.com. Это текст www.domain.org');
    assert.equal(expectedResult, result);
  });

  it('Ссылки с протоколом, но без доменных окончаний', function () {
    const expectedResult = 12;
    const result = postSize('Ссылки https://example http://test www');
    assert.equal(expectedResult, result);
  });

  it('Ссылки и текст в перемешанном порядке', function () {
    const expectedResult = 14;
    const result = postSize('Это www.example.com текст http://test.net и https://other.org');
    assert.equal(expectedResult, result);
  });

  it('Пустая строка из пробелов', function () {
    const expectedResult = 10;
    const result = postSize('          ');
    assert.equal(expectedResult, result);
  });

  it('Ссылка с верхним регистром', function () {
    const expectedResult = 0;
    const result = postSize('HTTP://test.NET');
    assert.equal(expectedResult, result);
  });
});

describe('Функция замены ссылок на html код', function () {
  it('без ссылок', function () {
    const expectedResult = 'Привет <a href="https://github.com">github.com</a>';
    const result = postWithLinks('Привет github.com');
    assert.equal(expectedResult, result);
  });
});
