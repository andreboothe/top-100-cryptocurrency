import React from 'react';

const CryptoTable = ({cryptoStatList, onCLickSortHandler, additionalTab, currency, topCryptoLoaded}) => {

    const additionalTabChecker = (tab) => {

        const selectedTabs = [...additionalTab];
        return (selectedTabs.includes('all'))? '':
                (!selectedTabs.includes(tab))?'hide':'';
    }

    const dataTable = cryptoStatList.map((crypto,i) => {
        const growthClass = (crypto.quotes.USD.percent_change_24h < 0)?'crypto-table__row--negative':'crypto-table__row--positive';
        const rank = crypto.rank;
        const name = crypto.name;
        const marketCap = crypto.quotes[currency].market_cap;
        const price = crypto.quotes[currency].price;
        const volume = crypto.quotes[currency].volume_24h;
        const change = crypto.quotes[currency].percent_change_24h;


        return (
            <tr key={i} className={`crypto-table__row  ${growthClass}`}>
                <td className="crypto-table__cell">{rank}</td>
                <td className="crypto-table__cell">{name}</td>
                <td className={`crypto-table__cell ${additionalTabChecker('marketCap')}`}>${marketCap}</td>
                <td className={`crypto-table__cell ${additionalTabChecker('price')}`}>${price}</td>
                <td className={`crypto-table__cell ${additionalTabChecker('volume')}`}>{volume}</td>
                <td className={`crypto-table__cell ${additionalTabChecker('change')}`}>{change}%</td>
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
                        <th className={`crypto-table--header-cell ${additionalTabChecker('marketCap')}`}>
                            <button id="table-market-cap-col" onClick={onCLickSortHandler} 
                            className="btn btn--header-cell waves-effect waves-light ">Market Cap</button>
                        </th> 
                        <th className={`crypto-table--header-cell ${additionalTabChecker('price')}`}>
                            <button id="table-price-col" onClick={onCLickSortHandler} 
                            className="btn btn--header-cell waves-effect waves-light"  >{`Price ${currency}`}</button>
                        </th>
                        <th className={`crypto-table--header-cell ${additionalTabChecker('volume')}`}>
                            <button id="table-volume-col" onClick={onCLickSortHandler} 
                            className="btn btn--header-cell waves-effect waves-light">{'Volume (24h)'}</button>
                        </th>
                        <th className={`crypto-table--header-cell ${additionalTabChecker('change')}`}>
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