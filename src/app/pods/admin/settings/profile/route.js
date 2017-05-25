import Ember from 'ember';
import PasswordReset from "lavo-mobile/mixins/route-password-reset-mixin";
import { ROUTE_ADMIN_SETTINGS } from 'lavo-mobile/constants';
const {get, set, inject: { service }, Route } = Ember;

export default Route.extend(PasswordReset, {
  state: service(),
  queryParams: {
    modalPasswordSuccessfullyChanged: {
    }
  },
  model() {
    return this.get('session.currentUser');
  },

  actions: {

    willTransition(transition) {
      this.controller.model.rollbackAttributes();
    },

    saveProfile() {
      const { controller } = this;
      set(controller, 'didValidate', true);
      set(this, 'state.isPending', true);
      if (get(controller, 'model.validations.isValid')) {
        get(controller, 'model').save()
          .then(() =>
            this.transitionTo(ROUTE_ADMIN_SETTINGS)
          )
          .finally(()=>{
            set(this, 'state.isPending', false);
          })
      }
    },
  }
});
