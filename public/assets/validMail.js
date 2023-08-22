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

  const cantStartsandEnd = ['.', '@', '-', '"', "'", '(', ')', '_', '=', '+'];

  const popularEndsOfMail = [
    '@gmail.com', '@mail.ru', '@yandex.ru', '@yahoo.com', '@apple.com', '@protonmail.com', '@zoho.com', '@fastmail.com',
  ];

  const otherEndsOfMail = ['.com', '.net', '.org', '.gov', '.edu', '.info', '.us', '.ru', '.app', '.store',
    '.club'];

  const endOFmail = mail.slice(dogIndex);

  if (dogIndex === -1 || mail.length > 63) {
    return false;
  } if (mail.includes('..') || mail.includes(' ')) {
    return false;
  } if (cantStartsandEnd.some((ending) => mail.endsWith(ending))
               || cantStartsandEnd.some((start) => mail.startsWith(start))) {
    return false;
  } if (popularEndsOfMail.some((popularDomain) => mail.endsWith(popularDomain))) {
    return true;
  } if (!otherEndsOfMail.some((popularDomain) => mail.endsWith(popularDomain))) {
    return false;
  } if (endOFmail.length < 5) {
    return false;
  }
  return true;
};
