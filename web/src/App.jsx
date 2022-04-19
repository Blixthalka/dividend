import React from 'react';
import { NavLink, Outlet } from "react-router-dom";
import { DashboardIcon, PortfolioIcon, TransactionIcon, InstrumentIcon, LogoIcon, UploadIcon } from './icons/Icons'
import './app.css'

function Instrument() {

    const iconClass = "fill-secondary group-hover:fill-primary"
    const navs = [
        {
            name: "Dashboard",
            link: "/",
            icon: <DashboardIcon className={iconClass} />
        },
        {
            name: "Portfolio",
            link: "/portfolio",
            icon: <PortfolioIcon className={iconClass} />
        },
        {
            name: "Instruments",
            link: "/instruments",
            icon: <InstrumentIcon className={iconClass} />
        },
        {
            name: "Dividends",
            link: "/dividends",
            icon: <TransactionIcon className={iconClass} />
        },
        {
            name: "Upload",
            link: "/upload",
            icon: <UploadIcon className={iconClass} />
        },

    ]

    return (
        <div className=" bg-slate-50">
            <div className="flex">
                <div className="flex-grow-0 border-r bg-white ">
                    <div className="flex justify-center py-20">
                        <LogoIcon className="fill-primary" />
                    </div>
                    <nav className="p-5 grid gap-2">
                        {navs.map((nav) => (
                            <NavLink
                                to={nav.link}
                                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                            >
                                <div className="flex items-center space-x-2 group text-secondary">
                                   {nav?.icon}
                                    <span className="group-hover:text-primary">{nav.name}</span>
                                </div>
                            </NavLink>
                        ))}
                    </nav>
                </div>
                <div className="flex-grow px-5">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Instrument;
