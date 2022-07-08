import React, { useState, useEffect } from 'react';


function TextInput({ type = "text", value, setFunction, placeholder, label }) {




    return (
        <div className='flex flex-col max-w-xs'>
            {label && <label className="text-sm text-secondary">{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                className="border  border-neutral-200 px-3 text-primary py-2 rounded "
                onChange={evt => setFunction(evt.target.value)}
                value={value}>
            </input>
        </div>
    );
}

export default TextInput;
