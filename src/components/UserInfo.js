import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UserInfo(props) {
    return (
        <Card sx={{maxWidth: 345}}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                        {props.username}
                    </Avatar>
                }
                action={
                    <div style={{alignItems: "center", display: 'flex'}}><div style={{padding: '0.5rem'}}>Similarity:</div><CircularProgressWithLabel value={props.similarity * 100}/></div>

                }
                title={props.username}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Similar Restaurants:
                </Typography>
                <ul>
                    {props.restaurants.map((res) => {
                        return <li>{res}</li>
                    })}
                </ul>
            </CardContent>
        </Card>
    );
}

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{position: 'relative', display: 'inline-flex', marginLeft: 'auto'}}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}