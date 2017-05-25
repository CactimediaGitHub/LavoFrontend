import moment from 'moment';
import Transform from 'ember-data/transform';

/**
 * Custom transformation for date format: "[2016-06-25 06:00:00 UTC,2016-06-25 08:00:00 UTC]"
 */
export default Transform.extend({
  deserialize(serialized) {
    let [startTime, endTime] = serialized.replace(/\[|\]/g, '').split(',');

    startTime = moment(startTime, "YYYY-MM-DD HH:mm:ss");
    endTime = moment(endTime, "YYYY-MM-DD HH:mm:ss");

    return [startTime, `${startTime.format('k')}-${endTime.format('k')}`];
  },

  serialize([date, period]) {
    const [start, end] = period.split('-');
    const [startTime, endTime] = [
      moment(date).hours(start).format(),
      moment(date).hours(end).format()
    ];
    return `[${startTime}, ${endTime}]`;
  }
});
