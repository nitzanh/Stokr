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
    return window.Stokr.View.render(state.stocks, state.ui);
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
  }

  window.Stokr = window.Stokr || {};
  window.Stokr.Ctrl = {
    handleArrowClick,
    handleChangeBtnClick
  };

  const state = window.Stokr.Model.getState();
  window.Stokr.View.render(state.stocks, state.ui);

})();
