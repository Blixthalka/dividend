import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Chart from '../components/Chart';
import { BarChartIcon, BarSortedChartIcon } from '../icons/Icons';
import ButtonIcon from './ButtonIcon';


function DividendMonthCard({ year, className }) {
    const [yearData, setYearData] = useState(undefined);
    const [biggestSort, setBiggestSort] = useState(false)

    useEffect(() => {
        fetch(`/api/dividends/year/${year}`)
            .then(i => i.json())
            .then(i => {
                setYearData(i.months)
            })
    }, [year])

    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

    let data = yearData ? yearData
        .sort(function (a, b) {
            if (biggestSort) {
                return a.dividends - b.dividends;
            } else {
                return a.monthOfYear - b.monthOfYear;
            }
        })
        .map(y => {
        return {
            label: months[y.monthOfYear - 1],
            value: y.dividends
        }
    }) : []
    console.log(data[0])

    return (
        <Card
            title={'Monthly'}
            className={`${className}`}
            headerComponent={
                <ButtonIcon Icon={biggestSort ? BarChartIcon : BarSortedChartIcon} onClick={(e) => {
                    setBiggestSort(!biggestSort)
                }} />
            }
        >
            <Chart data={data} />
        </Card>
    );
}

export default DividendMonthCard;
