// Define a default UI for filtering
import React from "react";
import {useAsyncDebounce} from "react-table";
import {FormControl} from "react-bootstrap";

export default function GlobalFilter({
                                         preGlobalFilteredRows,
                                         globalFilter,
                                         setGlobalFilter,
                                     }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    //to improve performance -> useAsyncDebounce
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <div>
            {/*Search:{' '}*/}

            <FormControl
                type="text"
                placeholder={`Search ${count} records...`}
                aria-label="Input group example"
                aria-describedby="btnGroupAddon"
                // defaultValue=""
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
            />
        </div>
    )
}