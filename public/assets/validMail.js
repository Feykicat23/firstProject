const isAValidMail = (mail) => {
  const dogIndex = mail.indexOf('@');

  let count = 0;
  for (let i = 0; i < mail.length; i++) {
    if (mail[i] === '@') {
      count++;
      if (count > 1) {
        return false;
      }
    }
  }

  const endsOfMail = ['.com', '.net', '.org', '.gov', '.edu', '.info', '.us', '.ru', '.app', '.store',
    '.club'];

  const endOfMail = mail.slice(dogIndex);

  if (dogIndex === -1 || mail.length > 63) {
    return false;
  } 
  if (mail.endsWith('@') || mail.startsWith('@')){
    return false
  }
  if (mail.includes('..') || mail.trim().includes(' ')) {
    return false;
  } 
  if (!endsOfMail.some((popularDomain) => mail.endsWith(popularDomain))) {
    return false;
  }
  if (endOfMail.length < 5) {
    return false;
  }
  return true;
}

