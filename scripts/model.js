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
    stocks: [
      {
        "Symbol": "WIX",
        "Name": "Wix.com Ltd.",
        "Change": "0.750000",
        "PercentChange": "+1.51%",
        "LastTradePriceOnly": "76.099998",
        "CapitalMarket": "1111B"
      },
      {
        "Symbol": "MSFT",
        "Name": "Microsoft Corporation",
        "PercentChange": "-2.09%",
        "Change": "-0.850006",
        "LastTradePriceOnly": "69.620003",
        "CapitalMarket": "1111B"
      },
      {
        "Symbol": "YHOO",
        "Name": "Yahoo! Inc.",
        "Change": "0.279999",
        "PercentChange": "+1.11%",
        "LastTradePriceOnly": "50.599998",
        "CapitalMarket": "1111B"
      }
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
