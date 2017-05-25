import Ember from 'ember';
import {ROUTE_ADMIN_SETTINGS_PROFILE} from 'lavo-mobile/constants';


export default Ember.Route.extend({
  actions: {
    goBack() {
      this.transitionTo(ROUTE_ADMIN_SETTINGS_PROFILE);
    },
    onSuccessChange() {
      this.transitionTo(ROUTE_ADMIN_SETTINGS_PROFILE, {queryParams: {modalPasswordSuccessfullyChanged: true}})
    }
  }
});
