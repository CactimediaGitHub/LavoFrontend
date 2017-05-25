import Ember from 'ember';

const {
  run,
  Mixin,
  RSVP,
  get,
  assign,
  isPresent,
  String: { singularize, capitalize },
  computed,
  set,
  inject: { service }
  } = Ember;

export default Mixin.create({
  state: service(),
  currentUserType: computed(function() {
    let { type } = get(this, 'session.data.authenticated.data');
    return capitalize(singularize(type));
  }),

  customSerialize(model, type) {
    return {
      'reviewable-id': get(model, 'id'),
      'reviewable-type': 'Review',
      'reviewer-id': get(this, 'session.currentUser.id'),
      'reviewer-type': type,
    };
  },
  setupController(controller, model){
    this._super(...arguments);
    controller.set('state', this.get('state'));
  },

  actions: {
    saveComment(model, body) {
      set(this, 'state.isPending', true);

      const { store, controller } = this;
			const additional = this.customSerialize(model, get(this, 'currentUserType'));

			let data = assign({}, { body }, additional);

      return new RSVP.Promise((resolve, reject) => {
        if (isPresent(body)) {
  				this.get('ajax').post(`reviews/${model.get('id')}/comments`, { data: {data: { attributes: data } } })
  				.then(({ data }) => {
  					let record = store.push(store.normalize(singularize(data.type), data));

  					get(model, 'comments').pushObject(record);
            model.incrementProperty('commentsCount');
  					controller.setProperties({ value: '', error: '' });
            run(null, resolve, record);
  				})
          .catch((err) => run(null, reject, err));
  			} else {
          controller.setProperties({ error: 'too short' });
          run(null, reject, 'too short');
        }
      }).finally(() => {
        set(this, 'state.isPending', false);
      });
		},

    saveLike(model, rating = 1) {
      const additional = this.customSerialize(model, get(this, 'currentUserType'));

      let data = assign({}, { rating }, additional);

      return new RSVP.Promise((resolve, reject) => {
        this.get('ajax').post(`reviews/${model.get('id')}/likes`, { data: {data: { attributes: data } } })
        .then(() => {
          model.incrementProperty('likesCount');
          model.toggleProperty('likedByCurrentUser');
          run(null, resolve);
        }).catch((err) => run(null, reject, err));
      });
    },

    saveDislike(model) {
      return new RSVP.Promise((resolve, reject) => {
        this.get('ajax').delete(`reviews/${model.get('id')}/likes`)
        .then(() => {
          model.decrementProperty('likesCount');
          model.toggleProperty('likedByCurrentUser');
          run(null, resolve);
        }).catch((err) => run(null, reject, err));
      });
    }
  },

});
