import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Chart from '../components/Chart';
import Table from './Table';
import { useNavigate } from "react-router-dom";

const IntrumentChartCard = ({ year, className }) => {
    const [instruments, setInstruments] = useState([]);
    const navigate = useNavigate();

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
                setInstruments(i.sort((a, b) => a.totalDividends - b.totalDividends))
            })
    }, [year])

    const data = instruments.map((i) => {
        return {
            value: i.totalDividends,
            label: i.name.slice(0, 4),
            name: i.name,
            id: i.isin
        }
    })

    return (
        <Card title={"Instruments"} className={`grid gap-2 ${className}`}>
            <Chart
                data={data}
                onBarClick={(params) => navigate(`/instruments/${params.data.id}`)}
            />
        </Card>

    );
}

export default IntrumentChartCard;
