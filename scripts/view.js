/**
 *  View
 */
(function () {
  'use strict'


  function getChangeByDisplayMode(stock, displayMode) {
    switch (displayMode) {
      case 'percent':
        return `${parseFloat(stock.realtime_chg_percent).toFixed(2)}%`;
        break;
      case 'value' :
        return parseFloat(stock.Change).toFixed(2);
        break;
      case 'capital' :
        return stock.MarketCapitalization;
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

    function renderFilter(uiState) {
      if (!uiState.isFilterShown) {
        return '';
      }
      return `<div class="filter-panel">
                <form action="">
                  <div>
                    <label for="byName">By Name</label>
                    <input type="text" name="byName" id="byName" value="${uiState.filters.byName}">
                  </div>
                  <div>
                    <label for="byGain">By Gain</label>
                    <select name="byGain">
                      <option value="all" ${uiState.filters.byGain === 'all' ? 'selected' :''}>All</option>
                      <option value="losing" ${uiState.filters.byGain === 'losing' ? 'selected' :''}>Losing</option>
                      <option value="gaining" ${uiState.filters.byGain === 'gaining' ? 'selected' :''}>Gaining</option>
                    </select>
                  </div>
                  <div>
                    <label for="byRangeFrom">By Range: From</label>
                    <input type="text" name="byRangeFrom" id="byRangeFrom" value="${uiState.filters.byRangeFrom}">
                  </div>
                  <div>
                    <label for="byRangeTo">By Range: To</label>
                    <input type="text" name="byRangeTo" id="byRangeTo" value="${uiState.filters.byRangeTo}">
                  </div>
                  <button class="apply-filter" type="submit">Apply</button>
                </form>
              </div>`;
    }

  function render(stocks, uiState) {
    const main = document.querySelector('main');
    const stocksHTML = typeof stocks === 'undefined' ? '' :stocks.map(renderStock(uiState)).join('');

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
                          ${renderFilter(uiState)}
                         <ul class="stocks-list">
                          ${stocksHTML}
                         </ul>
                        </div>
                       </div>`;

    setClickHandlers(uiState);
  }

  function updateStocksChange(stocks, displayMode) {
    stocks.forEach(stock => {
      document.querySelector(`#${stock.Symbol}`).innerHTML = getChangeByDisplayMode(stock, displayMode);
    });
  }

  function setClickHandlers(uiState) {
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

    // on filter apply
    if (uiState.isFilterShown) {
      const filterForm = document.querySelector('.filter-panel form');
      filterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formElements = event.target.elements;
         const filter = {
          byName : formElements.byName.value,
          byGain : formElements.byGain.options[formElements.byGain.selectedIndex].value,
          byRangeFrom : formElements.byRangeFrom.value,
          byRangeTo : formElements.byRangeTo.value
      };
        window.Stokr.Ctrl.applyFilter(filter);
      })
    }
  }



  window.Stokr = window.Stokr || {};
  window.Stokr.View = {
    render,
    updateStocksChange
  };
})();
