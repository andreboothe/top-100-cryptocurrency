class TopCryptoStats {
    
    constructor(currency) {
        this.currency = currency;
        this.promiseReady = this.fetchCryptoStats();
        // this.cryptoList = [];
    }

    ready() {
        return this.promiseReady;
    }

    getCryptoList(){
        return this.cryptoList;
    }

    fetchCryptoStats = () => {
        const api_endpoint = 'https://api.coinmarketcap.com/v2/ticker/?start=1&limit=100&sort=rank';
        const convert = (this.currency === 'USD')?'':`&convert=${this.currency}`;
        return fetch(api_endpoint + convert)
            .then(response => response.json())
            .then(cryptos => {
                let result = [];
                for(let id in cryptos.data){
                    result.push(cryptos.data[id]); 
                }
                this.cryptoList = result;
            });
    }
}

export default TopCryptoStats;