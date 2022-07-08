import { number } from 'echarts';
import React, { useState, useEffect } from 'react';
import Table from '../components/Table'


function DividendTable({ sorting, setSorting, search, className, sortable = true, maxDividends = 0, year }) {
    const [transactions, setTransactions] = useState([]);

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
        },
    ]

    useEffect(() => {
        fetch(`/api/transactions/?sortDirection=${sorting.direction}&sortColumn=${sorting.column.toLocaleLowerCase()}${search ? "&search=" + search : ""}${year ? "&year=" + year : ""}`)
            .then(resp => {
                if (!resp.ok) {
                    return [];
                }
                return resp.json()
            })
            .then(resp => {
                if(maxDividends != 0) {
                    setTransactions(resp.slice(0, maxDividends))
                } else {
                    setTransactions(resp)
                }
            })
    }, [sorting, search, year])


    return (
        <Table
            headers={headers}
            sorting={sorting}
            dataList={transactions}
            onSortChange={(s) => setSorting(s)}
            className={className}
            sortable={sortable}
        />
    );
}

export default DividendTable;
