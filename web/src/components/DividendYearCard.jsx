import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Chart from '../components/Chart';
import { useNavigate } from "react-router-dom";
import ButtonIcon from './ButtonIcon';
import { BarChartIcon, BarSortedChartIcon } from '../icons/Icons';


function DividendYearCard({isin, className}) {
    const [years, setYears] = useState(null);
    const [biggestSort, setBiggestSort] = useState(false)
    let navigate = useNavigate()

    useEffect(() => {
        fetch(`/api/dividends/year/${isin ? '?isin=' + isin : ''}`)
            .then(i => i.json())
            .then(i => {
                setYears(i)
            })
    }, [])

    const data = years?.years ? years.years
        .sort(function (a, b) {
            if (biggestSort) {
                return a.dividends - b.dividends;
            } else {
                return a.year - b.year;
            }
        })
        .map(d => {
            return {
                label: d.year,
                value: d.dividends
            }
        }) : []

    return (
        <Card
            title={'Yearly'}
            className={`${className}`}
            headerComponent={
                <ButtonIcon Icon={biggestSort ? BarChartIcon : BarSortedChartIcon} onClick={(e) => {
                    setBiggestSort(!biggestSort)
                }} />
            }
        >
            <Chart data={data} onBarClick={params => navigate(`/dashboard/${params.name}`)} />
        </Card>

    );
}

export default DividendYearCard;
