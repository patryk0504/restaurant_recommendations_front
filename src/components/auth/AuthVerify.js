import React from 'react';
import {withRouter} from 'react-router-dom';

const parseJwt = (token) =>{
    try{
        return JSON.parse(atob(token.split(".")[1]));
    }catch (e){
        return null;
    }
}

function AuthVerify(props){
    props.history.listen(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        if(user){
            const decodeJwt = parseJwt(user.auth_token);
            if(decodeJwt.exp * 1000 < Date.now()){
                props.logOut();
            }
        }else{
            props.logOut();
        }
    })

    return <div></div>;
}

export default withRouter(AuthVerify);