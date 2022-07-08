import React, { useEffect, useRef, useState, createContext } from 'react';
import { NavLink, Outlet } from "react-router-dom";
import { DashboardIcon, PortfolioIcon, TransactionIcon, InstrumentIcon, LogoIcon, UploadIcon, MenuIcon, CrossIcon } from './icons/Icons'
import './app.css'
import Header from './components/Header'


import ButtonIcon from './components/ButtonIcon';
import Card from './components/Card';
import { ToastContextProvider } from './components/ToastContex'

export const AppContext = createContext();

function Instrument() {
    const [overview, setOverview] = useState(null);
    const [invalidate, setInvalidate] = useState(false);

    useEffect(() => {
        fetch("/api/overview")
            .then(i => i.json())
            .then(i => setOverview(i))
    }, [invalidate])

    const invalidateOverview = () => {
        setInvalidate(!invalidate)
    }

    return (
        <AppContext.Provider value={{
            overview: overview,
            invalidateOverview: invalidateOverview
        }}>
            <ToastContextProvider>
                <div className="bg-neutral-50 min-h-screen">
                    <Header />
                    <div className="pt-5 pb-20 px-5 ">
                        <div className="max-w-4xl mx-auto">
                            {!overview?.loaded && <Card className="text-sm mb-5 text-secondary">
                                <p>Nothing loaded please upload something here</p>
                            </Card>}
                            <Outlet />
                        </div>
                    </div>
                </div>
            </ToastContextProvider>
        </AppContext.Provider>
    );
}

export default Instrument;
