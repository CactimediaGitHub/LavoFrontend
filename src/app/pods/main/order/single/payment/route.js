import Ember from 'ember';
import {
  ROUTE_ORDER_SINGLE_APPROVE,
  ROUTE_ORDERS_LIST_NEW,
  ROUTE_MAKE_ORDER_CART,
  ROUTE_MAKE_ORDER_CHECKOUT,
  CHECKOUT_TYPE_CREDITS,
  CHECKOUT_TYPE_PARTIAL,
  CHECKOUT_TYPE_CARD,
  CHECKOUT_TYPE_CASH,
  ROUTE_ORDER_SINGLE_FAILURE
} from 'lavo-mobile/constants';

const {Route, RSVP, get, set, inject: {service}} = Ember;
import OrderPaymentMixin from 'lavo-mobile/mixins/order-payment-mixin';
import LongLoadingMixin from 'lavo-mobile/mixins/long-loading-mixin';

export default Route.extend(OrderPaymentMixin, LongLoadingMixin, {
  ajax: service(),
  orderParentRoute: ROUTE_ORDER_SINGLE_APPROVE,

  makeCashPayment(order) {
    const ajax = get(this, 'ajax');

    return ajax.post('/payments/cash', {
      data: {
        type: 'purchases',
        data: {
          attributes: {
            ['order-id']: get(order, 'id')
          }
        }
      }
    });
  },

  makeCardPayment(order, cvv) {
    const ajax = get(this, 'ajax');

    return ajax.post('/purchases', {
      data: {
        type: 'payment-gateway-purchases',
        data: {
          attributes: {
            ['card-token']: get(order, 'card.token'),
            ['order-id']: get(order, 'id'),
            ['credits-amount']: 0,
            ['card-verification-value']: cvv
          }
        }
      }
    });
  },

  makeCreditsPayment(order) {
    const ajax = get(this, 'ajax');
    const total = get(order, 'cpTotalWithShipping');

    return ajax.post('/purchases/by_credits', {
      data: {
        type: 'payment-gateway-purchases',
        data: {
          type: 'purchases',
          attributes: {
            ['order-id']: get(order, 'id'),
            ['credits-amount']: total,
          }
        }
      }
    });
  },

  makePartialPayment(order, cvv) {
    const ajax = get(this, 'ajax');

    return ajax.post('/purchases', {
      data: {
        type: 'payment-gateway-purchases',
        data: {
          attributes: {
            ['card-token']: get(order, 'card.token'),
            ['order-id']: get(order, 'id'),
            ['credits-amount']: get(order, 'amountOfCreditsForPartialPayment'),
            ['card-verification-value']: cvv
          }
        }
      }
    });
  },
  makePayment(order, checkoutType){

    if (checkoutType === CHECKOUT_TYPE_CASH) {
      return this.makeCashPayment(order);
    }

    if (checkoutType === CHECKOUT_TYPE_CREDITS) {
      return this.makeCreditsPayment(order);
    }

    if ([CHECKOUT_TYPE_CARD, CHECKOUT_TYPE_PARTIAL].includes(checkoutType)) {
      let deferred = RSVP.defer();
      let cvv;
      let prompt = get(this, 'dialogWindow.prompt')
      let pay = (cvv) => {
        if (Ember.isEmpty(cvv)) {
          deferred.reject(this.rejectResponse('No or invalid CVV value'));
        }
        if (checkoutType === CHECKOUT_TYPE_CARD) {
          return this.makeCardPayment(order, cvv).then(deferred.resolve, deferred.reject);
        }

        if (checkoutType === CHECKOUT_TYPE_PARTIAL) {
          return this.makePartialPayment(order, cvv).then(deferred.resolve, deferred.reject);
        }
      }

      if (!get(order, 'card.firstPurchase')) {
        prompt('Enter CVV for your card')
          .then(pay)
      } else {
        pay(true);
      }

      return deferred.promise;
    }

    return RSVP.Promise.resolve();
  },
  confirmPayment(data, checkoutType, deferred, order){

    if ([CHECKOUT_TYPE_CASH, CHECKOUT_TYPE_CREDITS].includes(checkoutType)) {
      return RSVP.Promise.resolve();
    }

    const ajax = get(this, 'ajax');
    const url = get(data, 'data.attributes.confirmation-url');

    if (!url) {
      if (get(data, 'data.attributes.response-code') === "00044") {
        return this.store.findRecord('card', get(order, 'card.id')).then((card) => {
          return card.destroyRecord();
        }).then(() => {
          deferred.reject(this.rejectResponse('Your card information is expired.'));
          return deferred.promise;
        });
      }
      deferred.reject(this.rejectResponse('Confirmation URL is expired'));
      return deferred.promise;
    }

    if (!cordova.InAppBrowser) {
      console.error('[ERROR] to test payments, use mobile app.');
    }
    const inAppBrowserRef = cordova.InAppBrowser.open(url, '_blank', 'location=no,hidden=yes');
    inAppBrowserRef.addEventListener('loadstart', (event)=> {
      if (event.url.match("payments/completion")) {
        inAppBrowserRef.close();

        ajax.request(event.url).then((data)=> {
          let responseCode = get(data, 'data.attributes.response-code');
          if (responseCode == 14000) {
            deferred.resolve(data);
          } else {
            deferred.reject(data);
          }
        }).catch((data) => deferred.reject(data));
      }
    });

    inAppBrowserRef.addEventListener('loadstop', ()=> {
      Ember.run.next(() => {
        inAppBrowserRef.executeScript({code: 'localStorage.setItem( "isCard", document.getElementById("card") );localStorage.getItem("isCard")'}, (params) => {
          if (params[0] !== "null") {
            inAppBrowserRef.show();
          }
        });
      });
    });

    return deferred.promise;
  },

  rejectResponse(message){
    return {
      data: {
        attributes: {
          ['response-message']: message
        }
      }
    }
  },

  actions: {
    submit (order, state) {
      const checkoutType = get(order, 'checkoutType');
      const deferred = RSVP.defer();
      const alert = get(this, 'dialogWindow.alert');
      set(this, 'controller.isPending', true);

      if (checkoutType) {
        this.get('ajax').patch(`order_states/${get(order, 'id')}`, {data: {state}})
          .then(() => {
            order.setProperties({state});
            return this.makePayment(order, checkoutType);
          })
          .then((data)=> {
            return this.confirmPayment(data, checkoutType, deferred);
          })
          .then(() => {
            this.transitionTo(ROUTE_ORDERS_LIST_NEW);
          })
          .catch((data)=> {
            this.transitionTo(ROUTE_ORDER_SINGLE_FAILURE, {queryParams: {errorMessage: get(data, 'data.attributes.response-message')}});
          })
          .finally(()=> {
            set(this, 'controller.isPending', false);
          });
      } else {
        alert('Please, check checkout method!');
      }
    },
  }
});
