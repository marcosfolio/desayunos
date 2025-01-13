import React, { ReactNode } from 'react';
import './Table.css';

export interface TableRow {
    cells: ReactNode[];
    type?: 'regular' | 'success' | 'warning';
}

interface TableProps {
    headers: string[];
    rows: TableRow[];
    className?: string;
}

const Table = ({ headers, rows, className = '' }: TableProps) => {
    return (
        <div className={className}>
            <table className="table">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className={row.type || 'regular'}>
                            {row.cells.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table; 