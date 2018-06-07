import React, { Component } from 'react';

// Components
import Navigation from './components/Navigation/Navigation';
import GlobalCrypto from './components/GlobalCrypto/GlobalCrypto';
import GlobalCryptoStats from './components/Models/GlobalCryptoStats';
import FilterCryptos from './components/CryptoCurrencies/FilterCryptos';
import CryptoTable from './components/CryptoCurrencies/CryptoTable';
import TopCryptoStats from './components/Models/TopCryptoStats';

// Includes
import './assets/css/styles.min.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from'materialize-css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      globalCryptoStats: new GlobalCryptoStats(),
      cryptoStatList: [],
      displayTopCrypto: true,
      displayBitcoinPriceChart: false,
      showOnly: 100,
      priceUnit:'USD',
      showGrowth:'all',
      currentSort:'',
      additionalTab: ''  
    }
  }

  componentDidMount() {
    this.state.globalCryptoStats.ready().then( () => this.setGlobalCryptoStats());
    this.setCryptoStatList();
    this.initMaterialize();
  }

  initMaterialize = () => {
    document.addEventListener('DOMContentLoaded', function() {
      let select = document.querySelectorAll('select');
      M.FormSelect.init(select, {});
    });
  }

  setGlobalCryptoStats = () => {
    this.setState({globalCryptoStats: this.state.globalCryptoStats})
  }

  setCryptoStatList = () => {
    let topCryptoStats = new TopCryptoStats();
    topCryptoStats.ready()
      .then(() => {
        this.setState({cryptoStatList: topCryptoStats.getCryptoList()})
      })
      .then(() => {this.sortRankHandler()});
    
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

  onChangeShowOnly = (event) => {
    this.setState({showOnly:event.target.value});
    
  }

  onChangePriceUnit = (event) => {
    this.setState({priceUnit: event.target.value});
  }

  onChangeShowGrowth = (event) => {
    this.setState({showGrowth:event.target.value});
  }

  onChangeAdditionalData = (event) => {
    this.setState({additionalTab:event.target.value});
  }

  rankSorter = (cryptoA,cryptoB) => cryptoA.rank - cryptoB.rank;
  marketCapSorter = (cryptoA,cryptoB) => cryptoA.quotes.USD.market_cap - cryptoB.quotes.USD.market_cap;
  priceSorter = (cryptoA,cryptoB) => cryptoA.quotes.USD.price - cryptoB.quotes.USD.price;
  volumeSorter = (cryptoA,cryptoB) => cryptoA.quotes.USD.volume_24h - cryptoB.quotes.USD.volume_24h;
  changeSorter = (cryptoA,cryptoB) => cryptoA.quotes.USD.percent_change_24h - cryptoB.quotes.USD.percent_change_24h;
  nameSorter = (cryptoA,cryptoB) => (cryptoA.name.toLowerCase() > cryptoB.name.toLowerCase())? 1: -1;

  onCLickSortHandler = (event) => {
    const id = event.target.id;
    switch (id){
      case 'table-rank-col':
        this.sortRankHandler();
        break;
      case 'table-name-col':
        this.cryptoListSortName();
        break;
      case 'table-price-col':
        this.cryptoListSortPrice();
        break;
      case 'table-market-cap-col':
        this.cryptoListSortMarketCap();
        break;
      case 'table-change-col':
        this.cryptoListSortChange();
        break;
      case 'table-volume-col':
        this.cryptoListSortVolume();
        break;
      default:
        break;
    }
  }

  sortRankHandler =()=>{
    if(this.state.currentSort === "rank"){
      const sorted = this.state.cryptoStatList.sort(this.rankSorter).reverse();
      this.setState({cryptoStatList: sorted,currentSort: ""});
    }
    else{
      const sorted = this.state.cryptoStatList.sort(this.rankSorter);
      this.setState({cryptoStatList:sorted,currentSort: "rank"});

    }
    
  }

  cryptoListSortRank = () =>{
    let sorted = this.state.cryptoStatList.sort(this.rankSorter);
    if(this.state.currentSort === "rank"){
      sorted = sorted.reverse()
      this.setState({cryptoStatList: sorted, currentSort: ""});
    }
    else{
      this.setState({cryptoStatList: sorted, currentSort: "rank"});
    }

  }

  cryptoListSortName = () =>{
    let sorted = this.state.cryptoStatList.sort(this.nameSorter);
    if(this.state.currentSort === "name"){
      sorted = sorted.reverse()
      this.setState({cryptoStatList: sorted, currentSort: ""});
    }
    else{
      this.setState({cryptoStatList: sorted, currentSort: "name"});
    }

  }

  cryptoListSortMarketCap =()=>{
    let sorted = this.state.cryptoStatList.sort(this.marketCapSorter);
    if(this.state.currentSort === "mcap"){
      sorted = sorted.reverse();
      this.setState({cryptoStatList: sorted, currentSort: ""});
    }
    else{
      this.setState({cryptoStatList: sorted, currentSort: "mcap"});
    }
  }

  cryptoListSortPrice = () =>{
    let sorted = this.state.cryptoStatList.sort(this.priceSorter);
    if(this.state.currentSort === "price"){
      sorted = sorted.reverse();
      this.setState({cryptoStatList: sorted, currentSort: ""});
    }
    else{
      this.setState({cryptoStatList: sorted, currentSort: "price"});
    }
  }

  cryptoListSortVolume =()=>{
    let sorted = this.state.cryptoStatList.sort(this.volumeSorter);
    if(this.state.currentSort === "volume"){
      sorted = sorted.reverse();
      this.setState({cryptoStatList: sorted, currentSort: ""});
    }
    else{
      this.setState({cryptoStatList: sorted, currentSort: "volume"});
    }
  }
  
  cryptoListSortChange =()=>{
    let sorted = this.state.cryptoStatList.sort(this.changeSorter);
    if(this.state.currentSort === "change"){
      sorted = sorted.reverse();
      this.setState({cryptoStatList: sorted, currentSort: ""});
    }
    else{
      this.setState({cryptoStatList: sorted, currentSort: "change"});
    }
  }

  filterGrowth = (cryptoList) =>{
    let result = [];
    if(this.state.showGrowth === "positive"){
      result = cryptoList.filter(crypto => {
        return crypto.quotes.USD.percent_change_24h >= 0;
      });
    }
    else if(this.state.showGrowth === "negative"){
      result = cryptoList.filter(crypto => {
        return crypto.quotes.USD.percent_change_24h < 0;
      });
    }
    else{
      result = cryptoList;
    }
    return result;
  }

  filterRank = (cryptoList) => {
    return cryptoList.filter(crypto => {
      
      return crypto.rank <= this.state.showOnly;
    });
  }

  render() {
    const {globalCryptoStats, cryptoStatList} = this.state;

    let filteredCryptoStatList = this.filterRank(cryptoStatList);
    filteredCryptoStatList = this.filterGrowth(filteredCryptoStatList);

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

        <FilterCryptos 
          onChangeShowGrowth = {this.onChangeShowGrowth}
          onChangeShowOnly = {this.onChangeShowOnly}
          onChangePriceUnit = {this.onChangePriceUnit}

        />

        <CryptoTable 
          cryptoStatList = {filteredCryptoStatList}
          onCLickSortHandler = {this.onCLickSortHandler}
        />


      </main>
    );
  }
}

export default App;
