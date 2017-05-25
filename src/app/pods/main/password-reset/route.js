import Ember from 'ember';
import {ROUTE_SETTINGS_PROFILE} from 'lavo-mobile/constants';


export default Ember.Route.extend({
  queryParams: {
    modalPasswordSuccessfullyChanged: {}
  },
  actions: {
    goBack() {
      this.transitionTo(ROUTE_SETTINGS_PROFILE);
    },
    onSuccessChange(){
      this.transitionTo(ROUTE_SETTINGS_PROFILE, {queryParams: {modalPasswordSuccessfullyChanged: true}})
    }
  }
});
