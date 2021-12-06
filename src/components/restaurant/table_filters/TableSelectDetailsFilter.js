// This is a custom filter UI for selecting
// a unique option from a list
import React from "react";
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import CheckIcon from '@mui/icons-material/Check';
import Select from '@mui/material/Select';
import MuiMenuItem from '@mui/material/MenuItem';

export default function SelectColumnFilter({
                                               column: {filterValue, setFilter, preFilteredRows, id},
                                           }) {
    // Render a multi-select box
    return (
        <Select
            style={{
                width: '80%',
            }}
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            defaultValue={""}
        >
            <MuiMenuItem value={""}>All</MuiMenuItem>
            <MuiMenuItem value={'true'}><CheckIcon/></MuiMenuItem>
            <MuiMenuItem value={'false'}><DoNotDisturbIcon/></MuiMenuItem>
        </Select>
    )
}