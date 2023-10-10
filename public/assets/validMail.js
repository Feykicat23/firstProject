/* eslint-disable no-plusplus */
// eslint-disable-next-line no-unused-vars
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

  const endOfMail = mail.slice(dogIndex);

  if (dogIndex === -1 || mail.length > 63) {
    return false;
  }
  if (mail.endsWith('@') || mail.startsWith('@')) {
    return false;
  }
  if (mail.includes('..') || mail.trim().includes(' ')) {
    return false;
  }
  if (endOfMail.length < 6) {
    return false;
  }
  return true;
};

export default isAValidMail;
