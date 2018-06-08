import React from 'react';

// Components
import {Line} from 'react-chartjs-2';

const BTCPriceChart = ({chartXCoords, chartYCoords}) => {

    const charData = {
        labels: chartXCoords,
        datasets: [
            {
                label:'Price',
                data: chartYCoords
            }
        ]
    }

    return (
        <div className="section section--minimal-padding">
            <div className="container container--responsive">
                <div className="frame center white-text">
                    <h3 className="frame__title frame--margin-minimal">
                        {`Market Price (USD)`}
                    </h3>
                    <h4 className="frame__subtilte frame--margin-minimal">
                        Average USD market price across major bitcoin exchanges.
                    </h4>
                    <div className="row frame__graph">
                        <div className="col s12 ">
                            <Line
                                data = {charData}
                                options ={{
                                    // maintainAspectRatio: false
                                }}
                            />

                           

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BTCPriceChart;