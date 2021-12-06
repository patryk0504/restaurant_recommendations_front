import React, {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import TableSelectDetailsFilter from "./restaurant/table_filters/TableSelectDetailsFilter";
import CheckIcon from "@mui/icons-material/Check";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import {useDispatch, useSelector} from "react-redux";
import RestaurantTable from "./restaurant/RestaurantTable";
import {getRestaurantRecommendationByUsers} from "../slices/restaurant";
import Rating from '@mui/material/Rating';
import RecommendationNotFound from "./RecommendationNotFound";


export default function RecommendationByUsers() {
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
                        Header: 'Other users',
                        accessor: 'other_users',
                        hideable: true,
                        disableFilters: true,
                        disableSortBy: true,
                        width: 90,
                        Cell: table_props =>
                            <Col>
                                <ul>
                                    {table_props.cell.value.map(user => (
                                        <li key={user}>{user}</li>
                                    ))
                                    }
                                </ul>
                            </Col>
                    },
                    {
                        Header: 'Avg rating',
                        accessor: 'avg_rating',
                        hideable: true,
                        disableFilters: true,
                        disableSortBy: true,
                        width: 90,
                        Cell: table_props =>
                            <Col>
                                <Rating
                                    name="simple-controlled"
                                    value={table_props.cell.value}
                                    readOnly
                                />
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

    const dispatch = useDispatch();
    const recommendedByUser = useSelector(state => state.restaurant.recommendedByUser);
    const recommendedFound = useSelector(state => state.restaurant.recommendedFound);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let unmounted = false;
        setLoading(true);
        dispatch(getRestaurantRecommendationByUsers({}))
            .unwrap()
            .then((response) => {
                if (!unmounted) setLoading(false);
            })
            .catch((e) => {
                if (!unmounted) {
                    setLoading(false);
                }
            });
        return () => {
            unmounted = true;
        }
    }, []);

    return (
        <Row md={1}>
            {recommendedFound ? <RestaurantTable
                data={recommendedByUser}
                loading={loading}
                columns={columns}
            /> : <RecommendationNotFound/>}

        </Row>
    )
}