import React, { useState, useEffect } from 'react';
import './Table.css';
import { ChevronDownIcon, ChevronUpIcon } from '../icons/Icons';

function Table({ headers, sorting, onSortChange, dataList, className, sortable = true }) {

    const headerClick = (headerName) => {
        if (sorting.column === headerName) {
            if (sorting.direction === "asc") {
                onSortChange({
                    column: headerName,
                    direction: "desc"
                })
            } else {
                onSortChange({
                    column: headerName,
                    direction: "asc"
                })
            }
        } else {
            onSortChange({
                column: headerName,
                direction: "desc"
            })
        }
    }

    const getHeaderSortname = (header) => {
        return header?.sortName ? header.sortName : header.name;
    }

    return (
        <table className={`dividends-table ${className}`}>
            <thead>
                <tr>
                    {headers.map((header) => (
                        <th
                            className={`
                                        ${getHeaderSortname(header) === sorting.column && 'header-highlight'}
                                        ${sortable && 'header-sortable'}
                                    `}
                            onClick={(e) => headerClick(getHeaderSortname(header))}
                        >
                            <div className="flex justify-between">
                                <span>{header.name}</span>
                                {(sortable && getHeaderSortname(header) === sorting.column) &&
                                    <span>
                                        {sorting.direction === "desc" ?
                                            <ChevronDownIcon className="h-4 w-4 ml-2 fill-primary" /> :
                                            <ChevronUpIcon className="h-4 w-4 ml-2 fill-primary" />}
                                    </span>}
                            </div>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {dataList.map((element) => (
                    <tr
                        className={`text-primary text-sm ${element?.onRowClick && "clickable-row"}`}
                        onClick={element?.onRowClick}
                    >
                        {headers.map((header) => (
                            <td
                                className={`
                                        ${header.type === 'number' && 'number'}
                                        ${header.type === 'text' && 'text'}
                                    `}
                            >{header.f(element)}</td>
                        ))}
                    </tr>
                ))}
                {dataList.length === 0 && (
                    <tr>
                        <td className="empty-td text-primary" colSpan={`${headers.length}`}>huh, nothing here</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default Table;
