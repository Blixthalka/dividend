import React, { useEffect, useState } from 'react';
import CardSingleNumber from '../components/CardSingleNumber';
import DividendMonthCard from '../components/DividendMonthCard';
import DividendTable from '../components/DividendTable';
import InstrumentChartCard from '../components/InstrumentChartCard';
import Card from '../components/Card'
import ButtonIcon from '../components/ButtonIcon'
import { Link, useParams } from "react-router-dom";
import { ChevronRightIcon, ChevronLeftIcon, CrossIcon } from '../icons/Icons';
import { useContext } from 'react';
import { AppContext } from '../App'

function DashboardYear() {
    const [data, setData] = useState(null);
    let params = useParams();
    const {overview} = useContext(AppContext)
    const year = parseInt(params.year);
    const currentYear = new Date().getFullYear();
    const [sorting, setSorting] = useState({
        column: "Date",
        direction: "desc"
    });

    useEffect(() => {
        fetch(`/api/dashboard/${year}`)
            .then(i => i.json())
            .then(i => {
                setData(i)
            })
    }, [year])

    return (
        <div className="max-w-4xl pb-20 mx-auto">
            <div className="grid grid-cols-2 gap-5 ">
                <div className="col-span-2 flex items-center justify-between">

                    <div className="flex items-center space-x-2">
                        {year === overview?.firstYear ?
                            <ButtonIcon Icon={ChevronLeftIcon} disabled={true} /> :
                            <Link to={`/dashboard/${year - 1}`}>
                                <ButtonIcon Icon={ChevronLeftIcon} />
                            </Link>
                        }

                        <h1 className="text-center text-2xl text-primary">{params.year}</h1>

                        {year === currentYear ?
                            <ButtonIcon Icon={ChevronRightIcon} disabled={true} /> :
                            <Link to={`/dashboard/${year + 1}`}>
                                <ButtonIcon Icon={ChevronRightIcon} />
                            </Link>
                        }
                    </div>
                    <Link to={`/dashboard`}>
                        <ButtonIcon Icon={CrossIcon} />
                    </Link>

                </div>

                <CardSingleNumber title={"Total"} amount={data?.dividendsThisYear} currency={"SEK"} />
                {/* <CardSingleNumber title={"Number"} amount={data?.numberOfDividends} /> */}

                <CardSingleNumber title={"Per Month"} amount={data?.monthlyDividends} currency={"SEK"} />
                <DividendMonthCard year={params.year} className="col-span-2" />

                <InstrumentChartCard year={params.year} className="col-span-2" />

                <Card
                    title="Dividends"
                    className="col-span-2 "
                >
                    <DividendTable
                        sortable={true}
                        sorting={sorting}
                        setSorting={setSorting}
                        className="mt-2"
                        year={year}
                    />
                </Card>

            </div>

        </div>
    );
}

export default DashboardYear;
