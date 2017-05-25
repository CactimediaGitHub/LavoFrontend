import Ember from 'ember';
import { ROUTE_AUTH_SIGNIN } from 'lavo-mobile/constants';

const { run, Route } = Ember;

export default Route.extend({
  ajax: Ember.inject.service(),

  actions: {
    resetPassword(email) {
      const ajax = this.get('ajax');

      return ajax
        .post('/password_resets', {
          data: {
            password_reset: {
              email
            }
          }
        }).then(() => {
          run.later(() => {
            this.transitionTo(ROUTE_AUTH_SIGNIN);
          }, 20000);
        });
    }
  }
});
