import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui', 'small', 'info', 'card'],
  withPromotion: false,
  order: null,
  actionText: 'Next',

  actions: {
    onButtonClicked() {
      const { onButtonClicked } = this.attrs;

      if (onButtonClicked) {
        onButtonClicked(arguments);
      }
    }
  }
});
