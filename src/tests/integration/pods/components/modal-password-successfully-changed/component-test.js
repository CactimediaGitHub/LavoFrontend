import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modal-password-successfully-changed', 'Integration | Component | modal password successfully changed', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{modal-password-successfully-changed}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#modal-password-successfully-changed}}
      template block text
    {{/modal-password-successfully-changed}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
