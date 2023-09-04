const hashTags = (hashtags) => {
  const array = hashtags.split(' ');
  const endsWith = [',', '!', '.', '$', '"', '|', ':', '№', '?', ')'];

  array.forEach((currentTag, i, array) => {
    if (currentTag.startsWith('#') && currentTag.length > 2) {
      let tag = currentTag.slice(1); // Удаление символа #

      // Проверка наличия знака окончания в хэштеге
      const end = endsWith.some((ending) => tag.endsWith(ending));

      if (end) {
        tag = tag.slice(0, -1); // Удаление окончания
      }

      array[i] = `<a href="/search?tag=${tag}">${currentTag}</a>`;
    }
  });

  return array.join(' ');
};

export default hashTags;
