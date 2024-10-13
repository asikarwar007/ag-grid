import React, { useCallback } from "react";
import { CustomFilterProps, useGridFilter } from "ag-grid-react";

export const CustomTextFilter = ({ model, onModelChange, getValue }: CustomFilterProps) => {
    // Logic for filtering rows
    const doesFilterPass = useCallback(({ node }: any) => {
        const filterText = model || '';
        const cellValue = getValue(node);
        return cellValue && cellValue.toString().toLowerCase().includes(filterText.toLowerCase());
    }, [model, getValue]);

    // Register the filter logic with the grid
    useGridFilter({ doesFilterPass });

    return (
        <div>
            <input
                type="text"
                value={model || ''}
                placeholder="Filter..."
                onChange={(e) => onModelChange(e.target.value === '' ? null : e.target.value)}
            />
        </div>
    );
};