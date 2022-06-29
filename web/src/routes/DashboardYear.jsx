import React, { useEffect, useState } from 'react';
import CardSingleNumber from '../components/CardSingleNumber';
import DividendMonthCard from '../components/DividendMonthCard';
import DividendYearCard from '../components/DividendYearCard';
import InstrumentCard from '../components/InstrumentCard';
import AccumCard from '../components/AccumCard'
import ButtonIcon from '../components/ButtonIcon'
import { Link, useParams } from "react-router-dom";
import { ChevronRightIcon, ChevronLeftIcon, CrossIcon } from '../icons/Icons';

function DashboardYear() {
    const [data, setData] = useState(null);
    let params = useParams();
    const year = parseInt(params.year);


    useEffect(() => {
        fetch(`/api/dashboard/${year}`)
            .then(i => i.json())
            .then(i => {
                setData(i)
            })
    }, [year])

    return (
        <div className="max-w-4xl pb-20 mx-auto">
            <div className="grid grid-cols-3 gap-5 ">
                <div className="col-span-3 flex items-center justify-between">

                    <div className="flex items-center space-x-2">
                        <Link to={`/dashboard/${year - 1}`}>
                            <ButtonIcon Icon={ChevronLeftIcon} />
                        </Link>
                        <h1 className="text-center text-2xl text-primary">{params.year}</h1>
                        <Link to={`/dashboard/${year + 1}`}>
                            <ButtonIcon Icon={ChevronRightIcon} />
                        </Link>
                    </div>
                    <Link to={`/`}>
                        <ButtonIcon Icon={CrossIcon} />
                    </Link>

                </div>

                <CardSingleNumber title={"Dividends"} amount={data?.dividendsThisYear} currency={"SEK"} />
                <CardSingleNumber title={"Number of Dividends"} amount={data?.numberOfDividends} />

                <CardSingleNumber title={"Per Month"} amount={data?.monthlyDividends} currency={"SEK"} />
                <DividendMonthCard year={params.year} />


                <InstrumentCard year={params.year} />

            </div>

        </div>
    );
}

export default DashboardYear;
