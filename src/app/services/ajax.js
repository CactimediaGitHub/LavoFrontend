import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import config from 'lavo-mobile/config/environment';

const {get, set, computed, inject, assign } = Ember;

export default AjaxService.extend({
  session: inject.service(),

  host: config.BACKEND.host,
  headers: computed('session.isAuthenticated', {
    get() {
      const defaultHeaders = config.BACKEND.headers;
      let headers = assign({}, defaultHeaders);
      const isAuthenticated = get(this, 'session.isAuthenticated');

      if (isAuthenticated) {
        let { key } = get(this, 'session.data.authenticated.included.firstObject.attributes');

        if (key) {
          headers['Authorization'] = `Token token=${key}`;
        }
      }

      return headers;
    }
  })
});
