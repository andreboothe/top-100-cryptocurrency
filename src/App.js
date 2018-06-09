import React, { Component } from 'react';

// Components
import Navigation from './components/Navigation/Navigation';
import GlobalCrypto from './components/GlobalCrypto/GlobalCrypto';
import GlobalCryptoStats from './components/Models/GlobalCryptoStats';
import FilterCryptos from './components/CryptoCurrencies/FilterCryptos';
import CryptoTable from './components/CryptoCurrencies/CryptoTable';
import TopCryptoStats from './components/Models/TopCryptoStats';
import BTCPriceChart from './components/BTCPriceChart/BTCPriceChart';
import BTCChartData from './components/Models/BTCChartData';

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
      showGrowth:'all',
      currentSort:'',
      additionalTab: ['all'],
      currency: 'USD',
      topCryptoLoaded: false,
      btcChartLoaded: false,
      chartXCoords: [],
      chartYCoords: []
    }

    this.loadDisplayListener();
  }

  componentDidMount() {
    this.state.globalCryptoStats.ready().then( () => this.setGlobalCryptoStats());
    this.setCryptoStatList('USD');
    this.initMaterialize();
    this.responsiveDisplayListener();
    this.setBtcChartData();
  }

  loadDisplayListener = () => {
    window.addEventListener('load', this.responsiveDisplayHandler);
  }

  responsiveDisplayListener = () => {
    window.addEventListener('resize', this.responsiveDisplayHandler);
  }

  responsiveDisplayHandler = () => {
    const tab  = [...this.state.additionalTab];
    if(window.innerWidth <= 600){
      if(tab.includes('all')){
        this.setState({additionalTab: ['']});
      }
      else{
        this.setState({additionalTab: tab});
      } 
    }
    else{
      this.setState({additionalTab: ['all']});
    }
  }

  initMaterialize = () => {
   
    let select = document.querySelectorAll('select');
    M.FormSelect.init(select, {});
  }

  setGlobalCryptoStats = () => {
    this.setState({globalCryptoStats: this.state.globalCryptoStats})
  }

  setBtcChartData = () => {
    const dates = this.getDates();
    let chartData = new BTCChartData(dates[0], dates[1]); 
    
    chartData.ready()
      .then(() => {
        this.setState({
          chartXCoords: chartData.getXCoords(),
          chartYCoords: chartData.getYCoords(),
          btcChartLoaded: true
        });
      });
  }

  getDates = () => {
    const date = new Date();
    const year = date.getFullYear();
    const day = (date.getDay() < 10)?'0'+date.getDay():date.getDay();
    const month = (date.getMonth() < 10)?'0'+date.getMonth():date.getMonth();
    const todaysDate = [year,month,day].join('-');
    const oneYearAgo = [year - 1,month,day].join('-');
    return [oneYearAgo, todaysDate]
  }

  setCryptoStatList = (currency) => {
    let topCryptoStats = new TopCryptoStats(currency);
    
    topCryptoStats.ready()
      .then(() => {
        this.setState({cryptoStatList: topCryptoStats.getCryptoList()})
      })
      .then(() => {this.sortRankHandler()})
      .then(() => {this.setState({topCryptoLoaded: true, currency: currency})});
     
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
    
    const priceUnit = event.target.value;
    this.setState({topCryptoLoaded: false, currentSort: ''});
    this.setCryptoStatList(priceUnit);
  }

  onChangeShowGrowth = (event) => {
    this.setState({showGrowth:event.target.value});
  }

  onChangeAdditionalData = (event) => {
    // this.setState({additionalTab:event.target.value});
    let selectedNodes = document.querySelector('#additional-data').childNodes;
    selectedNodes = [...selectedNodes].filter(option => option.selected === true);
    const tabs = selectedNodes.map(option => option.value);
    this.setState({additionalTab: tabs});
    
  }

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

  rankSorter = (cryptoA,cryptoB) => cryptoA.rank - cryptoB.rank;
  marketCapSorter = (cryptoA,cryptoB) => cryptoA.quotes.USD.market_cap - cryptoB.quotes.USD.market_cap;
  priceSorter = (cryptoA,cryptoB) => cryptoA.quotes.USD.price - cryptoB.quotes.USD.price;
  volumeSorter = (cryptoA,cryptoB) => cryptoA.quotes.USD.volume_24h - cryptoB.quotes.USD.volume_24h;
  changeSorter = (cryptoA,cryptoB) => cryptoA.quotes.USD.percent_change_24h - cryptoB.quotes.USD.percent_change_24h;
  nameSorter = (cryptoA,cryptoB) => (cryptoA.name.toLowerCase() > cryptoB.name.toLowerCase())? 1: -1;

  sortRankHandler = () =>{
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

  cryptoListSortMarketCap = () =>{
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

  cryptoListSortVolume = () =>{
    let sorted = this.state.cryptoStatList.sort(this.volumeSorter);
    if(this.state.currentSort === "volume"){
      sorted = sorted.reverse();
      this.setState({cryptoStatList: sorted, currentSort: ""});
    }
    else{
      this.setState({cryptoStatList: sorted, currentSort: "volume"});
    }
  }
  
  cryptoListSortChange = () =>{
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
    const {globalCryptoStats, cryptoStatList, additionalTab, currency, 
          topCryptoLoaded, displayTopCrypto, btcChartLoaded, chartXCoords, chartYCoords } = this.state;

    let filteredCryptoStatList = this.filterRank(cryptoStatList);
      filteredCryptoStatList = this.filterGrowth(filteredCryptoStatList);

    const loading = <div className="loading-animation--spinner"> </div>;
    
    const renderCryptoTable = (!topCryptoLoaded)?loading:
      <CryptoTable 
        cryptoStatList = {filteredCryptoStatList}
        onCLickSortHandler = {this.onCLickSortHandler}
        additionalTab = {additionalTab}
        currency = {currency}
      />;

    const renderBTCPriceChart = (!btcChartLoaded)?loading:
      <BTCPriceChart 
        chartXCoords = {chartXCoords}
        chartYCoords = {chartYCoords}
      />;

    const sectionSwap = (displayTopCrypto)?renderCryptoTable :renderBTCPriceChart;

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
          onChangeAdditionalData = {this.onChangeAdditionalData}
          display = {displayTopCrypto}
      />


        {sectionSwap}

        
      </main>
    );
  }
}

export default App;
