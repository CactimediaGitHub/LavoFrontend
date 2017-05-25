import Ember from 'ember';

export function price([priceInCents]) {
  return Math.abs(priceInCents) / 100;
}

export default Ember.Helper.helper(price);
