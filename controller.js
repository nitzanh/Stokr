/**
 *  Controller
 */
(function () {
  'use strict'

  let state = {
    stocks:[
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

  function handleChangeBtnClick() {
    window.Stokr.View.toggleStockDisplay();
    window.Stokr.View.setStocksChange(state.stocks)
  }

  function handleArrowClick(event) {
    const stockId = event.target.parentNode.dataset.id;
    const index = state.stocks.findIndex((stock) => stock.Symbol === stockId);
    const swapWith = event.target.classList.contains('arrow-up') ? index - 1 : index + 1;
    swap(state.stocks, index, swapWith);
    return window.Stokr.View.render(state);
  }

  function swap(array, i, j) {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }

  window.Stokr = window.Stokr || {};
  window.Stokr.Ctrl = {
    handleArrowClick,
    handleChangeBtnClick
  };

  window.Stokr.View.render(state);

})();
