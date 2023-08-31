/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
const hashTags = (hashtags) => {
  const array = hashtags.split(' ');
  const endsWith = [',', '!', '.', '$', '"', '|', ':', '№', '?', ')'];

  for (let i = 0; i < array.length; i++) {
    const currentTag = array[i];

    if (currentTag.startsWith('#') && currentTag.length > 2) {
      let tag = currentTag.slice(1); // Удаление символа #

      // Проверка наличия знака окончания в хэштеге
      const end = endsWith.some((ending) => tag.endsWith(ending));

      if (end) {
        tag = tag.slice(0, -1); // Удаление окончания
      }

      array[i] = `<a href="/search?tag=${tag}">${currentTag}</a>`;
    }
  }

  return array.join(' ');
};

export default hashTags;
