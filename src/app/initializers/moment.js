import moment from 'moment';
export function initialize(/* application */) {
  /**
   * MomentJS calendar configuration
   */
  moment.updateLocale('en', {
      calendar : {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday], HH:mm',
        lastWeek: 'ddd, HH:mm',
        sameElse: 'MMM DD, HH:mm'
    }
  });
}

export default {
  name: 'moment',
  initialize
};
