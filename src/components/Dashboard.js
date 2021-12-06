import RestaurantTable from "./restaurant/RestaurantTable";
import {Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getRestaurants} from "../slices/restaurant";

export default function Dashboard(props) {
    const dispatch = useDispatch();
    const restaurants = useSelector(state => state.restaurant.restaurants);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let unmounted = false;
        setLoading(true);
        dispatch(getRestaurants({}))
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
            <RestaurantTable
                data={restaurants}
                loading={loading}
            />
        </Row>
    )
}