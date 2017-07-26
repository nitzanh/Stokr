/**
 *  Model
 */
(function () {
  'use strict'

  let state = {
    ui: {
      displayMode: 'percent',
      isFilterShown: false,
      filters: {
        byName: '',
        byGain: 'all',
        byRangeFrom: '',
        byRangeTo: ''
      }
    },
    stocksSymbols : [
      "WIX",
      "MSFT"
    ]
  };

  function getState() {
    return state;
  }

  window.Stokr = window.Stokr || {};
  window.Stokr.Model = {
    getState
  };

})();
