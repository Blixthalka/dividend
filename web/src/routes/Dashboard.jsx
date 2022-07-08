import React, { useEffect, useState } from 'react';
import CardSingleNumber from '../components/CardSingleNumber';
import DividendMonthCard from '../components/DividendMonthCard';
import DividendYearCard from '../components/DividendYearCard';
import Card from '../components/Card';
import DividendTable from '../components/DividendTable';
import InstrumentChartCard from '../components/InstrumentChartCard';
import AccumCard from '../components/AccumCard'

function Dashboard() {
  const [data, setData] = useState(null);



  useEffect(() => {
    fetch("/api/dashboard/")
      .then(i => i.json())
      .then(i => {
        setData(i)
      })
  }, [])

  return (
    <div className="max-w-4xl pb-20 mx-auto">
      <div className="grid grid-cols-3 gap-5 ">

        <CardSingleNumber title={`${new Date().getFullYear()}`} amount={data?.dividendsThisYear || 0} currency={"kr"} />
        <CardSingleNumber title={"12 months"} amount={data?.rolling} currency={"kr"} />
        <CardSingleNumber title={"Total"} amount={data?.totalDividends} currency={"kr"} />
        <DividendYearCard className="col-span-3" />
        <AccumCard className="col-span-3" />
        <InstrumentChartCard className="col-span-3" />

        <Card
          title="Recent"
          className="col-span-3 "
        >
          <DividendTable
            sortable={false}
            sorting={{ column: "date", direction: "desc" }}
            maxDividends={10}
            className="mt-2"
          />
        </Card>

      </div>

    </div>
  );
}

export default Dashboard;
