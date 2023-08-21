const postWithLinks = (postLinks) => {
  const domenDictionary = [
    '.com', '.net', '.org', '.gov', '.edu', '.info', '.us', '.ru', '.app', '.store',
    '.club',
  ];

  const endsWith = [',', '!', '.', '$', '"', '|', ':', '№', '?', ')'];

  const array = postLinks.toLowerCase().split(' ');

  for (let i = 0; i < array.length; i++) {
    const isAlink = array[i];
    const end = endsWith.some((ending) => isAlink.endsWith(ending));

    if (isAlink.startsWith('https://') || isAlink.startsWith('http://') || isAlink.startsWith('www.')) {
      if (end) {
        isAlink.slice(0, -1);
        array[i] = `<a href="${isAlink}">${isAlink}</a>`;
      } else {
        array[i] = `<a href="${isAlink}">${isAlink}</a>`;
      }
    } else if (domenDictionary.some((domain) => isAlink.includes(domain))) {
      if (end) {
        const link = isAlink.slice(0, -1);
        array[i] = `<a href="https://${link}">${isAlink}</a>`;
      } else {
        array[i] = `<a href="https://${isAlink}">${isAlink}</a>`;
      }
    }
  }

  return array.join(' ');
};
