// This is a custom filter UI for selecting
// a unique option from a list
import React from "react";
import NativeSelect from '@mui/material/NativeSelect';
export default function SelectColumnFilter({
                                column: {filterValue, setFilter, preFilteredRows, id},
                            }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach(row => {
            options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
        <NativeSelect
            style={{
              width: '80%',
            }}
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
        >
            <option value="">All</option>
            {options.sort().map((option, i) => (
                <option key={i} value={option ? option : " "}>
                     {option}
                 </option>
            ))}
        </NativeSelect>
    )
}