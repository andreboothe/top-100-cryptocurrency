import React from 'react';

const CryptoTable = ({cryptoStatList, onCLickSortHandler}) => {

    const dataTable = cryptoStatList.map((crypto,i) => {
        const growthClass = (crypto.quotes.USD.percent_change_24h < 0)?'crypto-table__row--negative':'crypto-table__row--positive';
        return (
            <tr key={i} className={`crypto-table__row  ${growthClass}`}>
                <td className="crypto-table__cell">{crypto.rank}</td>
                <td className="crypto-table__cell">{crypto.name}</td>
                <td className="crypto-table__cell">${crypto.quotes.USD.price}</td>
                <td className="crypto-table__cell">${crypto.quotes.USD.market_cap}</td>
                <td className="crypto-table__cell">{crypto.quotes.USD.volume_24h}</td>
                <td className="crypto-table__cell">{crypto.quotes.USD.percent_change_24h}%</td>
            </tr>
        );
    });

    return (
        <section className="section section--minimal-padding " id="crypto-table">
            <div className="container ">
            <table className="crypto-table white-bg">
                <thead className="crypto-table__header "> 
                    <tr className="crypto-table__header--row ">
                        <th className="crypto-table--header-cell">
                            <button id="table-rank-col" onClick={onCLickSortHandler} className="btn btn--header-cell">#</button>
                        </th>
                        <th className="crypto-table--header-cell">
                            <button id="table-name-col" onClick={onCLickSortHandler} 
                            className="btn btn--header-cell waves-effect waves-light">Name</button>
                        </th>
                        <th className="crypto-table--header-cell">
                            <button id="table-market-cap-col" onClick={onCLickSortHandler} 
                            className="btn btn--header-cell waves-effect waves-light">Market Cap</button>
                        </th> 
                        <th className="crypto-table--header-cell">
                            <button id="table-price-col" onClick={onCLickSortHandler} 
                            className="btn btn--header-cell waves-effect waves-light">{'Price(USD)'}</button>
                        </th>
                        <th className="crypto-table--header-cell">
                            <button id="table-volume-col" onClick={onCLickSortHandler} 
                            className="btn btn--header-cell waves-effect waves-light">{'Volume (24h)'}</button>
                        </th>
                        <th className="crypto-table--header-cell">
                            <button id="table-change-col" onClick={onCLickSortHandler} 
                            className="btn btn--header-cell waves-effect waves-light">{'Change(24h)'}</button>
                        </th>
                    </tr>
                    
                </thead>
                <tbody className="crypto-table__body">
                    {dataTable}
                </tbody>
                
                
                </table>`

            </div>
        </section>
    );
}

export default CryptoTable;