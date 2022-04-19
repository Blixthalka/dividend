import {
    HStack, useToast
} from '@chakra-ui/react';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { AddIcon, CloseIcon } from '../icons/Icons';

function DividendMonthCard() {
    const toast = useToast();
    const [years, setYears] = useState([]);
    const [selectedYears, setSelelectedYears] = useState([2021, 2022])
    const [showYearInput, setShowYearInput] = useState(false);
    const [yearInput, setYearInput] = useState(null);

    const colors = [
        ['#5C415D', 'bg-chart-2 hover:bg-chart-2-s text-white fill-white'],
        ['#FCD757', 'bg-chart-1 hover:bg-chart-1-s text-black fill-black'],
        ['#E94F37', 'bg-chart-4 hover:bg-chart-4-s text-white fill-white'],
        ['#393E41', 'bg-chart-5 hover:bg-chart-5-s text-white fill-white'],
        ['#C9B6BE', 'bg-chart-3 hover:bg-chart-3-s text-black fill-black',],
    ]

    useEffect(() => {
        Promise.all(
            selectedYears.map(year => {
                return fetch(`/api/dividends/year/${year}`)
                    .then(i => i.json())
            })
        )
            .then(i => {
                setYears(i)
            })
    }, [selectedYears])

    let option = {
        textStyle: {
            color: '#a1a1aa',
            fontFamily: 'Rubik, sans-serif',
        },
        xAxis: {
            type: 'category',
            data: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
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
        series:
            years.map((year, index) => {
                return {
                    data: year.months.map(m => m.dividends),
                    type: 'bar',
                    color: colors[index],
                    name: year.year
                }
            })
    };

    function addYear() {
        if (yearInput > new Date().getFullYear() + 1 || yearInput < 1900) {
            toast({
                title: 'Can\'t add year',
                description: `${yearInput} is not a valid year.`,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            })
            return
        }

        const toAdd = selectedYears.filter(y => y != yearInput)
        toAdd.push(yearInput)
        toAdd.sort()
        setShowYearInput(false)
        setYearInput(null)
        setSelelectedYears(toAdd)
    }

    return (
        <Card title={'Monthly'} className="col-span-3">
            <HStack className="mt-2">
                {selectedYears.map((year, index) => (
                    <button
                        onClick={() => {
                            setSelelectedYears(selectedYears.filter(y => y !== year))
                        }}
                        className={`py-1 px-3 rounded text-sm ${colors[index][1]}`}
                    >
                        <div className="flex items-center space-x-2 ">
                            <span className="text-inherit">{year}</span>
                            <CloseIcon />
                        </div>
                    </button>
                ))}
                {(!showYearInput && selectedYears.length < 5) &&
                    <button
                        onClick={() => setShowYearInput(true)}
                        className="bg-gray-100 p-1 rounded hover:bg-gray-200 text-primary text-sm"
                    >
                        <AddIcon className="fill-primary" />
                    </button>
                }
                {showYearInput &&
                    <HStack>
                        <input
                            autoFocus
                            type="number"
                            placeholder="2007"
                            max={2100}
                            min={1900}
                            className="text-sm text-primary py-1 px-3 border rounded"
                            value={yearInput}
                            onChange={(v) => setYearInput(v.target.value)}
                            onKeyPress={e => {
                                if (e.key === 'Enter') {
                                    addYear()
                                }
                            }}
                        />
                        <button
                            onClick={() => {
                                addYear()
                            }}
                            className="bg-gray-100 p-1 rounded hover:bg-gray-200 text-primary text-sm"
                        >
                            <AddIcon className="fill-primary" />
                        </button>
                        <button
                            onClick={() => {
                                setYearInput(null)
                                setShowYearInput(false)
                            }}
                            className="bg-gray-100 p-1  rounded hover:bg-gray-200 text-primary text-sm"
                        >
                            <CloseIcon className="fill-primary" />
                        </button>
                    </HStack>
                }
            </HStack>
            {years.length > 0 &&
                <ReactECharts
                    option={option}
                    notMerge={true}
                    lazyUpdate={true}
                />}
        </Card>

    );
}

export default DividendMonthCard;
