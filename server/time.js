const moment = require('moment');

function numberEnding(number) {
  return (number > 1) ? 's' : '';
}

exports.millisecondsToStr = function millisecondsToStr(milliseconds) {
  const hours = milliseconds / 3600000;
  const days = Math.floor(hours / 24);
  const remainingHours = Math.floor(hours % 24);

  if (days === 0) {
    return `${remainingHours} hour${numberEnding(hours)}`;
  }

  return `${days} day${numberEnding(days)} ${remainingHours} hour${numberEnding(hours)}`;
};

exports.threeMonthsAgo = function threeMonthsAgo() {
  return moment().subtract(3, 'months').format('YYYY-MM-DD');
};
