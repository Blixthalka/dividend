import { ReactComponent as UnlockSvg } from './svg/unlock.svg';
import { ReactComponent as DashboardSvg } from './svg/dashboard.svg';
import { ReactComponent as PortfolioSvg } from './svg/portfolio.svg';
import { ReactComponent as TransactionSvg } from './svg/transaction.svg';
import { ReactComponent as InstrumentSvg } from './svg/instrument.svg';
import { ReactComponent as LogoSvg } from './svg/logo.svg';
import { ReactComponent as ChevronDownSvg } from './svg/chevron-down.svg';
import { ReactComponent as ChevronLeftSvg } from './svg/chevron-left.svg';
import { ReactComponent as ChevronRightSvg } from './svg/chevron-right.svg';
import { ReactComponent as ChevronUpSvg } from './svg/chevron-up.svg';
import { ReactComponent as AddSvg } from './svg/add.svg';
import { ReactComponent as CloseSvg } from './svg/close.svg';
import { ReactComponent as MinusSvg } from './svg/minus.svg';
import { ReactComponent as DeleteSvg } from './svg/delete.svg';
import { ReactComponent as SeSvg } from './svg/flags/se.svg';
import { ReactComponent as UsSvg } from './svg/flags/us.svg';
import { ReactComponent as EuSvg } from './svg/flags/eu.svg';
import { ReactComponent as TradeSvg } from './svg/trade.svg';
import { ReactComponent as UploadSvg } from './svg/upload.svg';
import { ReactComponent as CrossSvg } from './svg/cross.svg';
import { ReactComponent as MenuSvg } from './svg/menu.svg';
import { ReactComponent as BarChartSvg } from './svg/bar-chart.svg';
import { ReactComponent as PieChartSvg } from './svg/pie-chart.svg';
import { ReactComponent as BarSortedChartSvg } from './svg/bar-sorted-chart.svg';




export const PieChartIcon = ({ className }) => {
    return (<PieChartSvg className={`${className}`} />)
}


export const BarSortedChartIcon = ({ className }) => {
    return (<BarSortedChartSvg className={`${className}`} />)
}


export const BarChartIcon = ({ className }) => {
    return (<BarChartSvg className={`${className}`} />)
}


export const MenuIcon = ({ className }) => {
    return (<MenuSvg className={`${className}`} />)
}

export const CrossIcon = ({ className }) => {
    return (<CrossSvg className={`${className}`} />)
}

export const Unlock = ({ className }) => {
    return (<UnlockSvg className={`w-4 h-4 ${className}`} />)
}

export const DashboardIcon = ({ className }) => {
    return (<DashboardSvg className={`w-5 h-5 ${className}`} />)
}
export const UploadIcon = ({ className }) => {
    return (<UploadSvg className={`w-5 h-5 ${className}`} />)
}

export const PortfolioIcon = ({ className }) => {
    return (<PortfolioSvg className={`${className}`} />)
}

export const TransactionIcon = ({ className }) => {
    return (<TransactionSvg className={`w-5 h-5 ${className}`} />)
}

export const InstrumentIcon = ({ className }) => {
    return (<InstrumentSvg className={`w-5 h-5 ${className}`} />)
}

export const LogoIcon = ({ className }) => {
    return (<LogoSvg className={`w-10 h-10 ${className}`} />)
}

export const ChevronDownIcon = ({ className }) => {
    return (<ChevronDownSvg className={`w-5 h-5 ${className}`} />)
}

export const ChevronLeftIcon = ({ className }) => {
    return (<ChevronLeftSvg className={`w-5 h-5 ${className}`} />)
}

export const ChevronRightIcon = ({ className }) => {
    return (<ChevronRightSvg className={`w-5 h-5 ${className}`} />)
}

export const ChevronUpIcon = ({ className }) => {
    return (<ChevronUpSvg className={`w-5 h-5 ${className}`} />)
}

export const AddIcon = ({ className }) => {
    return (<AddSvg className={`w-5 h-5 ${className}`} />)
}


export const CloseIcon = ({ className }) => {
    return (<CloseSvg className={`w-5 h-5 ${className}`} />)
}

export const MinusIcon = ({ className }) => {
    return (<MinusSvg className={`w-4 h-4 ${className}`} />)
}

export const DeleteIcon = ({ className }) => {
    return (<DeleteSvg className={`w-4 h-4 ${className}`} />)
}

export const TradeIcon = ({ className }) => {
    return (<TradeSvg className={`w-4 h-4 ${className}`} />)
}

export const FlagIcon = ({ className, code }) => {
    const localClassName = "w-6 h-6"
    switch (code) {
        case "SEK":
            return (<SeSvg className={`${localClassName} ${className}`} />)
        case "USD":
            return (<UsSvg className={`${localClassName} ${className}`} />)
        case "EUR":
            return (<EuSvg className={`${localClassName} ${className}`} />)
        default:
            console.log("no code " + code);
            return null
    }

}

