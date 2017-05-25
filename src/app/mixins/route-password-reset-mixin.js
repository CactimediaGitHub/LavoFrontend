import Ember from 'ember';
const { inject: { service }, Mixin, get } = Ember;

export default Mixin.create({
  ajax: service(),
  queryParams: {
    modalPasswordResetLinkSended: {}
  },
  actions: {
    resetPassword() {
      const alert = get(this, 'dialogWindow.alert');
      return this.get('ajax').post('/password_resets', {
        data: {
          "password_reset": {
            "email": this.get('session.currentUser.email')
          }
        }
      }).then(() => {
        this.transitionTo({ queryParams: { modalPasswordResetLinkSended: true } });
      }, () => {
        alert('Error occured!');
      });
    },
  }
});
