class GlobalCryptoStats {
  constructor() {
    // this.bitcoin_percentage_of_market_cap = 0;
    // this.total_market_cap = 0;
    // this.total_volume_24h = 0;

    this.promiseReady = this.fetchGLobalCryptoStats();
  }

  ready() {
    return this.promiseReady;
  }

  // Getters
  bitcoinPercentageMCap() {
    return this.bitcoin_percentage_of_market_cap;
  }

  totalVol() {
    return this.total_volume_24h;
  }

  totalMCap() {
    return this.total_market_cap;
  }

  fetchGLobalCryptoStats = () => {
    const api_endpoint =
      'https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest';

    return fetch(api_endpoint, {
      headers: {
        'X-CMC_PRO_API_KEY': 'cacb3f86-a67d-49b3-8c0c-eeec5e756efc',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.bitcoin_percentage_of_market_cap =
          data.data.btc_dominance_yesterday.toFixed(2);
        this.total_volume_24h = data.data.quote.USD.total_volume_24h;
        this.total_market_cap = data.data.quote.USD.total_market_cap_yesterday;
      })
      .catch((e) => console.error(e));
  };
}

export default GlobalCryptoStats;
