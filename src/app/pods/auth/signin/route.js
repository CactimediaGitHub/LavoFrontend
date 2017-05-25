import Ember from 'ember';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  session: service(),

  actions: {
    signIn(credentials) {
      const session = this.get('session');

      return session
        .authenticate('authenticator:token', credentials)
        .then(() => {
          this.transitionTo('/');
        })
        .catch((error) => {
          this.send('error', error);
        });
    }
  }
});
