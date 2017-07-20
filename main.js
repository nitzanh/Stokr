(function() {
  let stocks = [
    {
      "Symbol": "WIX",
      "Name": "Wix.com Ltd.",
      "Change": "0.750000",
      "PercentChange": "+1.51%",
      "LastTradePriceOnly": "76.099998"
    },
    {
      "Symbol": "MSFT",
      "Name": "Microsoft Corporation",
      "PercentChange": "-2.09%",
      "Change": "-0.850006",
      "LastTradePriceOnly": "69.620003"
    },
    {
      "Symbol": "YHOO",
      "Name": "Yahoo! Inc.",
      "Change": "0.279999",
      "PercentChange": "+1.11%",
      "LastTradePriceOnly": "50.599998"
    }
  ];

  let showChangeInPercentage = true;


  function renderStock(stock, stockIndex, stocks) {
    let changeClass = stock.Change < 0 ? 'red' : 'green';
    let change = showChangeInPercentage ? stock.PercentChange : stock.Change;
    let isUpDisabled = stockIndex === 0 ? 'disabled' : '';
    let isDownDisabled = stockIndex === stocks.length - 1 ? 'disabled' : '';
    return `
        <li>
          <div class="stock-div">
            <button class="remove"></button>
            <span class="stock-name">${stock.Symbol} (${stock.Name})</span>
            <span class="stock-stats">
              <span class="stock-price">${stock.LastTradePriceOnly}</span>
              <button class="stock-change ${changeClass}">${change}</button>
              <span data-id="${stock.Symbol}">
                <button class="icon-arrow arrow-up" ${isUpDisabled}></button>
                <button class="icon-arrow arrow-down" ${isDownDisabled}></button>
              </span>
            </span>
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
      showChangeInPercentage = !showChangeInPercentage;
      render();
      return;
    }
    // reorder stocks button clicked
    if (target.classList.contains('icon-arrow')) {
      const stockId = target.parentNode.dataset.id;
      const index = stocks.findIndex((stock) => stock.Symbol === stockId);
      const swapWith = target.classList.contains('arrow-up') ? index - 1 : index + 1;
      swap(stocks, index, swapWith);
      render();
      return;
    }
  }

  function swap(array, i, j) {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }


})();
