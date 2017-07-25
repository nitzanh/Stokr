/**
 *  View
 */
(function () {
  'use strict'


  function getChangeByDisplayMode(stock, displayMode) {
    switch (displayMode) {
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

  function renderStock(uiState) {
    return function(stock, stockIndex, stocks) {
        let changeClass = stock.Change < 0 ? 'red-bcg' : 'green-bcg';
        let change = getChangeByDisplayMode(stock, uiState.displayMode);
        let isUpDisabled = stockIndex === 0 ? 'disabled' : '';
        let isDownDisabled = stockIndex === stocks.length - 1 ? 'disabled' : '';
        let displayReorder = uiState.isFilterShown ? 'hidden' : '';
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
                <div class="reorder-stocks ${displayReorder}" data-id="${stock.Symbol}">
                  <button class="icon-arrow arrow-up" ${isUpDisabled}></button>
                  <button class="icon-arrow arrow-down" ${isDownDisabled}></button>
                </div>
              </div>
            </div>
          </li>`;
      }
    }

    function renderFilter(isFilterShown) {
      if (!isFilterShown) {
        return '';
      }
      return `<div class="filter-panel">
                <form action="">
                  <div>
                    <label for="byName">By Name</label>
                    <input type="text" name="byName" id="byName">
                  </div>
                  <div>
                  <label for="byGain">By Gain</label>
                    <select name="byGain">
                      <option value="all">All</option>
                      <option value="losing">Losing</option>
                      <option value="gaining">Gaining</option>
                    </select>
                  </div>
                  <div>
                    <label for="byRangeFrom">By Range: From</label>
                    <input type="text" name="byRangeFrom" id="byName">
                  </div>
                  <div>
                    <label for="byRangeTo">By Range: To</label>
                    <input type="text" name="byRangeTo" id="byName">
                  </div>
                  <button class="apply-filter" type="submit">Apply</button>
                </form>
              </div>`;
    }

  function render(stocks, uiState) {
    const main = document.querySelector('main');
    const stocksHTML = stocks.map(renderStock(uiState)).join('');

    main.innerHTML = `<div class="stocks-list-wrapper">
                        <div class="stocks-list-container">
                          <div class="stocks-list-header">
                            <h1 class="stokr-logo">Stokr</h1>
                            <ul class="header-buttons">
                            <li><button class="icon-search"></button></li>
                            <li><button class="icon-refresh"></button></li>
                            <li><button class="icon-filter ${uiState.isFilterShown ? 'green':''}"></button></li>
                            <li><button class="icon-settings"></button></li>
                            </ul>
                          </div>
                          ${renderFilter(uiState.isFilterShown)}
                         <ul class="stocks-list">
                          ${stocksHTML}
                         </ul>
                        </div>
                       </div>`;

    setClickHandlers();
  }

  function updateStocksChange(stocks, displayMode) {
    stocks.forEach(stock => {
      document.querySelector(`#${stock.Symbol}`).innerHTML = getChangeByDisplayMode(stock, displayMode);
    });
  }

  function setClickHandlers() {
    // 'stock change' buttons click handlers
    const changeButtons = document.querySelectorAll('.stocks-list .stock-change');
    changeButtons.forEach((button) => button.addEventListener('click', window.Stokr.Ctrl.handleChangeBtnClick));

    // arrow buttons click handlers
    const arrowButtons = document.querySelectorAll('.stocks-list .arrow-up, .stocks-list .arrow-down');
    arrowButtons.forEach((button) => {
      const stockId = button.parentNode.dataset.id;
      const isUpClicked = button.classList.contains('arrow-up');
      button.addEventListener('click', () =>
        window.Stokr.Ctrl.handleArrowClick(stockId, isUpClicked));
    });

    // toggle filter panel on filter icon click
    const filterButton = document.querySelector('.icon-filter');
    filterButton.addEventListener('click', window.Stokr.Ctrl.toggleFilter);
  }



  window.Stokr = window.Stokr || {};
  window.Stokr.View = {
    render,
    updateStocksChange
  };
})();
