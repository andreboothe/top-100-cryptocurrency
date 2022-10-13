class TopCryptoStats {
  constructor(currency) {
    this.currency = currency;
    this.promiseReady = this.fetchCryptoStats();
    // this.cryptoList = [];
  }

  ready() {
    return this.promiseReady;
  }

  getCryptoList() {
    return this.cryptoList;
  }

  fetchCryptoStats = () => {
    const api_endpoint =
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=100';
    const convert = this.currency === 'USD' ? '' : `&convert=${this.currency}`;
    return fetch(api_endpoint + convert, {
      headers: {
        'X-CMC_PRO_API_KEY': 'cacb3f86-a67d-49b3-8c0c-eeec5e756efc',
      },
    })
      .then((response) => response.json())
      .then((cryptos) => {
        let result = [];

        for (let crypto of cryptos.data) {
          result.push(crypto);
        }
        this.cryptoList = result;
      });
  };
}

export default TopCryptoStats;
