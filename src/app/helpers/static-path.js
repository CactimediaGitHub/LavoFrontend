import Ember from 'ember';
import config from 'lavo-mobile/config/environment';

export function staticPath([path]) {
  return `${config.STATIC.host}${path}`;
}

export default Ember.Helper.helper(staticPath);
