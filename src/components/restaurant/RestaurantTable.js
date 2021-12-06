import React, {useState, useEffect} from 'react';
import {Styles} from "./RestaurantTable.module";
import {
    useTable,
    useFilters,
    useGlobalFilter,
    usePagination,
    useResizeColumns,
    useRowSelect,
    useFlexLayout,
    useSortBy,
    allColumns
} from "react-table";
import {matchSorter} from 'match-sorter';

import GlobalFilter from "./table_filters/GlobalFilter";
import DefaultColumnFilter from "./table_filters/DefaultColumnFilter";
import SelectColumnFilter from "./table_filters/TableSelectColumnFilter";
import TableSelectCuisineColumnFilter from "./table_filters/TableSelectCuisineColumnFilter";
import TableSelectDetailsFilter from "./table_filters/TableSelectDetailsFilter";

import CircularProgress from '@mui/material/CircularProgress';

import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Pagination,
    ButtonGroup,
    DropdownButton,
    ButtonToolbar,
    Dropdown,
    InputGroup,
    FormControl,
    Button,
    Tooltip,
    OverlayTrigger,
    Row,
    Col
} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import CheckIcon from '@mui/icons-material/Check';
import Restaurant from "../Restaurant";


const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Click header to sort results.
    </Tooltip>
);


function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, {keys: [row => row.values[id]]})
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val
const cellProps = (props, {cell}) => getStyles(props, cell.column.align)

const getStyles = (props, align = 'left') => [
    props,
    {
        style: {
            justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
            alignItems: 'flex-start',
            display: 'flex',
        },
    },
]

function Table({columns, data, loading}) {
    const [showRestaurant, setShowRestaurant] = useState(false);
    const [rowData, setRowData] = useState(null);


    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []
    )

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
            // When using the useFlexLayout:
            minWidth: 30, // minWidth is only used as a limit for resizing
            width: 150, // width is used for both the flex-basis and flex-grow
            maxWidth: 600, // maxWidth is only used as a limit for resizing
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        getHeaderProps,
        getCellProps,
        // rows,
        rows,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        allColumns,
        state,

        state: {pageIndex, pageSize, globalFilter, filters},

        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
        resetResizing,
    } = useTable(
        {
            columns,
            data,
            initialState: {pageIndex: 0, pageSize: 5, hiddenColumns: ['id']},
            defaultColumn, // Be sure to pass the defaultColumn option
            filterTypes,
        },
        useFilters, // useFilters!
        useGlobalFilter, // useGlobalFilter!
        useResizeColumns,
        useFlexLayout,
        useSortBy,
        usePagination,   //pagination
        useRowSelect,
    )

    // We don't want to render all of the rows for this example, so cap
    // it for this use case
    // const firstPageRows = rows.slice(0, 10)
    return (
        <>
            {showRestaurant && <Restaurant
                open={showRestaurant}
                setOpen={setShowRestaurant}
                rowData={rowData}
            />}
            <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
                <InputGroup size="sm" onMouseDown={e => e.stopPropagation()}>
                    <InputGroup.Text
                        id="btnGroupAddon">Search in all:</InputGroup.Text>
                    <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                </InputGroup>
                {/*<Button onClick={(e) => setRefresh(true)}>Refresh</Button>*/}
                {loading && <div><CircularProgress/>Please wait, fetching data...</div>}

                <DropdownButton title="Hide columns" style={{marginLeft: "auto"}}>
                    {allColumns.map(column => (
                        column.hideable && (
                            <div key={column.id}>
                                <label>
                                    <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                                    {column.id}
                                </label>
                            </div>
                        )
                    ))}
                </DropdownButton>
            </ButtonToolbar>
            <br/>
            <div className="tableWrap border border-2 rounded" onMouseDown={e => e.stopPropagation()}>
                <div {...getTableProps()} className="table border border-1 rounded">
                    {/*<thead>*/}
                    <OverlayTrigger
                        placement="left"
                        delay={{show: 0, hide: 100}}
                        overlay={renderTooltip}
                        defaultShow={true}
                    >
                        <div className="thead" onMouseDown={e => e.stopPropagation()}>
                            {headerGroups.map(headerGroup => (
                                <div
                                    {...headerGroup.getHeaderGroupProps({})}
                                    className="tr"
                                >
                                    {headerGroup.headers.map(column => (
                                        <div {...column.getHeaderProps(column.getSortByToggleProps())} className="th">
                                            {/* Render the columns filter UI */}
                                            <div>{column.render('Header')}<span>{column.isSorted ? column.isSortedDesc ? ' 🔽' : ' 🔼' : ''}</span><br/>
                                                {column.canFilter ? column.render('Filter') : null}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </OverlayTrigger>
                    <div className="tbody">
                        {page.map((row, i) => {
                            prepareRow(row)
                            return (
                                <div {...row.getRowProps()} className="tr"
                                     onClick={(e) => {
                                         setShowRestaurant(true);
                                         setRowData(row.original)
                                     }}
                                >
                                    {row.cells.map(cell => {
                                        return (
                                            <div {...cell.getCellProps(cellProps)} className="td">
                                                {cell.render('Cell')}
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <br/>

            <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
                <ButtonGroup className="me-2" onMouseDown={e => e.stopPropagation()}>
                    <Pagination>
                        <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage}/>
                        <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage}/>
                        <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage}/>
                        <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}/>
                        <InputGroup size="sm">
                            <InputGroup.Text
                                id="btnGroupAddon">{pageIndex + 1} of {pageOptions.length}</InputGroup.Text>
                            <FormControl
                                size="sm"
                                type="number"
                                placeholder="Go to:"
                                aria-label="Input group example"
                                aria-describedby="btnGroupAddon"
                                defaultValue={pageIndex + 1}
                                onChange={e => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                                    gotoPage(page)
                                }}
                            />
                        </InputGroup>
                        <DropdownButton
                            as={ButtonGroup}
                            title={"Show " + pageSize}
                            id="bg-nested-dropdown"
                            onSelect={e => {
                                setPageSize(Number(e))
                            }}>
                            {[5, 10, 20, 30, 40, 50].map(pageSize => (
                                <Dropdown.Item key={pageSize} eventKey={pageSize}>
                                    Show {pageSize}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </Pagination>
                </ButtonGroup>

            </ButtonToolbar>
            <div>
            </div>
        </>
    )
}

function RestaurantTable(props) {
    const columns = React.useMemo(
        () => [

            {
                Header: 'File ID',
                columns: [
                    {
                        Header: 'ID',
                        accessor: 'id',
                        disableFilters: true,
                        style: {'white-space': 'unset'},
                        width: 120,
                        enableResize: true,
                        hideable: true

                    }
                ]
            },
            {
                Header: 'Properties',
                width: 340,
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'name',
                        // filter: 'includes',
                        width: 160,
                        enableResize: true,
                        hideable: false,
                        filter: 'fuzzyText',
                        Cell: table_props =>
                            <Row>
                                {/*{console.log(table_props)}*/}
                                <Col>{table_props.cell.value}</Col>
                                <div className="w-100 d-none d-md-block"/>
                                <Col><p className="text-secondary">{table_props.row.original.address}</p></Col>
                            </Row>
                    },
                    {
                        Header: 'Cuisines',
                        accessor: 'cuisines',
                        hideable: true,
                        // Filter: SelectColumnFilter,
                        Filter: TableSelectCuisineColumnFilter,
                        // filter: 'equals',
                        filter: 'fuzzyText',
                        disableSortBy: true,
                        width: 90,
                        Cell: table_props =>
                            <Col>
                                <ul>
                                    {table_props.cell.value.map(cuisine => (
                                        <li key={cuisine}>{cuisine}</li>
                                    ))
                                    }
                                </ul>
                            </Col>
                    },
                    {
                        Header: 'Location',
                        accessor: 'location',
                        hideable: true,
                        Filter: SelectColumnFilter,
                        filter: 'fuzzyText',
                        disableSortBy: true,
                        width: 90,
                        Cell: table_props =>
                            <Col>
                                {table_props.cell.value}
                            </Col>
                    }
                ],
            },
            {
                Header: 'Details',
                columns: [
                    {
                        Header: 'Vegan',
                        accessor: 'vegan_options',
                        hideable: true,
                        disableSortBy: true,
                        width: 50,
                        // disableFilters: true,
                        Filter: TableSelectDetailsFilter,
                        Cell: table_props => <Col>{table_props.cell.value ? <CheckIcon/> : <DoNotDisturbIcon/>}</Col>
                    },
                    {
                        Header: 'Vegetarian',
                        accessor: 'vegetarian_friendly',
                        hideable: true,
                        disableSortBy: true,
                        width: 50,
                        Filter: TableSelectDetailsFilter,
                        Cell: table_props => <Col>{table_props.cell.value ? <CheckIcon/> : <DoNotDisturbIcon/>}</Col>
                    },
                    {
                        Header: 'Gluten Free',
                        accessor: 'gluten_free',
                        hideable: true,
                        disableSortBy: true,
                        width: 50,
                        Filter: TableSelectDetailsFilter,
                        Cell: table_props => <Col>{table_props.cell.value ? <CheckIcon/> : <DoNotDisturbIcon/>}</Col>
                    }
                ]
            }
        ],
        []
    );

    return (
        <Styles>
            <>
                <Table columns={props.columns ? props.columns : columns}
                       data={props.data}
                       loading={props.loading}
                />
            </>
        </Styles>
    )
}


export default RestaurantTable;