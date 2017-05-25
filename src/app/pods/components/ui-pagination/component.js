import Ember from 'ember';

const { get, set, computed, Component } = Ember;

const ITEMS = 4;

export default Component.extend({
  classNames: ['ui pagination'],

  pages: computed('totalPages', 'currentPage', function() {
    const page = get(this, 'currentPage');
    const totalPages = get(this, 'totalPages');
    let pages = [];
    let startIndex;
    let endIndex;

    startIndex = page < ITEMS ? 0 : page - 2;
    startIndex = startIndex < (totalPages - ITEMS) ? startIndex : totalPages - ITEMS;
    endIndex = (startIndex + ITEMS) < totalPages ? startIndex + ITEMS : totalPages;

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    if (totalPages <= ITEMS) {
      return pages;
    }

    return pages.slice(startIndex, endIndex);
  }),

  hasPagination: computed.gt('pages.length', 1),
  currentPage: 1,
  totalPages: 0,
  onChange: null,

  actions: {
    pageClicked(number) {
      const { onChange } = this.getProperties('onChange');

      set(this, 'currentPage', number);

      if (onChange) {
        onChange(number);
      }
    },

    incrementPage(value) {
      const {
        onChange,
        currentPage,
        totalPages
      } = this.getProperties('onChange', 'currentPage', 'totalPages');

      if (currentPage === totalPages && value === 1) {
        return false;
      }

      if (currentPage <= 1 && value === -1) {
        return false;
      }

      this.incrementProperty('currentPage', value);

      if (onChange) {
        onChange(get(this, 'currentPage'));
      }
    }
  }
});
