import Ember from 'ember';
const {set, get, inject:{ service }} = Ember;
export default Ember.Mixin.create({
  state: service(),
  actions: {
    loading(transition, originRoute) {
      let state = get(this, 'state');
      set(state, 'isPending', true);

      transition.promise.finally(function() {
        set(state, 'isPending', false);
      });
    }
  }

});
