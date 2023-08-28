/* eslint-disable mocha/no-identical-title */
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
/// ////////////////////////////////////////// Функция замены ссылок на html код
describe('Функция замены ссылок на html код', function () {
  it('Определеяет окончание .com', function () {
    const expectedResult = 'Привет <a href="https://github.com">github.com</a>';
    const result = postWithLinks('Привет github.com');
    assert.equal(expectedResult, result);
  });

  it('Обрабатывает несколько ссылок с разными окончаниями', function () {
    const expectedResult = 'Зайди на <a href="https://google.com">google.com</a> и на <a href="https://mail.ru">mail.ru</a>';
    const result = postWithLinks('Зайди на google.com и на mail.ru');
    assert.equal(expectedResult, result);
  });

  it('Подчеркивает готовую ссылку без добавления новых протоколов', function () {
    const expectedResult = 'Здравствуйте <a href="https://developer.mozilla.org">https://developer.mozilla.org</a>';
    const result = postWithLinks('Здравствуйте https://developer.mozilla.org');
    assert.equal(expectedResult, result);
  });

  it('Игнорирует знаки препинания в итоговой ссылке', function () {
    const expectedResult = 'Здравствуйте <a href="https://developer.mozilla.org">https://developer.mozilla.org,</a> <a href="https://ru.wikipedia.org/wiki/URL">https://ru.wikipedia.org/wiki/URL.</a>';
    const result = postWithLinks('Здравствуйте https://developer.mozilla.org, https://ru.wikipedia.org/wiki/URL.');
    assert.equal(expectedResult, result);
  });

  it('Обрабатывает ссылки с другими протоколами', function () {
    const expectedResult = 'Зайди на <a href="http://google.com">http://google.com</a> и на <a href="www.mail.ru">www.mail.ru</a>';
    const result = postWithLinks('Зайди на http://google.com и на www.mail.ru');
    assert.equal(expectedResult, result);
  });

  it('Не конвертирует текст в ссылки', function () {
    const expectedResult = 'Зайди на google и на mail';
    const result = postWithLinks('Зайди на google и на mail');
    assert.equal(expectedResult, result);
  });

  it('Обрабатывает ссылки независимо от регистра', function () {
    const expectedResult = 'Зайди на <a href="https://GOOGle.com">GOOGle.com</a> и на <a href="https://MAIL.ru">MAIL.ru</a>';
    const result = postWithLinks('Зайди на GOOGle.com и на MAIL.ru');
    assert.equal(expectedResult, result);
  });
});
/// ////////////
