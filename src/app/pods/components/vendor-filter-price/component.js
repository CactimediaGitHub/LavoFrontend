import Ember from 'ember';

const { get, Component } = Ember;

export default Component.extend({
  sort: null,
  routeName: null,
  items: null,
  services: null,
  selectedItemId: null,
  selectedServiceIds: [],

  actions: {
    done() {
      get(this, 'done')(this.getProperties('sort', 'routeName', 'selectedItemId', 'selectedServiceIds'));
    }
  }
});
