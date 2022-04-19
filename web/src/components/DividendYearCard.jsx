import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

function DividendMonthCard() {
    const [years, setYears] = useState(null);

    const colors = [
        ['#5C415D', 'bg-chart-2 hover:bg-chart-2-s text-white fill-white'],
        ['#FCD757', 'bg-chart-1 hover:bg-chart-1-s text-black fill-black'],
        ['#E94F37', 'bg-chart-4 hover:bg-chart-4-s text-white fill-white'],
        ['#393E41', 'bg-chart-5 hover:bg-chart-5-s text-white fill-white'],
        ['#C9B6BE', 'bg-chart-3 hover:bg-chart-3-s text-black fill-black',],
    ]

    useEffect(() => {
        fetch(`/api/dividends/year`)
            .then(i => i.json())
            .then(i => {
                setYears(i)
            })
    }, [])

    let option = {
        textStyle: {
            color: '#a1a1aa',
            fontFamily: 'Rubik, sans-serif',
        },
        xAxis: {
            type: 'category',
            data: years?.years.filter(d => d.year >= new Date().getFullYear() - 3).map(d => d.year),
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
            top: '10%',
            containLabel: true
        },
        series: [
            {
                data: years?.years.filter(d => d.year >= new Date().getFullYear() - 3).map(d => d.dividends),
                type: 'bar',
                color: colors[0],

            }
        ]
    };


    return (
        <Card title={'Yearly'} className="col-span-3">
            {years &&
                <ReactECharts
                    option={option}
                    notMerge={true}
                    lazyUpdate={true}
                />}
        </Card>

    );
}

export default DividendMonthCard;
