import React, { useState, useEffect } from 'react';
import Card from '../components/Card'
import Table from '../components/Table'
import { ChevronDownIcon, ChevronUpIcon } from '../icons/Icons';

function Dividends() {
    const [transactions, setTransactions] = useState([]);

    const [search, setSearch] = useState("")

    const headers = [
        {
            name: "Instrument",
            type: "text",
            f: t => t.instrumentName
        },
        {
            name: "ISIN",
            type: "number",
            f: t => t.isin
        },
        {
            name: "Date",
            type: "number",
            f: t => t.date
        },
        {
            name: "Amount",
            type: "number",
            f: t => t.totalAmount + ' kr'
        }
    ]
    const [sorting, setSorting] = useState({
        column: headers[2].name,
        direction: "desc"
    })

    useEffect(() => {
        fetch(`/api/transactions/?sortDirection=${sorting.direction}&sortColumn=${sorting.column.toLocaleLowerCase()}&search=${search}`)
            .then(resp => {
                if(!resp.ok) {
                    return [];
                }
                return resp.json()
            })
            .then(resp => {
                setTransactions(resp)
            })
    }, [sorting, search])


    return (
        <div className="max-w-4xl mx-auto pb-20">
            <Card title={"Dividends"}>
                <div className="my-5">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border text-sm border-neutral-200 px-3 text-primary py-2 rounded"
                        onChange={evt => setSearch(evt.target.value)}
                        value={search}>
                    </input>
                </div>

                <Table
                    headers={headers}
                    sorting={sorting}
                    dataList={transactions}
                    onSortChange={(s) => setSorting(s)}
                />
            </Card>
        </div>
    );
}

export default Dividends;
