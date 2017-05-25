import Ember from 'ember';
import RouteRedirectTo from 'lavo-mobile/mixins/route-redirect-to-mixin';

const { run, Mixin, RSVP, set, inject: { service } } = Ember;

export default Mixin.create(RouteRedirectTo, {
  state: service(),
  saveRecord(record) {
    if (!record) {
      return RSVP.Promise.resolve();
    }

    return record
      .validate()
      .then(({ validations }) => {
        if (validations.get('isValid')) {
          return record.save();
        }

        return RSVP.reject();
      })
  },

  removeRecord(record) {
    if (!record) {
      return RSVP.Promise.resolve();
    }

    return new RSVP.Promise((resolve) => {
      run.later(() => {
        record.unloadRecord();
        resolve();
      });
    });
  },

  actions: {
    save() {
      set(this,'state.isPending', true);

      return this.saveRecord(...arguments)
        .then(() => {
          this.redirectToRoute();
        })
        .finally(() => {
          set(this,'state.isPending', false);
        });
    },

    done() {
      this.removeRecord(...arguments).then(this.redirectToRoute);
    }
  },

  setupController(controller, model) {
    this._super(controller, model);
  }
});
