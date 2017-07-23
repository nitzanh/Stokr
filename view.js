/**
 *  View
 */
(function () {
  'use strict'

  let state = {
    displayMode : 'percent'
  }

  function toggleStockDisplay() {
    switch (state.displayMode) {
      case 'percent':
        state.displayMode = 'value';
        break;
      case 'value' :
        state.displayMode = 'capital';
        break;
      default:
        state.displayMode = "percent";
    }
  }

  function getChangeByDisplayMode(stock) {
    switch (state.displayMode) {
      case 'percent':
        return stock.PercentChange;
        break;
      case 'value' :
        return parseFloat(stock.Change).toFixed(2);
        break;
      case 'capital' :
        return stock.CapitalMarket;
        break;
      default:
        return;
    }
  }

  function renderStock(stock, stockIndex, stocks) {
      let changeClass = stock.Change < 0 ? 'red' : 'green';
      let change = getChangeByDisplayMode(stock);
      let isUpDisabled = stockIndex === 0 ? 'disabled' : '';
      let isDownDisabled = stockIndex === stocks.length - 1 ? 'disabled' : '';
      return `
        <li>
          <div class="stock-div">
            <button class="remove"></button>
            <span class="stock-name">${stock.Symbol} (${stock.Name})</span>
            <div>
              <div class="stock-stats">
                <span class="stock-price">${parseFloat(stock.LastTradePriceOnly).toFixed(2)}</span>
                <button id='${stock.Symbol}' class="stock-change ${changeClass}">${change}</button>
              </div>
              <div class="reorder-stocks" data-id="${stock.Symbol}">
                <button class="icon-arrow arrow-up" ${isUpDisabled}></button>
                <button class="icon-arrow arrow-down" ${isDownDisabled}></button>
              </div>
            </div>
          </div>
        </li>`;
    }

  function render(state) {
    const stocks = state.stocks;
    const main = document.querySelector('main');
    const stocksHTML = stocks.map(renderStock).join('');

    main.innerHTML = `<div class="stocks-list-wrapper">
                        <div class="stocks-list-container">
                          <div class="stocks-list-header">
                            <h1 class="stokr-logo">Stokr</h1>
                            <ul class="header-buttons">
                            <li><button class="icon-search"></button></li>
                            <li><button class="icon-refresh"></button></li>
                            <li><button class="icon-filter"></button></li>
                            <li><button class="icon-settings"></button></li>
                            </ul>
                          </div>
                          <ul class="stocks-list">
                            ${stocksHTML}
                           </ul>
                          </div>
                         </div>`;

    setClickHandlers();
  }

  function setStocksChange(stocks) {
    stocks.forEach(item => {
      document.querySelector(`#${item.Symbol}`).innerHTML = getChangeByDisplayMode(item);
    });
  }

  function setClickHandlers() {
    // 'stock change' buttons click handlers
    const changeButtons = document.querySelectorAll('.stocks-list .stock-change');
    changeButtons.forEach((button) => button.addEventListener('click', window.Stokr.Ctrl.handleChangeBtnClick));

    // arrow buttons click handlers
    const arrowButtons = document.querySelectorAll('.stocks-list .arrow-up, .stocks-list .arrow-down');
    arrowButtons.forEach((button) => button.addEventListener('click', window.Stokr.Ctrl.handleArrowClick));
  }

  window.Stokr = window.Stokr || {};
  window.Stokr.View = {
    render,
    setStocksChange,
    toggleStockDisplay
  };
})();
