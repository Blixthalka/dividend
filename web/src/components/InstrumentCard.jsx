import { Tooltip } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

const IntrumentCard = ({ numberOfInstruments }) => {
    const [instruments, setInstruments] = useState([]);

    useEffect(() => {
        fetch("/api/instruments")
            .then(i => i.json())
            .then(i => {
                if (numberOfInstruments === 0) {
                    setInstruments(i)
                } else {
                    setInstruments(i.slice(0, numberOfInstruments))
                }

            })
    }, [])

    return (
        <Card title={numberOfInstruments === 0 ? "Instruments" : "Best Instruments"} className="grid gap-2 col-span-3">
            {instruments.map((instrument) => (
                <div className="p-2 px-5 flex items-center w-full rounded bg-gray-100 justify-between text-primary ">

                    <div>
                        <p className="text-lg">{instrument.name}</p>
                        <p className="text-secondary text-sm tabular-nums ">{instrument.isin}</p>
                    </div>
                    <span className="text-lg font-bold tabular-nums text-right">{instrument.totalDividends + ' SEK'}</span>

                </div>
            ))}
        </Card>

    );
}

export default IntrumentCard;
