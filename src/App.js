import React, { Component } from 'react';

// Components
import Navigation from './components/Navigation/Navigation';
import GlobalCrypto from './components/GlobalCrypto/GlobalCrypto';
import GlobalCryptoStats from './components/Models/GlobalCryptoStats';


// Includes
import './assets/css/styles.min.css';
import 'materialize-css/dist/css/materialize.min.css';


class App extends Component {

  constructor() {
    super();

    this.state = {
      globalCryptoStats: new GlobalCryptoStats(),
      displayTopCrypto: true,
      displayBitcoinPriceChart: false 
    }
  }

  componentDidMount() {
    this.state.globalCryptoStats.ready().then( () => this.setGlobalCryptoStats());
  }




  setGlobalCryptoStats = () => {
    this.setState({globalCryptoStats: this.state.globalCryptoStats})
  }

  onClickDisplayTopCrypto = () => {
    this.setState({
      displayTopCrypto: true,
      displayBitcoinPriceChart: false
    });
    
  }

  onClickDisplayBitcoinPriceChart = () => {
    this.setState({
      displayTopCrypto: false,
      displayBitcoinPriceChart: true
    });
  }

  render() {
    const {globalCryptoStats} = this.state;
    // console.log(this.state.globalCryptoStats.totalVol());
    return (
      <main className="App">
        <Navigation 
          onClickDisplayBitcoinPriceChart = {this.onClickDisplayBitcoinPriceChart}
          onClickDisplayTopCrypto = {this.onClickDisplayTopCrypto}
        />
        <GlobalCrypto 
          marketCap = {globalCryptoStats.totalMCap()}
          vol24Hour = {globalCryptoStats.totalVol()}
          btcDominance = {globalCryptoStats.bitcoinPercentageMCap()}
        />
      </main>
    );
  }
}

export default App;
