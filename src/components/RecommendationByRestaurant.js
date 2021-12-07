import {Col, Row} from "react-bootstrap";
import RestaurantTable from "./restaurant/RestaurantTable";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import TableSelectDetailsFilter from "./restaurant/table_filters/TableSelectDetailsFilter";
import CheckIcon from "@mui/icons-material/Check";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import RecommendationNotFound from "./RecommendationNotFound";
import {CircularProgress} from "@mui/material";
import {
    getRestaurantRecommendationAllCountry,
    getRestaurantRecommendationByUsers,
    getRestaurantRecommendationInCity
} from "../slices/restaurant";


export default function RecommendationByRestaurant() {

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
                        Header: 'Recommendation Parameters',
                        accessor: 'recommended_params',
                        hideable: true,
                        disableFilters: true,
                        filter: 'fuzzyText',
                        disableSortBy: true,
                        width: 90,
                        Cell: table_props =>
                            <Col>
                                <ul>
                                    {table_props.cell.value.map(param => (
                                        <li key={param}>{param}</li>
                                    ))
                                    }
                                </ul>
                            </Col>
                    },
                    {
                        Header: 'Jaccard rating (0-1)',
                        accessor: 'jaccard',
                        hideable: true,
                        disableFilters: true,
                        disableSortBy: true,
                        width: 90,
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
    const recommended = useSelector(state => state.restaurant.recommended);
    const recommendedFound = useSelector(state => state.restaurant.recommendedFound);
    const recommendedAreaCountry = useSelector(state => state.restaurant.recommendedAreaCountry);
    const restaurant_id = useSelector(state => state.restaurant.recommendedByRestaurantID);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let unmounted = false;
        setLoading(true);
        if (recommendedAreaCountry) {
            dispatch(getRestaurantRecommendationAllCountry({restaurant_id}))
                .unwrap()
                .then((response) => {
                    if (!unmounted) setLoading(false);
                })
                .catch((e) => {
                    if (!unmounted) {
                        setLoading(false);
                    }
                });
        } else {
            dispatch(getRestaurantRecommendationInCity({restaurant_id}))
                .unwrap()
                .then((response) => {
                    if (!unmounted) setLoading(false);
                })
                .catch((e) => {
                    if (!unmounted) {
                        setLoading(false);
                    }
                });
        }
        return () => {
            unmounted = true;
        }
    }, [restaurant_id]);
    return (
        <Row md={1}>
            {console.log(recommendedFound)}
            {loading ? <CircularProgress/> :
                recommendedFound ?
                    <RestaurantTable
                        data={recommended}
                        loading={loading}
                        columns={columns}
                    /> : <RecommendationNotFound/>}
        </Row>
    )
}