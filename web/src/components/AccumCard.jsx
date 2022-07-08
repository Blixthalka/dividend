import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import NoData from './NoData';

function AccumCard({ className }) {
    const [accum, setAccum] = useState(null);

    const colors = [
        ['#737373', 'bg-chart-2 hover:bg-chart-2-s text-white fill-white'],
        ['#FCD757', 'bg-chart-1 hover:bg-chart-1-s text-black fill-black'],
        ['#E94F37', 'bg-chart-4 hover:bg-chart-4-s text-white fill-white'],
        ['#393E41', 'bg-chart-5 hover:bg-chart-5-s text-white fill-white'],
        ['#C9B6BE', 'bg-chart-3 hover:bg-chart-3-s text-black fill-black',],
    ]

    useEffect(() => {
        fetch(`/api/dividends/accum`)
            .then(i => i.json())
            .then(i => {
                setAccum(i)
            })
    }, [])

    if (!accum || accum.length == 1) {
        return (
            <Card>
                <NoData />
            </Card>
        )
    }

    let option = {
        textStyle: {
            color: '#a1a1aa',
            fontFamily: 'Rubik, sans-serif',
        },
        xAxis: {
            type: 'time',

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
                type: 'line'
            }
        },
        grid: {
            left: '1%',
            right: '1%',
            bottom: '1%',
            top: '10%',
            containLabel: true
        },
        series: [
            {
                data: accum?.map(d => [d.date, d.sumToDate]),
                type: 'line',
                color: colors[0],
                showSymbol: false,
            }
        ]
    };


    return (
        <Card title={'Accumulated'} className={`${className}`}>
            {accum &&
                <ReactECharts
                    option={option}
                    notMerge={true}
                    lazyUpdate={true}
                />}
        </Card>

    );
}

export default AccumCard;
