/**
 *  Controller
 */
(function () {
  'use strict'

  function handleChangeBtnClick() {
    const state = window.Stokr.Model.getState();
    toggleStockDisplay(state.ui);
    window.Stokr.View.updateStocksChange(state.stocks, state.ui.displayMode);
  }

  function handleArrowClick(stockId, isUpClicked) {
    const state = window.Stokr.Model.getState();
    const index = state.stocks.findIndex((stock) => stock.Symbol === stockId);
    const swapWith = isUpClicked ? index - 1 : index + 1;
    swap(state.stocks, index, swapWith);
    renderView(state);
  }

  function swap(array, i, j) {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }

  function toggleStockDisplay(uiState) {
    switch (uiState.displayMode) {
      case 'percent':
        uiState.displayMode = 'value';
        break;
      case 'value' :
        uiState.displayMode = 'capital';
        break;
      default:
        uiState.displayMode = "percent";
    }
    storeState();
  }

  function toggleFilter() {
    const state = window.Stokr.Model.getState();
    state.ui.isFilterShown = !state.ui.isFilterShown;
    // clear the filter when closing it
    if (!state.ui.isFilterShown) {
      state.ui.filters = {
        byName: '',
        byGain: 'all',
        byRangeFrom: '',
        byRangeTo: ''
      };
    }
    storeState();
    renderView(state);
  }

  function applyFilter(filters) {
    const state = window.Stokr.Model.getState();
    state.ui.filters = filters;
    storeState();
    renderView(state);

  }

  function getFilteredStocks(stocks, filters) {
    if (typeof stocks === 'undefined') {
      return [];
    }
    return stocks.filter(function (stock) {
      return matchByName(stock, filters.byName) &&
        matchByGain(stock, filters.byGain) &&
        matchByRange(stock, filters.byRangeFrom, filters.byRangeTo);
    });
  }

  function matchByName(stock, byName) {
    return byName === '' || stock.Name.includes(byName) || stock.Symbol.includes(byName);
  }

  function matchByGain(stock, byGain) {
    return byGain === 'all' ||
            (byGain === 'gaining' && stock.Change >= 0) ||
            (byGain === 'losing' && stock.Change < 0);
  }

  function matchByRange(stock, rangeFrom, rangeTo) {
    const percentChange = parseFloat(stock.realtime_chg_percent);
    let fromFloat = parseFloat(rangeFrom);
    fromFloat = isNaN(fromFloat) ? -Infinity : fromFloat;
    let toFloat = parseFloat(rangeTo);
    toFloat = isNaN(toFloat) ? Infinity : toFloat;
    return percentChange >= fromFloat && percentChange <= toFloat;
  }

  function renderView(state) {
    const filters = state.ui.filters;
    const shouldFilter = state.ui.isFilterShown &&
      (filters.byName !== '' || filters.byGain !== 'all' || filters.byRangeFrom !== '' || filters.byRangeTo !== '');
    const stocksShown = shouldFilter ? getFilteredStocks(state.stocks, state.ui.filters) : state.stocks;
    window.Stokr.View.render(stocksShown, state.ui);
  }

  window.Stokr = window.Stokr || {};
  window.Stokr.Ctrl = {
    handleArrowClick,
    handleChangeBtnClick,
    toggleFilter,
    applyFilter
  };

  function updateStocks(state) {
    if (state.userStocks.length > 0) {
      const userStocks = state.userStocks.join();
      return fetch(`http://localhost:7000/quotes?q=${userStocks}`)
        .then(function (data) {
          return data.json();
        })
        .then(function (responseJson) {
          state.stocks = responseJson.query.results.quote;
        });
    }
  }

  function storeState() {
    const uiStateKey = 'stokr-state';
    const state = window.Stokr.Model.getState();
    localStorage.setItem(uiStateKey, JSON.stringify(state.ui));
  }

  function loadState() {
    const uiStateKey = 'stokr-state';
    if (uiStateKey in localStorage) {
      window.Stokr.Model.setUiState(JSON.parse(localStorage.getItem(uiStateKey)));
    }
    return window.Stokr.Model.getState();
  }

  const state = loadState();
  renderView(state);
  updateStocks(state)
  .then(() => renderView(state));
})();
