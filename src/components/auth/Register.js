import React, {useState, useRef, useEffect} from "react";
import Form from 'react-validation/build/form'
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {register} from "../../slices/auth";
import {useDispatch, useSelector} from "react-redux";
import {clearMessage} from "../../slices/message";


const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

const validUsername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                Username is not valid. It must be between 3 and 20 characters.
            </div>
        )
    }
}

const validPassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                Password is not valid. It must be between 6 and 40 characters.
            </div>
        )
    }
}


function Register(props) {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [successful, setSuccessful] = useState(false);
    const {message} = useSelector(state => state.message);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    }

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setSuccessful(false);
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(register({username, password}))
                .unwrap()
                .then(() => {
                    setSuccessful(true);
                })
                .catch(()=>{
                    setSuccessful(false);
                });
        }
    }

    return (
        <div className="col-md-3">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleRegister} ref={form}>
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={username}
                                    onChange={onChangeUsername}
                                    validations={[required, validUsername]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required, validPassword]}
                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Sign Up</button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div
                                className={successful ? "alert alert-success" : "alert alert-danger"}
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{display: "none"}} ref={checkBtn}/>
                </Form>
            </div>
        </div>
    )
}

export default Register;