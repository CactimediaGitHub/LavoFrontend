import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.modal('modal-connection', {
    withParams: 'modalConnection',
    dialogClass: 'ui modal connection'
  });
  this.modal('modal-need-login', {
    withParams: 'modalNeedLogin',
    dialogClass: 'ui modal'
  });

  this.route('intro', function () {
    this.modal('modal-connection', {
      withParams: 'modalConnection',
      dialogClass: 'ui modal connection'
    });
  });

  this.route('auth', function () {
    this.route('signin');
    this.route('signup', function () {
      this.modal('modal-successful-registration', {
        withParams: 'modalSuccessfulRegistration',
        dialogClass: 'ui modal'
      });
    });
    this.route('forgot');
  });

  this.route('main', {path: '/'}, function () {
    this.route('home', {path: '/'}, function () {
      this.route('map');
      this.route('list');
      this.route('tiles');
      this.route('filter');
      this.route('filter-price');
    });
    this.route('order', {path: 'orders'}, function () {
      this.route('list', {path: '/'}, function () {
        this.route('new');
        this.route('active');
        this.route('history');
      });
      this.route('single', function () {
        this.route('view', {path: '/view/:order_id'}, function () {
          this.modal('modal-order-cancel', {
            withParams: 'modalOrderCancel',
            dialogClass: 'ui modal'
          });
        });
        this.route('approve', {path: '/approve/:order_id'});
        this.route('cancel');
        this.route('payment', {path: '/payment/:order_id'});
        this.route('failure');
      });
    });
    this.route('review', {path: 'reviews'}, function () {
      this.route('show', {path: '/:review_id'});
      this.route('create');
      this.route('list');
    });
    this.route('settings', function () {
      this.route('profile', function () {
        this.modal('modal-password-reset-link-sended', {
          withParams: 'modalPasswordResetLinkSended',
          dialogClass: 'ui modal connection'
        })
        this.modal('modal-password-successfully-changed', {
          withParams: 'modalPasswordSuccessfullyChanged',
          dialogClass: 'ui modal'
        });
      });
      this.route('password-reset');
      this.route('notifications');
      this.route('credits', function () {
        this.route('buy');
        this.route('history');
        this.route('failure');
        this.route('success');
      });
      this.route('promotion');
    });
    this.route('credit', function () {
      this.route('buying');
    });
    this.route('vendor', {path: '/vendors/:id'}, function () {
      this.modal('modal-review-success-send', {
        withParams: 'modalReviewSuccessSend',
        dialogClass: 'ui modal'
      });

      this.route('gallery');
      this.route('gallery-fullscreen', {path: 'gallery-fs/:id'});
      this.route('reviews');
      this.route('map');
    });
    this.route('make-order', {path: '/make-order/:vendorId'}, function () {
      this.route('basket', {path: '/'});
      this.route('delivery');
      this.route('shipping');
      this.route('checkout');
      this.route('cart');
      this.route('success');
      this.route('failure');
      this.route('select-service');
      this.route('select-type');
    });
    this.route('test-model-box');
    this.route('info', {path: '/info/:alias'});

    this.route('open-basket', {path: '/open-basket/:vendorId'}, function () {
      this.route('delivery', {path: '/'})
      this.route('create');
      this.route('success');
      this.route('terms-and-conditions');
      this.route('shipping');
    });
    this.route('password-reset', function () {
      this.modal('modal-password-successfully-changed', {
        withParams: 'modalPasswordSuccessfullyChanged',
        dialogClass: 'ui modal'
      });
    });
  });
  this.route('admin', function () {
    this.route('home');
    this.route('order', {path: 'orders'}, function () {
      this.route('list', {path: '/'}, function () {
        this.route('new');
        this.route('active');
        this.route('history');
      });
      this.route('show', {path: '/:order_id'}, function () {
        this.route('map');
      });
      this.route('update', {path: '/:order_id/update'}, function () {
        this.route('main', {path: '/'});
        this.route('select-service');
        this.route('select-type');

      });
    });
    this.route('settings', function () {
      this.route('notifications');
      this.route('profile', function () {
        this.modal('modal-password-reset-link-sended', {
          withParams: 'modalPasswordResetLinkSended',
          dialogClass: 'ui modal connection'
        });
        this.modal('modal-password-successfully-changed', {
          withParams: 'modalPasswordSuccessfullyChanged',
          dialogClass: 'ui modal'
        });
      });
      this.route('payment');
      this.route('promotion');
      this.route('password-reset');
    });
    this.route('review', {path: 'review'}, function () {
      this.route('show', {path: '/:review_id'});
      this.route('list');
    });
    this.route('info', {path: '/info/:alias'});
  });
  this.route('location');
  this.route('card', {path: 'cards'}, function () {
    this.route('create');
  });
  this.route('address', {path: 'addresses'}, function () {
    this.route('create');
  });
});

export default Router;
