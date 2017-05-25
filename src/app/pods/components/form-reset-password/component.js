import Ember from 'ember';
import {validator, buildValidations} from 'ember-cp-validations';
import {ROUTE_SETTINGS_PROFILE} from 'lavo-mobile/constants';
const {get, set, inject: {service}, computed, getOwner, Component, RSVP, Object} = Ember;

const Validations = buildValidations({
  password: {
    validators: [
      validator('presence', true),
      validator('length', {
        min: 6
      })
    ]
  },
  password_confirmation: validator('confirmation', {
    on: 'password',
    message: 'Passwords do not match'
  }),
});

const PasswordForm = Object.extend(Validations);

export default Component.extend({
  passwordForm: null,
  onSuccessChange: null,
  transitionRoute: ROUTE_SETTINGS_PROFILE,
  state: service(),
  ajax: service(),
  session: service(),
  init() {
    this._super(...arguments);
    set(this, 'passwordForm', PasswordForm.create(getOwner(this).ownerInjection(), {}))
  },

  actions: {
    savePassword(){
      const passwordForm = get(this, 'passwordForm');
      const ajax = get(this, 'ajax');
      const onSuccessChange = get(this, 'onSuccessChange');
      passwordForm
        .validate()
        .then(({validations}) => {
          if (!validations.get('isValid')) {
            return RSVP.reject();
          }

          set(this, 'state.isPending', true);
          return ajax.patch('/password_resets', {
            data: {
              'password_reset': passwordForm.getProperties([
                'password',
                'password_confirmation'
              ])
            }
          });
        })
        .then(() => {
          onSuccessChange();
        })
        .catch((res) => {
          alert('Please check your fields.');
        })
        .finally(() => {
          set(this, 'state.isPending', false);
        });
    }
  }
});
