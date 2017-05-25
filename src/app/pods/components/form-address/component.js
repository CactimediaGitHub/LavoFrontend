import Ember from 'ember';
import { DEFAULT_ADDRESS_NICKNAME } from 'lavo-mobile/constants';

const { set, get, Component, inject: { service } } = Ember;

export default Component.extend({
  classNames: ['ui padded layout new-address'],

  address: null,
  didValidate: false,
  isPending:false,
  state: service(),
  actions: {
    save() {
      const { onSubmit } = this.attrs;
      const alert = get(this, 'dialogWindow.alert');
      set(this, 'state.isPending', true);
      set(this, 'didValidate', true);

      if(this.get('address.humanName') !== DEFAULT_ADDRESS_NICKNAME) {
        if (onSubmit) {
          onSubmit(...arguments);
        }
      } else {
        alert('Please, change address\' nickname!');
      }
    },

    done() {
      const { onDone } = this.attrs;

      if (onDone) {
        onDone(...arguments);
      }
    }
  }
});
