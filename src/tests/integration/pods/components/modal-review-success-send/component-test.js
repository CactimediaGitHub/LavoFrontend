import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modal-review-success-send', 'Integration | Component | modal review success send', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{modal-review-success-send}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#modal-review-success-send}}
      template block text
    {{/modal-review-success-send}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
