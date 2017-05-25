import Ember from 'ember';
import { ROUTE_AUTH_SIGNIN } from 'lavo-mobile/constants';

const {get, inject: { service }, Route } = Ember;

export default Route.extend({
  ajax: service(),

  queryParams: {
    modalSuccessfulRegistration: {},
  },

  actions: {
    signUp(credentials) {
      const ajax = get(this, 'ajax');

      return ajax
        .post('/signup', {
          data: {
            data: {
              attributes: {
                'email': credentials.email,
                'password': credentials.password,
                'password_confirmation': credentials.passwordConfirmation
              }
            }
          }
        })
        .then(() => {
          this.transitionTo(get(this, 'routeName'), {queryParams: {modalSuccessfulRegistration: true}})
        })
        .catch((error) => {
          this.send('error', error);
        });
    }
  }
});
