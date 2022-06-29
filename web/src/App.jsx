import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet } from "react-router-dom";
import { DashboardIcon, PortfolioIcon, TransactionIcon, InstrumentIcon, LogoIcon, UploadIcon, MenuIcon, CrossIcon } from './icons/Icons'
import './app.css'
import ButtonIcon from './components/ButtonIcon';

function Instrument() {
    const [showMenu, setShowMenu] = useState(false);
    const buttonRef = useRef(null)
    const iconClass = "fill-secondary group-hover:fill-primary"
    const navs = [
        {
            name: "Dashboard",
            link: "/",
            icon: <DashboardIcon className={iconClass} />
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
        <div className="bg-neutral-50 min-h-screen">
            <div className="border-b bg-white px-5">
                <div className="max-w-4xl mx-auto py-2 flex justify-between ">
                    <NavLink to="/">
                        <ButtonIcon Icon={PortfolioIcon} />
                    </NavLink>
                    <ButtonIcon onClick={(e) => setShowMenu(true)} Icon={MenuIcon} />
                </div>
            </div>

            <div className="pt-5 pb-20 px-5">
                <Outlet />
            </div>

            {showMenu &&
                <nav className="absolute top-0 right-0 bg-white w-full h-full">
                    <div className="max-w-2xl mx-auto pt-20 flex flex-col space-y-2 px-5 ">

                        <ButtonIcon Icon={CrossIcon} onClick={(e) => setShowMenu(false)} className="place-self-end" />
                        {navs.map((nav) => (
                            <NavLink
                                to={nav.link}
                                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                                onClick={(e) => setShowMenu(false)}
                            >
                                <div className="flex items-center space-x-2 group text-secondary">
                                    {nav?.icon}
                                    <span className="group-hover:text-primary">{nav.name}</span>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </nav>}
        </div>
    );
}

export default Instrument;
