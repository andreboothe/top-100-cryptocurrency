import React from 'react';

const Navigation = ({onClickDisplayBitcoinPriceChart, onClickDisplayTopCrypto}) => {

    return (
        <section className="section ">
            <div className="container container--responsive">
                <div className="row center">
                    <button 
                        onClick={onClickDisplayTopCrypto}
                        className="btn btn--title-btn">
                        Top 100 Cryptos
                    </button>
                    <button 
                        onClick={onClickDisplayBitcoinPriceChart}
                        className="btn btn--title-btn">
                        Bitcoin Price Chart
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Navigation;
