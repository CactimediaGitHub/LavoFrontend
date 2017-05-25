import Ember from 'ember';
import moment from 'moment';
export default Ember.Component.extend({
  notification:null,
  date:null,
  classNames: 'ui white bordered card notification-card',
  didReceiveAttrs() {
    this._super(...arguments);
    let createdDate = moment(this.get('notification.createdAt'));
    let date = moment().diff(createdDate,'days')===0?
       createdDate.fromNow():
       createdDate.calendar();
    this.set('date',date);
  }
});
