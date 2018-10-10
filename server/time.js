function numberEnding(number) {
  return (number > 1) ? 's' : '';
}

exports.millisecondsToStr = function millisecondsToStr(milliseconds) {
  const hours = milliseconds / 3600000;
  const days = Math.floor(hours / 24);
  const remainingHours = Math.floor(hours % 24);

  return `${days} day${numberEnding(days)} ${remainingHours} hour${numberEnding(hours)}`;
};
