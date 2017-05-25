import Ember from 'ember';
import moment from 'moment';
import { ROUTE_SETTINGS_CREDITS } from 'lavo-mobile/constants';

const { Route, RSVP, get, inject: { service } } = Ember;

export default Route.extend({
  ajax: service(),
  session: service(),

  model() {
    return RSVP.hash({
      monthList: this.store.queryPath('monthly-income', '/vendor/monthly_incomes'),
      balance: get(this, 'session.currentUser.balance')
    }).then(({monthList, balance}) => {
      if(get(monthList, 'length') === 0) {
        let currentMonth = this.store.createRecord('monthly-income', {
          month: moment().format('MMM YYYY'),
          ordersCompleted: 0,
          totalTransactions: 0,
          commission: 10,
          netAmount: 0
        });
        monthList.pushObject(currentMonth._internalModel);
      }

      return RSVP.resolve({
        monthList,
        balance
      })
    }) ;
  }
});
