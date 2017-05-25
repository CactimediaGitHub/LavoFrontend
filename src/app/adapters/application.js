import Ember from 'ember';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from 'lavo-mobile/config/environment';
const { String: { pluralize, underscore } } = Ember;

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:token',
  host: config.BACKEND.host,

  pathForType(type) {
    return pluralize(underscore(type));
  }
});
