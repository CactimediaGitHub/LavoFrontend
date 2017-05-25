import Ember from 'ember';

const {get, Component } = Ember;

export default Component.extend({
  sort: null,
  routeName: null,

  actions: {
    done() {
      get(this, 'done')(this.getProperties('sort', 'routeName'));
    }
  }
});
