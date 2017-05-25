import Ember from 'ember';
import { ROUTE_SETTINGS_CREDITS } from 'lavo-mobile/constants';

const { Route, RSVP, A, get } = Ember;

export default Route.extend({
  model() {
    let monthList = A();
    monthList.pushObject(this.store.createRecord('monthly-income', {
      month: 'JAN 2015',
      ordersCompleted: 35,
      totalTransactions: 320000,
      commission: 10,
      netAmount: 380000
    }));
    monthList.pushObject(this.store.createRecord('monthly-income', {
      month: 'FEB 2015',
      ordersCompleted: 3,
      totalTransactions: 120000,
      commission: 10,
      netAmount: 180000
    }));
    const creditsAmount = get(this.modelFor(ROUTE_SETTINGS_CREDITS), 'creditsAmount');
    return RSVP.resolve({
      monthList,
      creditsAmount
    });
  }
});
