import React, {forwardRef} from 'react';
import Card from '../components/Card';

const ButtonIcon = ({Icon, className, onClick, disabled = false}) => {
    return (
        <button
            className={`group ${disabled ? "" : "hover:bg-neutral-100"} w-8 h-8 flex justify-center items-center rounded ${className}`}
            onClick={disabled ? () => {} : onClick}
            disabled={disabled}
        >
            <Icon className={`fill-secondary w-6 h-6 ${disabled ? "fill-neutral-200" : "group-hover:fill-primary "}`} />
        </button>
    );
}

export default ButtonIcon;
