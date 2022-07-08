import React, { useState, useEffect } from 'react';
import Card from '../components/Card'
import Table from '../components/Table'
import DividendTable from '../components/DividendTable'
import { ChevronDownIcon, ChevronUpIcon } from '../icons/Icons';
import TextInput from '../components/TextInput';

function Dividends() {
    const [search, setSearch] = useState("")
    const [sorting, setSorting] = useState({
        column: "Amount",
        direction: "desc"
    })


    return (

        <Card>
            <div className="mb-5">
                <TextInput
                    value={search}
                    setFunction={setSearch}
                    placeholder="Search"
                />
            </div>

            <DividendTable
                sorting={sorting}
                setSorting={setSorting}
                search={search}
            />

        </Card>

    );
}

export default Dividends;
