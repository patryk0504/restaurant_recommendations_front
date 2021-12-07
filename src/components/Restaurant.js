import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';


import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getRates, setRate} from "../slices/user";
import {Button, ButtonGroup} from "react-bootstrap";
import {
    getRestaurantRecommendationAllCountry,
    getRestaurantRecommendationInCity, setRecommendedArea, setRestaurantId
} from "../slices/restaurant";

import {useHistory} from "react-router-dom";
import RecommendationByRestaurant from "./RecommendationByRestaurant";

const style = {
    position: 'absolute',
    top: '10%',
    left: '25%',
    // width: 900,
    width: '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


export default function Restaurant(props) {
    const history = useHistory();
    const rates = useSelector(state => {
        return state.user.rates
    });
    const dispatch = useDispatch();
    const [ratePicker, setRatePicker] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleCityRecommendation = () => {
        const restaurant_id = props.rowData.id;
        const area = false;
        dispatch(setRestaurantId({restaurant_id}));
        dispatch(setRecommendedArea({area}));
        handleClose();
        history.push("/restaurant/recommendation");
    }

    const handleCountryRecommendation = () => {
        const restaurant_id = props.rowData.id;
        const area = true;
        dispatch(setRestaurantId({restaurant_id}));
        dispatch(setRecommendedArea({area}));
        handleClose();
        history.push("/restaurant/recommendation");
    }

    useEffect(() => {
        const restaurant_id = props.rowData.id;
        dispatch(getRates({restaurant_id}));
    }, [dispatch]);


    useEffect(() => {
        if (ratePicker) {
            let unmounted = false;
            const restaurant_id = props.rowData.id;
            const rating = ratePicker;
            setLoading(true);
            dispatch(setRate({restaurant_id, rating}))
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
        }
    }, [ratePicker]);

    const handleClose = () => props.setOpen(false);
    return (
        <div>
            <Modal
                open={props.open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div
                        // className="border border-2 rounded"
                        style={{
                            margin: 0,
                            height: '100%',
                            // paddingBottom: '40px',
                            background: 'white',
                            zIndex: "10",
                        }}
                    >
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                                        {props.rowData.name[0]}
                                    </Avatar>
                                }
                                title={props.rowData.name}
                                subheader={props.rowData.address}
                            />
                            <CardContent>
                                More info: <Link
                                to={{pathname: 'https://www.tripadvisor.com/' + props.rowData.restaurant_id}}
                                target="_blank"
                                rel="noopener noreferrer">Trip Advisor</Link>
                            </CardContent>
                            <MapContainer center={[props.rowData.address_latitude, props.rowData.address_longitude]}
                                          zoom={16} scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[props.rowData.address_latitude, props.rowData.address_longitude]}>
                                    <Popup>
                                        Here is {props.rowData.name}
                                    </Popup>
                                </Marker>
                            </MapContainer>
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {props.rowData.popularity_detailed}
                                    <br/>
                                    {props.rowData.popularity_generic}
                                    <br/>
                                    {props.rowData.price_level &&
                                    ("Price level (€-€€€): " + props.rowData.price_level)}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <Box
                                    // sx={{ ml: 2 }}
                                    sx={{
                                        '& > legend': {mt: 2},
                                    }}
                                >
                                    <Typography component="legend">
                                        {/*<Box sx={{ ml: 1 }}>Rate:</Box>*/}
                                        Your rate:
                                    </Typography>
                                    {loading ? <CircularProgress/> : (
                                        <Rating
                                            name="simple-controlled"
                                            value={rates ? rates.rating : 0}
                                            onChange={(event, newValue) => {
                                                //     setValue(newValue);
                                                setRatePicker(newValue);
                                            }}
                                        />
                                    )}
                                </Box>
                                <ButtonGroup style={{marginLeft: "auto"}}>
                                    <Button onClick={handleCityRecommendation}>Recommendation
                                        in {props.rowData.location}</Button>
                                    <Button onClick={handleCountryRecommendation} variant="secondary">Recommendation in
                                        Poland</Button>
                                </ButtonGroup>
                            </CardActions>
                        </Card>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}