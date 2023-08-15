const postSize = (post) => {
  const domenDictionary = [
    '.com', '.net', '.org', '.gov', '.edu', '.info', '.us', '.ru', '.app', '.store',
    '.club',
  ];
  let length = 0;

  const array = post.split(' ');

  for (let i = 0; i < post.length; i++) {
    if (post[i] === ' ' || post[i] === ',') {
      length++;
    }
  }

  for (let i = 0; i < array.length; i++) {
    let isAdomen = false;

    for (let j = 0; j < domenDictionary.length; j++) {
      if (array[i].includes(domenDictionary[j])) {
        isAdomen = true;
        break;
      }
    }
    if (!isAdomen) {
      length += array[i].length;
    }
  }
  return length;
};

export default postSize;
