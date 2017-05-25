export const SORT_BY_PROXIMITY = 'st_proximity';
export const SORT_BY_RATING = '-cached-average-rating';
export const SORT_BY_PRICE = 'inventory_items.price';

export const FILTER_BY_VENDOR_SERVICE = 'inventory_items.service_id';
export const FILTER_BY_VENDOR_ITEM = 'inventory_items.item_id';

export const ROUTE_INTRO = 'intro';
export const ROUTE_AUTH_SIGNIN = 'auth.signin';
export const ROUTE_LOCATION = 'location';

export const ROUTE_MAIN = 'main';

export const ROUTE_HOME = 'main.home';
export const ROUTE_HOME_INDEX = 'main.home.index';
export const ROUTE_MAIN_PASSWORD_RESET = "main.password-reset";
export const ROUTE_SETTINGS = 'main.settings';

export const ROUTE_VENDOR = 'main.vendor';
export const ROUTE_VENDOR_SINGLE_MAP = 'main.vendor.map';

export const ROUTE_VENDOR_GALLERY = 'main.vendor.gallery';
export const ROUTE_VENDOR_GALLERY_FULLSCREEN = 'main.vendor.gallery-fullscreen';
export const ROUTE_VENDOR_REVIEWS = 'main.vendor.reviews';

export const ROUTE_VENDOR_LIST = 'main.home.list';
export const ROUTE_VENDOR_TILES = 'main.home.tiles';
export const ROUTE_VENDOR_MAP = 'main.home.map';
export const ROUTE_VENDOR_FILTER = 'main.home.filter';
export const ROUTE_VENDOR_FILTER_PRICE = 'main.home.filter-price';

export const ROUTE_MAKE_ORDER = 'main.make-order';
export const ROUTE_MAKE_ORDER_BASKET = 'main.make-order.basket';
export const ROUTE_MAKE_ORDER_DELIVERY = 'main.make-order.delivery';
export const ROUTE_MAKE_ORDER_CHECKOUT = 'main.make-order.checkout';
export const ROUTE_MAKE_ORDER_SHIPPING = 'main.make-order.shipping';

export const ROUTE_MAKE_ORDER_CART = 'main.make-order.cart';
export const ROUTE_MAKE_ORDER_SUCCESS = 'main.make-order.success';
export const ROUTE_MAKE_ORDER_FAILURE = 'main.make-order.failure';

export const ROUTE_OPEN_BASKET = 'main.open-basket';
export const ROUTE_OPEN_BASKET_DELIVERY = 'main.open-basket.delivery';
export const ROUTE_OPEN_BASKET_SHIPPING = 'main.open-basket.shipping';
export const ROUTE_OPEN_BASKET_SUCCESS = 'main.open-basket.success';
export const ROUTE_OPEN_BASKET_TERMS = 'main.open-basket.terms-and-conditions';

export const ROUTE_ADDRESS_CREATE = 'address.create';
export const ROUTE_ADDRESS_LIST = 'address.list';

export const ROUTE_CARD_CREATE = 'card.create';
export const ROUTE_CARD_LIST = 'card.list';

export const ROUTE_ORDERS = 'main.order';
export const ROUTE_ORDERS_LIST = 'main.order.list';
export const ROUTE_ORDERS_LIST_NEW = 'main.order.list.new';
export const ROUTE_ORDERS_LIST_ACTIVE = 'main.order.list.active';
export const ROUTE_ORDERS_LIST_HISTORY = 'main.order.list.history';
export const ROUTE_ORDER_SINGLE_VIEW = 'main.order.single.view';
export const ROUTE_ORDER_SINGLE_CANCEL = 'main.order.single.cancel';
export const ROUTE_ORDER_SINGLE_APPROVE = 'main.order.single.approve';
export const ROUTE_ORDER_SINGLE_PAYMENT = 'main.order.single.payment';
export const ROUTE_ORDER_SINGLE_FAILURE = 'main.order.single.payment';


export const ROUTE_INFO = 'main.info';

export const ROUTE_SETTINGS_CREDITS = 'main.settings.credits';
export const ROUTE_SETTINGS_CREDITS_BUY = 'main.settings.credits.buy';
export const ROUTE_BUY_CREDITS_SUCCESS = 'main.settings.credits.success';
export const ROUTE_SETTINGS_CREDITS_FAILURE = 'main.settings.credits.failure';
export const ROUTE_SETTINGS_PROFILE = 'main.settings.profile';
export const ROUTE_SETTINGS_PASSWORD_RESET = 'main.settings.password-reset';

export const ROUTE_SETTINGS_PROMOTION = 'main.settings.promotion';
export const ROUTE_SETTINGS_NOTIFICATIONS = 'main.settings.notifications';

export const ROUTE_CREATE_REVIEW = 'main.review.create';
export const ROUTE_SHOW_REVIEW = 'main.review.show';
export const ROUTE_REVIEWS = 'main.review.list';

export const ROUTE_ADMIN = 'admin';
export const ROUTE_ADMIN_HOME = 'admin.home';
export const ROUTE_ADMIN_ORDER = 'admin.order';
export const ROUTE_ADMIN_INFO = 'admin.info';


export const ROUTE_ADMIN_ORDER_LIST = 'admin.order.list';
export const ROUTE_ADMIN_ORDER_LIST_INDEX = 'admin.order.list.index';
export const ROUTE_ADMIN_ORDER_LIST_NEW = 'admin.order.list.new';
export const ROUTE_ADMIN_ORDER_LIST_ACTIVE = 'admin.order.list.active';
export const ROUTE_ADMIN_ORDER_LIST_HISTORY = 'admin.order.list.history';

export const ROUTE_ADMIN_ORDER_SHOW = 'admin.order.show';
export const ROUTE_ADMIN_ORDER_SHOW_MAP = 'admin.order.show.map';
export const ROUTE_ADMIN_ORDER_UPDATE = 'admin.order.update';


export const ROUTE_ADMIN_SETTINGS = 'admin.settings';
export const ROUTE_ADMIN_SETTINGS_PAYMENT = 'admin.settings.payment';
export const ROUTE_ADMIN_SETTINGS_PROFILE = 'admin.settings.profile';
export const ROUTE_ADMIN_SETTINGS_NOTIFICATIONS = 'admin.settings.notifications';
export const ROUTE_ADMIN_SETTINGS_PASSWORD_RESET = 'admin.settings.password-reset';
export const ROUTE_ADMIN_SETTINGS_PROMOTION = 'admin.settings.promotion';

export const ROUTE_ADMIN_REVIEW = 'admin.review.list';
export const ROUTE_ADMIN_REVIEW_SHOW = 'admin.review.show';

export const DELIVERY_PERIOD_DEFAULT = 24;

export const ORDER_STATUS_PENDING = 'pending';
export const ORDER_STATUS_PROCESSING = 'processing';
export const ORDER_STATUS_COMPLETED = 'completed';
export const ORDER_STATUS_CANCELLED = 'cancelled';
export const ORDER_STATUS_REFUNDED = 'refunded';
export const ORDER_STATUS_UPDATING = 'updating';
export const ORDER_STATUS_APPROVING = 'approving';

export const CHECKOUT_TYPE_CARD = 'card';
export const CHECKOUT_TYPE_CASH = 'cash';
export const CHECKOUT_TYPE_CREDITS = 'credits';
export const CHECKOUT_TYPE_PARTIAL = 'partial';

export const PAGINATION_SIZE = 10;
export const PAGINATION_START_PAGE = 1;

export const NO_AVATAR_IMAGE = 'assets/images/no_avatar.png';
export const FIXTURE_IMAGE = 'assets/images/fixtures/1.png';
export const MARKER = 'assets/images/map-marker.png';
export const DEFAULT_ADDRESS_NICKNAME = 'My home address';

export const MAKE_OPEN_BASKET_TRANSITION_EXCEPTIONS = `${ROUTE_OPEN_BASKET_SUCCESS}|${ROUTE_OPEN_BASKET_DELIVERY}|${ROUTE_OPEN_BASKET_TERMS}|${ROUTE_OPEN_BASKET_SHIPPING}|${ROUTE_ADDRESS_CREATE}`;
export const MAKE_ORDER_TRANSITION_EXCEPTIONS = `${ROUTE_MAKE_ORDER}|${ROUTE_ADDRESS_CREATE}|${ROUTE_CARD_CREATE}`;
