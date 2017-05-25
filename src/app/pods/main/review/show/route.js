import Ember from 'ember';
import ReviewInteractionMixin from 'lavo-mobile/mixins/review-interaction-mixin';
import GuestRouteMixin from 'lavo-mobile/mixins/guest-route-mixin';

const { Route, inject: { service }, get, set } = Ember;

export default Route.extend(ReviewInteractionMixin, GuestRouteMixin, {
	ajax: service(),
  session:service(),
	model ({ review_id }) {
		return this.store.peekRecord('review', review_id);
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

    goBack(){
			let previous = this.get('routeHistory.previous');
			window.location.href = previous;
		}
	}
});
