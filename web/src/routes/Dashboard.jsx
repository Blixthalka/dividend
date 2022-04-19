import React, { useEffect, useState } from 'react';
import CardSingleNumber from '../components/CardSingleNumber';
import DividendMonthCard from '../components/DividendMonthCard';
import DividendYearCard from '../components/DividendYearCard';
import InstrumentCard from '../components/InstrumentCard';
import AccumCard from '../components/AccumCard'

function Dashboard() {
  const [data, setData] = useState(null);



  useEffect(() => {
    fetch("/api/dashboard")
      .then(i => i.json())
      .then(i => {
        setData(i)
      })
  }, [])

  return (
    <div className="max-w-4xl pt-5 pb-20 mx-auto">
      <div className="grid grid-cols-3 gap-5 ">

        <CardSingleNumber title={"2022"} amount={data?.dividendsThisYear} currency={"SEK"} />
        <CardSingleNumber title={"Total"} amount={data?.totalDividends} currency={"SEK"} />
        <CardSingleNumber title={"Per Month"} amount={data?.monthlyDividends} currency={"SEK"} />
        <AccumCard />
        <DividendYearCard />
        <InstrumentCard numberOfInstruments={5}/>

      </div>

    </div>
  );
}

export default Dashboard;
