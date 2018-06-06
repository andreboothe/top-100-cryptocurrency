class TopCryptoStats {
    
    constructor() {
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
        
        return fetch(api_endpoint)
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