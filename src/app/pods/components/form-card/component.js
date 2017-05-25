import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const MAX_ATTEMPT = 10;

const { get, set, inject: { service }, computed, getOwner, Component, RSVP } = Ember;

const Validations = buildValidations({
  'first-name': validator('format', {
    regex: /^[A-z]+$/,
    message: 'First name should contain only alpha characters'
  }),
  'last-name': validator('format', {
    regex: /^[A-z]+$/,
    message: 'Last name should contain only alpha characters'
  }),
  'nick': [
    validator('presence', true),
    validator('length', { max: 11 })
  ],
  'number': [
    validator('presence', true),
    validator('number', { allowString: true }),
    validator('length', { is: 16 })
  ],
  'month': validator('presence', true),
  'year': validator('presence', true),
  'verification-value': [
    validator('presence', true),
    validator('number', { allowString: true }),
    validator('length', { min: 3, max: 4 })
  ]
});

const CardForm = Ember.Object.extend(Validations);

export default Component.extend({
  classNames: ['ui padded layout new-address'],

  ajax: service(),
  state: service(),
  card: null,
  didValidate: false,
  errorMessage: null,
  attemptCount: 0,
  year: computed(function() {
    return (new Date()).getFullYear();
  }),
  init() {
    this._super(...arguments);

    set(this, 'card', CardForm.create(getOwner(this).ownerInjection(), {}))
  },

  getCardData() {
    const card = get(this, 'card');

    return {
      data: {
        type: 'cards',
        attributes: {
          card: card.getProperties([
            'first-name',
            'last-name',
            'nick',
            'number',
            'month',
            'year',
            'verification-value'
          ]),
          ['remember_me']: true
        }
      }
    };
  },

  checkCardWasSaved(deferred, number) {
    const ajax = get(this, 'ajax');
    const attemptCount = get(this, 'attemptCount');

    ajax.request(`/cards/${number}`)
      .then(deferred.resolve)
      .catch(() => {
        if (attemptCount < MAX_ATTEMPT) {
          this.incrementProperty('attemptCount');
          Ember.run.later(this, this.checkCardWasSaved, deferred, number, 1500);
        } else {
          set(this, 'attemptCount', 0);

          deferred.reject({
            errors: [
              {
                detail: 'Unable to add a card. Try again!'
              }
            ]
          });
        }
      });

    return deferred.promise;
  },

  actions: {
    save() {
      const ajax = get(this, 'ajax');
      const card = get(this, 'card');
      const deferred = RSVP.defer();

      set(this, 'didValidate', true);
      set(this, 'errorMessage', null);

      card.validate()
        .then(({ validations }) => {
          if (!validations.get('isValid')) {
            return;
          }

          set(this, 'state.isPending', true);

          return ajax.post('/cards', { data: this.getCardData() });
        })
        .then((response) => {
          return this.checkCardWasSaved(deferred, get(response, 'data.attributes.mask'));
        })
        .then(()=>{
          const { onSubmit } = this.attrs;
          onSubmit && onSubmit();
        })
        .catch(({ errors }) => {
          set(this, 'errorMessage', errors && errors.map((error)=> {
              return get(error, 'detail');
            })
          );
        })
        .finally(() => {
          set(this, 'state.isPending', false);
        });
    },

    done() {
      const { onDone } = this.attrs;

      if (onDone) {
        onDone(...arguments);
      }
    },

    selectMonth(value) {
      set(this, 'card.month', value);
    },

    selectYear(value) {
      set(this, 'card.year', value);
    }
  }
});
