import Ember from 'ember';
import * as constants from 'lavo-mobile/constants';

export function constant(params) {
  return constants[params[0]] || null;
}

export default Ember.Helper.helper(constant);
