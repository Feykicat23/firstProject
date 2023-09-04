const recommSystem = (profile, profiles, count1) => {
  const tagsOfprofile = [];
  const result = [];

  if (profiles.length === 0 || count1 === 0) {
    return [];
  }

  for (const word of profile.posts.join(' ').split(' ')) { /// // Поиск хэштэгов в основном профиле
    if (word.startsWith('#') && !tagsOfprofile.includes(word)) {
      tagsOfprofile.push(word);
    }
  }

  for (let i = 0; i < profiles.length; i++) { /// // Поиск хэштэгов по базе профилей
    let intersections = 0;
    const profileTags = profiles[i].posts.join(' ').split(' ');

    for (let j = 0; j < tagsOfprofile.length; j++) { /// // Проверяем содержится ли хэштэг в профиле и считаем вхождения
      if (profileTags.includes(tagsOfprofile[j])) {
        intersections++;
      }
    }
    profiles[i].intersections = intersections; /// // записываем пересечения в профиль, а далее intersections обнуляется
  }

  profiles.sort((a, b) => b.intersections - a.intersections); /// // сортируем

  if (count1 > profiles.length) {
    return profiles.map((profile) => profile.id);
  }

  for (let b = 0; b < count1; b++) { /// // Пушим count1 колличество профилей в результат
    result.push(profiles[b].id);
  }

  return result;
};

export default recommSystem;
