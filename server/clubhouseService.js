
const moment = require('moment');
const axios = require('axios');

const token = process.env.CLUBHOUSE_API_TOKEN;
const oneWeekAgo = moment().subtract(8, 'd').toISOString();


exports.getBugsFixed = () =>
  axios.post(`https://api.clubhouse.io/api/v3/stories/search?token=${token}`, {
    project_id: '4057',
    story_type: 'bug',
    completed_at_start: oneWeekAgo,
  }).then((res) => res.data.length)
    .catch(() => {
      alert("Login Failed") // eslint-disable-line
    });


exports.getBugsCreated = () =>
  axios.post(`https://api.clubhouse.io/api/v3/stories/search?token=${token}`, {
    project_id: '4057',
    story_type: 'bug',
    created_at_start: oneWeekAgo,
  }).then((res) => res.data.length)
    .catch(() => {
      alert("Login Failed") // eslint-disable-line
    });



exports.getBlockingStories = () =>
  axios.get(`https://api.clubhouse.io/api/v3/workflows?token=${token}`, {
    project_id: '4057'
  }).then((res) => {
    const engineering = res.data.find(w => w.name === 'Engineering');
    const blocking = engineering.states.find(s => s.name === 'Blocking');

    return axios.post(`https://api.clubhouse.io/api/v3/stories/search?token=${token}`, {
      workflow_state_id: blocking.id,
    })
    .then((res2) => res2.data)
    .catch(() => {
      alert("Login Failed") // eslint-disable-line
    });
  }).catch(() => {
    alert("Login Failed") // eslint-disable-line
  });



exports.getLeadTime = () =>
  axios.post(`https://api.clubhouse.io/api/v3/stories/search?token=${token}`, {
    project_id: '4057',
    completed_at_start: oneWeekAgo,
  }).then((res) => {
    const times =
      res.data
        .map(story => {
          const { created_at, started_at, completed_at } = story;
          const create = moment(created_at);
          const start = moment(started_at);
          const end = moment(completed_at);

          return {
            leadTime: weekdayDiff(create, end),
            cycleTime: weekdayDiff(start, end),
          }
        });

    const leadTimes = times.map(t => t.leadTime);
    const averageLeadTime = leadTimes.reduce((a, b) => a + b, 0) / leadTimes.length;

    const cycleTimes = times.map(t => t.cycleTime);
    const averageCycleTime = cycleTimes.reduce((a, b) => a + b, 0) / cycleTimes.length;

    return {
      leadTime: timeUnits(averageLeadTime),
      cycleTime: timeUnits(averageCycleTime)
    };
  }).catch((e) => {
    console.log("Login Failed", e) // eslint-disable-line
  });


const isWeekend = (date) => {
  const day = moment(date).isoWeekday();
  return day === 6 || day === 7;
};

const weekdayDiff = (start, end) => {
  let current = moment(start);
  let weekendDays = 0;

  while (current.valueOf() < end.valueOf()) {
    if (isWeekend(current)) {
      weekendDays += 1;
    }

    current = current.add(1, 'd');
  }

  const diff = end.diff(start);
  const newDiff = diff - (weekendDays * 86400000);

  return newDiff;
};

const timeUnits = (millis) => {
  const days = Math.floor(millis / 86400000);
  const hours = Math.floor((millis % 86400000) / 3600000);

  return { days, hours };
};
