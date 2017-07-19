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


function renderStock(stock) {
  let changeClass = stock.Change < 0 ? 'red' : 'green';
  let change = showChangeInPercentage ? stock.PercentChange : stock.Change ;
  return `
      <li data-id="${stock.Symbol}">
        <button class="remove"></button>
        <span class="stock-name">${stock.Symbol} (${stock.Name})</span>
        <span class="stock-stats">
          <span class="stock-price">${stock.LastTradePriceOnly}</span>
          <button class="stock-change ${changeClass}">${change}</button>
          <button class="icon-arrow arrow-up"></button>
          <button class="icon-arrow arrow-down"></button>
        </span>
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
                        <ul class="stocks-list">${stocksHTML}</ul>
                        </div></div>`;

  main.querySelector('.stocks-list li:first-of-type .arrow-up').setAttribute('disabled', '');
  main.querySelector('.stocks-list li:last-of-type .arrow-down').setAttribute('disabled', '');
  addUlClickHandler();
}

function addUlClickHandler() {
  const ul = document.querySelector('.stocks-list');
  ul.addEventListener('click', handleUlClick);

}

render();

function handleUlClick(event) {
  // if a 'stock change' button was clicked - update all stock change buttons text
  if (event.target.classList.contains('stock-change')) {
    showChangeInPercentage = !showChangeInPercentage;
    render();
  }
}
