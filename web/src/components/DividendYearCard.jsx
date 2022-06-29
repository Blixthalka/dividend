import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Chart from '../components/Chart';
import { useNavigate } from "react-router-dom";


function DividendYearCard() {
    const [years, setYears] = useState(null);
    let navigate = useNavigate()

    useEffect(() => {
        fetch(`/api/dividends/year`)
            .then(i => i.json())
            .then(i => {
                setYears(i)
            })
    }, [])

    const data = years?.years ? years.years?.map(d => {
        return {
            label: d.year,
            value: d.dividends
        }
    }) : []

    return (
        <Card title={'Yearly'} className="col-span-3">
            <Chart data={data} onBarClick={params => navigate(`/dashboard/${params.name}`)} />
        </Card>

    );
}

export default DividendYearCard;
