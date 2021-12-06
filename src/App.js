import React, {useEffect, useCallback} from 'react';
import {Router, Route, Switch, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import TopNavbar from "./components/navbars/TopNavbar";
import {history} from "./app/history";
import EventBus from "./components/auth/EventBus";
import {logout} from "./slices/auth";
import {clearMessage} from "./slices/message";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/Dashboard";
import RecommendationByRestaurant from "./components/RecommendationByRestaurant";
import RecommendationByUsers from "./components/RecommendationByUsers";
import OtherUsers from "./components/OtherUsers";
import Home from "./components/Home";

function App() {
    const {user: currentUser, isLoggedIn} = useSelector((state => state.auth));
    const dispatch = useDispatch();

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        history.listen(() => {
            dispatch(clearMessage()); // clear message when changing location
        });
        EventBus.on("logout", () => {
            logOut();
            history.push('/login');
        });
        return () => {
            EventBus.remove("logout");
        };
    }, [currentUser, logOut]);
    return (
        <Router history={history}>
            <div>
                <TopNavbar currentUser={currentUser} logOut={logOut}/>
                <div className="container mt-5">
                    {/*<AuthVerify logOut={logOut}/>*/}
                    {currentUser && <Redirect to='/login'/>}
                    <Switch>
                        <Route exact path={["/", "/home"]} component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/restaurants" component={Dashboard}/>
                        <Route exact path="/restaurant/recommendation" component={RecommendationByRestaurant}/>
                        <Route exact path="/restaurant/recommendation/users" component={RecommendationByUsers}/>
                        <Route exact path="/users" component={OtherUsers}/>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
