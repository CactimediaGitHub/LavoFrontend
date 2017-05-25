import Ember from 'ember';
import AuthenticatedGuestRouteMixin from './authenticated-guest-route-mixin';

const { get, Mixin, getOwner, inject: { service } } = Ember;

export default Mixin.create({
	session: service(),
	actions: {
		willTransition ( transition ) {
			this._super( transition );

			let applicationInstance = getOwner(this);
			let route = applicationInstance.lookup('route:' + get(transition, 'targetName').replace('.index', ''));
			if (AuthenticatedGuestRouteMixin.detect(route) && !get(this, 'session.isAuthenticated')) {
				transition.abort();
				this.transitionTo(get(this, 'routeName'), { queryParams: { modalNeedLogin: true } });
			}

		}
	}
});
