const platformFilter = (post) => {
    const dictionary = [
      'пиздец', 'мудак', 'хуйня', 'нахуй', 'охуеть', 'блядь', 'блять', 'долбаёб',
      'отсоси', 'ебать', 'ебанутый', 'отьебись', 'пидар', 'ублюдок', 'охуели',
      'fuck', 'shit', 'fucking', 'fucked', 'nigger', 'bitch', 'whore', 'slut',
      'asshole','prick', 'dick', 'jerk', 'douchebag', 'sucker', 'motherfucker', 'poop',
      'cunt', 'ass'
    ];

    const endsWith = [',', '!', '.', ':', '№', '?', ')'];

let array = post.split(' ');

array.forEach((word, i, array) => {
  const containWord = dictionary.some(badword => word.toLowerCase().includes(badword));
  const containEnd = endsWith.some((ending) => word.endsWith(ending));

  if (containWord) {
    if (containEnd) {
      array[i] = '*'.repeat(word.length - 1) + word[word.length - 1];
    } else {
      array[i] = '*'.repeat(word.length);
    }
  }
});

return array.join(' ');

}


export default platformFilter