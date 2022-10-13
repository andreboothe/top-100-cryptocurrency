class BTCChartData {
  constructor(startDate, endDate) {
    this.promiseReady = this.fetchChartData(startDate, endDate);
  }

  ready() {
    return this.promiseReady;
  }

  getXCoords = () => {
    return this.xCoords;
  };

  getYCoords = () => {
    return this.yCoords;
  };

  fetchChartData(startDate, endDate) {
    const api_endpoint =
      'https://api.coindesk.com/v1/bpi/historical/close.json?';
    const rangeQuery = `start=${startDate}&end=${endDate}`;

    return fetch(api_endpoint + rangeQuery)
      .then((response) => response.json())
      .then((data) => {
        let dates = [];
        let prices = [];
        for (let date in data.bpi) {
          dates.push(date);
          prices.push(data.bpi[date]);
        }

        this.xCoords = dates;
        this.yCoords = prices;
      });
  }
}

export default BTCChartData;
