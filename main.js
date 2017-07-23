(function() {
  'use strict'

  let stocks = [
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
  ];

  let stockChangeDisplay = 'percent';

  function toggleStockDisplay() {
    switch (stockChangeDisplay) {
      case 'percent':
        stockChangeDisplay = 'value';
        break;
      case 'value' :
        stockChangeDisplay = 'capital';
        break;
      default:
        stockChangeDisplay = "percent";
    }
  }

  function getChangeByDisplayMode(stock) {
    switch (stockChangeDisplay) {
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
                <button class="stock-change ${changeClass}">${change}</button>
              </div>
              <div class="reorder-stocks" data-id="${stock.Symbol}">
                <button class="icon-arrow arrow-up" ${isUpDisabled}></button>
                <button class="icon-arrow arrow-down" ${isDownDisabled}></button>
              </div>
            </div>
          </div>
        </li>`;
  }

  function render() {
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

    addUlClickHandler();
  }

  function addUlClickHandler() {
    const ul = document.querySelector('.stocks-list');
    ul.addEventListener('click', handleUlClick);
  }

  render();

  function handleUlClick(event) {
    const target = event.target;
    // if a 'stock change' button was clicked - update all stock change buttons text
    if (target.classList.contains('stock-change')) {
      toggleStockDisplay();
      return render();
    }
    // reorder stocks button clicked
    if (target.classList.contains('icon-arrow')) {
      const stockId = target.parentNode.dataset.id;
      const index = stocks.findIndex((stock) => stock.Symbol === stockId);
      const swapWith = target.classList.contains('arrow-up') ? index - 1 : index + 1;
      swap(stocks, index, swapWith);
      return render();
    }
  }

  function swap(array, i, j) {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }


})();
