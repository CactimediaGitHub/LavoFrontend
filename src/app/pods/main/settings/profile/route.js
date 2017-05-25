import Ember from 'ember';
import {ROUTE_SETTINGS_PROFILE, ROUTE_VENDOR, ROUTE_SETTINGS, DEFAULT_ADDRESS_NICKNAME} from 'lavo-mobile/constants';
import PasswordReset from "lavo-mobile/mixins/route-password-reset-mixin";

const {get, set, Route, inject: {service}} = Ember;


export default Route.extend({
  state: service(),
  queryParams: {
    redirectTo: {},
    vendorId: {},
    modalPasswordSuccessfullyChanged: {}
  },

  renderTemplate: function () {
    this.render(ROUTE_SETTINGS_PROFILE, {
      into: 'main',
    });
  },

  model() {
    return this.get('session.currentUser')
  },

  setupController(controller, model) {

    if (!model.get('addresses.firstObject')) {
      var address = this.store.createRecord("address", {
        humanName: DEFAULT_ADDRESS_NICKNAME,
        country: "AE"
      });
      model.get('addresses').pushObject(address);
    }
    controller.set('model', model);
    controller.set('address', get(model, 'addresses.firstObject'));
  },
  actions: {

    willTransition(){
      const {controller: {address, model}} = this;
      address.rollbackAttributes();
      model.rollbackAttributes();
    },

    saveProfile() {
      const {controller} = this;
      const redirectTo = get(controller, 'redirectTo');

      set(controller, 'didValidate', true);
      set(this, 'state.isPending', true);
      get(controller, 'address').validate()
        .then(() => {
          if (get(controller, 'model.validations.isValid') && get(controller, 'address.validations.isValid')) {
            return get(controller, 'model').save();
          }
          return RSVP.reject();
        })
        .then(() => {
          return get(controller, 'address').save();
        })
        .then(()=> {
          if (redirectTo) {
            return this.transitionTo(redirectTo, get(controller, 'vendorId'));
          }
          return this.transitionTo(ROUTE_SETTINGS);
        })
        .finally(()=> {
          set(this, 'state.isPending', false);
        })
      ;
    },
    goBack() {
      const {controller} = this;
      const redirectTo = get(controller, 'redirectTo');
      if (redirectTo) {
        this.transitionTo(ROUTE_VENDOR, get(controller, 'vendorId'));
      } else {
        this.transitionTo(ROUTE_SETTINGS);
      }
    }

  },

});
