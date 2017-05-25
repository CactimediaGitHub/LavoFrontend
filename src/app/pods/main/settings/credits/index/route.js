import Ember from 'ember';

const {inject: {service}, Route, get, RSVP} = Ember;

export default Route.extend({
  ajax: service(),
  model () {
    return RSVP.hash({
      response: get(this, 'ajax').request('/credits'),
      page: this.store.findRecord('page', 'what_are_credits')
    }).then(({response, page}) => {
      return RSVP.resolve({
        creditsAmount: get(response, 'data.attributes.credits-amount'),
        page
      });
    });
  }
});
