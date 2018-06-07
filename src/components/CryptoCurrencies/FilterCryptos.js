import React from 'react';

// Includes
import priceUnitList from '../Models/priceUnitList';

const FilterCryptos = ({onChangeShowGrowth,onChangeShowOnly,onChangePriceUnit,onChangeAdditionalData}) => {

    const priceUnitOptions = priceUnitList.map((unit,i) =>{
        
        return (unit === 'USD')?<option key={i} value={unit}>{unit}</option> 
                :<option key={i} value={unit}>{unit}</option>;
    });

    return (
        <section className="section section--minimal-padding " id="filter-cryptos">
            <div className="container container--responsive">
                <div className="filter-frame white-bg">
                    <div className="row center filter-frame__title">
                        <div className="col s12">
                            Filters
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 m4 center">
                                <h6 className="filter-frame__sub-title">Show Growth</h6>
                                <select id="show-growth" onChange={onChangeShowGrowth}>
                                    <option value="all">All</option>
                                    <option value="positive">Positive</option>
                                    <option value="negative">Negative</option>
                                    
                                </select>
                        </div>
                        <div className="input-field col s12 m4 center">
                            <h6 className="filter-frame__sub-title">Show Only</h6>
                            <select id="show-only" onChange={onChangeShowOnly}>
                                <option value="100">100</option>
                                <option value="50">50</option>
                                <option value="25">25</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                        <div className="input-field col s12 m4 center ">
                            <h6 className="filter-frame__sub-title">Price Unit</h6>
                            <select value="USD" id="price-unit" onChange={onChangePriceUnit}>
                                {priceUnitOptions}
                            </select>
                        </div>

                        <div className="input-field col s12 m4 center filter-frame--hidden">
                            <h6 className="filter-frame__sub-title">Additional Data</h6>
                            <select defaultValue={[]} id="additional-data" onChange={onChangeAdditionalData} multiple>
                                <option value="" disabled >Choose your option</option>
                                <option value="marketCap">Market Cap</option>
                                <option value="price">Price</option>
                                <option value="volume">Volume</option>
                                <option value="change">{'Change(2h)'}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FilterCryptos;