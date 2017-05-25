import Ember from 'ember';
import config from 'lavo-mobile/config/environment';

const { on, merge, inject: { service } } = Ember;

export default Ember.Service.extend({
  ajax:service(),
  registerToken(){
    window.FirebasePlugin.grantPermission();

    window.FirebasePlugin.getToken((token) => {
      this.get('ajax').post('/notification_registrations', {"data":{"data":{"type":"notification-registrations","attributes":{"token":token,"notify":"true"}}}}).then((response) => {
        this.set('_notificationsEnabled', !!response.status);
      }, (err) => {
        console.warn('PN Error', "Can't register PN token")
      });
    }, function(error) {
      console.error(error);
    });
  },
});