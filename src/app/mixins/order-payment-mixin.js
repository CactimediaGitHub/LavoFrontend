import Ember from 'ember';
import {
  CHECKOUT_TYPE_CREDITS,
  CHECKOUT_TYPE_CARD,
  CHECKOUT_TYPE_PARTIAL
} from 'lavo-mobile/constants';

const {get, set, RSVP, assign, inject: {service}} = Ember;

export default Ember.Mixin.create({
  model() {
    this._super(...arguments);
    const ajax = get(this, 'ajax');
    const {order} = this.modelFor(get(this, 'orderParentRoute'));

    return RSVP.hash({
      order,
      totals: ajax.post('/cart', {data: order.serializeCustom()}),
      cards: this.store.findAll('card'),
      credits: ajax.request('/credits')
    }).then((hash) => {

      const amountOfCredits = get(hash, 'credits.data.attributes.credits-amount') || 0;
      const totalPrice = get(hash, 'totals.data.attributes.total')
      const canUseCredits = amountOfCredits >= totalPrice;
      hash = assign(hash, {
        maximumAmountOfCredits: amountOfCredits >= totalPrice ? totalPrice : amountOfCredits,
        canUseCredits: canUseCredits,
        canUsePaymentSplit: true,
        isPaymentSplit: get(order, 'isPaymentSplit'),
        amountOfCreditsForPartialPayment: get(order, 'amountOfCreditsForPartialPayment') / 100
      });

      set(order, 'amountOfCredits', amountOfCredits);

      set(order, 'calculatedTotal', totalPrice);
      return RSVP.resolve(hash);
    }).catch((error)=> {
      console.error(error);
    });
  },
  scrollToBottom(){
    let el = $('.keyboard-scroll');
    el.scrollTop(el.height());
  },
  actions: {
    setPaymentSplit(order, cards) {
      const card = cards.objectAt(0);
      set(order, 'isPaymentSplit', !get(order, 'order.isPaymentSplit'));
      set(order, 'checkoutType', CHECKOUT_TYPE_PARTIAL);
      set(order, 'card', card);
      set(order, 'numberCard', get(card, 'number'));

      Ember.run.later(this.get('scrollToBottom'), 1);
    },

    selectCard(order, card, value) {
      set(order, 'card', value ? card : null);
      set(order, 'numberCard', value ? get(card, 'number') : null);
      set(order, 'checkoutType', value ? CHECKOUT_TYPE_CARD : null);
    },

    selectCheckoutMethod(order, cards, type) {
      set(order, 'card', null);
      set(order, 'numberCard', null);
      set(order, 'checkoutType', type);

      if (type === CHECKOUT_TYPE_CREDITS) {
        set(order, 'card', cards.objectAt(0));
      }
    },

    setAmountOfCreditsForPartialPayment(order, value) {
      set(order, 'amountOfCreditsForPartialPayment', value * 100);
    },

    removeCard(model, card) {
      let confirm = get(this, 'dialogWindow.confirm');
      confirm(`Do you want to remove card "${get(card, 'nick')}"?`).then((answer) => {
        if (answer) {
          card.destroyRecord();
        }
      })
    }
  }
});
