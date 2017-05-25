import Ember from 'ember';

const {get, set, Mixin, A} = Ember;

export default Mixin.create({
  queryParams: {
    redirectTo: {},
    redirectToParam: {},
    redirectToQueryParams: {}
  },

  redirectTo: null,
  redirectToParam: null,
  redirectToDefault: null,
  redirectToQueryParams: null,

  init() {
    this._super(...arguments);

    this.redirectToRoute = this.redirectToRoute.bind(this);
  },

  redirectToRoute() {
    const args = [
      get(this, 'redirectTo'),
      get(this, 'redirectToParam'),
      get(this, 'redirectToQueryParams')
    ];

    return this.transitionTo(...A(args).compact());
  },

  beforeModel({queryParams: {redirectTo, redirectToParam, redirectToQueryParams}}) {
    redirectToParam = redirectToParam == 'false' ? false : redirectToParam;
    redirectToQueryParams = redirectToQueryParams == 'false' ? false : redirectToQueryParams;

    set(this, 'redirectTo', redirectTo || get(this, 'redirectToDefault') || undefined);
    set(this, 'redirectToParam', redirectToParam || undefined);
    set(this, 'redirectToQueryParams', redirectToQueryParams || undefined);

    this._super(...arguments);
  }
});
