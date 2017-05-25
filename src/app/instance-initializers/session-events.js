import Ember from 'ember';
const { set, get } = Ember;
export function initialize(instance) {
  const session = instance.lookup('service:session');
  const state = instance.lookup('service:state');
  session.on('authenticationSucceeded', function() {
    const pushNotificationService = instance.lookup('service:push-notification');
    if(window.FirebasePlugin){
      pushNotificationService.registerToken();
    }
  });

  session.on('invalidationSucceeded',function() {
    // TODO: check if following lines are needed after fixing LAVO-444
    let store = instance.lookup('service:store');

    store.unloadAll();
    set(state, 'isSearchEnabled', false);
    set(state, 'needVideo', false);
  });
}

export default {
  initialize,
  name:  'session-events',
  after: 'ember-simple-auth'
};
