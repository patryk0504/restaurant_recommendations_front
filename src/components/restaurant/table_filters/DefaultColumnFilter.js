// Define a default UI for filtering
import React from "react";
import {FormControl} from "react-bootstrap";

export default function DefaultColumnFilter({ column: {filterValue, preFilteredRows, setFilter},}) {
    const count = preFilteredRows.length

    return (
        <FormControl
                type="text"
                placeholder={`Search ${count} records...`}
                aria-label="Input group example"
                aria-describedby="btnGroupAddon"
                // defaultValue=""
                value={filterValue || ''}
                onChange={e => {
                    setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
                }}
                size="sm"
            />
    )
}