import Ember from 'ember';
import {validator, buildValidations} from 'ember-cp-validations';

const { get, set, computed, Component } = Ember;

const Validations = buildValidations({
  email: [
    validator('presence', {
      presence: true,
      description: 'Email'
    }),
    validator('format', {
        type: 'email',
        description: 'Email'
      }
    )
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
  ]
});

export default Component.extend(Validations, {
  tagName: 'form',
  classNames: ['ui', 'fields'],

  isPending: false,

  submit(event) {
    const { validations } = this.validateSync();
    const credentials = this.getProperties('email', 'password');

    event.preventDefault();

    if (validations.get('isValid')) {
      set(this, 'isPending', true);
      return this.attrs
        .onSubmit(credentials)
        .catch(({ errors }) => {
          set(this, 'errorMessage', errors && errors.map((error)=> {
              return get(error, 'detail');
            })
          );
        })
        .finally(() => {
          set(this, 'isPending', false);
        });
    }

    set(this, 'errorMessage', get(validations, 'message'));
  }
});
