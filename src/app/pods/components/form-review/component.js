import Ember from 'ember';

const {set, Component, run: { later }, inject: { service } } = Ember;

export default Component.extend({
  classNames: ['ui padded layout create-review'],

  review: null,
  didValidate: false,
  state:service(),
  actions: {
    save() {
      const { onSubmit } = this.attrs;
      this.set('didValidate',true);

      if (onSubmit) {
        onSubmit(...arguments);
      }
    },

    done() {
      const { onDone } = this.attrs;

      if (onDone) {
        onDone(...arguments);
      }
    },

    selectRating(value) {
      set(this, 'review.rating', value)
    }
  }
});
