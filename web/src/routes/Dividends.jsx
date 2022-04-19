import React, { useState, useEffect } from 'react';
import Card from '../components/Card'
import Button from '../components/Button'

function Dividends() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch("/api/transactions")
            .then(t => t.json())
            .then(t => {
                setTransactions(t)
            })
    }, [])

    const amountFormat = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2
    })

    return (
        <div className="grid gap-5 max-w-4xl py-5 mx-auto">
            <Card title={"Dividends"} className="grid gap-2">
                <div className="grid">
                    {transactions.map((transaction) => (
                        <div className="bg-gray-100 rounded p-2 px-5 my-2 text-primary flex space-x-5  justify-between items-center w-full">

                            <div className="">
                                <p className="text-lg">{transaction?.instrumentName}</p>
                                <p className="tabular-nums text-sm text-zinc-400">{transaction.date + ' // ' + transaction.shares + ' x ' + amountFormat.format(transaction.amount)+ ' ' + transaction.currency}</p>
                            </div>
                            <p className="text-lg font-bold tabular-nums ">{transaction.totalAmount + ' ' + transaction.currency}</p>

                        </div>
                    ))}
                </div>

            </Card>
        </div>
    );
}

export default Dividends;
