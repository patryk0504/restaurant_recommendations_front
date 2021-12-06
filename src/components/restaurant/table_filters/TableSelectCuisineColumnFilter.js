
import React, {useEffect, useState} from "react";
import {getCuisines} from "../../../slices/properties";
import {useDispatch, useSelector} from "react-redux";
import NativeSelect from '@mui/material/NativeSelect';


export default function SelectColumnFilter({
                                               column: {filterValue, setFilter, preFilteredRows, id},
                                           }) {
    const cuisines = useSelector(state => state.properties.cuisines);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCuisines({}));
    }, [dispatch]);

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
            {cuisines.map((option, i) => (
                // console.log(option, i)
                <option key={i} value={option.name ? option.name : " "}>
                    {option.name}
                </option>
            ))}
        </NativeSelect>
    )
}