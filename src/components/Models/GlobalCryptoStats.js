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
    bitcoinPercentageMCap (){
        return this.bitcoin_percentage_of_market_cap;
    }

    totalVol (){
        return this.total_volume_24h;
    }

    totalMCap (){
        return this.total_market_cap;
    }

    fetchGLobalCryptoStats = () => {
        const api_endpoint = 'https://api.coinmarketcap.com/v2/global/';
        
        return fetch(api_endpoint)
            .then(response => response.json())
            .then(data => {
                
                this.bitcoin_percentage_of_market_cap  = data.data.bitcoin_percentage_of_market_cap.toFixed(2);
                this.total_volume_24h = data.data.quotes.USD.total_volume_24h;
                this.total_market_cap = data.data.quotes.USD.total_market_cap;
            });
    }
}

export default GlobalCryptoStats;