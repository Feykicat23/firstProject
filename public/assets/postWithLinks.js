/* eslint-disable no-plusplus */
// eslint-disable-next-line no-unused-vars
const postWithLinks = (postLinks) => {
  const domenDictionary = [
    '.com', '.net', '.org', '.gov', '.edu', '.info', '.us', '.ru', '.app', '.store',
    '.club',
  ];

  const endsWith = [',', '!', '.', '$', '"', '|', ':', '№', '?', ')'];

  const array = postLinks.split(' ');

  for (let i = 0; i < array.length; i++) {
    let isAlink = array[i];
    const end = endsWith.some((ending) => isAlink.endsWith(ending));

    if (isAlink.toLowerCase().startsWith('https://') || isAlink.toLowerCase().startsWith('http://') || isAlink.toLowerCase().startsWith('www.')) {
      if (end) {
        const links = isAlink.slice(0, -1);
        isAlink = `<a href="${links}">${isAlink}</a>`;
      } else {
        isAlink = `<a href="${isAlink}">${isAlink}</a>`;
      }
    } else if (domenDictionary.some((domain) => isAlink.toLowerCase().includes(domain))) {
      if (end) {
        const link = isAlink.slice(0, -1);
        isAlink = `<a href="https://${link}">${isAlink}</a>`;
      } else {
        isAlink = `<a href="https://${isAlink}">${isAlink}</a>`;
      }
    }

    array[i] = isAlink;
  }

  return array.join(' ');
};

export default postWithLinks;
