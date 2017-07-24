/**
 *  Controller
 */
(function () {
  'use strict'

  function handleChangeBtnClick() {
    window.Stokr.View.toggleStockDisplay();
    window.Stokr.View.setStocksChange(window.Stokr.Model.getStocks());
  }

  function handleArrowClick(event) {
    const stocks = window.Stokr.Model.getStocks();
    const stockId = event.target.parentNode.dataset.id;
    const index = stocks.findIndex((stock) => stock.Symbol === stockId);
    const swapWith = event.target.classList.contains('arrow-up') ? index - 1 : index + 1;
    swap(stocks, index, swapWith);
    return window.Stokr.View.render(stocks);
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

  window.Stokr.View.render(window.Stokr.Model.getStocks());

})();
