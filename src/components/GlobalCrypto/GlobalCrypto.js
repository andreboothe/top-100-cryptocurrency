import React from 'react';

const GlobalCrypto = ({marketCap, vol24Hour, btcDominance}) => {

    return (
        <section className="section section--minimal-padding">
            <div className="container">
                <div className="row center white-text frame">
                    <div className="col s12 m12 l4 frame__element">
                        Market Cap: <span className="frame--text-coral">${marketCap}</span>
                    </div>
                    <div className="col s12 m12 l4 frame__element frame__element--border">
                        24h Vol. <span className="frame--text-coral">${vol24Hour}</span>
                    </div>
                    <div className="col s12 m12 l4 frame__element frame__element--border">
                        BTC Dominance: <span className="frame--text-coral">{btcDominance}%</span>
                    </div>
                    
                    
                </div>
            </div>
        </section>
    );
}

export default GlobalCrypto;