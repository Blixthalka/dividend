import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Table from './Table';

const IntrumentCard = ({ numberOfInstruments, year }) => {
    const [instruments, setInstruments] = useState([]);
    const headers = [
        {
            name: "Instrument",
            type: "text",
            f: t => t.name
        },
        {
            name: "ISIN",
            type: "number",
            f: t => t.isin
        },
        {
            name: "Total Dividends",
            type: "number",
            f: t => t.totalDividends + ' kr'
        }
    ]
    const [sorting, setSorting] = useState({
        column: headers[2].name,
        direction: "desc"
    });



    useEffect(() => {
        let url = null;
        if (year != undefined) {
            url = `/api/instruments/?year=${year}`
        } else {
            url = "/api/instruments"
        }

        fetch(url)
            .then(i => i.json())
            .then(i => {
                if (numberOfInstruments === 0) {
                    setInstruments(i)
                } else {
                    setInstruments(i.slice(0, numberOfInstruments))
                }
            })
    }, [year, sorting])

    return (
        <Card title={numberOfInstruments === 0 ? "Instruments" : "Best Instruments"} className="grid gap-2 col-span-3">
           <Table
                    headers={headers}
                    sorting={sorting}
                    dataList={instruments}
                    onSortChange={(s) => setSorting(s)}
                />
        </Card>

    );
}

export default IntrumentCard;
