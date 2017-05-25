import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const {get, set, computed, Component } = Ember;

const Validations = buildValidations({
  email: [
    validator('presence', {
      presence: true,
      description: 'Email'
    }),
    validator('format', {
      type: 'email',
      description: 'Email',
      message: 'Invalid E-mail',
      regex: /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
    }),
  ],
  password: [
    validator('presence', {
      presence: true,
      description: 'Password'
    }),
    validator('length', {
      min: 4,
      max: 30,
      description: 'Password'
    })
  ],
  confirmPassword: [
    validator('presence', {
      presence: true,
      description: 'Password'
    }),
    validator('confirmation', {
      on: 'password',
      message: 'Password do not match'
    })
  ]
});

export default Component.extend(Validations, {
  tagName: 'form',
  classNames: ['ui', 'fields'],
  attributeBindings: ['novalidate'],
  novalidate: true,

  isPending: false,

  submit(event) {
    const { validations } = this.validateSync();
    const credentials = this.getProperties('email', 'password', 'passwordConfirmation');

    event.preventDefault();

    if (get(validations, 'isValid')) {
      set(this, 'isPending', true);

      return this.attrs
        .onSubmit(credentials)
        .catch((response) => {
          let errorMessage = ''
          if (get(response,"errors").length) {
            for (var i = 0; i < response.errors.length; i++) {
              let error = response.errors[i];
              errorMessage += `${get(error,'source.pointer').split('/').slice(-1)[0]} ${get(error,"detail")}\r`
            }
          }
          set(this, 'errorMessage', errorMessage);
        })
        .finally(() => {
          set(this, 'isPending', false);
        });
    }

    set(this, 'errorMessage', get(validations, 'message'));
  }
});
