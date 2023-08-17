const postSize = (post) => {
  const domenDictionary = [
    '.com', '.net', '.org', '.gov', '.edu', '.info', '.us', '.ru', '.app', '.store',
    '.club',
  ];
  // const protocols = ['https://', "http://", "www."]
  const endsWith = [',', '!', '.', '$', '"', '|', ':', '№', '?', ')'];

  let linkLength = 0;

  const array = post.split(' ');

  for (let i = 0; i < array.length; i++) {
    const isAlink = array[i];
    const end = endsWith.some((ending) => isAlink.endsWith(ending));

    if (domenDictionary.some((domain) => isAlink.includes(domain))) {
      if (end) {
        linkLength += isAlink.length - 1;
      } else {
        linkLength += isAlink.length;
      }
    } else if
    (isAlink.startsWith('https://') || isAlink.startsWith('http://') || isAlink.startsWith('www.')) {
      if (end) {
        linkLength += isAlink.length - 1;
      } else {
        linkLength += isAlink.length;
      }
    }
  }

  return post.length - linkLength;
};

export default postSize;
