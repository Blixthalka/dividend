import React, {forwardRef} from 'react';
import Card from '../components/Card';

const ButtonIcon = ({Icon, className, onClick}) => {
    return (
        <button
            className={`group hover:bg-neutral-200 w-8 h-8 flex justify-center items-center rounded ${className}`}
            onClick={onClick}
        >
            <Icon className="fill-secondary group-hover:fill-primary w-6 h-6" />
        </button>
    );
}

export default ButtonIcon;
