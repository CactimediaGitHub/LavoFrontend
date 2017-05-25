import Ember from 'ember';

export function isNone(params) {
  return Ember.isNone(params[0]);
}

export default Ember.Helper.helper(isNone);
