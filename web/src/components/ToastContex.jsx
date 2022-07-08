import React, { Children } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { CheckIcon, CrossIcon} from '../icons/Icons';

const ToastContext = createContext()

export default ToastContext;


export const ToastContextProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);


    useEffect(() => {
        if (toasts.length > 0) {
            const timer = setTimeout(() => setToasts(toasts.slice(1)), 5000);
            return () => clearTimeout(timer)
        }
    }, [toasts])

    const addToast = useCallback(
        (message, type) => {
            const toast = {
                message: message,
                type: type
            }
            setToasts([...toasts, toast])
        }, [setToasts])


    return (
        <ToastContext.Provider value={addToast}>
            {children}
            <div className="absolute top-20 right-5 grid gap-5 w-96 text-secondary">
                {toasts.map((t) => (
                    <div className="p-3 bg-white border-neutral-200 border rounded flex items-center space-x-2">
                        {t.type === "success" && (
                            <div className="p-1 bg-green-100 flex items-center w-8 h-8 justify-center rounded">
                                <CheckIcon className="fill-green-500 h-6 w-6 " />
                            </div>
                        )}
                         {t.type === "error" && (
                            <div className="p-1 bg-red-100 flex items-center w-8 h-8 justify-center rounded">
                                <CrossIcon className="fill-red-500 h-6 w-6 " />
                            </div>
                        )}
                        <span>{t.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}
