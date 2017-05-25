import Ember from 'ember';
import ReviewInteractionMixin from 'lavo-mobile/mixins/review-interaction-mixin';

const { Route, inject: { service } } = Ember;

export default Route.extend(ReviewInteractionMixin, {
	ajax: service(),

	model ({ review_id }) {
		return this.store.findRecord('review', review_id);
	},

	actions: {
		saveComment() {
			this._super(...arguments)
			 .then((gg) => console.log(gg))
			 .catch((err) => console.log(err));
		},

		saveLike() {
			this._super(...arguments)
				.then((gg) => console.log(gg))
				.catch((err) => console.log(err));
		},

		saveDislike() {
			this._super(...arguments)
				.then((gg) => console.log(gg))
				.catch((err) => console.log(err));
		},
	}
});
