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
    userStocks : [
      "WIX",
      "MSFT"
    ]
  };

  function getState() {
    return state;
  }

  function setUiState(newState) {
    state.ui = newState;
  }

  window.Stokr = window.Stokr || {};
  window.Stokr.Model = {
    getState,
    setUiState
  };

})();
