/* eslint-disable no-unused-vars */
const postHbSent = (timeNum) => {
  const hours = timeNum / 60;
  const days = Math.floor(hours) / 24;

  if (timeNum === 1) {
    return 'one minute ago';
  } if (timeNum <= 59) {
    return `${timeNum} minutes ago`;
  } if (timeNum <= 119) {
    return 'one hour ago';
  } if (timeNum <= 1439) {
    return `${Math.floor(hours)} hours ago`;
  } if (timeNum <= 2879) {
    return 'one day ago';
  } if (timeNum <= 525600) {
    return `${Math.floor(days)} days ago`;
  }
  return 'over a year ago';
};

export default postHbSent;
