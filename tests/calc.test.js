import { assert } from 'chai';
import postSize from '../public/assets/post_size.js';
import postWithLinks from '../public/assets/postWithLinks.js';
import isAValidMail from '../public/assets/validMail.js';
import postHbSent from '../public/assets/postHbSent.js';
import hashTags from '../public/assets/hashtags.js';
import recommSystem from '../public/assets/recommSystem.js';

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
/// ////////////////////////////////////////// Функция определения валидности почты
describe('Функция определения валидности почты', function () {
  it('Определеяет стандартный ящик gmail почты', function () {
    const expectedResult = true;
    const result = isAValidMail('arsa.koshkin@gmail.com');
    assert.equal(expectedResult, result);
  });

  it('Почта не валидна, если содержит пробелы', function () {
    const expectedResult = false;
    const result = isAValidMail('arsa.kosh kin@gmail.com');
    assert.equal(expectedResult, result);
  });

  it('Поле ввода почты может содержать пробелы', function () {
    const expectedResult = true;
    const result = isAValidMail('  arsa.koshkin@gmail.com');
    assert.equal(expectedResult, result);
  });

  it('Слишком короткий домен - невалидная почта', function () {
    const expectedResult = false;
    const result = isAValidMail('user@.com');
    assert.equal(expectedResult, result);
  });

  it('Почта не может содержать более одного знака "@"', function () {
    const expectedResult = false;
    const result = isAValidMail('arsa@koshkin@gmail.com');
    assert.equal(expectedResult, result);
  });

  it('Почта не может быть длиннее 63 символов', function () {
    const expectedResult = false;
    const result = isAValidMail('arsa54t3ttregergergesgergregrsgrsgrgrgtrsgrsgrsgrsgrs.koshkin@gmail.com');
    assert.equal(expectedResult, result);
  });

  it('Почта не может начинаться с "@"', function () {
    const expectedResult = false;
    const result = isAValidMail('@koshkingmail.com');
    assert.equal(expectedResult, result);
  });
});
/// ////////////////////////////////////////// Функция преобразования числа во время
describe('Функция определения валидности почты', function () {
  it('Возвращает "one hour ago", если прошло 60 минут', function () {
    const expectedResult = 'one hour ago';
    const result = postHbSent(60);
    assert.equal(expectedResult, result);
  });

  it('Возвращает "one hour ago", если прошло 61 минут', function () {
    const expectedResult = 'one hour ago';
    const result = postHbSent(61);
    assert.equal(expectedResult, result);
  });

  it('2345 минут это один день', function () {
    const expectedResult = 'one day ago';
    const result = postHbSent(2345);
    assert.equal(expectedResult, result);
  });

  it('Возвращает "2 days ago", если прошло ровно 2880', function () {
    const expectedResult = '2 days ago';
    const result = postHbSent(2880);
    assert.equal(expectedResult, result);
  });

  it('должна вернуть "over a year ago" для 525601 минут', function () {
    const expectedResult = 'over a year ago';
    const result = postHbSent(525601);
    assert.equal(expectedResult, result);
  });

  it('должна вернуть "one minute ago" для 1 минуты', function () {
    const expectedResult = 'one minute ago';
    const result = postHbSent(1);
    assert.equal(expectedResult, result);
  });

  it('должна вернуть "20 minutes ago" для 20', function () {
    const expectedResult = '20 minutes ago';
    const result = postHbSent(20);
    assert.equal(expectedResult, result);
  });

  it('должна вернуть "365 days ago" для числа 525600', function () {
    const expectedResult = '365 days ago';
    const result = postHbSent(525600);
    assert.equal(expectedResult, result);
  });
}); 
/// ////////////////////////////////////////// Функция замены хэштегов на html код
describe('Функция замены хэштегов на html код', function () {
    it('Возвращает корректный html код с одним стандартным хэштегом', function () {
      const expectedResult = 'Кто еще изучает <a href="/search?tag=javascript">#javascript</a> ?';
      const result = hashTags('Кто еще изучает #javascript ?');
      assert.equal(expectedResult, result);
    });
  
    it('Возвращает корректный html код, с двумя стандартными хэштегами', function () {
      const expectedResult = 'Я написал <a href="/search?tag=новыйПост">#новыйПост</a> о <a href="/search?tag=разработке">#разработке</a>';
      const result = hashTags('Я написал #новыйПост о #разработке');
      assert.equal(expectedResult, result);
    });
  
    it('Игнорирует знаки препинания', function () {
      const expectedResult = 'Я написал о <a href="/search?tag=разработке">#разработке,</a> <a href="/search?tag=проекте">#проекте.</a>';
      const result = hashTags('Я написал о #разработке, #проекте.');
      assert.equal(expectedResult, result);
    });
  
    it('Не конвертриует текст в хэштеги, когда знак "#" не в начале слова', function () {
      const expectedResult = 'Пароль qwe#ty';
      const result = hashTags('Пароль qwe#ty');
      assert.equal(expectedResult, result);
    });
  
    it('Не преобразовывает хэштеги длинной 1 символ', function () {
      const expectedResult = '#a #b #c';
      const result = hashTags('#a #b #c');
      assert.equal(expectedResult, result);
    });
  
    it('Преобразовывает хэштеги длинной более 1 символа', function () {
      const expectedResult = '<a href="/search?tag=ab">#ab</a> <a href="/search?tag=cd">#cd</a>';
      const result = hashTags('#ab #cd');
      assert.equal(expectedResult, result);
    });
  
    it('Преобразовывает хэштеги с окончаниями', function () {
      const expectedResult = '<a href="/search?tag=linkinpark">#linkinpark!</a>';
      const result = hashTags('#linkinpark!');
      assert.equal(expectedResult, result);
    });
  });
/// ////////////////////////////////////////// Функция рекомендательной системы по хэштэгам
describe('Функция рекомендательной системы по хэштэгам', function () {
  it('Возвращает один профиль с совпадением хэштегов', function () {
    const expectedResult = [258];
    const profile = {
      id: 256,
      posts: [
        'Привет. #сегодня был на концерте группы #linkinpark',
        'как вам новая песня #linkinpark',
      ],
    };
    const profiles = [
      {
        id: 257,
        posts: [
          'Сегодня вышла новая версия #javascript',
          'как вам новая версия #javascript?',
        ],
      },
      {
        id: 258,
        posts: [
          '#сегодня мне не понравилась новая песня #linkinpark',
        ],
      },
    ];
    const count1 = 1;
    const result = recommSystem(profile, profiles, count1);
    assert.deepEqual(expectedResult, result);
  });

  it('Возвращает два профиля, несмотря на отсутствие общих хэштегов', function () {
    const expectedResult = [258, 257];
    const profile = {
      id: 256,
      posts: [
        'Привет. #сегодня был на концерте группы #linkinpark',
        'как вам новая песня #linkinpark',
      ],
    };
    const profiles = [
      {
        id: 257,
        posts: [
          'Сегодня вышла новая версия #javascript',
          'как вам новая версия #javascript?',
        ],
      },
      {
        id: 258,
        posts: [
          '#сегодня мне не понравилась новая песня #linkinpark',
        ],
      },
    ];
    const count1 = 2;
    const result = recommSystem(profile, profiles, count1);
    assert.deepEqual(expectedResult, result);
  });

  it('Возвращает профили в порядке убывания колличеств совпадений по хэштегам', function () {
    const expectedResult = [258, 259, 257];
    const profile = {
      id: 256,
      posts: [
        'Привет. #сегодня был на концерте группы #linkinpark',
        'Кому не нравится #разработка веб-приложений?',
      ],
    };
    const profiles = [
      {
        id: 257,
        posts: [
          'Сегодня вышла новая версия #javascript',
          'как вам новая версия #javascript?',
        ],
      },
      {
        id: 258,
        posts: [
          '#сегодня мне не понравилась новая песня #linkinpark',
        ],
      },
      {
        id: 259,
        posts: [
          'Сегодня завершилась #разработка нового приложения',
        ],
      },
    ];
    const count1 = 3;
    const result = recommSystem(profile, profiles, count1);
    assert.deepEqual(expectedResult, result);
  });

  it('Возвращает пустой массив, если нет профилей для рекомендации', function () {
    const expectedResult = [];
    const profile = {
      id: 256,
      posts: [
        'Привет. #сегодня был на концерте группы #linkinpark',
        'как вам новая песня #linkinpark',
      ],
    };
    const profiles = [];
    const count1 = 1;
    const result = recommSystem(profile, profiles, count1);
    assert.deepEqual(expectedResult, result);
  });

  it('Возвращает все профили, если искомое количество больше, того что есть', function () {
    const expectedResult = [258, 257];
    const profile = {
      id: 256,
      posts: [
        'Привет. #сегодня был на концерте группы #linkinpark',
        'как вам новая песня #linkinpark',
      ],
    };
    const profiles = [
      {
        id: 257,
        posts: [
          'Сегодня вышла новая версия #javascript',
          'как вам новая версия #javascript?',
        ],
      },
      {
        id: 258,
        posts: [
          '#сегодня мне не понравилась новая песня #linkinpark',
        ],
      },
    ];
    const count1 = 3;
    const result = recommSystem(profile, profiles, count1);
    assert.deepEqual(expectedResult, result);
  });

  it('Возвращает профили даже если нет совпадений', function () {
    const expectedResult = [257, 258];
    const profile = {
      id: 256,
      posts: [
        'Привет. #сегодня был на концерте группы #linkinpark',
        'как вам новая песня #linkinpark',
      ],
    };
    const profiles = [
      {
        id: 257,
        posts: [
          'Сегодня вышла новая версия #javascript',
          'как вам новая версия #javascript?',
        ],
      },
      {
        id: 258,
        posts: [
          'сегодня мне не понравилась новая песня linkinpark',
        ],
      },
    ];
    const count1 = 2;
    const result = recommSystem(profile, profiles, count1);
    assert.deepEqual(expectedResult, result);
  });
});

