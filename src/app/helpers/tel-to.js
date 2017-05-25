import Ember from 'ember';

export function telTo(params/*, hash*/) {

  return `tel:${params.replace(/[^\d\+]/g,"")}`;
}

export default Ember.Helper.helper(telTo);
