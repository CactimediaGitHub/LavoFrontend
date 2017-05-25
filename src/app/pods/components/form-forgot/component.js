import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';
import extractErrors from '../../../utils/extract-errors';

const { get, set, inject, Component } = Ember;

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
  ]
});

export default Component.extend(Validations, {
  tagName: 'form',
  classNames: ['ui', 'fields'],

  isPending: false,

  submit(event) {
    const { email } = this.getProperties('email');
    const { validations } = this.validateSync();

    event.preventDefault();

    if (get(validations, 'isValid')) {
      set(this, 'isPending', true);

      return this.attrs
        .onSubmit(email)
        .then(() => {
          set(this, 'successMassage', 'Check your email box');
        })
        .catch(({ errors })=> {
          set(this, 'errorMessage', errors && errors.map((error)=> {
              return extractErrors(get(error, 'detail'));
            })
          );
        })
        .finally(()=> {
          set(this, 'isPending', false);
        });
    }

    set(this, 'errorMessage', get(validations, 'message'));
  }
});
