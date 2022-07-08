import React, { useState, useEffect } from 'react';
import Card from '../components/Card'
import Table from '../components/Table'
import Chart from '../components/Chart'
import { Link } from "react-router-dom";
import InstrumentCard from "../components/InstrumentCard";
import { useNavigate } from "react-router-dom";

const Intruments = () => {
    const [instruments, setInstruments] = useState([]);
    const navigate = useNavigate();

    const headers = [
        {
            name: "Instrument",
            type: "text",
            sortName: "name",
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
            sortName: "total_dividends",
            f: t => t.totalDividends + ' kr'
        }
    ]

    const [sorting, setSorting] = useState({
        column: headers[2].sortName,
        direction: "desc"
    });

    useEffect(() => {
        fetch(`/api/instruments?sortDirection=${sorting.direction}&sortColumn=${sorting.column.toLocaleLowerCase()}`)
            .then(i => i.json())
            .then(i => {
                setInstruments(i)
            })
    }, [sorting])

    const data = instruments.map((i) => {
        return {
            value: i.totalDividends,
            label: i.name.slice(0, 4),
            name: i.name,
            id: i.isin
        }
    }).reverse()

    const onClickInstruments = instruments.map(i => {
        return {
            ...i,
            onRowClick: () => navigate(i.isin)
        }})


    return (
        <div className="grid gap-5">
            <Card>
                <Chart
                    data={data}
                    onBarClick={params => {
                        navigate(`/instruments/${params.data.id}`)
                    }}
                />
            </Card>
            <Card >
                <Table
                    headers={headers}
                    sorting={sorting}
                    dataList={onClickInstruments}
                    onSortChange={(s) => setSorting(s)}

                />
            </Card>
        </div>
    );
}

export default Intruments;
