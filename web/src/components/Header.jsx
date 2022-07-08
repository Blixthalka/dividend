import React, {  useRef, useState } from 'react';
import ButtonIcon from './ButtonIcon';
import { DashboardIcon, PortfolioIcon, TransactionIcon, InstrumentIcon, LogoIcon, UploadIcon, MenuIcon, CrossIcon } from '../icons/Icons'
import { NavLink } from 'react-router-dom';

function ChartToggle({ className }) {
    const [showMenu, setShowMenu] = useState(false);

    const iconClass = "fill-secondary group-hover:fill-primary"
    const navs = [
        {
            name: "Dashboard",
            link: "/dashboard",
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
        <>
            <div className={`border-b bg-white px-5 ${className}`}>
                <div className="max-w-4xl mx-auto py-2 flex justify-between">
                    <NavLink to="/">
                        <ButtonIcon Icon={PortfolioIcon} />
                    </NavLink>
                    <ButtonIcon onClick={(e) => setShowMenu(true)} Icon={MenuIcon} />
                </div>
            </div>
            {showMenu &&
                <nav className="absolute top-0 right-0 bg-white w-full h-full z-10">
                    <div className="max-w-4xl mx-auto py-2 flex flex-col ">
                        <ButtonIcon Icon={CrossIcon} onClick={(e) => setShowMenu(false)} className="place-self-end" />
                        <div className=" w-full mx-auto pt-20 flex flex-col space-y-2">
                            {navs.map((nav) => (
                                <NavLink
                                    to={nav.link}
                                    className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                                    onClick={(e) => setShowMenu(false)}
                                >
                                    <div className="flex items-center space-x-2 group text-secondary w-full">
                                        {nav?.icon}
                                        <span className="group-hover:text-primary">{nav.name}</span>
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </nav>}
        </>
    );

}

export default ChartToggle;
