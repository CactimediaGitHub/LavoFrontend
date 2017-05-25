import Ember from 'ember';
import moment from 'moment';

const {get, set, computed, Component } = Ember;

export default Component.extend({
  classNames: ['ui list'],
  date: moment(),
  isValid: true,
  minDate: new Date(),
  maxDate: new Date(),
  /**
   * Formats minimum date according to devide
   * @param  {String||Date} date
   * @return {Int||Date}    formatted date
   */
  formatMinDate(date) {
    date = new Date(date);
    switch (window.cordova.platformId) {
      case "android":
        return date.getTime();
      case "ios":
        return date;
      default:
        return false;
    }
  },
  schedules: [],
  period: null,
  /**
   * Build periods array
   */
  periods: computed('schedules', 'date', function() {
    return this.buildPeriods();
  }),
  currentSchedule: computed('date', function() {
    const date = get(this, 'date');
    return get(this, 'schedules').find((s) => {
      return get(s, 'weekday') === date.format('dddd');
    });
  }),
  buildPeriods() {
    const date = moment(get(this, 'date'));
    const schedule = get(this, 'currentSchedule');
    let minimumPeriodHours = moment().isSame(date, 'day') ? moment().get('hours') : 0;

    if (schedule) {
      let hours = get(schedule,'hours')
      return Object.keys(hours)
        .reduce((memo, period) => {
          let periodValue = get(hours,period);

          const [start, end] = period.split('-');
          if (start >= minimumPeriodHours&&periodValue!='closed') {
            memo.push({
              value: period,
              label: `${this.changeFormat(start)} - ${this.changeFormat(end)}`
            })
          }
          return memo;
        }, []);
    }

    return [];
  },
  changeFormat(hours) {
    const suffix = (hours >= 12) ? ' PM' : ' AM';
    hours = (hours > 12) ? hours - 12 : hours;
    hours = (hours == '00') ? 12 : hours;
    return (hours + '' + suffix);
  },
  fireChanges() {
    const { onChange, period, date } = this.getProperties('onChange', 'period', 'date');

    if (onChange) {
      onChange(date, period);
    }

  },

  actions: {
    selectPeriod(period) {
      set(this, 'period', period);

      this.fireChanges();
    },

    selectDate() {
      const minDate = this.formatMinDate(get(this, 'minDate'));
      var calculatedNextMaxDate = new Date(get(this, 'maxDate'));
      calculatedNextMaxDate.setDate(calculatedNextMaxDate.getDate() + 7);
      const maxDate = this.formatMinDate(calculatedNextMaxDate);
      const date = get(this, 'date');
      const options = {
        date: new Date(get(this, 'date')),
        minDate,
        maxDate,
        mode: 'date'
      };
      const onSuccess = (selectedDate) => {
        set(this, 'date', moment(selectedDate || date));

        this.fireChanges();
      };

      window.datePicker && window.datePicker.show(options, onSuccess);
    }
  }
});
