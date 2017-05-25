import Ember from 'ember';
import moment from 'moment';
import price from '../../../../../helpers/price'

const { Controller, get, set } = Ember;

export default Controller.extend({
  actions: {
    convertCreditsInDollars: function() {
      let creditsInDollars = this.get('model.creditsInDollars');
      creditsInDollars = parseInt(creditsInDollars);
      let creditsInCents = creditsInDollars * 100;
      if (creditsInDollars) {
        this.set('model.creditsInDollars', creditsInDollars);
        this.set('model.credits', creditsInCents);
      }
    }
  }
});
