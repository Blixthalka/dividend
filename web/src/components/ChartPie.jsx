import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import NoData from './NoData';


function ChartPie({ data, onBarClick }) {
    if (!data) {
        return (<NoData />)
    }

    const colors = [
        '#e5e5e5',
        '#334155',
        '#4ade80',
        '#38bdf8',
        '#be123c',
        '#059669',
        '#a7f3d0',
        '#737373',
        '#16a34a',
        '#fca5a5',
        '#7c3aed',
        '#ca8a04',
    ]

    const sortedData = [...data]
        .filter(d => d.value !== 0)
        .sort(function (a, b) { return b.value - a.value; })

    let option = {
        textStyle: {
            color: '#a3a3a3',
            fontFamily: 'Rubik, sans-serif',
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
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 10,

            textStyle: {
                color: '#a3a3a3',
                fontFamily: 'Rubik, sans-serif',
                fontSize: 14
            }
        },
        series: [
            {
                data: sortedData.map((d, index) => {
                    return {
                        value: d.value,
                        name: d.label,

                        label: {
                            show: false,
                            fontFamily: 'Rubik, sans-serif',
                            fontSize: 14,
                            color: '#a3a3a3'
                        },
                        itemStyle: {
                            color: colors[index % colors.length]
                        }
                    }
                }),
                type: 'pie'
            }
        ]
    };

    let onEvents = {};
    if (onBarClick) {
        onEvents = {
            'click': onBarClick,
        }
    }

    return (
        <ReactECharts
            option={option}
            notMerge={true}
            lazyUpdate={true}
            onEvents={onEvents}
        />
    );
}

export default ChartPie;
