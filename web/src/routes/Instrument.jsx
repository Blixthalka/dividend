import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import DividendTable from '../components/DividendTable'
import Card from '../components/Card'
import { formatDate, formatNumber, groupBy } from '../utils/util'
import ReactECharts from 'echarts-for-react';
import DividendYearCard from '../components/DividendYearCard';
import CardSingleNumber from '../components/CardSingleNumber';
import NoData from '../components/NoData';

function Instrument() {
    let params = useParams();
    const [instrument, setInstrument] = useState(undefined);
    const [sorting, setSorting] = useState({
        column: "Date",
        direction: "desc"
    });

    useEffect(() => {
        fetch(`/api/instruments/${params.isin}`)
        .then(i => i.json())
        .then(i => setInstrument(i))
    }, [])

    if (!instrument) {
        return (
            <Card>
                <NoData />
            </Card>
        )
    }

    return (
        <div className="grid grid-cols-3 gap-5">
            <Card title={instrument.isin} className="col-span-2">
                <p className="text-3xl font-bold text-primary">{instrument.name}</p>
            </Card>
            <CardSingleNumber title={"Total"} amount={instrument.totalDividends} currency="kr" />
            <DividendYearCard isin={instrument.isin} className="col-span-3" />
            <Card title={"Dividends"} className="col-span-3">
                <DividendTable
                    sorting={sorting}
                    sortable={true}
                    setSorting={setSorting}
                    search={instrument.isin}
                    className="mt-2"
                />
            </Card>
        </div>
    );
}


export default Instrument;
