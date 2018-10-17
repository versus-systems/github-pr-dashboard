const moment = require('moment');

exports.millisecondsToStr = function millisecondsToStr(milliseconds) {
  const hours = milliseconds / 3600000;
  const days = Math.floor(hours / 24);
  const remainingHours = Math.floor(hours % 24);

  if (days === 0) {
    return `${remainingHours}hr`;
  }

  return `${days}d ${remainingHours}hr`;
};

exports.threeMonthsAgo = function threeMonthsAgo() {
  return moment().subtract(3, 'months').format('YYYY-MM-DD');
};

exports.oneWeekAgo = function threeMonthsAgo() {
  return moment().subtract(7, 'days').format('YYYY-MM-DD');
};
