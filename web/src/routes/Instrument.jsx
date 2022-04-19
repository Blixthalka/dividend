import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Card from '../components/Card'
import { formatDate,formatNumber,  groupBy } from '../utils/util'
import ReactECharts from 'echarts-for-react';


function getSeries(allYears, dividends) {
    console.log(allYears)
    return allYears.map((year) => {

        if (year in dividends) {
            const s = dividends[year]
                .reduce((sum, dividend) => {

                    return dividend.amount + sum
                }, 0)
            console.log(s + " ad " + year)
            return s
        } else {
            return 0;
        }
    })

}

function Instrument() {
    let params = useParams();

    const [instrument, setInstrument] = useState(null);
    const [futureDividends, setFutureDividends] = useState({})
    const [pastDividends, setPastDividends] = useState({})

    useEffect(() => {
        fetch(`/api/instruments/${params.instrumentId}`)
            .then(i => i.json())
            .then(i => {
                setInstrument(i)
            })

        fetch(`/api/instruments/${params.instrumentId}/dividends`)
            .then(d => d.json())
            .then(d => {
                var today = new Date();

                var allPast = d.filter(d => Date.parse(d.exDate) < today)
                var allfuture = d.filter(d => Date.parse(d.exDate) > today)

                var future = groupBy(allfuture, d => new Date(d.exDate).getFullYear())
                var past = groupBy(allPast, d => new Date(d.exDate).getFullYear())

                setPastDividends(past)
                setFutureDividends(future)
            })
    }, [])

    const allYears = Object.keys(futureDividends).concat(Object.keys(pastDividends))
    const minYear = Math.min(...allYears)
    const maxYear = Math.max(...allYears)

    let yearRange = []
    for (let i = minYear; i <= maxYear; i++) {
        yearRange.push(i)
    }

    const option = {
        textStyle: {
            color: '#a1a1aa',
            fontFamily: 'Rubik, sans-serif',
        },
        xAxis: {
            type: 'category',
            data: yearRange,
            axisLabel: {
                fontSize: 14,
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                fontSize: 14,
            }
        },
        tooltip: {
            trigger: 'axis',
            textStyle: {
                fontSize: 14
            },
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '1%',
            right: '1%',
            bottom: '1%',
            containLabel: true
        },
        series: [
            {
                name: 'Past Dividends',
                data: getSeries(yearRange, pastDividends),
                type: 'bar',
                color: '#115e59',
                stack: 'total',
            },
            {
                name: 'Future Dividends',
                data: getSeries(yearRange, futureDividends),
                type: 'bar',
                color: '#2563eb',
                stack: 'total',
            }
        ]
    };


    return (
        <div className="max-w-4xl py-5 mx-auto">


            <div className="grid gap-5 grid-cols-3 items-start">
                <h1 className="text-5xl font-bold text-primary col-span-3">{instrument?.name}</h1>
                <Card title={"Dividends"} className="col-span-3 ">

                    <ReactECharts
                        option={option}
                        notMerge={true}
                        lazyUpdate={true}
                    />
                </Card>
                <DividendCard title="Future Dividends" values={futureDividends} />
                <DividendCard title="Past Dividends" values={pastDividends} />
            </div>

        </div>
    );
}

const DividendCard = ({ title, values }) => {
    return (
        <Card title={title}>
            {Object.keys(values).sort((a, b) => b - a).map((year) => (
                <div key={year} className="mt-5">
                    <p className="text-sm text-secondary">{year}</p>
                    <div className="bg-gray-100 rounded ">
                        {values[year].map((dividend) => (
                            <div key={dividend.id} className="flex justify-between items-center text-primary p-2">
                                <span className="flex items-center">
                                    <span>{formatDate(dividend.exDate)}</span>
                                </span>
                                <div className="flex items-end">
                                    <span className="">
                                        <span className="tabular-nums">{formatNumber(dividend.amount)}</span>
                                        <span className="text-base">{' ' + dividend.currency}</span>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </Card>
    )
}

export default Instrument;
