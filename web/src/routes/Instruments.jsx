import React, { useState, useEffect } from 'react';
import Card from '../components/Card'
import { Link } from "react-router-dom";
import InstrumentCard from "../components/InstrumentCard";

const Intruments = () => {
    const [instruments, setInstruments] = useState([]);


    return (
        <div className="max-w-4xl mx-auto py-5">
            <InstrumentCard numberOfInstruments={0}>

            </InstrumentCard>
        </div>
    );
}

export default Intruments;
